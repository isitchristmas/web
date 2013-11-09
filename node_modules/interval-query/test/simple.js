
var should = require('should');

//var tree = require('./lib/sequential');
//tree = new tree.Sequential;
//tree.buildTree = function(){};

var tree = require('../lib/segment-tree');
tree = new tree.SegmentTree;

describe("s-tree", function() {
  
  beforeEach(function() {
    tree.clearIntervalStack();
  });
  
  it("tree should exist", function() {
    should.exist(tree);
  });
  
  describe("pushInterval()", function() {
    
    it("method exists", function() {
      tree.pushInterval.should.be.a('function');
    });
    it("push integers", function() {
      (function(){
        tree.pushInterval(3, 5);
      }).should.not.throw();
    });
    it("push floats", function() {
      (function(){
        tree.pushInterval(7.538, 9.3);
      }).should.not.throw();
    });
    it("push strings should throw", function() {
      (function(){
        tree.pushInterval('abc', 'def');
      }).should.throw();
    });
    it("push a > b should throw", function() {
      (function(){
        tree.pushInterval(5, 3);
      }).should.throw();
    });
    
  });
  
  describe("pushArray()", function() {
    
    it("method exists", function() {
      tree.pushArray.should.be.a('function');
    });
    it("push integer array", function() {
      (function(){
        tree.pushArray([1, 3, 5], [7, 10, 9]);
      }).should.not.throw();
    });
    it("push floats array", function() {
      (function(){
        tree.pushArray([1.23, 3.76, 5.5], [7.1, 10.2, 9.3]);
      }).should.not.throw();
    });
    it("push array with string should throw", function() {
      (function(){
        tree.pushArray([1, 'a', 5], [7, 10, 9]);
      }).should.throw();
    });
    it("push a > b should throw", function() {
      (function(){
        tree.pushArray([1, 3, 5], [7, 2, 9]);
      }).should.throw();
    });
    it("validate = false", function() {
      (function(){
        tree.pushArray([1, 3, 5], [7, 2, 9], false);
      }).should.not.throw();
    });
    
  });
  
  describe("buildTree()", function() {
    
    it("method exists", function() {
      tree.buildTree.should.be.a('function');
    });
    it("build simple tree", function() {
      (function(){
        tree.pushInterval(3, 5);
        tree.pushInterval(2, 4);
        tree.pushInterval(5, 7);
        tree.buildTree();
      }).should.not.throw();
    });
    
  });
  
  describe("clearIntervalStack()", function() {
    
    it("method exists", function() {
      tree.clearIntervalStack.should.be.a('function');
    });
    it("clear interval stack", function() {
      (function(){
        tree.pushInterval(3, 5);
        tree.clearIntervalStack();
        tree.buildTree();
      }).should.throw('interval stack is empty');
    });
    
  });
  
  // printTree and printTreeTopDown not part of the unit test
  
  describe("simple query", function() {
    
    beforeEach(function() {
      // build simple tree
      tree.pushInterval(1, 1);
      tree.pushInterval(2, 3);
      tree.pushInterval(5, 7);
      tree.pushInterval(4, 6);
      tree.pushInterval(6, 9);
      tree.pushInterval(9, 14);
      tree.pushInterval(10, 13);
      tree.pushInterval(11, 11);
      tree.buildTree()
    });
    
    describe("queryPoint()", function() {
      
      it("method exists", function() {
        tree.queryPoint.should.be.a('function');
      });
      it("invalid point should throw", function() {
        (function(){
          tree.queryPoint('a');
        }).should.throw();
      });
      it("correct query results: overlaps", function() {
        tree.queryPoint(0).should.equal(0);
        tree.queryPoint(15).should.equal(0);
        tree.queryPoint(1).should.equal(1);
        tree.queryPoint(2).should.equal(1);
        tree.queryPoint(3).should.equal(1);
        tree.queryPoint(2.5).should.equal(1);
        tree.queryPoint(5).should.equal(2);
        tree.queryPoint(6).should.equal(3);
        tree.queryPoint(6.5).should.equal(2);
        tree.queryPoint(11).should.equal(3);
      });
      it("correct query results: overlapping intervals", function() {
        tree.queryPoint(0, function(a){a.should.eql([])});
        tree.queryPoint(15, function(a){a.should.eql([])});
        tree.queryPoint(1, function(a){
          a[0].should.have.property('from', 1);
          a[0].should.have.property('to', 1);
        });
        tree.queryPoint(2, function(a){
          a[0].should.have.property('from', 2);
          a[0].should.have.property('to', 3);
        });
        tree.queryPoint(3, function(a){
          a[0].should.have.property('from', 2);
          a[0].should.have.property('to', 3);
        });
        tree.queryPoint(2.5, function(a){
          a[0].should.have.property('from', 2);
          a[0].should.have.property('to', 3);
        });
        tree.queryPoint(5, function(a){
          a.should.includeEql({ id: 3, from: 5, to: 7 });
          a.should.includeEql({ id: 4, from: 4, to: 6 });
        });
        tree.queryPoint(6, function(a){
          a.should.includeEql({ id: 3, from: 5, to: 7 });
          a.should.includeEql({ id: 4, from: 4, to: 6 });
          a.should.includeEql({ id: 5, from: 6, to: 9 });
        });
        tree.queryPoint(6.5, function(a){
          a.should.includeEql({ id: 3, from: 5, to: 7 });
          a.should.includeEql({ id: 5, from: 6, to: 9 });
        });
        tree.queryPoint(11, function(a){
          a.should.includeEql({ id: 6, from: 9, to: 14 });
          a.should.includeEql({ id: 7, from: 10, to: 13 });
          a.should.includeEql({ id: 8, from: 11, to: 11 });
        });
      });
    });
    
    describe("queryPointArray()", function() {
      
      it("method exists", function() {
        tree.queryPointArray.should.be.a('function');
      });
      it("validation deactive by default", function() {
        (function(){
          tree.queryPointArray([3, 'a', 5]);
        }).should.throw();
      });
      it("validate = false", function() {
        (function(){
          tree.queryPointArray([3, 'a', 5], undefined, false);
        }).should.not.throw();
      });
      it("correct query results: overlaps", function() {
        tree.queryPointArray([0]).should.equal(0);
        tree.queryPointArray([0, 15]).should.equal(0);
        tree.queryPointArray([1, 2, 3]).should.equal(2);
        tree.queryPointArray([2, 2.5, 3]).should.equal(1);
        tree.queryPointArray([5, 6]).should.equal(3);
        tree.queryPointArray([6, 6.5]).should.equal(3);
        tree.queryPointArray([6, 5, 4, 3]).should.equal(4);
        tree.queryPointArray([11, 11.5]).should.equal(3);
      });
      it("correct query results: overlapping intervals", function() {
        tree.queryPointArray([0, 1, 15], function(a){
          a[0].should.have.property('from', 1);
          a[0].should.have.property('to', 1);
        });
        tree.queryPointArray([2, 2.5, 3], function(a){
          a[0].should.have.property('from', 2);
          a[0].should.have.property('to', 3);
        });
        tree.queryPointArray([6.5, 6, 5], function(a){
          a.should.includeEql({ id: 3, from: 5, to: 7 });
          a.should.includeEql({ id: 4, from: 4, to: 6 });
          a.should.includeEql({ id: 5, from: 6, to: 9 });
        });
        tree.queryPointArray([11], function(a){
          a.should.includeEql({ id: 6, from: 9, to: 14 });
          a.should.includeEql({ id: 7, from: 10, to: 13 });
          a.should.includeEql({ id: 8, from: 11, to: 11 });
        });
      });
    });
    
    describe("queryInterval()", function() {
      
      it("method exists", function() {
        tree.queryInterval.should.be.a('function');
      });
      it("invalid point should throw", function() {
        (function(){
          tree.queryInterval(1, 'a');
        }).should.throw();
      });
      it("correct query results: overlaps", function() {
        tree.queryInterval(0, 0).should.equal(0);
        tree.queryInterval(15, 25).should.equal(0);
        tree.queryInterval(1, 2).should.equal(2);
        tree.queryInterval(2.5, 3).should.equal(1);
        tree.queryInterval(5, 6).should.equal(3);
        tree.queryInterval(6.5, 11).should.equal(5);
      });
      it("correct query results: overlapping intervals", function() {
        tree.queryInterval(0, 0.99, { resultFn: function(a){a.should.eql([])}});
        tree.queryInterval(15, 99, { resultFn: function(a){a.should.eql([])}});
        tree.queryInterval(1, 1, { resultFn: function(a){
          a[0].should.have.property('from', 1);
          a[0].should.have.property('to', 1);
        }});
        tree.queryInterval(2, 3, { resultFn: function(a){
          a[0].should.have.property('from', 2);
          a[0].should.have.property('to', 3);
        }});
        tree.queryInterval(5, 6, { resultFn: function(a){
          a.should.includeEql({ id: 3, from: 5, to: 7 });
          a.should.includeEql({ id: 4, from: 4, to: 6 });
          a.should.includeEql({ id: 5, from: 6, to: 9 });
        }});
        tree.queryInterval(6.5, 11, { resultFn: function(a){
          a.should.includeEql({ id: 3, from: 5, to: 7 });
          a.should.includeEql({ id: 5, from: 6, to: 9 });
          a.should.includeEql({ id: 6, from: 9, to: 14 });
          a.should.includeEql({ id: 7, from: 10, to: 13 });
          a.should.includeEql({ id: 8, from: 11, to: 11 });
        }});
      });
      it("exclude interval endpoints", function() {
        tree.queryInterval(0, 1, { endpoints: false, resultFn: function(a){a.should.eql([])}});
        tree.queryInterval(14, 99, { endpoints: false, resultFn: function(a){a.should.eql([])}});
      });
    });
    
    describe("queryIntervalArray()", function() {
      
      it("method exists", function() {
        tree.queryIntervalArray.should.be.a('function');
      });
      it("invalid point should throw", function() {
        (function(){
          tree.queryIntervalArray([1, 2, 3], [4, 'a', 6]);
        }).should.throw();
      });
      it("correct query results: overlaps", function() {
        tree.queryIntervalArray([0, 0, 0], [0, 0.5, 0.99]).should.equal(0);
        tree.queryIntervalArray([15, 3.1, 0], [16, 3.5, 0.99]).should.equal(0);
        tree.queryIntervalArray([0, 1, 2], [2, 2, 2]).should.equal(2);
        tree.queryIntervalArray([2.5, 2, 2.5], [2.5, 3, 3.5]).should.equal(1);
        tree.queryIntervalArray([5, 6], [6, 7]).should.equal(3);
        tree.queryIntervalArray([3, 6], [5, 11]).should.equal(7);
      });
      it("correct query results: overlapping intervals", function() {
        tree.queryIntervalArray([0, 0, 0], [0, 0.5, 0.99], { resultFn: function(a){a.should.eql([])}});
        tree.queryIntervalArray([15, 3.1, 0], [16, 3.5, 0.99], { resultFn: function(a){a.should.eql([])}});
        tree.queryIntervalArray([2.5, 2, 2.5], [2.5, 3, 3.5], { resultFn: function(a){
          a[0].should.have.property('from', 2);
          a[0].should.have.property('to', 3);
        }});
        tree.queryIntervalArray([5, 6], [6, 7], { resultFn: function(a){
          a.should.includeEql({ id: 3, from: 5, to: 7 });
          a.should.includeEql({ id: 4, from: 4, to: 6 });
          a.should.includeEql({ id: 5, from: 6, to: 9 });
        }});
        tree.queryIntervalArray([3, 6], [5, 11], { resultFn: function(a){
          a.should.includeEql({ id: 2, from: 2, to: 3 });
          a.should.includeEql({ id: 3, from: 5, to: 7 });
          a.should.includeEql({ id: 4, from: 4, to: 6 });
          a.should.includeEql({ id: 5, from: 6, to: 9 });
          a.should.includeEql({ id: 6, from: 9, to: 14 });
          a.should.includeEql({ id: 7, from: 10, to: 13 });
          a.should.includeEql({ id: 8, from: 11, to: 11 });
        }});
      });
      it("exclude interval endpoints", function() {
        tree.queryIntervalArray([0, 14], [1, 99], { endpoints: false, resultFn: function(a){a.should.eql([])}});
      });
      it("validate = false", function() {
        (function(){
          tree.queryIntervalArray([0, 1, 2], [3, 'a', 5], { validate: false});
        }).should.not.throw();
      });
    });
    
    describe("queryOverlap()", function() {
      
      it("method exists", function() {
        tree.queryOverlap.should.be.a('function');
      });
      it("correct result", function() {
        var intervals = tree.queryOverlap();
        intervals.should.includeEql({ id: 1, from: 1, to: 1, overlap: [] });
        intervals.should.includeEql({ id: 2, from: 2, to: 3, overlap: [] });
        intervals.should.includeEql({ id: 3, from: 5, to: 7, overlap: ['4', '5'] });
        intervals.should.includeEql({ id: 4, from: 4, to: 6, overlap: ['3', '5'] });
        intervals.should.includeEql({ id: 5, from: 6, to: 9, overlap: ['3', '4', '6'] });
        intervals.should.includeEql({ id: 6, from: 9, to: 14, overlap: ['5', '7', '8'] });
        intervals.should.includeEql({ id: 7, from: 10, to: 13, overlap: ['6', '8'] });
        intervals.should.includeEql({ id: 8, from: 11, to: 11, overlap: ['6', '7'] });
      });
      
    });
    
  });
  
});