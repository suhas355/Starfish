var exports = module.exports = {};

var dbschema = require('./dbschema');
var csv = require("fast-csv");
var path = require('path');


exports.insertstudentsinfo = function(){
	console.log('Inserting students db value from input.csv...');
	csv.fromPath(path.join(__dirname,'./csv/students.csv'))
		.on("data",	function(data){
			var jsonObj = {};
			jsonObj['userid']=data[0];
			jsonObj['password']=data[1];
			console.log(data[0] + " " + data[1]);
			var stud = new dbschema.studentInfo(jsonObj);
			stud.save(function(err){
				if(err){
					console.log("error in saving student info in db");
				}
			});
		})
		.on("end", function(){
			console.log("Insertion of student info completed successfully...");
		});

}

exports.insertquestioninfo = function(){
	console.log('Inserting questions db value from questions.csv...');
	csv.fromPath(path.join(__dirname,'./csv/questions.csv'))
		.on("data",	function(data){
			var jsonObj = {};
			jsonObj['qno']=data[0];
			jsonObj['maxscore'] = data[1];
			//jsonObj['question']=data[2];
			
			console.log(data[0] + " " + data[1]);// + " " + data[2]);
			var ques = new dbschema.questionInfo(jsonObj);
			ques.save(function(err){
				if(err){
					console.log("error in saving question info in db");
				}
			});
		})
		.on("end", function(){
			console.log("Insertion of question info completed successfully...");
		});

}

exports.insertscoreinfo = function(){
	console.log('Inserting score db value from score.csv...');
	csv.fromPath(path.join(__dirname,'./csv/score.csv'))
		.on("data",	function(data){
			var jsonObj = {};
			jsonObj['userid']=data[0];
			jsonObj['qno'] = data[1];
			//jsonObj['question']=data[2];
			
			console.log(data[0] + " " + data[1]);// + " " + data[2]);
			var score = new dbschema.scoreInfo(jsonObj);
			score.save(function(err){
				if(err){
					console.log("error in saving score info in db");
				}
			});
		})
		.on("end", function(){
			console.log("Insertion of score info completed successfully...");
		});

}