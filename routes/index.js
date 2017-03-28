var express = require('express');
var router = express.Router();
var path= require("path");
var csv = require("fast-csv");
var fs = require('fs');
//var cTime = require('../public/Functions/calculateTime.js');
var cR = require('../public/Functions/calculateRotations.js');
var mongoose = require('mongoose');

var dataSchema = new mongoose.Schema({
  "trip_number": Number,
  "time": Array,
  "date": Date
});

var bike_data_set = mongoose.model('Bike Data', dataSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });++
 res.sendFile(path.join(__dirname,'..','views/login.html'))
});
/*router.post('/push_data', function(req,res,next){
    console.log(req.body)
    res.send("text")
});*/

router.get('/datahook', function(req, res, next) {
	
	if(req.query.data.indexOf('End')){

		//endTrans = req.query.data.split(",");
		//numPackets = endTrans[1];
		//look at the trip number -> packet number
		//combine each array of time values into single array
		// take first date for data set
		// make trip number 1
		// save data into Bike_Data
		// delete data from bike datas

		//bike data

	} else {
		
	bikedata = req.query.data.split(",");
	data_num = bikedata[0];
	coreid = req.query.coreid;
	bikedata.shift();
	console.log('data coming');
	console.log(bikedata);
	console.log(data_num);

	var record = new bike_data_set({trip_number: data_num, time:bikedata, date: new Date().toISOString()});
	record.save(function(err, data){
		if (err){
			console.log(err);
		}
	});

	}

 res.sendFile(path.join(__dirname,'..','views/index.html'));
});

router.get('/deltaride', function(req, res, next) {
 //res.render('index', { title: 'Express' });
res.sendFile(path.join(__dirname,'..','views/dashboard1.html'))
});


module.exports = router;