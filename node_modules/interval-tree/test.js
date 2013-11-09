var IntervalTree = require('./IntervalTree');
function test() {
  function createRandomInterval(unit, id) {
    var p1 = Math.floor(Math.random() * unit);
    var p2 = Math.floor(Math.random() * unit);
    return [Math.min(p1,p2), Math.max(p1,p2), id];
  }

  var iTree = new IntervalTree(500);


  var intervals = (function() {
    var ret = [];
    for (var i=0; i<100; i++) ret.push(createRandomInterval(1000, i));
    return ret;
  })();

  intervals.forEach(function(val) {
    iTree.add(val, val[2]);
  });




  /**
   * point search
   **/
  var results   = iTree.search(500);
  var resultIds = results.map(function(val) {
    return Number(val.id);
  });


  intervals.forEach(function(v, k) {
    if (resultIds.indexOf(k) >= 0) {
      if (v[0] <= 500 && v[1] >= 500) {
        console.log('true positive', v);
      }
      else {
        throw new Error('false positive');
      }
    }
    else {
      if (v[0] <= 500 && v[1] >= 500) {
        throw new Error('false negative');
      }
      else {
        console.log('true negative', v);
      }
    }
  });

  /**
   * range search
   **/
  results = iTree.search(500, 700);
  
  /**
   * range search evaluation
   **/
  results.forEach(function(result) {
    if (result.rate1 == 0 && result.rate2 == 0) {
      throw new Error('false positive');
    }
  });
  // TODO : detect false negative
}


if (process.argv[1] == __filename) {
  test();
}
