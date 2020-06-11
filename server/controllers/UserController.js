const { User } = require('../models');
const { compare } = require('../helpers/bcrypt.js');
const { generateToken } = require('../helpers/jwt.js');

class UserController {
    static register(req, res, next) {
        const { email, password } = req.body;
        const newUser = { email, password };

        User.create(newUser)
            .then((result) => {
                const { id, email, password } = result;
                const data = { id, email, password };

                res.status(201).json(data);
            }).catch((err) => {
                next(err)
            });
    }

    static login(req, res, next) {
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
                    } else next({
                        name: `PASSWORD_NOT_MATCH`
                    })
                } else next({
                    name: `EMAIL_NOT_EXIST`
                })
            }).catch((err) => {
                next(err);
            });
    }
}

module.exports = UserController;