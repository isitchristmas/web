SortedList
==========
sorted list in JavaScript (browsers (ES5 compatible), Node.js)

## Installation ##
    git clone git://github.com/shinout/SortedList.git

    OR

    npm install sortedlist

## Usage ##

    // sort number
    var list = SortedList.create();
    list.insert(13, 2, 9, 8, 0);
    console.log(list.toArray()); // [0,2,8,9,13]

    // sort string
    var arr = ["foo", "bar", "hoge"];
    var strList = SortedList.create(arr, {
      compare: "string"
    });
    console.log(strList.toArray()); // ["bar", "foo", "hoge"]

    // SortedList is not Array
    console.assert(!Array.isArray(list));

    // SortedList is instanceof Array
    console.assert(list instanceof Array);

    // SortedList extends Array
    console.assert(list[2], 8);
    console.assert(list.length, 5);
    console.assert(list.pop(), 13);

    // register an already filtered array
    var list = SortedList.create([0,1,2,3,4], { resume: true });

## API Documentation ##
- SortedList.create(options, arr)
- sortedList.insertOne(val)
- sortedList.insert(val1, val2, ...)
- sortedList.remove(pos)
- sortedList.unique(createNew)
- sortedList.bsearch(val)
- sortedList.key(val)
- sortedList.keys(val)
- sortedList.toArray()


### SortedList.create(options, arr) ###
create an instance of SortedList.

**options** is option object as follows.
<table>
<tr><th>key</th>
<td>type</td>
<td>description</td>
<td>example</td></tr>

<tr><th>unique</th>
<td>boolean</td>
<td>filter unique values in insertion.</td>
<td>true</td>
</tr>

<tr><th>filter</th>
<td>function</td>
<td>
register a filtration function which returns boolean indicating valid value, running before insertion.
By default, function(v) { returns true }, that is, no filtration.
</td>
<td>function (v) { return !isNaN(Number(v) }</td>
</tr>

<tr><th>compare</th>
<td>one of "string", "number"</td>
<td>
comparison function comparing two strings or two numbers asc.<br>
By default, "number" comparison.
</td>
<td>"number"</td>
</tr>

<tr><th>compare</th>
<td>function</td>
<td>
a custom comparison function which returns one of [1, 0, -1].<br>
The same spec as Array#sort(fn).
See <a href="https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/sort">Mozilla official site</a>.
</td>
<td>function(a,b) { return a.start - b.start }</td>
</tr>

<tr><th>resume</th>
<td>boolean</td>
<td>
if true, sets the array given in the second arguments with no filtration
</td>
<td>true</td>
</tr>
</table>

**arr** is a initial value. All elements are shallowly copied.

Returns an instance of SortedList.

### sortedList.insertOne(val) ###
Inserts **val** to the list. 

Returns inserted position if succeeded, false if failed.


### sortedList.insert(val1, val2, ...) ###
Inserts **val1** **val2**, ... to the list.

Returns list of the result of executing insertOne(val).

    console.log(SortedList.create().insert(3,1,2,4,5));
    // [0,0,1,3,4]

### sortedList.remove(pos) ###
Removes a value in the position **pos**.

Returns this.

### sortedList.unique(createNew) ###
Make the list unique.
If **createNew** is true, returns a new array.

Otherwise, duplicated elements are internally removed, and this method returns this.

### sortedList.bsearch(val) ###
Executes binary search with the given **val**.
Returns the position before insertion.

    var list = SortedList.create([1,2,4,6,10]);
    console.log(list.bsearch(4)); // 2
    console.log(list.bsearch(5)); // 2
    console.log(list.bsearch(0)); // -1
    console.log(list.bsearch(12)); // 4

### sortedList.key(val) ###
If the given **val** exists, returns the first position.

Otherwise, returns null.

    var list = SortedList.create([1,2,4,4,4,6,10]);
    console.log(list.key(10)); // 6
    console.log(list.key(4)); // 2
    console.log(list.key(5)); // null
    console.log(list.key(1)); // 0

### sortedList.keys(val) ###
If the given **val** exists, returns an array of all the positions with **val**.

Otherwise, returns null.

    var list = SortedList.create([1,2,4,4,4,6,10]);
    console.log(list.keys(10)); // [4]
    console.log(list.keys(4)); // [2, 3, 4]
    console.log(list.keys(5)); // null
    console.log(list.keys(1)); // [0]


### sortedList.toArray() ###
Creates a new array with this list.

## SortedList extends Array ###
As SortedList extends Array, we can use every method in Array.

    var list = SortedList.create([1,2,4,6,10]);

    console.log(list[2]) // 4

    list.forEach(function(total, v) {
      // ...
    });

    var newArr = list.map(function(total, v) {
      // ...
    });

Be careful of these differences.

    Array.isArray(SortedList.create()) // false
    (SortedList.create()) instanceof Array // true
