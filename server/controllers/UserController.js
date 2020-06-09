const { User } = require('../models');
const { compare } = require('../helpers/bcrypt.js');

class UserController {
    static register(req, res) {
        const { email, password } = req.body;
        const newUser = { email, password };

        User.create(newUser)
            .then((result) => {
                const { id, email, password } = result;
                const data = { id, email, password };

                res.status(201).json(data)
            }).catch((err) => {
                res.status(400).json(err);
            });
    }

    static login(req, res) {

    }
}

module.exports = UserController;