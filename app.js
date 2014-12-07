
// imbues Date with timezone abilities
require('time')(Date);

// allow port to be passed in via command lne
var optimist = require('optimist');
var args = optimist.alias('port', 'p').argv;

var index = function(req, res) {
  // this is only used as a fallback for clients who don't use JavaScript
  // if I must pick a timezone for them, let's choose the opposite of the dateline
  var utcTime = new Date();
  utcTime.setTimezone("UTC");

  var country = findCountry(req);

  res.render('index', {
    answer: Christmas.answer(country, utcTime),
    country: country,

    req: req,
    config: config,
    env: app.get('env')
  });
};

var rss = function(req, res) {
  res.set({'Content-Type': 'application/rss+xml'});

  res.render('rss.xml', {
    country: findCountry(req),
    Christmas: Christmas,
    dateFormat: dateFormat,

    req: req,
    config: config,
    env: app.get('env')
  });
};

var canary = function(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.render('canary.txt', {
    Christmas: Christmas,
    dateFormat: dateFormat,
    country: findCountry(req)
  });
};


/** helpers **/

var findCountry = function(req) {
  if (req.param("country"))
    return req.param("country");

  var forwarded = req.header("X-Forwarded-For");
  var ip = req.param("ip") || forwarded || req.socket.remoteAddress;

  var country = geoipLookup(ip);
  // console.log("Found country [" + country + "]");
  return country;
};

var geoipLookup = function(ip) {
  // debug: French IP
  // ip = "193.51.208.14";

  // console.log("Looking up IP [" + ip + "]");

  var data = countries.lookupSync(ip);
  return data ? data.country_code : null;
};


/** configuration **/

var express = require('express'),
    http = require('http'),
    request = require('request'),
    path = require('path'),
    dateFormat = require('dateformat'),
    Christmas = require("./public/js/christmas"); // re-use christmas.js

// TODO: is this even used anywhere?
require('date-utils'); // date helpers

// must have downloaded a country-level geoip dat file ahead of time
var geoip = require('geoip'),
    countries = new geoip.Country('data/countries.dat');

var app = express(),
    config = require('./config')[app.get('env')];

app.configure(function(){
  app.engine('.html', require('ejs').__express);
  app.engine('.xml', require('ejs').__express);
  app.engine('.txt', require('ejs').__express);
  app.set('port', parseInt(process.env.PORT || args.port || config.port || 80));
  app.set('view engine', 'html');
  app.use(express.favicon(__dirname + '/public/favicon.ico'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {app.use(express.errorHandler())});


app.get('/', index);
app.get('/rss.xml', rss);
app.get('/canary.txt', canary);


var startServer = function() {
  app.enable('trust proxy');

  http.createServer(app).listen(app.get('port'), function(){
    console.log("Express %s server listening on port %s", app.settings.env, app.get('port'));
  });
}

app.configure('development', function() {
  app.use(express.errorHandler());
  startServer();
});

app.configure('production', startServer);
