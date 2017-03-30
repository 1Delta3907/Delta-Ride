var express = require('express');
var router = express.Router();
var path= require("path");
var csv = require("fast-csv");
var fs = require('fs');
var mongoose = require('mongoose');

var dataSchema = new mongoose.Schema({
  "trip_number": Number,
  "time": Array,
  "date": Date
});

var newDataSchema = new mongoose.Schema({
	"trip_number": Number,
  	"time": Array,
  	"date": Date
}, { collection: 'Bike_Data'});

var bike_data_set = mongoose.model('Bike Data', dataSchema);
var Tbike_data_set = mongoose.model('Tbike_data_set', newDataSchema);

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

		endTrans = req.query.data.split(",");
		numPackets = endTrans[1];
		combinedData = [];

		for (i =1; i <= numPackets; i++){

			bikedata.findOne({trip_number: i}, function (err, i){
				if (err){
					console.log(err);
				}
				console.log(bikedata); //for testing
			});

			for (i = 0; i < bikedata.length; i++){
				combinedData.push(bikedata[i]);
			}
		}

		console.log(combinedData); //for testing

		var recordTotal = new Tbike_data_set({trip_number : 1, time: combinedData, date: new Date().toISOString()})
		recordTotal.save(function(err, data){
			if (err){
				console.log(err);
			}
		});

		bikedata.remove({});;
		//remove all documents from bike datas collection

		
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