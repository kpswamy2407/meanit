'use strict';
module.exports = (sequelize, DataTypes) => {
  const salesDetail = sequelize.define('salesDetails', {
      proudctId:{
        type: DataTypes.INTEGER,
        references: {
          model: 'products', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'SET NULL',
        onDelete: 'CASCADE',
      },
      saleId:{
        type: DataTypes.INTEGER,
        references: {
          model: 'sales', // name of Target model
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
  salesDetail.associate = function(models) {
    salesDetail.belongsTo(models.products)
    salesDetail.belongsTo(models.sales)
  };
  return salesDetail;
};