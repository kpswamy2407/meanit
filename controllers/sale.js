const Sale=require('../models').sales;
const Op=require('sequelize').Op;
module.exports = {
    create(req, res) {
      return Sale
      .create({
        name: req.body.name,
      })
      .then(customer => res.status(200).json({customer:customer,message:"Sale created successfully!",status:200}))
      .catch(error => res.status(201).json({error:error.message,status:201}));
      
    },
    update(req,res){
      return Sale.
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
      }).then(result=>res.status(200).json({message:"Sale updated successfully!",status:200}))
      .catch(error => res.status(201).json({error:error.message,status:201}));
    },
    delete(req,res){
      return Sale.destroy({
        where:{
          id:{
            [Op.eq]:req.params.id
          }
        }
      }).then(result=>res.status(200).json({message:"Sale deleted successfully!",status:200}))
      .catch(error => res.status(201).json({error:error.message,status:201}));
    },
    getAll(req,res){
      return Sale.findAll({
        attributes: ['id','name','isActive']
      }).then(result=>res.status(200).json({customers:result,message:"Sale updated successfully!",status:200}))
      .catch(error => res.status(201).json({error:error.message,status:201}));
    },
    getSale(req,res){
      return Sale.findOne({
        where:{
          id:{
            [Op.eq]:req.params.id
          }
        }
      }).then(result=>res.status(200).json({customer:result,status:200}))
      .catch(error => res.status(201).json({error:error.message,status:201}));
    }
};