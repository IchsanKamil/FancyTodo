const { Todo } = require('../models');

const authorization = (req, res, next) => {
    const { id } = req.params;

    Todo.findByPk(id)
        .then((data) => {
            if (!data) {
                next({
                    name: `TODO_NOT_FOUND`,
                    id
                })
            } else if (data.UserId !== req.user.id) {
                next({
                    name: `NOT_AUTHORIZED`,
                })
            } else {
                next()
            }
        }).catch((err) => {
            next(err);
        });
}

module.exports = authorization;