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
			console.log("Insertion completed successfully...");
		});

}