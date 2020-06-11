const { Todo } = require('../models');

class TodoController {
    static create(req, res, next) {
        const { title, description, due_date } = req.body;
        const UserId = req.user.id
        const newTodo = { title, description, due_date, UserId };

        Todo.create(newTodo)
            .then((data) => {
                res.status(201).json({
                    msg: `Todo successfully created`,
                    data
                });
            }).catch((err) => {
                next(err);
            });
    }

    static findAll(req, res, next) {
        Todo.findAll({
            where: { UserId: req.user.id },
            order: [['due_date', 'ASC']]
        })
            .then((data) => {
                res.status(200).json(data);
            }).catch((err) => {
                next(err);
            });
    }

    static findOne(req, res, next) {
        const { id } = req.params;

        Todo.findByPk(id)
            .then((data) => {
                res.status(200).json(data)
            }).catch((err) => {
                next(err)
            });
    }

    static update(req, res, next) {
        const { id } = req.params;
        const { title, description, status, due_date } = req.body;
        const updateTodo = { title, description, status, due_date };

        Todo.update(updateTodo, {
            where: { id }
        })
            .then(() => {
                res.status(200).json({
                    msg: `Todo successfully updated`,
                    updateTodo
                });
            })
            .catch((err) => {
                next(err);
            });
    }

    static destroy(req, res, next) {
        const { id } = req.params;
        let deleteTodo;

        Todo.findByPk(id)
            .then((result) => {
                deleteTodo = result;
                return Todo.destroy({
                    where: { id },
                })
            })
            .then(() => {
                res.status(200).json({
                    msg: `Todo successfully deleted`,
                    deleteTodo
                })
            })
            .catch((err) => {
                next(err);
            });
    }
}

module.exports = TodoController;