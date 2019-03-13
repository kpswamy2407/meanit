'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('users', {
    username:{
      type: DataTypes.STRING,
      unique: true
    },
    email:{
      type: DataTypes.STRING,
      unique: true
    },
    password:{
      type:DataTypes.STRING
    },
    userType:{
      type: DataTypes.INTEGER
    },
    isActive:{
      type: DataTypes.BOOLEAN, 
      allowNull: false,
      defaultValue: true 
    },
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};