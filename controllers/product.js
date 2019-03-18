const Product=require('../models').products;
const Op=require('sequelize').Op;
module.exports = {
    create(req, res) {
      return Product
      .create({
        name: req.body.name,
      })
      .then(brand => res.status(200).json({brand:brand,message:"Product created successfully!",status:200}))
      .catch(error => res.status(201).json({error:error.message,status:201}));
      
    },
    update(req,res){
      return Product.
        update({
            name:req.body.name,
            isActive:req.body.isActive
        },
        {
          where:{
            id:{
              [Op.eq]:req.params.id
            }
        }
      }).then(result=>res.status(200).json({message:"Product updated successfully!",status:200}))
      .catch(error => res.status(201).json({error:error.message,status:201}));
    },
    delete(req,res){
      return Product.destroy({
        where:{
          id:{
            [Op.eq]:req.params.id
          }
        }
      }).then(result=>res.status(200).json({message:"Product deleted successfully!",status:200}))
      .catch(error => res.status(201).json({error:error.message,status:201}));
    },
    getAll(req,res){
      return Product.findAll({
        attributes: ['id','name','isActive']
      }).then(result=>res.status(200).json({products:result,message:"Product updated successfully!",status:200}))
      .catch(error => res.status(201).json({error:error.message,status:201}));
    },
    getProduct(req,res){
      return Product.findOne({
        where:{
          id:{
            [Op.eq]:req.params.id
          }
        }
      }).then(result=>res.status(200).json({product:result,status:200}))
      .catch(error => res.status(201).json({error:error.message,status:201}));
    }
};