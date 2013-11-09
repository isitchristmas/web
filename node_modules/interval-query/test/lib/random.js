
var intervals = function(from, to, num, range, int) {
  from.length = 0;
  to.length = 0;
  for(var i = 0; i < num; i++) {
    var a,b;
    a = Math.random() * range;
    b = Math.random() * range;
    //console.log('%d,%d', a, b);
    if (int) {
      a = Math.floor(a);
      b = Math.floor(b);
    }
    from.push(Math.min(a, b));
    to.push(Math.max(a, b));
  }
}


var intervalsM = function(from, to, num, range, maxLenght, int) {
  from.length = 0;
  to.length = 0;
  for(var i = 0; i < num; i++) {
    var a,b;
    a = Math.random() * range;
    b = a + Math.random() * maxLenght;
    //console.log('%d,%d', a, b);
    if (int) {
      a = Math.floor(a);
      b = Math.floor(b);
    }
    from.push(a);
    to.push(b);
  }
}

var intervalsN = function(from, to, num, range, int) {
  from.length = 0;
  to.length = 0;
  for(var i = 0; i < num; i++) {
    var a,b,l;
    l = Math.random() * range;
    a = Math.random() * ( range - l );
    b = a + l;
    //console.log('%d,%d', a, b);
    if (int) {
      a = Math.floor(a);
      b = Math.floor(b);
    }
    from.push(a);
    to.push(b);
  }
}

var intervalsL = function(from, to, num, range, int) {
  from.length = 0;
  to.length = 0;
  var step = range / num;
  for(var i = 0; i < num; i++) {
    var a,b,l;
    l = Math.random() * ( range - i * step);
    a = Math.random() * ( range - l );
    b = a + l;
    //console.log('%d,%d', a, b);
    if (int) {
      a = Math.floor(a);
      b = Math.floor(b);
    }
    from.push(a);
    to.push(b);
  }
}

var intervalsMN = function(from, to, num, range, maxLenght, int) {
  from.length = 0;
  to.length = 0;
  for(var i = 0; i < num; i++) {
    var a,b,l;
    l = Math.random() * maxLenght;
    a = Math.random() * ( range - l );
    b = a + l;
    //console.log('%d,%d', a, b);
    if (int) {
      a = Math.floor(a);
      b = Math.floor(b);
    }
    from.push(a);
    to.push(b);
  }
}

module.exports.intervals = intervals;
module.exports.intervalsM = intervalsM;
module.exports.intervalsN = intervalsN;
module.exports.intervalsL = intervalsL;
module.exports.intervalsMN = intervalsMN;