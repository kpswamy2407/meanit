'use strict';
module.exports = (sequelize, DataTypes) => {
  const brand = sequelize.define('brands', {
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
  brand.associate = function(models) {
    // associations can be defined here
  };
  return brand;
};