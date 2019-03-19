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
    },
    generateProductCode(category,brand,size,supplier){
        return category+"_"+brand+"_"+size+"_"+supplier
    }
};