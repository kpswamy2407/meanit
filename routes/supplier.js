var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator/check');
var supplierController=require('../controllers').Supplier;
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
    supplierController.create(req,res)
});
router.post('/update/:id',supplierController.update);
router.get('/delete/:id',supplierController.delete);
router.get('/get/:id',supplierController.getSupplier);
router.get('/getall',supplierController.getAll);

module.exports = router;
