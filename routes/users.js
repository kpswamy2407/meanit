var express = require('express');
var router = express.Router();
const userController=require('../controllers').User
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/login',userController.create)

module.exports = router;
