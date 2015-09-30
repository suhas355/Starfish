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

exports.getScore = function(userid,callback){
	var data = [];
	var where = {"userid":userid};
	
	dbschema.scoreInfo.find(where,function(err,scores){
		if(err){
			console.log('Error finding scores of '+userid);
			callback("error",data);
		}else{
			var len = scores.length;
			console.log("total score list len: "+len);
			for(i=0;i<len;i++){
				console.log(scores[i]['qno']+" ----"+scores[i]['score']);
				data.push({ "qno":scores[i]['qno'],"score":scores[i]['score']});
			}
			console.log("sending score list of :"+userid);
			callback("success",data);
		}
	});
}

exports.getMaxScores = function(callback){
	var data = [];
	dbschema.questionInfo.find(function(err,qinfo){
		if(err){
			console.log('Error finding maxscores');
			callback("error",data);
		}else{
			var len = qinfo.length;
			for(i=0;i<len;i++){
				data.push(qinfo[i]['maxscore']);
			}
			console.log("sending maxscore list:");
			callback("success",data);
		}
	});
}

exports.updateTotal = function(userid){
	var where = {"userid":userid};
	exports.getMaxScores(function(status,data){

	
	dbschema.scoreInfo.find(where,function(err,stud){
		//console.log('Here ' +stud);
		if(err){
			console.log('Error finding student');
			callback("Error","Find error");
		}else{
			var len = stud.length;
			var total = 0;
			for(i=0;i<len;i++){
				total += (stud[i]['score']*data[i]/100.0);
			}
			console.log('Total Score: '+ total);
			dbschema.studentInfo.update(where,{'score':total},{upsert:true},
				function(err,res){
					if(err){
						console.log('Error in updating total score');
						
					}
					else{
						console.log('Updated total score to '+total+ ' of userid ' + userid);
					}
				});

		}
	});
	});
}

exports.getTotalScore = function(userid,callback){
	var where = { "userid":userid };
	dbschema.studentInfo.findOne(where,function(err,stud){
	if(err){
			console.log('Error finding student');
			callback("error","-1");
		}else{
			var sco = stud['score'];
			console.log('getting total score of student: '+userid +"  total:"+sco);
			callback("success",sco);
		}
	});

}

exports.updateScore = function(userid,qno,score,callback){
	var where = {"userid":userid,"qno":qno};

	console.log("update Score userid:" +userid);
	if(userid == undefined){
		console.log("caught undefined, throwing back from dbconnection.js");
		callback("Error","Update error");
	}else{

		dbschema.scoreInfo.findOne(where,function(err,stud){
			console.log('Here ' +stud);

			if(err || stud==null) {
				console.log('Error finding student');
				callback("Error","Find error");
			}else{
				var sco = stud['score'];
				console.log('Cur score ' + score + ' db score ' + sco);
				if(sco < score){
					dbschema.scoreInfo.update(where,{"score":score},{upsert:true},
					function(err,result){
						if(err){
							console.log('Error in updating score');
							callback("Error","Update Error");
						}
						else{
							console.log('Updated score to '+score+ ' of userid ' + userid);
							exports.updateTotal(userid);
						}
					});
				}else{
					console.log('Update is not required '+ userid + ' qno: '+ qno + ' score ' + score ) ;
				}
			}

		});
	}
	
}


exports.isUserPresent = function(userid,passwd,callback){
	
	console.log("request: "+userid +" "+passwd);

	var query= dbschema.studentInfo.find().where('userid').equals(userid).where('password').equals(passwd);
	query.exec(function(err,studInfo){
		console.log("test: "+studInfo.length);
		if(err){
			console.log("wrong login credentials");
			callback(false);
		}else if(studInfo.length==1){
			
			console.log("login credentials"+studInfo);
			callback(true);
		}else{
			callback(false);		
		}
	});
}

