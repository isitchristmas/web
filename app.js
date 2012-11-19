var index = function(req, res) {
  res.render('index');
};

var rss = function(req, res) {
  res.set({'Content-Type': 'application/rss+xml'});
  res.render('rss.xml', {
    Christmas: Christmas,
    dateFormat: dateFormat
  });
};


/** configuration **/

var express = require('express')
  , http = require('http')
  , path = require('path')
  , dateFormat = require('dateformat')
  , Christmas = require("./public/christmas");
require('date-utils'); // date helpers

var app = express();

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