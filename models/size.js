'use strict';
module.exports = (sequelize, DataTypes) => {
  const size = sequelize.define('sizes', {
    name:{
      type: DataTypes.STRING,
      unique: true
    },
    isActive:{
      type: DataTypes.BOOLEAN, 
      allowNull: false,
      defaultValue: true 
    },
  }, {});
  size.associate = function(models) {
    // associations can be defined here
  };
  return size;
};