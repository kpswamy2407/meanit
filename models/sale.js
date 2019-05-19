'use strict';
module.exports = (sequelize, DataTypes) => {
  const sale = sequelize.define('sales', {
    
      customerId:{
        type: DataTypes.INTEGER,
        references: {
          model: 'customers', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'SET NULL',
        onDelete: 'CASCADE',
      },
      totalAmount:{
        type:DataTypes.DECIMAL,
      },
      
  }, {});
  sale.associate = function(models) {
    sale.belongsTo(models.customers)
  };
  return sale;
};