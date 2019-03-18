'use strict';
module.exports = (sequelize, DataTypes) => {
  const sale = sequelize.define('sales', {
    proudctId:{
        type: DataTypes.INTEGER,
        references: {
          model: 'products', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'SET NULL',
        onDelete: 'CASCADE',
      },
      customerId:{
        type: DataTypes.INTEGER,
        references: {
          model: 'customers', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'SET NULL',
        onDelete: 'CASCADE',
      },
      sellingPrice:{
        type:DataTypes.DECIMAL,
      },
      quantity:{
        type:DataTypes.INTEGER,
      },
      amount:{
        type:DataTypes.DECIMAL,
      },
      discount:{
        type:DataTypes.DECIMAL,
      },
      totalAmount:{
        type:DataTypes.DECIMAL,
      },
      
  }, {});
  sale.associate = function(models) {
    sale.belongsTo(models.customers)
    sale.belongsTo(models.products)

  };
  return sale;
};