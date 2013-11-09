    var SortedList = require("../SortedList");
    var list = new SortedList();
    list.insert(13, 2, 9, 8, 0);
    console.log(list.toArray());

    var arr = ["foo", "bar", "hoge"];
    var strList = new SortedList(arr, {
      compare: "string"
    });

    console.log(strList.toArray());

    var list2= new SortedList([2,1,3,4,5], {
      resume : true
    });

    console.log("resume (no checking)", list2.toArray())
