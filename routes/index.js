var express = require('express');
var router = express.Router();
var path= require("path");
var dataInput = require('./routes/bike_data');
var csv = require("fast-csv");

/* GET home page. */
router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
 res.sendFile(path.join(__dirname,'..','views/login.html'))
});
/*router.post('/push_data', function(req,res,next){
    console.log(req.body)
    res.send("text")
});*/

router.get('/datahook', function(req, res, next) {
	data = req.query

	//create datastream
	csv
		.fromString(data, {headers: false})
		.on("data", function(data){

			//write datastream to bikedata
			csv
				.writeToPath("./data/bikedata.csv", data, {headers: false})
				.on("finish", function(){
					console.log("data converted to csv file");
				});
		});

//run bike_data.js
//this saves file to database
eval(dataInput);


	//send data to mlab server
	//take data and save into collections
	//take all collections with same date and append them into a single collection (use unshift() method)
	//save the collection
	//make collection avalible to be searched

  res.render('index', { title: 'Express' });
});

router.get('/deltaride', function(req, res, next) {
 //res.render('index', { title: 'Express' });
 res.sendFile(path.join(__dirname,'..','views/dashboard1.html'))
});


module.exports = router;


