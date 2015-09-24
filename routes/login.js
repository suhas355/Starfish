
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

/*var studMap = {};
exports.fillStuds = function(){
	csv.fromPath(path.join(__dirname,'./csv/students.csv'))
		.on("data",	function(data){
			studMap[data[0]] = data[1];
			
			
		})
		.on("end", function(){
			console.log("Insertion of student info completed successfully...");
	});
}

exports.studMap = studMap;

router.route('/process').post(function(req,res){
	console.log("handling here");
	//console.log('coming here' +req.body.username);
	uname = req.body.username;
	pass = req.body.password;
	var sess = req.session;
	if(studMap[uname]==undefined || studMap[uname] != pass){
		res.redirect('/login');
	}else{
		res.redirect('/main');
	}
	
});

/*router.route('/process').post(function(req,res){
	console.log("handling here");
	//console.log('coming here' +req.body.username);
	uname = req.body.username;
	pass = req.body.password;
	var sess = req.session;

	res.json({success:'good',status:200});

});


router.route('/').post(function(req,res){
  console.log('caught post req');
  
});*/

module.exports = router;