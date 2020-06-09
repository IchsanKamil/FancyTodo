const { Todo } = require('../models');

class TodoController {
    static create(req, res) {
        const { title, description, due_date } = req.body;
        const newTodo = { title, description, due_date };

        Todo.create(newTodo)
            .then((data) => {
                res.status(201).json(data);
            }).catch((err) => {
                res.status(500).json({
                    msg: `Internal server error`
                })
            });
    }

    static index(req, res) {
        Todo.findAll({
            order: [['due_date', 'ASC']]
        })
            .then((data) => {
                res.status(200).json(data);
            }).catch((err) => {
                res.status(500).json({
                    msg: `Internal server error`
                })
            });
    }

    static update(req, res) {
        const { id } = req.params;
        const { title, description, status, due_date } = req.body;
        const todo = { title, description, status, due_date };

        Todo.findByPk(id)
            .then((result) => {
                if (result) {
                    return Todo.update(todo, {
                        where: { id },
                        returning: true
                    })
                } else {
                    res.status(404).json({
                        msg: `Todo with id ${id} not found`
                    })
                }
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch((err) => {
                res.status(500).json({
                    msg: `Internal server error`
                })
            });
    }

    static destroy(req, res) {
        const { id } = req.params;
        let deleteTodo;

        Todo.findByPk(id)
            .then((result) => {
                if (result) {
                    deleteTodo = result;
                    return Todo.destroy({
                        where: { id },
                    })
                } else {
                    res.status(404).json({
                        msg: `Todo with id ${id} not found`
                    })
                }
            })
            .then(() => {
                res.status(200).json(deleteTodo)
            })
            .catch((err) => {
                res.status(500).json({
                    msg: `Internal server error`
                })
            });
    }
}

module.exports = TodoController;