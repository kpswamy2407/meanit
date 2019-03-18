'use strict';
module.exports = (sequelize, DataTypes) => {
  const customer = sequelize.define('customers', {
    name:{
        type: DataTypes.STRING,
    },
    mobile:{
        type: DataTypes.STRING,
        unique: true
    },
    address:{
        type:DataTypes.TEXT
    },
      
  }, {});
  customer.associate = function(models) {
    customer.hasMany(models.sales)
    };
  return customer;
};