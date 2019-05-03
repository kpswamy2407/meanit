const Product=require('../models').products;
const Category=require('../models').categories;
const Brand=require('../models').brands;
const Supplier=require('../models').suppliers;
const Size=require('../models').sizes;
const Op=require('sequelize').Op;
module.exports = {
    async create(req, res) {
        var categoryCode=await Category.findOne({
            where:{
                id:{
                    [Op.eq]:req.body.categoryId
                }
            }
        }).then(category=>{
            return category.code
        });
        var brandCode= await Brand.findOne({
            where:{
                id:{
                    [Op.eq]:req.body.brandId
                }
            }
        }).then(brand=>{
            return brand.code;
        })
        var supplierCode=await Supplier.findOne({
            where:{
                id:{
                    [Op.eq]:req.body.supplierId
                }
            }
        }).then(supplier=>{
            return supplier.code;
        });
        var sizeCode=await Size.findOne({
            where:{
                id:{
                    [Op.eq]:req.body.sizeId
                }
            }
        }).then(size=>{
            return size.name;
        });
        var code=this.generateProductCode(categoryCode,brandCode,sizeCode,supplierCode);
        
      return Product
      .create({
        code: code,
        supplierId:req.body.supplierId,
        brandId:req.body.brandId,
        sizeId:req.body.sizeId,
        categoryId:req.body.categoryId,
        buyingPrice:req.body.buyingPrice,
        sellingPrice:req.body.sellingPrice,
        noOfItems:req.body.noOfItems
      })
      .then(product => res.status(200).json({product:product,message:"Product created successfully!",status:200}))
      .catch(error => res.status(201).json({error:error.message,status:201}));
      
    },
    async update(req,res){
        var self=this;
        console.log(req.body);
        var categoryCode=await Category.findOne({
            where:{
                id:{
                    [Op.eq]:req.body.categoryId
                }
            }
        }).then(category=>{
            return category.code
        });
        var brandCode= await Brand.findOne({
            where:{
                id:{
                    [Op.eq]:req.body.brandId
                }
            }
        }).then(brand=>{
            return brand.code;
        })
        var supplierCode=await Supplier.findOne({
            where:{
                id:{
                    [Op.eq]:req.body.supplierId
                }
            }
        }).then(supplier=>{
            return supplier.code;
        });
        var sizeCode=await Size.findOne({
            where:{
                id:{
                    [Op.eq]:req.body.sizeId
                }
            }
        }).then(size=>{
            return size.name;
        });
        var code=categoryCode+"_"+brandCode+"_"+sizeCode+"_"+supplierCode;

       // console.log(code);
      return Product.
        update({
            code: code,
            supplierId:req.body.supplierId,
            brandId:req.body.brandId,
            sizeId:req.body.sizeId,
            categoryId:req.body.categoryId,
            buyingPrice:req.body.buyingPrice,
            sellingPrice:req.body.sellingPrice,
            noOfItems:req.body.noOfItems
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
        include:[
            {model:Supplier,required:true,attributes:['id','name','code']},
            {model:Category,required:true,attributes:['id','name','code']},
            {model:Brand,required:true,attributes:['id','name','code']},
            {model:Size,required:true,attributes:['id','name']}
        ]
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
    },
    generateProductCode(category,brand,size,supplier){
        console.log("Hllerehe")
        return category+"_"+brand+"_"+size+"_"+supplier
    }
};