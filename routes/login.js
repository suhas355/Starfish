
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


router.route('/process').post(function(req,res){
	console.log("handling here");
	//console.log('coming here' +req.body.username);
	uname = req.body.username;
	pass = req.body.password;
	var sess = req.session;
	db.isUserPresent(uname,pass,function(status){
		console.log("status in process is: "+status);
		if(status==true){
			sess.username = uname;
			console.log("valid:"+sess.username);
			var response = {
			    status  : 200,
			    success : 'Updated Successfully'
			}
			res.end(JSON.stringify(response));
					

		}else{
			sess.username = undefined;
			console.log('destroying session');
			req.session.destroy();
			var response = {
			    status  : 401,
			    error : 'Invalid credentials'
			}
			res.end(JSON.stringify(response));
		}

	});
	
});

module.exports = router;