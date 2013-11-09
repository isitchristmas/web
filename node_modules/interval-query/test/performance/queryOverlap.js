
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

treeQueryOverlap();
sequQueryOverlap();

function treeQueryOverlap() {
  for (var i = 1; i <= 10; i++) {
    for (var j = 1; j <= 5; j++) {
      buildTree(i * step);
      start();
      tree.queryOverlap();
      set();
    }
    /*
    var over = 0;
    result.forEach(function(interval) {
      over += interval.overlap.length;
    });
    console.log(over);
    */
    stop('tree query overlap with ' + i * step + ' intervals');
  }
  function buildTree(num) {
    random.intervalsMN(from, to, num, num * 100, 1000, false);
    tree.clearIntervalStack();
    tree.pushArray(from, to);
    tree.buildTree();
  }
}

function sequQueryOverlap() {
  for (var i = 1; i <= 10; i++) {
    for (var j = 1; j <= 5; j++) {
      buildSet(i * step);
      start();
      sequ.queryOverlap();
      set();
      
    }
    stop('sequ query overlap with ' + i * step + ' intervals');
  }
  function buildSet(num) {
    random.intervalsMN(from, to, num, num * 100, 1000, false);
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

    
