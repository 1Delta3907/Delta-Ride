//code to save a csv file to database

var mongoose = require('mongoose');
var csv = require("fast-csv");

var dataSchema = new mongoose.Schema({
  "matrixNumber": Number,
  "time": Number
});

mongoose.model('bike_data_set', dataSchema);
var bike_data_set = mongoose.model('bike_data_set');

/*//connect to mongo database
var connectionURL = 'mongodb://admin:admin@ds113630.mlab.com:13630/delta_ride';
var db = mongoose.connection;
mongoose.connect(connectionURL)

//if we have any errors, show them in console
db.on('error', function (err) {
    console.log('connected ' + err.stack);
});
 
//when we disconnect from mongo, show this in console
db.on('disconnected', function(){
    console.log('disconnected');
});
 
//when we connect to mongo, show this in console
db.on('connected',function(){
    console.log('connected');
*/

csv.fromPath("data/bikedata.csv", {headers : true})
	csv.on("data", function (data){
		var record = new bike_data_set(data);
		record.save( function(err, user){
			if (!err){
				console.log('Saved data set');
			}
			else {
				console.log(err);
			}
		}
	});
});
	.on("end", function(){
		console.log("done");
	});


//end connection to mongo in case something goes wrong

process.on('SIGINT', function() {
 
    mongoose.connection.close(function () {
 
        process.exit(0);
 
    });
 
});
