'use strict';

module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;

  class Todo extends Model { }

  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Tittle can't be empty`
        }
      }
    },
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: {
          msg: `Input date with format YYYY-MM-DD`
        },
        isAfter: {
          args: `${new Date()}`,
          msg: `Date must be greater than today`
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    hooks: {
      beforeCreate: todo => {
        todo.status = false;
      }
    }
  });

  Todo.associate = function (models) {
    // associations can be defined here
    Todo.belongsTo(models.User)
  };

  return Todo;
};