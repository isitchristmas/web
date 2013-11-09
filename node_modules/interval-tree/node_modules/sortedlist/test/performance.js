var SortedList = require("../SortedList");

var compare = function(a, b) {
  return a.val > b.val ? 1: -1;
};


var list = SortedList.create({compare: compare});

console.time("inserting10000")
for (var i=0; i<10000; i++) {
  var obj = {id : i, val: Math.random()};
  list.insert(obj);
}

// list.forEach(function(obj) {
//   console.log(obj.id, obj.val);
// })

console.timeEnd("inserting10000")


list = SortedList.create({compare: compare});

console.time("pushing10000")
for (var i=0; i<10000; i++) {
  var obj = {id : i, val: Math.random()};
  list.push(obj);
}
list = list.sort(compare);
console.timeEnd("pushing10000")

console.time("arr10000")
var arr = [];
for (var i=0; i<10000; i++) {
  var obj = {id : i, val: Math.random()};
  arr.push(obj);
}
arr = arr.sort(compare);
console.timeEnd("arr10000")


console.time("sorting100")
for (var i=0; i<100; i++) {
  var obj = {id : i, val: Math.random()};
  arr.push(obj);
  arr = arr.sort(compare);
}
arr = arr.sort(function(a, b) {
  return a.val > b.val ? 1: -1;
});

console.timeEnd("sorting100")
