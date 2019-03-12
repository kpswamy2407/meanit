'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    username:{
      type: Sequelize.STRING,
      unique: true
    },
    email:{
      type: Sequelize.STRING,
      unique: true
    },
    password:{
      type:Sequelize.STRING
    },
    userType:{
      type: Sequelize.INTEGER
    },
    isActive:{
      type: Sequelize.BOOLEAN, 
      allowNull: false,
      defaultValue: true 
    },
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};