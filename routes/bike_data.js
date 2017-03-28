//code to save a csv file to database


var csv = require('fast-csv');

var dataSchema = new mongoose.Schema({
  "trip number": Number,
  "time": Array,
  "date": Date
});


var bike_data_set = mongoose.model('Bike Data', dataSchema);
module.exports= bike_data_set;
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
