const { Todo } = require('../models');

const authorization = (req, res, next) => {
    const { id } = req.params;
// console.log(id);
    Todo.findByPk(id)
        .then((data) => {
            if (!data) {
                res.status(404).json({ 
                    msg: `Todo with id ${id} not found` 
                })
            } else if (data.UserId !== req.user.id) {
                res.status(403).json({
                    msg: `You are not authorized to do this`
                })
            } else {
                next()
            }
        }).catch((err) => {
            res.status(500).json({
                msg: `Internal server error`
            })
        });
}

module.exports = authorization;