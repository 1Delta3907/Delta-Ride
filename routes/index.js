var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/push_data', function(req,res,next){
    console.log(req.body)
    res.send("text")
});

router.get('/datahook', function(req, res, next) {
	data = req.query
	console.log(data)
  res.render('index', { title: 'Express' });
});


module.exports = router;


