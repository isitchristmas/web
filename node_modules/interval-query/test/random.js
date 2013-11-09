
var should = require('should');
var tree = require('../lib/segment-tree');
var sequ = require('../lib/sequential');

var random = require('./lib/random.js');

tree = new tree.SegmentTree;
sequ = new sequ.Sequential;

describe("s-tree", function() {
  
  describe("1000 intervals", function() {
    
    var from = [];
    var to = [];
    
    before(function() {
      random.intervals(from, to, 1000, 1000, false);
    });
    
    beforeEach(function() {
      tree.clearIntervalStack();
      tree.pushArray(from, to);
      tree.buildTree();
      sequ.clearIntervalStack();
      sequ.pushArray(from, to);
    });
    
    it("queryPoint()", function() {
      tree.queryPoint(100).should.equal(sequ.queryPoint(100));
      tree.queryPoint(200).should.equal(sequ.queryPoint(200));
      tree.queryPoint(300).should.equal(sequ.queryPoint(300));
      tree.queryPoint(400).should.equal(sequ.queryPoint(400));
      tree.queryPoint(500).should.equal(sequ.queryPoint(500));
    });
    
    it("queryPointArray()", function() {
      tree.queryPointArray([1000, 900, 800, 700, 600]).should.equal(sequ.queryPointArray([1000, 900, 800, 700, 600]));
      console.log('%d hits', tree.queryPointArray([1000, 900, 800, 700, 600]));
    });
    
    it("queryInterval()", function() {
      tree.queryInterval(100, 200).should.equal(sequ.queryInterval(100, 200));
      tree.queryInterval(300, 400).should.equal(sequ.queryInterval(300, 400));
      console.log('%d hits', tree.queryInterval(300, 400));
    });
    
    it("queryIntervalArray()", function() {
      tree.queryIntervalArray([50, 250, 700], [150, 300, 750]).should.equal(sequ.queryIntervalArray([50, 250, 700], [150, 300, 750]));
      console.log('%d hits', tree.queryIntervalArray([50, 250, 700], [150, 300, 750]));
    });
    
  });
  
    describe("100 intervals", function() {
    
    var from = [];
    var to = [];
    
    before(function() {
      random.intervals(from, to, 100, 100, false);
    });
    
    beforeEach(function() {
      tree.clearIntervalStack();
      tree.pushArray(from, to);
      tree.buildTree();
      sequ.clearIntervalStack();
      sequ.pushArray(from, to);
    });
    
    it("queryOverlap()", function() {
      var sequOver = sequ.queryOverlap();
      tree.queryOverlap().should.eql(sequOver);
      //console.log(sequOver);
    });
    
  });
  
  describe("performance", function() {
    
    var from = [];
    var to = [];
    
    before(function() {
      random.intervals(from, to, 1000, 1000, false);
      //console.log(from.length);
    });
    
    beforeEach(function() {
      tree.clearIntervalStack();
      tree.pushArray(from, to);
      tree.buildTree();
      sequ.clearIntervalStack();
      sequ.pushArray(from, to);
    });
    
    it("time buildTree()", function() {
      tree.buildTree();
    });
    
    it("queryInterval() tree", function() {
      tree.queryInterval(300, 400);
    });
    
    it("queryInterval() sequ", function() {
      sequ.queryInterval(300, 400);
    });
    
    it("queryIntervalArray() tree", function() {
      tree.queryIntervalArray([50, 250, 700], [150, 300, 750]);
    });
    
    it("queryIntervalArray() sequ", function() {
      sequ.queryIntervalArray([50, 250, 700], [150, 300, 750]);
    });
    
    it("queryOverlap() tree", function() {
      tree.queryOverlap();
    });
    
    it("queryOverlap() sequ", function() {
      sequ.queryOverlap();
    });
    
  });
  
});


