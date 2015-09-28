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
var csv = require("fast-csv");
var mongoose = require('mongoose');

var multer  = require('multer');
var upload= multer({dest : './uploads'});
var done=false;


var app = express();
var http = require('http');
var server = http.createServer(app);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



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

var studMap = {};
function fillStuds(){
  console.log('Filling student info');
  csv.fromPath(path.join(__dirname,'./model/csv/students.csv'))
    .on("data", function(data){
      studMap[data[0]] = data[1];
      
      
    })
    .on("end", function(){
      console.log("Insertion of student info completed successfully...");
  });
}


fillStuds();



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



app.use('/login', routes);
app.use('/users', users);
app.use('/main',main);

app.use(function(req,res,next){
  var userid=req.session.username;
  var handler=multer({ dest: './uploads/'+userid+'/',

   rename: function (fieldname, filename) {
    console.log("renaming "+filename + " to " +userid+"_"+filename);
      return userid+"_"+filename;
    },
  onFileUploadStart: function (file) {
    console.log(file.originalname + ' is starting ...')
  },
  onFileUploadComplete: function (file) {
    console.log(file.fieldname + ' uploaded to  ' + file.path)
    done=true;
  }
  });
  handler(req,res,next);
});

app.get('/',function(req,res){
      res.redirect('/login');
});



/*Handling routes.*/

app.post('/upload',function(req,res){
  userid=req.session.username;
  console.log("upload session id: "+ userid);
  console.log("req data: "+req.body);
  upload(req,res,function(err){
      if(err){
         console.log("no file uploaded");
         var data = '{ "res" : "error"}';
         res.contentType('json');
        res.json(data);
      }else{
        console.log("req files:"+req.files);
       var data = '{ "res" : "sucess"}';
       res.contentType('json');
       res.json(data);
      }
  });
  
 });

app.get('/logout',function(req,res){
  req.session.destroy();
  res.redirect('/login');

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


app.listen(3000,function(){
  
});
console.log("Listening..");



module.exports = app;
