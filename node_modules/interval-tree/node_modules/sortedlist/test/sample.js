var SortedList = require("../SortedList");

function test() {
  // sample : ranges with no overlap
  var list = SortedList.create(  {
    filter: function(val, pos) {
      return (this[pos]   == null || (this[pos]   != null && this[pos][1]  <  val[0])) 
        && 
             (this[pos+1] == null || (this[pos+1] != null && val[1] < this[pos+1][0]));
    },
    compare: function(a, b) {
      if (a == null) return -1;
      if (b == null) return  1;
      var c = a[0] - b[0];
      return (c > 0) ? 1 : (c == 0)  ? 0 : -1;
    }
  });

  var insertResult = list.insert(
    [152, 222], [33, 53], [48, 96], [928, 1743], [66, 67], [11, 12]
  );

  console.log(insertResult)
  console.log(list.toArray());
  console.assert(list.length, 5);

  console.assert(Array.isArray(list) === false);
  console.assert(list instanceof Array);
}


test();
