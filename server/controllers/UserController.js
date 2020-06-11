const { User } = require('../models');
const { compare } = require('../helpers/bcrypt.js');
const { generateToken } = require('../helpers/jwt.js');

class UserController {
    static register(req, res) {
        const { email, password } = req.body;
        const newUser = { email, password };

        User.create(newUser)
            .then((result) => {
                const { id, email, password } = result;
                const data = { id, email, password };

                res.status(201).json(data);
            }).catch((err) => {
                res.status(400).json(err);
            });
    }

    static login(req, res) {
        const { email, password } = req.body;

        User.findOne({
            where: { email }
        })
            .then((data) => {
                if (data) {
                    if (compare(password, data.password)) {
                        let payload = { 
                            id: data.id, 
                            email 
                        }
                        const access_token = generateToken(payload);

                        res.status(201).json({ access_token });
                    } else {
                        res.status(400).json({
                            msg: `Password doesn't match`
                        });
                    }   
                } else {
                    res.status(400).json({
                        msg: `Email doesn't exist`
                    });
                }
            }).catch((err) => {
                res.status(500).json({
                    msg: `Internal server error`
                });
            });
    }
}

module.exports = UserController;