
// allow port to be passed in via command lne
var optimist = require('optimist');
var args = optimist.alias('port', 'p').argv;

var index = function(req, res) {
  var country = findCountry(req);

  res.render('index', {
    answer: Christmas.answer(country),
    country: country,

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

    config: config,
    env: app.get('env')
  });
};


/** helpers **/

// must have downloaded a country-level geoip dat file ahead of time
var geoip = require('geoip-lite');

var findCountry = function(req) {
  if (req.query.country) return req.query.country;

  var forwarded = req.header("X-Forwarded-For");
  var ip = req.query.ip || forwarded || req.socket.remoteAddress;

  // debug: French IP
  // ip = "193.51.208.14";
  // debug: US IP
  // ip = "207.97.227.239";
  // console.log("Looking up IP [" + ip + "]");

  var data = geoip.lookup(ip);
  var country = data ? data.country : null;

  // console.log("Found country [" + country + "]");
  return country;
};


/** configuration **/

var express = require('express'),
    http = require('http'),
    dateFormat = require('dateformat'),
    Christmas = require("./public/js/christmas"); // re-use christmas.js

// TODO: is this even used anywhere?
require('date-utils'); // date helpers

var app = express(),
    config = require('./config')[app.get('env')];

app.enable('trust proxy')
  .set('view engine', 'html')
  .engine('.xml', require('ejs').__express)
  .engine('.html', require('ejs').__express)
  .use(require('serve-favicon')(__dirname + '/public/favicon.ico'))
  .use(express.static(__dirname + '/public'))
  .use(require('body-parser').json())
  .use(function(req,res,next){
    res.locals.req = req;
    next();
  })
  .set('port', parseInt(process.env.PORT || args.port || config.port || 80));

if (app.get('env') == "development")
  app.use(require('errorhandler')({dumpExceptions: true, showStack: true}))
else
  app.use(require('errorhandler')())

// small app
app.get('/', index);
app.get('/rss.xml', rss);

// mount the api
app.use('/api', require('./api')(app, config, findCountry));

app.listen(app.get('port'), function() {
  console.log("Express %s server listening on port %s", app.get('env'), app.get('port'));
});