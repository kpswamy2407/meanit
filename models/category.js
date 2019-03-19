'use strict';
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('categories', {
    name:{
      type: DataTypes.STRING,
      unique: true
    },
    code:{
      type: DataTypes.STRING,
    },
    isActive:{
      type: DataTypes.BOOLEAN, 
      allowNull: false,
      defaultValue: true 
    },
  }, {});
  category.associate = function(models) {
    // associations can be defined here
  };
  return category;
};