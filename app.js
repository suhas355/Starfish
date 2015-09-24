var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/login');
var process = require('./routes/login');
var users = require('./routes/users');
var main = require('./routes/main');
var session = require('express-session');

var mongoose = require('mongoose');

/**********db related infos***/

var db = require('./model/dbconnection');
var dbName = 'students';
var connectionString = 'mongodb://localhost:27017/' + dbName;
 
mongoose.connect(connectionString);
mongoose.connection.on('open', function (ref) {
    console.log('Connected to mongo server.');

    /*mongoose.connection.db.dropCollection('studentinfos',function(err,res){
    	console.log('Collection dropped');
    });
    mongoose.connection.db.dropCollection('questioninfos',function(err,res){
    	console.log('Collection dropped');
    });
    mongoose.connection.db.dropCollection('scoreinfos',function(err,res){
    	console.log('Collection dropped');
    });*/
    //trying to get collection names
    mongoose.connection.db.collectionNames(function (err, names) {
        var hasStud = false;
        var hasQues = false;
        var hasScore = false;
       	for(var coll in names){
       		if(names[coll]['name'] == 'studentinfos')
       			hasStud = true;
       		else if(names[coll]['name'] == 'questioninfos')
       			hasQues = true;
       		else if(names[coll]['name'] == 'scoreinfos')
       			hasScore = true;
       	}
       	console.log(hasStud);
        if(hasStud == false){
        	db.insertstudentsinfo();
        }
        if(hasQues == false){
        	db.insertquestioninfo();
        }
        if(hasScore == false){
        	db.insertscoreinfo();
        }
    });
})
var app = express();
var http = require('http');
var server = http.createServer(app);

//session

var crypto = require('crypto');
module.exports = genuuid;

function genuuid(callback) {
  if (typeof(callback) !== 'function') {
    return uuidFromBytes(crypto.randomBytes(16));
  }

  crypto.randomBytes(16, function(err, rnd) {
    if (err) return callback(err);
    callback(null, uuidFromBytes(rnd));
  });
}

function uuidFromBytes(rnd) {
  rnd[6] = (rnd[6] & 0x0f) | 0x40;
  rnd[8] = (rnd[8] & 0x3f) | 0x80;
  rnd = rnd.toString('hex').match(/(.{8})(.{4})(.{4})(.{4})(.{12})/);
  rnd.shift();
  return rnd.join('-');
}



app.use(session({
  genid: function(req) {
    return genuuid() // use UUIDs for session IDs 
  },
  secret: 'cse505',
  resave: true,
  saveUninitialized: true/*,
  cookie: { secure: true }*/
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//app.use('/login', routes);
app.use('/users', users);
app.use('/main',main);

app.get('/',function(req,res){
      res.redirect('/login');
});

app.get('/login',function(req,res){
  res.sendFile('login.html', { root: path.join(__dirname, './views') });
});

app.post('/login/process',function(req,res){
  console.log("handling here in app");
  //console.log('coming here' +req.body.username);
  uname = req.body.username;
  pass = req.body.password;
  var sess = req.session;
  var got = false;
  db.isUserPresent(uname,pass,function(status){
    console.log("app: status in process is: "+status);

    if(status==true){
      //console.log('Correct username'+un +" " +uname);
      sess.username = uname;
      console.log("app:valid:"+sess.username);
      //res.header("Access-Control-Allow-Origin", "*");
      //res.send({'data': req.body.username+' awesome'});
      res.sendFile('main.html', { root: path.join(__dirname, './views') });
          

    }else{
      sess.username = undefined;
      //sess.end();
      console.log('app:destroying session');
      req.session.destroy();
      res.redirect('/');
    }

  });
  while(got == false){
    setTimeout(function() {
    },1000);
  }
  
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log(req.url);
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


/*http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'text/plain'});
	res.end();
	console.log('Listening');
}).listen(3000);*/

app.listen(3000,function(){
  
});
console.log("Listening..");



module.exports = app;
