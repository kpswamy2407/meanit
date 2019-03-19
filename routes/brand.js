var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator/check');
var brandController=require('../controllers').Brand;
router.post('/create',[
  check('name').isString().isLength({min:1}),
  check('code').isString().isLength({min:1}),
  ],(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      var errorMessages=[];
      errors.array().forEach(error=>{
        errorMessages.push(error.msg);
      });
      return res.status(422).json({ errors: errorMessages,status:201 });
    }
    brandController.create(req,res)
});
router.post('/update/:id',brandController.update);
router.get('/delete/:id',brandController.delete);
router.get('/get/:id',brandController.getBrand);
router.get('/getall',brandController.getAll);

module.exports = router;
