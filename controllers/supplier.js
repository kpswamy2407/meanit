const Supplier=require('../models').suppliers;
const Op=require('sequelize').Op;
module.exports = {
    create(req, res) {
      return Supplier
      .create({
        name: req.body.name,
        phone: req.body.phone,
        code: req.body.code,
        address:req.body.address
      })
      .then(supplier => res.status(200).json({supplier:supplier,message:"Supplier created successfully!",status:200}))
      .catch(error => res.status(201).json({error:error.message,status:201}));
      
    },
    update(req,res){
      return Supplier.
        update({
            name:req.body.name,
            phone:req.body.phone,
            code: req.body.code,
            address:req.body.address,
            isActive:req.body.isActive
        },
        {
          where:{
            id:{
              [Op.eq]:req.params.id
            }
        }
      }).then(result=>res.status(200).json({message:"Supplier updated successfully!",status:200}))
      .catch(error => res.status(201).json({error:error.message,status:201}));
    },
    delete(req,res){
      return Supplier.destroy({
        where:{
          id:{
            [Op.eq]:req.params.id
          }
        }
      }).then(result=>res.status(200).json({message:"Supplier deleted successfully!",status:200}))
      .catch(error => res.status(201).json({error:error.message,status:201}));
    },
    getAll(req,res){
      return Supplier.findAll({
        attributes: ['id','name','code','address','phone','isActive']
      }).then(result=>res.status(200).json({suppliers:result,message:"Size updated successfully!",status:200}))
      .catch(error => res.status(201).json({error:error.message,status:201}));
    },
    getSupplier(req,res){
      return Supplier.findOne({
        where:{
          id:{
            [Op.eq]:req.params.id
          }
        }
      }).then(result=>res.status(200).json({supplier:result,status:200}))
      .catch(error => res.status(201).json({error:error.message,status:201}));
    }
};