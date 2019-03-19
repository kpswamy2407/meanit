'use strict';
module.exports = (sequelize, DataTypes) => {
  const supplier = sequelize.define('suppliers', {
    name:{
      type: DataTypes.STRING,
      unique: true
    },
    code:{
      type: DataTypes.STRING,
    },
    phone:{
        type: DataTypes.STRING
      },
    address:{
        type: DataTypes.TEXT
      },
    isActive:{
      type: DataTypes.BOOLEAN, 
      allowNull: false,
      defaultValue: true 
    },
  }, {});
  supplier.associate = function(models) {
    // associations can be defined here
  };
  return supplier;
};