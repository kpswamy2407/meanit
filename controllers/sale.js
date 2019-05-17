const Sale=require('../models').sales;
const Product=require('../models').products;
const Op=require('sequelize').Op;
const CustomerController = require('./customer')
module.exports = {
    async create(req, res) {
      console.log(req.body);
      return;
        var customerId= await CustomerController.FindOrCreateCustomer(req.body.name,req.body.mobile,req.body.address).spread(cust=>{
            return cust.id;
        });
    return Sale
      .create({
        customerId: customerId,
        productId:req.body.productId,
        sellingPrice:req.body.sellingPrice,
        quantity:req.body.quantity,
        amount:req.body.amount,
        discount:req.body.discount,
        totalAmount:req.body.totalAmount
      })
      .then(sale =>{
        Product.findByPk(sale.productId).then(product=>{
            return product.decrement('noOfItems',{by:sale.quantity});
        }).then(product=>{
            return product.increment('noOfItemsLeft',{by:sale.quantity})
           
        }).then(result=>{
            res.status(200).json({sale:sale,message:"Sale created successfully!",status:200})
        })
        
      }).catch(error => res.status(201).json({error:error.message,status:201}));
      
    },
    update(req,res){
        var customerId=  CustomerController.FindOrCreateCustomer(req,res);
      return Sale.
        update({
            customerId: customerId,
            productId:req.body.productId,
            sellingPrice:req.body.sellingPrice,
            quantity:req.body.quantity,
            amount:req.body.amount,
            discount:req.body.discount,
            totalAmount:req.body.totalAmount
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