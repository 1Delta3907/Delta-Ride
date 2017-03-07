var express = require('express');
var router = express.Router();
var path= require("path");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/datahook', function(req, res, next) {
	data = req.query
  res.render('index', { title: 'Express' });
});

router.get('/deltaride', function(req, res, next) {
 //res.render('index', { title: 'Express' });
 res.sendFile(path.join(__dirname,'..','views/dashboard1.html'))
});

module.exports = router;
