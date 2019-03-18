const Customer=require('../models').customers;
const Op=require('sequelize').Op;
module.exports = {
    create(req, res) {
      return Customer
      .create({
        name: req.body.name,
      })
      .then(customer => res.status(200).json({customer:customer,message:"Customer created successfully!",status:200}))
      .catch(error => res.status(201).json({error:error.message,status:201}));
      
    },
    update(req,res){
      return Customer.
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
      }).then(result=>res.status(200).json({message:"Customer updated successfully!",status:200}))
      .catch(error => res.status(201).json({error:error.message,status:201}));
    },
    delete(req,res){
      return Customer.destroy({
        where:{
          id:{
            [Op.eq]:req.params.id
          }
        }
      }).then(result=>res.status(200).json({message:"Customer deleted successfully!",status:200}))
      .catch(error => res.status(201).json({error:error.message,status:201}));
    },
    getAll(req,res){
      return Customer.findAll({
        attributes: ['id','name','isActive']
      }).then(result=>res.status(200).json({customers:result,message:"Customer updated successfully!",status:200}))
      .catch(error => res.status(201).json({error:error.message,status:201}));
    },
    getCustomer(req,res){
      return Customer.findOne({
        where:{
          id:{
            [Op.eq]:req.params.id
          }
        }
      }).then(result=>res.status(200).json({customer:result,status:200}))
      .catch(error => res.status(201).json({error:error.message,status:201}));
    }
};