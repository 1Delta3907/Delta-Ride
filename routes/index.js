var express = require('express');
var router = express.Router();
var path= require("path");
var csv = require("fast-csv");
var fs = require('fs');
var mongoose = require('mongoose');
var combinedData = [];

var dataSchema = new mongoose.Schema({
  "coreId": String,
  "time": Array,
  "date": Date,
  "_id" : {type: String, select: false}
}, { collection: 'bike_datas'});

var newDataSchema = new mongoose.Schema({
  	"time": Array,
  	"date": Date,
  	"_id" : {type: String, select: false}
}, { collection: 'Bike_Data'});

var bike_data_set = mongoose.model('Bike Data', dataSchema);
var Tbike_data_set = mongoose.model('Tbike_data_set', newDataSchema);

/* GET home page. */
router.get('/', function(req, res, next) {

 res.sendFile(path.join(__dirname,'..','views/login.html'))
});
/*router.post('/push_data', function(req,res,next){
    console.log(req.body)
    res.send("text")
});*/

router.get('/datahook', function(req, res, next) {
	
	console.log(req.query);
	data = req.query.data.split(",");
	if(data[0]== 'End'){

		console.log(data);
		numPackets = data[1];
		
		exitNum = (parseInt(data[1])) + 1;


		bike_data_set.find({}, 'time', function(err, bikedata){
			if (err){
					console.log(err);
			}
			console.log("bike data is " + bikedata);
			
			
			//console.log("bike data.time is " + bikedata.time);
			localvariable = bikedata;
			console.log("localvariable is " + localvariable);
			//localvariable = localvariable.time.split(",");
			var newArray = localvariable.map(function(element){
				return element.time;
			});
			console.log("new localvariable is " + newArray);
			//stringifiedArray = newArray.toString();
			//console.log(stringifiedArray);
				for (j = 0; j < newArray.length; j++){
					//console.log(localvariable[j]);
					combinedData.push(newArray[j]);
				}
			console.log("combined data is equal to " + combinedData);

			console.log("saving data");
					var recordTotal = new Tbike_data_set({trip_number : 1, time: combinedData, date: new Date().toISOString(), _id: Math.random()})
					recordTotal.save(function(err, data){
						if (err){
							console.log(err);
						}
					}); 

			//if (combinedData == newArray) {
				/*console.log("deleting data");
				bikedata.remove({}, function (err){
					if (err){
						console.log(err);
					} else{
						console.log("data deleted");
					}
				});*/
			/*mongoose.connection.db.dropCollection('bike datas', function(err, result) {
				if (err){
					console.log(err);
				}
			});
			mongoose.connection.db.dropDatabase(function(err, result) {
				if (err){
					console.log(err);
				}
			});*/
		//}	
		});

		
		/*
		for (i =1; i <= numPackets; i++){
			console.log('iteration of forloop : ' + i)
			

			bike_data_set.findOne({coreId : '390022001447343338333633'}, function (err, bikedata){
				if (err){
					console.log(err);
				}
				console.log(bikedata); //for testing
				bike_data_set.remove(bikedata, function(err){
					if(!err){
						console.log("data deleted");
						localvariable = bikedata.time;
						console.log(localvariable);
						for (j = 0; j < localvariable.length; j++){
							combinedData.push(localvariable[j]);
							console.log(localvariable[j]);
						}	
					}
				});
				//tripVariable = bikedata.trip_number;
				
				
			

			console.log("combined data is equal to " + combinedData);
			console.log(i);
			console.log(exitNum);
			if (i == exitNum){

				console.log("saving data");
					var recordTotal = new Tbike_data_set({time: combinedData, date: new Date().toISOString()})
					recordTotal.save(function(err, data){
						if (err){
							console.log(err);
						}
					});
			}
			});	
		}
		
		*/
		
		//remove all documents from bike datas collection

		
	} else {
	
	bikedata = data;	
	coreid = req.query.coreid;
	//bikedata.shift();
	console.log('data coming');
	//console.log(bikedata);
	//console.log(data_num);

	var record = new bike_data_set({coreId: coreid, time:bikedata, date: new Date().toISOString(), _id: Math.random()});
	record.save(function(err, data){
		if (err){
			console.log(err);
		}
	});

	}

 res.sendFile(path.join(__dirname,'..','views/dashboard1.html'));
});

router.get('/deltaride', function(req, res, next) {
	//lres.sendFile(path.join(__dirname,'..','views/dashboard1.html'));
	Tbike_data_set.find({}, 'time', function (err, localData){
		if (err){
			console.log(err);
		}
		console.log(localData);
		var newArray2 = localData.map(function(element){
				return element.time;
		});
		console.log(newArray2);
		
		// var valueWanted = ",";
		// for(k = newArray2.length; k>=0; k--){
		// 	if(newArray2[k] === valueWanted){
		// 		newArray2.splice(k, 1);
		// 	}
		// }
		//newArray3 = localData.time.split(",,,");
		//console.log(newArray2);
	});
res.sendFile(path.join(__dirname,'..','views/dashboard1.html'));
 //res.render('index', { data : JSON.stringify(newArray2) });
});


module.exports = router;