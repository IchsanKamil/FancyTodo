'use strict';

const { encrypt } = require('../helpers/bcrypt.js');

module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;

  class User extends Model { }

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          message: `Email can't be empty`
        },
        isEmail: {
          message: `Enter a valid email address`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [7, 20],
          message: `Password must be between 7 & 20 characters`
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: user => {
        user.password = encrypt(user.password);
      }
    }
  });

  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Todo);
  };

  return User;
};