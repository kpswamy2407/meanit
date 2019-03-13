const User=require('../models/').users;
const { check, validationResult } = require('express-validator/check');
module.exports = {
    create(req, res) {
      console.log(req.body);
      
      return User
        .create({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          userType:req.body.userType
        })
        .then(todo => res.status(200).send(todo))
        .catch(error => res.status(400).send(error));
    },
  };