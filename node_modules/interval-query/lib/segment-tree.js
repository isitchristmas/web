
/*
 * interval-query
 * Copyright © 2012, Thomas Oberndörfer <toberndo@yarkon.de>
 * MIT Licensed
*/

var intervals = require('./intervals');

function Node(from, to) {
  this.left = null;
  this.right = null;
  this.segment = new intervals.Interval(from, to);
  this.intervals = [];
}

var root = null;
var _intervals = [];

function SegmentTree() {
  if (!(this instanceof SegmentTree)) return new SegmentTree;
  intervals.IntervalStack.call(this, _intervals, _queryInterval);
}

SegmentTree.prototype = new intervals.IntervalStack(_intervals, _queryInterval);

SegmentTree.prototype.constructor = SegmentTree;
SegmentTree.prototype.buildTree = buildTree;
SegmentTree.prototype.printTree = printTree;
SegmentTree.prototype.printTreeTopDown = printTreeTopDown;
SegmentTree.prototype.queryOverlap = queryOverlap;

module.exports.SegmentTree = SegmentTree;

function _endpointArray() {
  var endpoints = [];
  endpoints.push(-Infinity);
  endpoints.push(Infinity);
  _intervals.forEach(function(item) {
    endpoints.push(item.from);
    endpoints.push(item.to);
  });
  return _sortAndDeDup(endpoints, function(a, b) {
    return (a - b);
  });
}

function _sortAndDeDup(unordered, compFn) {
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

function _insertElements(pointArray) {
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
    node.left = _insertElements(pointArray.slice(0, center + 1));
    node.right = _insertElements(pointArray.slice(center));
  }
  return node;
}

function _insertInterval(node, interval) {
  switch(node.segment.compareTo(interval)) {
    case intervals.Interval.const.SUBSET:
      // interval of node is a subset of the specified interval or equal
      node.intervals.push(interval);
      break;
    case intervals.Interval.const.INTERSECT_OR_SUPERSET:
      // interval of node is a superset, have to look in both childs
      if (node.left) _insertInterval(node.left, interval);
      if (node.right) _insertInterval(node.right, interval);
      break;
    case intervals.Interval.const.DISJOINT:
      // nothing to do
      break;
  }
}

function _traverseTree(node, enterFn, leaveFn) {
  if (node === null) return;
  // callback when enter node
  if (enterFn !== undefined) enterFn(node);
  _traverseTree(node.right, enterFn, leaveFn);
  _traverseTree(node.left, enterFn, leaveFn);
  // callback before leave
  if (leaveFn !== undefined) leaveFn(node);
}

function _tree2Array(node, level, array) {
  if (node === null) return;
  if (level === undefined) level = -1;
  if (array === undefined) array = [];
  level++;
  if (!array[level]) array[level] = [];
  array[level].push(node);
  _tree2Array(node.right, level, array);
  _tree2Array(node.left, level, array);
  return array;
}

function _query(node, queryIntervals, hits, disjointFn) {
  if (node === null) return;
  var notDisjoint = [];
  queryIntervals.forEach(function(queryInterval) {
    if (disjointFn.call(node.segment, queryInterval) !== intervals.Interval.const.DISJOINT) {
      node.intervals.forEach(function(interval) {
        hits[interval.id] = interval;
      });
      notDisjoint.push(queryInterval);
    }
  });
  if (notDisjoint.length !== 0) {
    _query(node.right, notDisjoint, hits, disjointFn);
    _query(node.left, notDisjoint, hits, disjointFn);
  }
}

function _queryInterval(intervalArray, resultFn, disjointFn) {
  var hits = {};
  if (disjointFn === undefined) disjointFn = intervals.Interval.prototype.disjointIncl;
  _query(root, intervalArray, hits, disjointFn);
  var intervalArray = Object.keys(hits).map(function(key) {
    return hits[key];
  });
  if (resultFn !== undefined && typeof resultFn === 'function') resultFn(intervalArray);
  return intervalArray.length;
}

function _exchangeOverlap(intervals, superiorIntervals) {
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

function _queryOverlap(node, topOverlap) {
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

function buildTree() {
  if (_intervals.length === 0) throw { name: 'BuildTreeError', message: 'interval stack is empty' };
  root = _insertElements(_endpointArray());
  _intervals.forEach(function(item) {
    _insertInterval(root, item);
  });
}

function printTree() {
  _traverseTree(root, function(node) {
    console.log('\nSegment: (%d,%d)', node.segment.from, node.segment.to);
    node.intervals.forEach(function(item, pos) {
      console.log('Interval %d: (%d,%d)', pos, item.from, item.to);
    });
  });
}

function printTreeTopDown() {
  _tree2Array(root).forEach(function(item, pos) {
    console.log('Level %d:', pos);
    item.forEach(function(item, pos) {
      console.log('Segment %d: (%d,%d)', pos, item.segment.from, item.segment.to);
      item.intervals.forEach(function(item, pos) {
        console.log('  Interval %d: (%d,%d)', pos, item.from, item.to);
      });
    });
  });
}

function queryOverlap() {
  _intervals.forEach(function(interval) {
    interval.overlap = {};
  });
  _queryOverlap(root, []);
  _intervals.forEach(function(interval) {
    interval.overlap = Object.keys(interval.overlap);
  });
  return _intervals;
}