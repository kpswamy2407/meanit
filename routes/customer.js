var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator/check');
var customerController=require('../controllers').Customer;
router.post('/create',[
  check('name').isString().isLength({min:1}),
  ],(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      var errorMessages=[];
      errors.array().forEach(error=>{
        errorMessages.push(error.msg);
      });
      return res.status(422).json({ errors: errorMessages,status:201 });
    }
    customerController.create(req,res)
});
router.post('/update/:id',customerController.update);
router.get('/delete/:id',customerController.delete);
router.get('/get/:id',customerController.getCustomer);
router.get('/getall',customerController.getAll);

module.exports = router;
