'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return queryInterface.createTable('sales', { 
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productId:{
      type: Sequelize.INTEGER,
      references: {
        model: 'products', // name of Target model
        key: 'id', // key in Target model that we're referencing
      },
      onUpdate: 'SET NULL',
      onDelete: 'CASCADE',
    },
    customerId:{
      type: Sequelize.INTEGER,
      references: {
        model: 'customers', // name of Target model
        key: 'id', // key in Target model that we're referencing
      },
      onUpdate: 'SET NULL',
      onDelete: 'CASCADE',
    },
    sellingPrice:{
      type:Sequelize.DECIMAL,
    },
    quantity:{
      type:Sequelize.INTEGER,
    },
    amount:{
      type:Sequelize.DECIMAL,
    },
    discount:{
      type:Sequelize.DECIMAL,
    },
    totalAmount:{
      type:Sequelize.DECIMAL,
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
   return queryInterface.dropTable('sales')
  }
};
