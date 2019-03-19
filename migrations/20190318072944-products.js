'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.createTable('products',{
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code:{
      type: Sequelize.STRING,
      unique:true,
    },
    supplierId:{
      type: Sequelize.INTEGER,
      references: {
        model: 'suppliers', // name of Target model
        key: 'id', // key in Target model that we're referencing
      },
      onUpdate: 'SET NULL',
      onDelete: 'CASCADE',
    },
    categoryId:{
      type: Sequelize.INTEGER,
      references: {
        model: 'categories', // name of Target model
        key: 'id', // key in Target model that we're referencing
      },
      onUpdate: 'SET NULL',
      onDelete: 'CASCADE',
    },
    brandId:{
      type: Sequelize.INTEGER,
      references: {
        model: 'brands', // name of Target model
        key: 'id', // key in Target model that we're referencing
      },
      onUpdate: 'SET NULL',
      onDelete: 'CASCADE',
    },
    sizeId:{
      type: Sequelize.INTEGER,
      references: {
        model: 'sizes', // name of Target model
        key: 'id', // key in Target model that we're referencing
      },
      onUpdate: 'SET NULL',
      onDelete: 'CASCADE',
    },
    buyingPrice:{
      type:Sequelize.DECIMAL,
    },
    sellingPrice:{
      type:Sequelize.DECIMAL,
    },
    noOfItems:{
      type:Sequelize.INTEGER,
    },
    noOfItemsLeft:{
      type:Sequelize.INTEGER,
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
   });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   return queryInterface.dropTable('products');
  }
};
