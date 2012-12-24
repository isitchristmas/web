require('time')(Date);

var index = function(req, res) {
  findCountry(req, function(country) {

    // this is only used as a fallback for clients who don't use JavaScript
    // if I must pick a timezone for them, let's choose the opposite of the dateline
    var utcTime = new Date();
    utcTime.setTimezone("UTC");

    res.render('index', {
      answer: Christmas.answer(country, utcTime),
      country: country,

      req: req,
      config: config,
      env: app.get('env')
    });
  });
};

var rss = function(req, res) {
  res.set({'Content-Type': 'application/rss+xml'});

  findCountry(req, function(country) {
    res.render('rss.xml', {
      country: country,
      Christmas: Christmas,
      dateFormat: dateFormat,
      
      config: config,
      env: app.get('env')
    });
  });
};

/** helpers **/

var findCountry = function(req, callback) {
  if (req.param("country"))
    return callback(req.param("country"));

  var forwarded = req.header("X-Forwarded-For");
  var ip = req.param("ip") || forwarded || req.socket.remoteAddress;
  
  if (db == null) {
    console.log("Connecting to MongoDB for first time...");
    mongo.connect(config.mongodb, function(database) {
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
        // console.log("Found country for " + ip + ": " + country);
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
  app.set('port', config.port || process.env.PORT || 80);
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
