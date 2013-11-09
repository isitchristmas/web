# interval-query

interval-query is a Node.js module for storing number intervals and offers two different query methods: segment tree and sequential.
The main purpose of this module is to solve the following problem: given a set of intervals, how to find all overlapping intervals.

## Installation

    npm install query-interval

## Example

```js
var intervals = require('interval-query');

var tree = new intervals.SegmentTree;

tree.pushInterval(1, 5);
tree.pushInterval(2, 7);
tree.pushInterval(3, 6);
tree.buildTree();
console.log(tree.queryOverlap());
```

## Segment tree

One method to query for overlapping intervals is to use a [Segment tree](http://en.wikipedia.org/wiki/Segment_tree).
The usage is as in the example above: we build a new tree object, push intervals to the data structure, build the tree and can
then run certain queries on the tree. The segment tree is a static structure which means we cannot add further intervals
once the tree is built. Rebuilding the tree is then required.

![segment tree example](http://assets.yarkon.de/images/Segment_tree_instance.gif)

## Sequential

The sequential algorithm simply traverses the array of intervals to search for overlaps. It builds up a dynamic structure
where intervals can be added at any time. The interface is similar to the segment tree, but without tree specific methods.
Example:

```js
var intervals = require('interval-query');

var sequ = new intervals.Sequential;

sequ.pushInterval(1, 5);
sequ.pushInterval(2, 7);
sequ.pushInterval(3, 6);
console.log(sequ.queryInterval(6, 8));
sequ.pushInterval(6.5, 7.33);
console.log(sequ.queryInterval(6, 8));
```

## API

### Segment tree and Sequential

#####pushInterval(from, to)#####
Push interval to interval stack.

- `from`: interval start (number).
- `to`: interval end (number).

#####pushArray(from, to, validate)#####
Push array of intervals.

- `from`: interval start points (array).
- `to`: interval end points (array).
- `validate`: validate intervals (boolean, default: true).

#####clearIntervalStack()#####
Clear the interval stack.

#####queryPoint(point, resultFn)#####
Query single point.

- `point`: (number).
- `resultFn`: result array of intervals (function).
- *Returns* overlapping intervals (number).

#####queryPointArray(points, resultFn, validate)#####
Query multiple points.

- `points`: (array).
- `resultFn`: result array of intervals (function).
- `validate`: validate points (boolean, default: true).
- *Returns* overlapping intervals (number).

#####queryInterval(from, to, options)#####
Query single interval.

- `from`: interval start (number).
- `to`: interval end (number).
- `options`: (object).
  - `endpoints`: include endpoints of interval in comparison, e.g. (1, 2) overlaps with (2, 3) (boolean, default: true).
  - `resultFn`: result array of intervals (function).
- *Returns* overlapping intervals (number).    

#####queryIntervalArray(from, to, options)#####
Query multiple intervals.

- `from`: interval start points (array).
- `to`: interval end points (array).
- `options`: (object).
  - `endpoints`: include endpoints of interval in comparison, e.g. (1, 2) overlaps with (2, 3) (boolean, default: true).
  - `resultFn`: result array of intervals (function).
  - `validate`: validate intervals (boolean, default: true).
- *Returns* overlapping intervals (number).

#####queryOverlap()#####
Query overlapping intervals for all intervals of the stack.

- *Returns* intervals (array).
  - `id`: interval id (number).
  - `from`: interval start (number).
  - `to`: interval end (number).
  - `overlap`: overlapping interval ids (array).

### Segment tree only

#####buildTree()#####
Build tree structure.
#####printTree()#####
Prints tree to console.
#####printTreeTopDown()#####
Prints tree to console top down.

## Performance

Detailed performance analysis in this blog post:
http://www.chasinclouds.com/2012/02/segment-tree-implementation-in.html

## Licence

Use of this source code is governed by a MIT-style license that can be found in the LICENSE file.