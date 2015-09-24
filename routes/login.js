
var exports = module.exports = {};
var express = require('express');
var path = require('path');

var db = require('../model/dbconnection');
var dbName = 'students';
var mongoose = require('mongoose');

var router = express.Router();

router.route('/').get(function(req,res){

  res.sendFile('login.html', { root: path.join(__dirname, '../views') });
});


console.log("yeah");

router.route('/process').post(function(req,res){
	console.log("handling here");
	//console.log('coming here' +req.body.username);
	uname = req.body.username;
	pass = req.body.password;
	var sess = req.session;
	db.isUserPresent(uname,pass,function(status){
		console.log("status in process is: "+status);
		if(status==true){
			//console.log('Correct username'+un +" " +uname);
			sess.username = uname;
			console.log("valid:"+sess.username);
			//res.header("Access-Control-Allow-Origin", "*");
			//res.send({'data': req.body.username+' awesome'});
			res.redirect('/main');
					

		}else{
			sess.username = undefined;
			//sess.end();
			console.log('destroying session');
			//req.session.destroy();
			res.redirect('/');
		}

	});
	
	
});

/*router.route('/process').post(function(req,res){
	console.log("handling here");
	//console.log('coming here' +req.body.username);
	uname = req.body.username;
	pass = req.body.password;
	var sess = req.session;

	res.json({success:'good',status:200});

});*/


router.route('/').post(function(req,res){
  console.log('caught post req');
  setTimeout(function() {
    console.log('sleeping');
    var sess = req.session;
	  console.log(sess.username);
	  if(sess.username){
	  	//res.contentType('application/json');
	  	//res.setType('GET');
	  	res.redirect('/main');
		//res.json('{"success" : "Move to main page from post", "status" : 200}');
	  }else{
	  	res.contentType('application/json');
	  	//res.setType('GET');
	  	res.redirect('/');
	  	//res.json('{"error" : "Redirect to login from post", "status" : 500}');
	  }
  
	}, 1000);
  
});

module.exports = router;