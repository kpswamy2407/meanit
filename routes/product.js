var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator/check');
var productController=require('../controllers').Product;
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
    productController.create(req,res)
});
router.post('/update/:id',productController.update);
router.get('/delete/:id',productController.delete);
router.get('/get/:id',productController.getProduct);
router.get('/getall',productController.getAll);

module.exports = router;
