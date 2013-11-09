interval-tree
==========
interval tree in JavaScript

### Installation ###
    git clone git://github.com/shinout/interval-tree.git

    OR

    npm install interval-tree

### Usage ###
    var IntervalTree = require('interval-tree');

    // add interval data

    var itree = new IntervalTree(300); // 300 : the center of the tree

    itree.add([22, 56,  'foo']);
    itree.add([44, 199, 'bar']);

    // search 1: get overlapped regions from one point
    var results = itree.search(103);

    results.forEach(function(result) {
      console.log(result.data); // overlapped range data
      console.log(result.id);   // id of the overlapped range
    });

    // search 2: get overlapped regions from a range
    var results2 = itree.search(103, 400);

    results2.forEach(function(result) {
      console.log(result.data);  // overlapped range data
      console.log(result.id);    // id of the overlapped range
      console.log(result.rate1); // overlapped rate to the given range
      console.log(result.rate2); // overlapped rate to the range of this result
    });


