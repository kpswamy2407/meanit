'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username:{
        type: Sequelize.STRING,
        unique: true
      },
      email:{
        type: Sequelize.STRING,
        unique: true
      },
      password:{
        type:Sequelize.STRING
      },
      userType:{
        type: Sequelize.INTEGER
      },
      isActive:{
        type: Sequelize.BOOLEAN, 
        allowNull: false,
        defaultValue: true 
      },

      // Timestamps
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   return queryInterface.dropTable('users');
  }
};
