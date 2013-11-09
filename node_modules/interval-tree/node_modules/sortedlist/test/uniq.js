var SortedList = require('sortedlist');

var compare = function(a, b) {
  return (a[0] > b[0]) ? 1 : (a[0] == b[0]) ? 0 : -1;
};

var list = SortedList.create({compare: compare, unique: true});

var N = 3;
for (var i=0; i<N;i++) {
  list.insert(["shinout", 1]);
  list.insert(["abcde", 2]);
  list.insert(["ringo", 3]);
  list.insert(["osaka", 4]);
}
console.assert(list.length == 4)
