var list = require('sortedlist').create({compare: "string"});

require('linestream').tsv(__dirname + '/genes', function(data, line) {
  var gene = data[0];
  list.insert(gene);
  list.insert(gene);
})
.on("end", function() {
  list.unique();
  console.time("like");
  list.forEach(function(gene) {
    var name = gene.slice(0, -1);
    var results = like(list, name); 
  })
  console.timeEnd("like");

  console.time("simple like");
  list.forEach(function(gene) {
    var name = gene.slice(0, -1);
    var results = list.filter(function(gene) {
      return gene.indexOf(name) == 0;
    });
  })
  console.timeEnd("simple like");
});

function like(list, geneName) {
  var pos = list.bsearch(geneName);
  var key = list.key(geneName);
  var results = [];
  var i = pos, match = true, len = list.length;
  if (list[pos] == geneName) {
    while (match) {
      results.push(list[i]);
      match = (i>=1 && list[--i].indexOf(geneName) == 0);
    }
  }
  i = pos+1;
  do {
    match = (i<=len-1 && list[i].indexOf(geneName) == 0);
    if (match) results.push(list[i]);
    i++;
  }
  while (match);

  return results;
}
