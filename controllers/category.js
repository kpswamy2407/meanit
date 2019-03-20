const Category=require('../models').categories;
const Op=require('sequelize').Op;
module.exports = {
    create(req, res) {
      return Category
      .create({
        name: req.body.name,
        code: req.body.code,
      })
      .then(category => res.status(200).json({category:category,message:"Category created successfully!",status:200}))
      .catch(error => res.status(201).json({error:error.message,status:201}));
      
    },
    update(req,res){
      return Category.
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
      }).then(result=>res.status(200).json({message:"Category updated successfully!",status:200}))
      .catch(error => res.status(201).json({error:error.message,status:201}));
    },
    delete(req,res){
      return Category.destroy({
        where:{
          id:{
            [Op.eq]:req.params.id
          }
        }
      }).then(result=>res.status(200).json({message:"Category deleted successfully!",status:200}))
      .catch(error => res.status(201).json({error:error.message,status:201}));
    },
    getAll(req,res){
      return Category.findAll({
        attributes: ['id','name','code','isActive']
      }).then(result=>res.status(200).json({categories:result,message:"Category updated successfully!",status:200}))
      .catch(error => res.status(201).json({error:error.message,status:201}));
    },
    getCategory(req,res){
      return Category.findOne({
        where:{
          id:{
            [Op.eq]:req.params.id
          }
        }
      }).then(result=>res.status(200).json({category:result,status:200}))
      .catch(error => res.status(201).json({error:error.message,status:201}));
    }
};