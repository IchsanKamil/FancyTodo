const { User } = require('../models');
const { compare } = require('../helpers/bcrypt.js');
const { generateToken } = require('../helpers/jwt.js');
const { OAuth2Client } = require('google-auth-library');

class UserController {
    static googleSign(req, res, next) {
        let { id_token } = req.body;
        let email;
        const client = new OAuth2Client(process.env.CLIENT_ID);
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.CLIENT_ID
        })
            .then(ticket => {
                email = ticket.getPayload().email;

                return User.findOne({
                    where: { email }
                })
            })
            .then(data => {
                if (data) {
                    return {
                        id: data.id,
                        email: data.email
                    }
                } else {
                    return User.create({ email, password: 'admin123' })
                }
            })
            .then(data => {
                let payload = {
                    id: data.id,
                    email: data.email
                }
                return res.status(201).json({
                        id: data.id,
                        email: data.email,
                        token: generateToken(payload)
                })
            })
            .catch(err => {
                next(err);
            })
    }

    static register(req, res, next) {
        const { email, password } = req.body;
        const newUser = { email, password };
        console.log(newUser, '<<<<< register controller');
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
        console.log('masuk login');
        const { email, password } = req.body;
        console.log(req.body, 'login');

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
                        const token = generateToken(payload);

                        res.status(201).json({
                            id: data.id,
                            email,
                            token
                        });
                    } else next({
                        name: `EMAIL/PASSWORD_NOT_MATCH`
                    })
                } else next({
                    name: `EMAIL/PASSWORD_NOT_EXIST`
                })
            }).catch((err) => {
                next(err);
            });
    }
}

module.exports = UserController;