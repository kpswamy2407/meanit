const Sale=require('../models').sales;
const Product=require('../models').products;
const Customer=require('../models').customers;
const SalesDetail=require('../models').salesDetails;
const Op=require('sequelize').Op;
const CustomerController = require('./customer')
module.exports = {
    async create(req, res) {
        var customerId= await CustomerController.FindOrCreateCustomer(req.body.name,req.body.mobile,req.body.address).spread(cust=>{
            return cust.id;
        });
    return Sale
      .create({
        customerId: customerId,
        totalAmount:req.body.totalAmount
      })
      .then(sale =>{
        req.body.products.forEach(product=>{
          SalesDetail.build({ saleId:sale.id, productId:product.productId, sellingPrice:product.sellingPrice,
            quantity:product.quantity,amount:product.amount,discount:product.discount })
            .save()
            .then(salesDetail => {
              
              Product.findByPk(salesDetail.productId).then(product=>{
                  return product.decrement('noOfItems',{by:salesDetail.quantity});
              }).then(product=>{
                  return product.increment('noOfItemsSold',{by:salesDetail.quantity})
                 
              }).then(result=>{
                  
              })
            })
        })
        
        res.status(200).json({sale:sale,message:"Sale created successfully!",status:200})
        
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
       include:[
            {model:Customer,required:true,attributes:['id','name','mobile']}
        ]
      }).then(result=>res.status(200).json({sales:result,message:"Sales listed successfully!",status:200}))
      .catch(error => res.status(201).json({error:error.message,status:201}));
    },
    getSale(req,res){
      return Sale.findOne({
        include:[
            {model:Customer,required:true,attributes:['id','name','mobile']},
            {model:SalesDetail,required:true,attributes:['productId','quantity','sellingPrice','amount','discount'],include: [Product]}
        ],
        where:{
          id:{
            [Op.eq]:req.params.id
          }
        }
      }).then(result=>res.status(200).json({sale:result,status:200}))
      .catch(error => res.status(201).json({error:error.message,status:201}));
    },
    getRecent(req,res){
      return Sale.findAll({
      limit: 5,
       include:[
            {model:Customer,required:true,attributes:['id','name','mobile']}
        ],
        order: [
            ['id', 'DESC'],
        ]
      }).then(result=>res.status(200).json({sales:result,message:"Sales listed successfully!",status:200}))
      .catch(error => res.status(201).json({error:error.message,status:201}));
      
    }
};