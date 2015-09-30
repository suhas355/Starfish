
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
		res.status(500).redirect('/login');
	}
  	
});

router.route('/getqscore').post(function(req,res){
	var sess = req.session;
	userid=sess.username;
	if(userid == undefined){
		console.log("Undefined caught!! getqscore");
		res.status(500).redirect('/login');
	}else{
		db.getScore(userid,function(status,data){
			if(status=="error"){
				console.log('Error score has been fetched: '+userid);
				var data = '{ "res" : "error","score":'+0+'}';
			    res.contentType('json');
			    res.json(data);
			}else{
				console.log('proper score has been fetched: '+userid);
				res.contentType('json');
			    res.json(data);
			}	
		});
	}
});	

router.route('/gettotal').post(function(req,res){
	var sess = req.session;
	userid=sess.username;
	if(userid == undefined){
		console.log("Undefined caught!! gettotal");
		res.status(500).redirect('/login');
	}else{
		db.getTotalScore(userid,function(status,resp){
			console.log("return:"+status+" ,,, "+resp);
		    if(status=="error"){
		    	var data = '{ "res" : "error","score":'+0+'}';
			    res.contentType('json');
			    res.json(data);
		    }else{
		    	var data = '{ "res" : "sucess","score":'+resp+'}';
			    res.contentType('json');
			    res.json(data);
		    }
		    	
		    });
	}
});

router.route('/evaluate').post(function(req,res){
	var sess = req.session;
	userid=sess.username;
	if(userid == undefined){
		console.log("Undefined caught!! in evaluate");
		res.status(500).redirect('/login');
	}else{
		qno=req.body.qno;
		fname = req.body.fname;
		var exec = require('child_process').exec,child;
		console.log("evaluator: qno- " + qno + " fname- " + fname + "userid - " + userid);
		//TODO: Modify this to run based on script name
		var execpath = path.join(__dirname,'../uploads/'+userid+'/'+qno+'/q'+qno+'eval.sh ' + './uploads/'+userid+'/'+userid+'_'+fname + ' ' + userid);
		console.log("path is:"+execpath);
		child = exec(execpath ,
			{timeout:9000},
		  function (error, stdout, stderr) {
		  		console.log("STDOUT: "+stdout);
		  		if(stderr !=null){
		  			console.log('Std error :: ' + stderr);
		  		}
	    		if (error !== null) {
	      			console.log('exec error: ' + error);
	      			var data = '{ "res" : "error","score":"WA/TLE"}';
					res.contentType('json');
					res.json(data);
	    		}else{
	    			if(isNaN(stdout) || stdout == ''){
		   				stdout=0;
		   			}
		    		db.updateScore(userid,qno,stdout,function(err,resp){
		    			if(err=='Error'){
		    				var data = '{ "res" : "error","score":'+0+'}';
						    res.contentType('json');
						    res.json(data);
		    			}
		    		});
		   			console.log('Score: ' + stdout);
		    		var data = '{ "res" : "sucess","score":'+stdout+'}';
				    res.contentType('json');
				    res.json(data);
	    		}
	    		
		  });
	}
});

exports.userid = userid;
module.exports = router;