
var tree = require('../../lib/segment-tree');
var sequ = require('../../lib/sequential');

var random = require('../lib/random.js');

tree = new tree.SegmentTree;
    
var from = [];
var to = [];
var step = 1000;
var begin = 0;

var inter = [];

testBuildTree();

function testBuildTree() {
  for (var i = 1; i <= 20; i++) {
    for (var j = 1; j <= 10; j++) {
      buildTree(i * step);
    }
    stop('build tree with ' + i * step + ' intervals');
  }
  function buildTree(num) {
    random.intervals(from, to, num, num, false);
    tree.clearIntervalStack();
    tree.pushArray(from, to);
    start();
    tree.buildTree();
    set();
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

    
