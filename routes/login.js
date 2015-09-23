
var exports = module.exports = {};
var express = require('express');
var path = require('path');

var router = express.Router();

router.route('/').get(function(req,res){

  res.sendFile('login.html', { root: path.join(__dirname, '../views') });
});




router.route('/process').post(function(req,res){
	//console.log(req);
	console.log('coming here' +req.body.username);
	uname = req.body.username;
	pass = req.body.password;
	var sess = req.session;


	if(uname == 'shwetha'){
		console.log('Correct username');
		sess.username = uname;
		res.contentType('application/json');
		res.json('{"success" : "Move to main page", "status" : 200}');
	}else{
		console.log('user name is not proper')
		sess.username = undefined;
		sess.end();
		res.contentType('application/json');
  		res.json('{"error" : "Redirect to login", "status" : 500}');
	}
});

router.route('/').post(function(req,res){
  console.log('caught post req');
  var sess = req.session;
  console.log(sess.username);
  if(sess.username){
  	res.contentType('application/json');
  	//res.setType('GET');
  	res.redirect('/main');
	//res.json('{"success" : "Move to main page from post", "status" : 200}');
  }else{
  	res.contentType('application/json');
  	//res.setType('GET');
  	res.redirect('/');
  	//res.json('{"error" : "Redirect to login from post", "status" : 500}');
  }
  
});

module.exports = router;