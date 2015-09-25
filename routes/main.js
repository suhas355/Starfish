
var exports = module.exports = {};
var express = require('express');
var path = require('path');
var multer  = require('multer');
var done=false;

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
/*
router.use(multer({ dest: '../uploads/',
 rename: function (fieldname, filename) {
 	console.log("renaming "+filename + " to " +username+"_"+filename);
    return username+"_"+filename;
  },
onFileUploadStart: function (file) {
  console.log(file.originalname + ' is starting ...')
},
onFileUploadComplete: function (file) {
  console.log(file.fieldname + ' uploaded to  ' + file.path)
  done=true;
}
}));

/*Handling routes.*/

/*router.route('/upload').post(function(req,res){
	userid=req.session.username;
	console.log("session id: "+ userid);
  if(done==true){
    console.log(req.files);
    var data = '{ "res" : "sucess"}';
    res.contentType('json');
    res.json(data);
   
  }else{
    console.log("no file uploaded");
      res.send("error");
  }

});*/

exports.userid = userid;
module.exports = router;