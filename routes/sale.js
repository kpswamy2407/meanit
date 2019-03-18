var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator/check');
var saleController=require('../controllers').Sale;
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
    saleController.create(req,res)
});
router.post('/update/:id',saleController.update);
router.get('/delete/:id',saleController.delete);
router.get('/get/:id',saleController.getSale);
router.get('/getall',saleController.getAll);

module.exports = router;
