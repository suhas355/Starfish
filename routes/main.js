
var exports = module.exports = {};
var express = require('express');
var path = require('path');

var router = express.Router();

router.route('/').get(function(req,res){
	var sess = req.session;
	if(sess.username){
		res.sendFile('main.html', { root: path.join(__dirname, '../views') });
	}else{
		res.status(500).redirect('/');
	}
  	
});

module.exports = router;