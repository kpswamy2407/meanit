const User=require('../models').User

module.exports = {
    create(req, res) {
      return User
        .create({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          userType:req.body.usertype
        })
        .then(todo => res.status(200).send(todo))
        .catch(error => res.status(400).send(error));
    },
  };