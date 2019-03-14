var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator/check');
var categoryController=require('../controllers').Category;
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
    categoryController.create(req,res)
});
router.post('/update/:id',categoryController.update);
router.get('/delete/:id',categoryController.delete);
router.get('/get/:id',categoryController.getCategory);
router.get('/getall',categoryController.getAll);

module.exports = router;
