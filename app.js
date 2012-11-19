/* main route */

var index = function(req, res) {
  res.render('index');
};



var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.engine('.html', require('ejs').__express);
  app.set('views', __dirname);
  app.set('port', process.env.PORT || 3000);
  app.set('view engine', 'html');
  app.use(express.favicon(__dirname + '/public/favicon.ico'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', index);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
