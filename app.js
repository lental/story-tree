
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , stylus = require('stylus')
  , config = require('./config/config')
  , index = require('./routes/index')
  , story = require('./routes/story');

var app = express();


// all environments
app.locals.basedir = "/Users/len/repos/story-tree/"
app.set('port', process.env.PORT || 3100);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser(config.session.secretKey));
app.use(express.session());
app.use(express.compress());
app.use(express.methodOverride());

//Remove Trailing Slashes
app.use(function(req, res, next) {
  if(req.url.substr(-1) == '/' && req.url.length > 1) {
    res.redirect(301, req.url.slice(0, -1));
  } else {
    next();
  }
});

app.use(app.router);
app.use(stylus.middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 4320000000 } ));

var googleapis = require('googleapis');

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

Date.prototype.toLocaleDateString = function () {
  return (this.getMonth() + 1) + "/" + this.getDate() + "/" + this.getFullYear();
};

Date.prototype.toLocaleTimeString = function () {
  var d = new Date();
  var hour = this.getHours();
  var min = this.getMinutes();
  var sec = this.getSeconds();
  var half = "AM";
  if (hour > 12) {
     var half = "PM"
     hour -= 12;
  } else if (hour === 0) {
     hour = 12;
  }
  return hour + ":" + min + ":" + sec + " " + half;
};

app.get('/', index.index);
app.get('/story/:id', story.storyById);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
