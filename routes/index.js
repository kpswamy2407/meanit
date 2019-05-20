var express = require('express');
var router = express.Router();
const authHelper=require('../helpers').auth;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/random-number',(req,res)=>{
	authHelper.getRandomString(3).then(randomString=>{
		console.log(randomString);
	 	if(randomString){
	 		return res.json({random:randomString,status:200});
	 	}
	 	else{
	 		return res.json({random:'657',status:201});
	 	}
	 })
});

module.exports = router;
