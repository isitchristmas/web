
/*
 * interval-query
 * Copyright © 2012, Thomas Oberndörfer <toberndo@yarkon.de>
 * MIT Licensed
*/

var intervals = require('./intervals');

var _intervals = [];

function Sequential() {
  if (!(this instanceof Sequential)) return new Sequential;
  intervals.IntervalStack.call(this, _intervals, _queryInterval);
}

Sequential.prototype = new intervals.IntervalStack(_intervals, _queryInterval);

Sequential.prototype.constructor = Sequential;
Sequential.prototype.queryOverlap = queryOverlap;

module.exports.Sequential = Sequential;

function _query(queryIntervals, hits, disjointFn) {
  queryIntervals.forEach(function(queryInterval) {
    _intervals.forEach(function(interval) {
      if (disjointFn.call(interval, queryInterval) !== intervals.Interval.const.DISJOINT) {
        hits[interval.id] = interval;
      }
    }); 
  });
}

function _queryInterval(intervalArray, resultFn, disjointFn) {
  var hits = {};
  if (disjointFn === undefined) disjointFn = intervals.Interval.prototype.disjointIncl;
  _query(intervalArray, hits, disjointFn);
  var intervalArray = Object.keys(hits).map(function(key) {
    return hits[key];
  });
  if (resultFn !== undefined && typeof resultFn === 'function') resultFn(intervalArray);
      return intervalArray.length;
}

function _queryOverlap(disjointFn) {
  for(var i = 0; i < _intervals.length; i++) {
    for(var h = i + 1; h < _intervals.length; h++) {
      if (disjointFn.call(_intervals[i], _intervals[h]) !== intervals.Interval.const.DISJOINT) {
        _intervals[i].overlap.push(_intervals[h].id.toString());
        _intervals[h].overlap.push(_intervals[i].id.toString());
      }
    }
  }
}


function queryOverlap() {
  _intervals.forEach(function(interval) {
    interval.overlap = [];
  });
  _queryOverlap(intervals.Interval.prototype.disjointIncl);
  return _intervals;
}

