
/*
 * interval-query
 * Copyright © 2012, Thomas Oberndörfer <toberndo@yarkon.de>
 * MIT Licensed
*/

var sequential = function() {
  
  var intervals = [];
  
  var Interval = function(from, to) {
    this.id = ++Interval.prototype.id;
    this.from = from;
    this.to = to;
    this.overlap = [];
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
  
  var _query = function(queryIntervals, hits, disjointFn) {
    queryIntervals.forEach(function(queryInterval) {
      intervals.forEach(function(interval) {
        if (disjointFn.call(interval, queryInterval) !== Interval.const.DISJOINT) {
          hits[interval.id] = interval;
        }
      }); 
    });
  }
  
  var _queryInterval = function(intervalArray, resultFn, disjointFn) {
    var hits = {};
    if (disjointFn === undefined) disjointFn = Interval.prototype.disjointIncl;
    _query(intervalArray, hits, disjointFn);
    var intervalArray = Object.keys(hits).map(function(key) {
      return hits[key];
    });
    if (resultFn !== undefined && typeof resultFn === 'function') resultFn(intervalArray);
    return intervalArray.length;
  }
  
  var _queryOverlap = function(disjointFn) {
    for(var i = 0; i < intervals.length; i++) {
      for(var h = i + 1; h < intervals.length; h++) {
        if (disjointFn.call(intervals[i], intervals[h]) !== Interval.const.DISJOINT) {
          intervals[i].overlap.push(intervals[h].id.toString());
          intervals[h].overlap.push(intervals[i].id.toString());
        }
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
      _queryOverlap(Interval.prototype.disjointIncl);
      return intervals;
    }
  }
}
