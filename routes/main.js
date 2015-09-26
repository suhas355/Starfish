
var exports = module.exports = {};
var express = require('express');
var path = require('path');
var multer  = require('multer');
var done=false;

var db = require('../model/dbconnection');
var mongoose = require('mongoose');


var router = express.Router();

var userid=undefined;

router.route('/').get(function(req,res){
	var sess = req.session;
	userid=sess.username;
	console.log('Session variable ' + sess.username);
	if(sess.username){
		console.log('Success!!');
		res.sendFile('main.html', { root: path.join(__dirname, '../views') });
	}else{
		res.status(500).redirect('/');
	}
  	
});

router.route('/evaluate').post(function(req,res){
	var sess = req.session;
	userid=sess.username;
	qno=req.body.qno;
	fname = req.body.fname;
	var exec = require('child_process').exec,child;
	console.log("evaluator: qno- " + qno + " fname- " + fname + "userid - " + userid);
	//TODO: Modify this to run based on script name
	var execpath = path.join(__dirname,'./data/q'+qno+'eval.sh ' + './uploads/'+userid+'/'+userid+'_'+fname + ' ' + userid);
	child = exec(execpath ,
	  function (error, stdout, stderr) {
	  		if(stderr !=null){
	  			console.log('Std error :: ' + stderr);
	  		}
    		if (error !== null) {
      			console.log('exec error: ' + error);
    		}
    		
    		db.updateScore(userid,qno,stdout,function(err,resp){
    			if(err){
    				var data = '{ "res" : "error","score":'+0+'}';
				    res.contentType('json');
				    res.json(data);
    			}
    		});
   			console.log('Score: ' + stdout);
    		var data = '{ "res" : "sucess","score":'+stdout+'}';
		    res.contentType('json');
		    res.json(data);
    		
    		
	  });
});

exports.userid = userid;
module.exports = router;