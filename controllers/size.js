const Size=require('../models').sizes;
const Op=require('sequelize').Op;
module.exports = {
    create(req, res) {
      return Size
      .create({
        name: req.body.name,
      })
      .then(size => res.status(200).json({size:size,message:"Size created successfully!",status:200}))
      .catch(error => res.status(201).json({error:error.message,status:201}));
      
    },
    update(req,res){
      return Size.
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
      }).then(result=>res.status(200).json({message:"Size updated successfully!",status:200}))
      .catch(error => res.status(201).json({error:error.message,status:201}));
    },
    delete(req,res){
      return Size.destroy({
        where:{
          id:{
            [Op.eq]:req.params.id
          }
        }
      }).then(result=>res.status(200).json({message:"Size deleted successfully!",status:200}))
      .catch(error => res.status(201).json({error:error.message,status:201}));
    },
    getAll(req,res){
      return Size.findAll({
        attributes: ['id','name','isActive']
      }).then(result=>res.status(200).json({sizes:result,message:"Size updated successfully!",status:200}))
      .catch(error => res.status(201).json({error:error.message,status:201}));
    },
    getSize(req,res){
      return Size.findOne({
        where:{
          id:{
            [Op.eq]:req.params.id
          }
        }
      }).then(result=>res.status(200).json({size:result,status:200}))
      .catch(error => res.status(201).json({error:error.message,status:201}));
    }
};