'use strict';
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('products', {
    code:{
        type: DataTypes.STRING,
        unique:true,
    },
      supplierId:{
        type: DataTypes.INTEGER,
        references: {
          model: 'suppliers', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'SET NULL',
        onDelete: 'CASCADE',
      },
      categoryId:{
        type: DataTypes.INTEGER,
        references: {
          model: 'categories', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'SET NULL',
        onDelete: 'CASCADE',
      },
      sizeId:{
        type: DataTypes.INTEGER,
        references: {
          model: 'sizes', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'SET NULL',
        onDelete: 'CASCADE',
      },
      buyingPrice:{
        type:DataTypes.DECIMAL,
      },
      sellingPrice:{
        type:DataTypes.DECIMAL,
      },
      noOfItems:{
        type:DataTypes.INTEGER,
      },
      noOfItemsLeft:{
        type:DataTypes.INTEGER,
      },
  }, {});
  product.associate = function(models) {
    product.belongsTo(models.categories)
    product.belongsTo(models.sizes)
    product.belongsTo(models.brands)
    //product.hasMany(models.sales)

  };
  return product;
};