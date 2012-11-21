var index = function(req, res) {
  findCountry(req, function(country) {
    res.render('index', {
      country: country
    });
  });
};

var rss = function(req, res) {
  res.set({'Content-Type': 'application/rss+xml'});

  findCountry(req, function(country) {
    res.render('rss.xml', {
      country: country,
      Christmas: Christmas,
      dateFormat: dateFormat
    });
  });
};

/** helpers **/

var findCountry = function(req, callback) {
  var forwarded = req.header("X-Forwarded-For");
  var ip = forwarded ? forwarded : req.socket.remoteAddress;
  console.log("IP: " + ip);

  if (db == null) {
    console.log("Connecting to MongoDB for first time...");
    mongo.connect(config.mongodb, function(database) {
      console.log("Caching MongoDB connection.");
      db = database; // cache database
      lookupCountry(ip, db, callback);
    });
  } else
    lookupCountry(ip, db, callback);
};

var lookupCountry = function(ip, database, callback) {
  database.collection("blocks", function(err, collection) {
    if (err) {console.log("Error connecting to 'blocks'"); return "US";}

    // debug: French IP
    // ip = "193.51.208.14";

    var intIp = ipToInteger(ip);
    
    collection.findOne({ip_start: {"$lte": intIp}, ip_end: {"$gte": intIp}}, function(err, item) {
      if (err) {console.log("Error finding row"); return callback("US");}

      if (item == null) {
        console.log("Invalid IP address (" + ip + ":" + intIp + "), returning 'US'");
        callback("US");
      } else {
        country = item.country;
        console.log("Found country: " + country);
        callback(country);
      }
    });
  })
};

var ipToInteger = function(ip) {
  var pieces = ip.split(".");
  return (parseInt(pieces[0]) * 16777216) 
    + (parseInt(pieces[1]) * 65536) 
    + (parseInt(pieces[2]) * 256) 
    + parseInt(pieces[3]);
}

/** configuration **/

var express = require('express')
  , http = require('http')
  , path = require('path')
  , dateFormat = require('dateformat')
  , Christmas = require("./public/christmas");
require('date-utils'); // date helpers


var app = express()
  , config = require('./config')[app.get('env')]
  , mongo = require('./mongo')
  , db = null; // connect on first request (why is this my best option?)

app.configure(function(){
  app.engine('.html', require('ejs').__express);
  app.engine('.xml', require('ejs').__express);
  app.set('port', process.env.PORT || 80);
  app.set('view engine', 'html');
  app.use(express.favicon(__dirname + '/public/favicon.ico'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});


app.get('/', index);
app.get('/rss.xml', rss);


/** start server */

var startServer = function() {
  http.createServer(app).listen(app.get('port'), function(){
    console.log("Express %s server listening on port %s", app.settings.env, app.get('port'));
  });
}

app.configure('development', function() {
  app.use(express.errorHandler());

  require('reloader')({
    watchModules: true,
    onReload: startServer
  });
});

app.configure('production', startServer);