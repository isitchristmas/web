
var tree = require('../../lib/segment-tree');
var sequ = require('../../lib/sequential');

var random = require('../lib/random.js');

tree = new tree.SegmentTree;
sequ = new sequ.Sequential;
    
var from = [];
var to = [];
var step = 1000;
var begin = 0;

var inter = [];

testTreeQuery();
testSequQuery();

function testTreeQuery() {
  var base = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (var i = 1; i <= 20; i++) {
    var num = i * step;
    var range = num * 100;
    var startP = base.map(function(value) { return value * range * 0.1; });
    var counter = 0;
    var sum = [];
    for (var j = 1; j <= 5; j++) {
      buildTree(num, range);
      start();
      var end = begin + 1000;
      while (Date.now() < end)  {
        counter++;
        tree.queryPoint(startP[0]);
        tree.queryPoint(startP[1]);
        tree.queryPoint(startP[2]);
        tree.queryPoint(startP[3]);
        tree.queryPoint(startP[4]);
        tree.queryPoint(startP[5]);
        tree.queryPoint(startP[6]);
        tree.queryPoint(startP[7]);
        tree.queryPoint(startP[8]);
        tree.queryPoint(startP[9]);
      }
    }
    console.log('tree: ' + counter * 10 / 5 + ' queries per second in a set of ' + num + ' intervals.');
  }
  function buildTree(num, range) {
    random.intervalsMN(from, to, num, range, 1000, false);
    tree.clearIntervalStack();
    tree.pushArray(from, to);
    tree.buildTree();
  }
}

function testSequQuery() {
  var base = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (var i = 1; i <= 20; i++) {
    var num = i * step;
    var range = num * 100;
    var startP = base.map(function(value) { return value * range * 0.1; });
    var counter = 0
    for (var j = 1; j <= 5; j++) {
      buildSet(num, range);
      start();
      var end = begin + 1000;
      while (Date.now() < end)  {
        counter++;
        sequ.queryPoint(startP[0]);
        sequ.queryPoint(startP[1]);
        sequ.queryPoint(startP[2]);
        sequ.queryPoint(startP[3]);
        sequ.queryPoint(startP[4]);
        sequ.queryPoint(startP[5]);
        sequ.queryPoint(startP[6]);
        sequ.queryPoint(startP[7]);
        sequ.queryPoint(startP[8]);
        sequ.queryPoint(startP[9]);
      }
    }
    console.log('sequ: ' + counter * 10 / 5 + ' queries per second in a set of ' + num + ' intervals');
  }
  function buildSet(num, range) {
    random.intervalsMN(from, to, num, range, 1000, false);
    sequ.clearIntervalStack();
    sequ.pushArray(from, to);
  }
}

function start() {
  begin = Date.now();
}

function stop(test) {
  var time = 0;
  for (var i = 0; i < inter.length; i++) {
    time += inter[i];
  }
  console.log(test + ' took %d ms', time / inter.length);
  inter.length = 0;
}

function set() {
  inter.push(Date.now() - begin);
}

    
 
