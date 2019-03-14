var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator/check');
var sizeController=require('../controllers').Size;
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
  sizeController.create(req,res)
});
router.post('/update/:id',sizeController.update);
router.get('/delete/:id',sizeController.delete);
router.get('/get/:id',sizeController.getSize);
router.get('/getall',sizeController.getAll);

module.exports = router;
