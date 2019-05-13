var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator/check');
const userController=require('../controllers').User
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/register',[
  check("username").isLength({min:3}).withMessage("username is required and must have atleast 3 letters"),
  check("password").isLength({min:5}).withMessage("password is required and must have atleast 5 letters"),
  check("email").isEmail().withMessage("Valid email address is required"),
  check("userType").isInt().withMessage("user type is must be number")
],
  (req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      var errorMessages=[];
      errors.array().forEach(error=>{
        errorMessages.push(error.msg);
      });
      return res.status(422).json({ errors: errorMessages,status:201 });
    }
    userController.create(req,res,next);
});
router.post('/login',[
  check("username").isLength({min:3}).withMessage("username is required"),
  check("password").isLength({min:5}).withMessage("password is required")
],(req,res,next)=>{
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      var errorMessages=[];
      errors.array().forEach(error=>{
        errorMessages.push(error.msg);
      });
      return res.status(201).json({ errors: errorMessages,status:201 });
    }
    userController.login(req,res,next)
});

module.exports = router;
