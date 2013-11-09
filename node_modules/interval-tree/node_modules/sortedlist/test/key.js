var SortedList = require('sortedlist');

var compare = function(a, b) {
  return (a[0] > b[0]) ? 1 : (a[0] == b[0]) ? 0 : -1;
};

var list = SortedList.create({compare: compare});

var N = 3000;
for (var i=0; i<N;i++) {
  list.insert(["shinout", 1]);
  list.insert(["abcde", 2]);
  list.insert(["ringo", 3]);
  list.insert(["osaka", 4]);
}
console.log("inserted")

console.assert(list.key(["shinout"]) == 3*N);
console.assert(list.key(["ringo"]) == 2*N);
console.assert(list.key(["osaka"]) == 1*N);
console.assert(list.key(["abcde"]) == 0 *N);
console.assert(list.key(["shinou"]) == null);

console.assert(list.key(["shinout"]) == list.keys(["shinout"])[0]);
console.assert(list.keys(["shinout"]).length == N);

console.log("key test ok")
