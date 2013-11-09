
/*
 * interval-query
 * Copyright © 2012, Thomas Oberndörfer <toberndo@yarkon.de>
 * MIT Licensed
*/

module.exports.Interval = Interval;
module.exports.IntervalStack = IntervalStack;

function Interval(from, to) {
  this.id = ++Interval.prototype.id;
  this.from = from;
  this.to = to;
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

function IntervalStack(intervals, queryIntervalFn) {
  this._intervals = intervals;
  this._queryInterval = queryIntervalFn;
}

IntervalStack.prototype = (function() {
  return {
    constructor: IntervalStack,
    pushInterval: pushInterval,
    pushArray: pushArray,
    clearIntervalStack: clearIntervalStack,
    queryPoint: queryPoint,
    queryPointArray: queryPointArray,
    queryInterval: queryInterval,
    queryIntervalArray: queryIntervalArray
  };
})();

function _validateInterval(from, to) {
  if (typeof from !== 'number' || typeof to !== 'number') throw {
    name: 'InvalidInterval',
    message: 'endpoints of interval must be of type number'
  };
  if (from > to) throw {
    name: 'InvalidInterval',
    message: '(' + from + ',' + to + ')' + ' a > b'
  };
}

function _validateIntervalArray(from, to) {
  if (!(from instanceof Array && to instanceof Array)) throw {
    name: 'InvalidParameter',
    message: 'function pushArray: parameters must be arrays'
  };
  if (from.length !== to.length) throw {
    name: 'InvalidParameter',
    message: 'function pushArray: arrays must have same length'
  };
  for(var i = 0; i < from.length; i++) {
    _validateInterval(from[i], to[i]);
  }
}

function _validatePoint(point) {
  if (typeof point !== 'number') throw {
    name: 'InvalidParameter',
    message: 'parameter must be a number'
  };
}

function _validatePointArray(points) {
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


function pushInterval(from, to) {
  _validateInterval(from, to);
  this._intervals.push(new Interval(from, to));
}

function pushArray(from, to, validate) {
  var val = (validate !== undefined) ? validate : true;
  if (val) _validateIntervalArray(from, to);
  for(var i = 0; i < from.length; i++) {
    this._intervals.push(new Interval(from[i], to[i]));
  }
}

function clearIntervalStack() {
  this._intervals.length = 0;
  Interval.prototype.id = 0;
}

function queryPoint(point, resultFn) {
  _validatePoint(point);
  return this.queryPointArray([point], resultFn);
}

function queryPointArray(points, resultFn, validate) {
  var val = (validate !== undefined) ? validate : true;
  if (val) _validatePointArray(points);
  var intervalArray = points.map(function(item) {
    return new Interval(item, item);
  });
  return this._queryInterval(intervalArray, resultFn);
}

// options: endpoints, resultFn
function queryInterval(from, to, options) {
  _validateInterval(from, to);
  return this.queryIntervalArray([from], [to], options);
}

// options: endpoints, resultFn, validate
function queryIntervalArray(from, to, options) {
  var intervalArray = [];
  var val = (options !== undefined && options.validate !== undefined) ? options.validate : true;
  var resFn = (options !== undefined && options.resultFn !== undefined) ? options.resultFn : undefined;
  var disjointFn = (options !== undefined && options.endpoints === false) ? Interval.prototype.disjointExcl : Interval.prototype.disjointIncl;
  if (val) _validateIntervalArray(from, to);
  for(var i = 0; i < from.length; i++) {
    intervalArray.push(new Interval(from[i], to[i]));
  }
  return this._queryInterval(intervalArray, resFn, disjointFn);
}

