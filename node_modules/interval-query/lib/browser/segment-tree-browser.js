
/*
 * interval-query
 * Copyright © 2012, Thomas Oberndörfer <toberndo@yarkon.de>
 * MIT Licensed
*/

"use strict";

var segmentTree = function() {
  
  var root = null;
  
  var intervals = [];
  
  var Interval = function(from, to) {
    this.id = ++Interval.prototype.id;
    this.from = from;
    this.to = to;
    this.overlap = {};
  }
  
  Interval.prototype.id = 0;
  Interval.const = Interval.prototype;
  Interval.prototype.SUBSET = 1;
  Interval.prototype.DISJOINT = 2;
  Interval.prototype.INTERSECT_OR_SUPERSET = 3;
  
  Interval.prototype.compareTo = function(other) {
    if (other.from > this.to || other.to < this.from) return this.DISJOINT;
    if (other.from <= this.from && other.to >= this.to) return this.SUBSET; 
    return this.INTERSECT_OR_SUPERSET;
  }
  
  // endpoints of intervals included
  Interval.prototype.disjointIncl = function(other) {
    if (other.from > this.to || other.to < this.from) return this.DISJOINT;
  }
  
  // two intervals that share only endpoints are seen as disjoint
  Interval.prototype.disjointExcl = function(other) {
    if (other.from >= this.to || other.to <= this.from) return this.DISJOINT;
  }
  
  var Node = function(from, to) {
    this.left = null;
    this.right = null;
    this.segment = new Interval(from, to);
    this.intervals = [];
  }
  
  var endpointArray = function() {
    var endpoints = [];
    endpoints.push(-Infinity);
    endpoints.push(Infinity);
    intervals.forEach(function(item) {
      endpoints.push(item.from);
      endpoints.push(item.to);
    });
    return sortAndDeDup(endpoints, function(a, b) {
      return (a - b);
    });
  }
  
  var sortAndDeDup = function(unordered, compFn) {
    var result = [];
    var prev;
    unordered.sort(compFn).forEach(function(item) {
      var equal = (compFn !== undefined && prev !== undefined) ? compFn(prev, item) === 0 : prev === item; 
      if (!equal) {
        result.push(item);
        prev = item;
      }
    });
    return result;
  }
  
  var insertElements = function(pointArray) {
    var node;
    if (pointArray.length === 2) {
      node = new Node(pointArray[0], pointArray[1]);
      if (pointArray[1] !== Infinity) {
        node.left = new Node(pointArray[0], pointArray[1]);
        node.right = new Node(pointArray[1], pointArray[1]);
      }
    } else {
      node = new Node(pointArray[0], pointArray[pointArray.length - 1]);
      // split array in two halfs
      var center = Math.floor(pointArray.length / 2);
      node.left = insertElements(pointArray.slice(0, center + 1));
      node.right = insertElements(pointArray.slice(center));
    }
    return node;
  }
  
  var insertInterval = function(node, interval) {
    switch(node.segment.compareTo(interval)) {
      case Interval.const.SUBSET:
        // interval of node is a subset of the specified interval or equal
        node.intervals.push(interval);
        break;
      case Interval.const.INTERSECT_OR_SUPERSET:
        // interval of node is a superset, have to look in both childs
        if (node.left) insertInterval(node.left, interval);
        if (node.right) insertInterval(node.right, interval);
        break;
      case Interval.const.DISJOINT:
        // nothing to do
        break;
    }
  }
  
  var traverseTree = function(node, enterFn, leaveFn) {
    if (node === null) return;
    // callback when enter node
    if (enterFn !== undefined) enterFn(node);
    traverseTree(node.right, enterFn, leaveFn);
    traverseTree(node.left, enterFn, leaveFn);
    // callback before leave
    if (leaveFn !== undefined) leaveFn(node);
  }
  
  var tree2Array = function(node, level, array) {
    if (node === null) return;
    if (level === undefined) level = -1;
    if (array === undefined) array = [];
    level++;
    if (!array[level]) array[level] = [];
    array[level].push(node);
    tree2Array(node.right, level, array);
    tree2Array(node.left, level, array);
    return array;
  }
  
  var _query = function(node, queryIntervals, hits, disjointFn) {
    if (node === null) return;
    queryIntervals.forEach(function(queryInterval) {
      if (disjointFn.call(node.segment, queryInterval) !== Interval.const.DISJOINT) {
        node.intervals.forEach(function(interval) {
          hits[interval.id] = interval;
        });
        _query(node.right, queryIntervals, hits, disjointFn);
        _query(node.left, queryIntervals, hits, disjointFn);
      }
    });
  }
  
  var _queryInterval = function(intervalArray, resultFn, disjointFn) {
    var hits = {};
    if (disjointFn === undefined) disjointFn = Interval.prototype.disjointIncl;
    _query(root, intervalArray, hits, disjointFn);
    var intervalArray = Object.keys(hits).map(function(key) {
      return hits[key];
    });
    if (resultFn !== undefined && typeof resultFn === 'function') resultFn(intervalArray);
    return intervalArray.length;
  }
  
  var _exchangeOverlap = function(intervals, superiorIntervals) {
    for(var i = 0; i < superiorIntervals.length; i++) {
      var superiorInterval = superiorIntervals[i];
      for(var j = 0; j < intervals.length; j++) {
        intervals[j].overlap[superiorInterval.id] = superiorInterval;
        superiorInterval.overlap[intervals[j].id] = intervals[j]; 
      }
    }
    // intervals of node overlap with each other
    for(var i = 0; i < intervals.length; i++) {
      for(var j = i + 1; j < intervals.length; j++) {
        intervals[i].overlap[intervals[j].id] = intervals[j];
        intervals[j].overlap[intervals[i].id] = intervals[i]; 
      }
    }
  }
  
  var _queryOverlap = function(node, topOverlap) {
    if (node === null) return;
    var localTopOvrlp;
    // exchange overlaps: all intervals of a node overlap with intervals of superior nodes and vice versa
    if (node.intervals.length !== 0) {
      _exchangeOverlap(node.intervals, topOverlap);
      // create topOverlap array with new intervals from node
      localTopOvrlp = topOverlap.concat(node.intervals);
    } else {
      localTopOvrlp = topOverlap;
    }
    _queryOverlap(node.left, localTopOvrlp); 
    _queryOverlap(node.right, localTopOvrlp); 
  }
  
    var validateInterval = function(from, to) {
    if (typeof from !== 'number' || typeof to !== 'number') throw {
        name: 'InvalidInterval',
        message: 'endpoints of interval must be of type number'
    };
    if (from > to) throw {
        name: 'InvalidInterval',
        message: '(' + from + ',' + to + ')' + ' a > b'
    };
  }
  
  var validateIntervalArray = function(from, to) {
    if (!(from instanceof Array && to instanceof Array)) throw {
        name: 'InvalidParameter',
        message: 'function pushArray: parameters must be arrays'
    };
    if (from.length !== to.length) throw {
        name: 'InvalidParameter',
        message: 'function pushArray: arrays must have same length'
    };
    for(var i = 0; i < from.length; i++) {
      validateInterval(from[i], to[i]);
    }
  }
  
  var validatePoint = function(point) {
    if (typeof point !== 'number') throw {
        name: 'InvalidParameter',
        message: 'parameter must be a number'
    };
  }
  
  var validatePointArray = function(points) {
    if (!(points instanceof Array)) throw {
        name: 'InvalidParameter',
        message: 'parameter must be an array'
    };
    for(var i = 0; i < points.length; i++) {
      if (typeof points[i] !== 'number') throw {
        name: 'InvalidParameter',
        message: 'array must consist only of numbers'
      }
    }
  }
  
  return {
    pushInterval: function(from, to) {
      validateInterval(from, to);
      intervals.push(new Interval(from, to));
    },
    pushArray: function(from, to, validate) {
      var val = (validate !== undefined) ? validate : true;
      if (val) validateIntervalArray(from, to);
      for(var i = 0; i < from.length; i++) {
        intervals.push(new Interval(from[i], to[i]));
      }
    },
    clearIntervalStack: function() {
      intervals.length = 0;
      Interval.prototype.id = 0;
    },
    buildTree: function() {
      if (intervals.length === 0) throw { name: 'BuildTreeError', message: 'interval stack is empty' };
      root = insertElements(endpointArray());
      intervals.forEach(function(item) {
        insertInterval(root, item);
      });
    },
    printTree: function() {
      traverseTree(root, function(node) {
        console.log('\nSegment: (%d,%d)', node.segment.from, node.segment.to);
        node.intervals.forEach(function(item, pos) {
          console.log('Interval %d: (%d,%d)', pos, item.from, item.to);
        });
      });
    },
    printTreeTopDown: function() {
      tree2Array(root).forEach(function(item, pos) {
        console.log('Level %d:', pos);
        item.forEach(function(item, pos) {
          console.log('Segment %d: (%d,%d)', pos, item.segment.from, item.segment.to);
          item.intervals.forEach(function(item, pos) {
            console.log('  Interval %d: (%d,%d)', pos, item.from, item.to);
          });
        });
      });
    },
    queryPoint: function(point, resultFn) {
      validatePoint(point);
      return this.queryPointArray([point], resultFn);
    },
    queryPointArray: function(points, resultFn, validate) {
      var val = (validate !== undefined) ? validate : true;
      if (val) validatePointArray(points);
      var intervalArray = points.map(function(item) {
        return new Interval(item, item);
      });
      return _queryInterval(intervalArray, resultFn);
    },
    // options: endpoints, resultFn
    queryInterval: function(from, to, options) {
      validateInterval(from, to);
      return this.queryIntervalArray([from], [to], options);
    },
    // options: endpoints, resultFn, validate
    queryIntervalArray: function(from, to, options) {
      var intervalArray = [];
      var val = (options !== undefined && options.validate !== undefined) ? options.validate : true;
      var resFn = (options !== undefined && options.resultFn !== undefined) ? options.resultFn : undefined;
      var disjointFn = (options !== undefined && options.endpoints === false) ? Interval.prototype.disjointExcl : Interval.prototype.disjointIncl;
      if (val) validateIntervalArray(from, to);
      for(var i = 0; i < from.length; i++) {
        intervalArray.push(new Interval(from[i], to[i]));
      }
      return _queryInterval(intervalArray, resFn, disjointFn);
    },
    queryOverlap: function() {
      _queryOverlap(root, []);
      var result = [];
      intervals.forEach(function(interval) {
        var copy = new Interval();
        copy.id = interval.id;
        copy.from = interval.from;
        copy.to = interval.to
        copy.overlap = Object.keys(interval.overlap);
        result.push(copy);
      });
      return result;
    }
  }
}
