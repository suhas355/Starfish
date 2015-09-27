var mongoose	=	require('mongoose');
var Schema		=	mongoose.Schema;


var studentSchema = new Schema({
	userid		: {type:String, required:true, unique:true},
	password	: {type:String, required:true},
	score		: {type:Number, default:0}  
});

var studentInfo = mongoose.model('studentInfo',studentSchema);

var scoreSchema = new Schema({
	userid		: {type:String, required:true},
	qno			: {type:String, required:true},
	score		: {type:Number, default:0}  
});

var scoreInfo = mongoose.model('scoreInfo',scoreSchema);

var questionSchema = new Schema({
	qno 		: {type:String, required:true, unique:true},
	question	: {type:String},
	maxscore	: {type:Number, default:0}  
});

var questionInfo = mongoose.model('questionInfo',questionSchema);


module.exports = {
	studentInfo	 : studentInfo,
	scoreInfo	 : scoreInfo,
	questionInfo : questionInfo	
};

