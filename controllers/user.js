const User=require('../models/').users;
const authHelper=require('../helpers').auth;
module.exports = {
    create(req, res) {
     authHelper.getMd5(req.body.password).then(hashedPassword=>{
      return User
       .create({
         username: req.body.username,
         email: req.body.email,
         password:hashedPassword,
         userType:req.body.userType
       })
       .then(user => res.status(200).json({user:user,message:"User created successfully!",status:200}))
       .catch(error => res.status(201).json({error:error.message,status:201}));
     })
      
    },
    login(req,res){
      var user;
      authHelper.getMd5(req.body.password).then(hashedPassword=>{
        return User.findOne({where:{username:req.body.username,password:hashedPassword}})
      }).then(user=>{
        if(!user){
          throw new Error("Invalid login")
        }
        this.user=user;
        return authHelper.getJwtToken(user.email)
      }).then(token=>{
        res.status(200).json({message:"User logged successfully!",user:this.user,token:token,status:200});
      }).catch(error=>res.status(201).json({error:error.message,status:201}));;
    },
    getRandomNumber(req,res){
      authHelper.getRandomString(4).then(result=>{
          res.status(200).json({randomNumber:result,status:200})  
      })
    },
  };