const Brand=require('../models').brands;
const Op=require('sequelize').Op;
module.exports = {
    create(req, res) {
      return Brand
      .create({
        name: req.body.name,
        code: req.body.code,
      })
      .then(brand => res.status(200).json({brand:brand,message:"Brand created successfully!",status:200}))
      .catch(error => res.status(201).json({error:error.message,status:201}));
      
    },
    update(req,res){
      return Brand.
        update({
            name:req.body.name,
            code: req.body.code,
            isActive:req.body.isActive
        },
        {
          where:{
            id:{
              [Op.eq]:req.params.id
            }
        }
      }).then(result=>res.status(200).json({message:"Brand updated successfully!",status:200}))
      .catch(error => res.status(201).json({error:error.message,status:201}));
    },
    delete(req,res){
      return Brand.destroy({
        where:{
          id:{
            [Op.eq]:req.params.id
          }
        }
      }).then(result=>res.status(200).json({message:"Brand deleted successfully!",status:200}))
      .catch(error => res.status(201).json({error:error.message,status:201}));
    },
    getAll(req,res){
      return Brand.findAll({
        attributes: ['id','name','code','isActive']
      }).then(result=>res.status(200).json({brands:result,message:"Brand updated successfully!",status:200}))
      .catch(error => res.status(201).json({error:error.message,status:201}));
    },
    getBrand(req,res){
      return Brand.findOne({
        where:{
          id:{
            [Op.eq]:req.params.id
          }
        }
      }).then(result=>res.status(200).json({brand:result,status:200}))
      .catch(error => res.status(201).json({error:error.message,status:201}));
    }
};