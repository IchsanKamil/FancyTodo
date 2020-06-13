const { User } = require('../models');
const { verify } = require('../helpers/jwt.js');

const authentication = (req, res, next) => {
    const { token } = req.headers;

    if (!token) next({
        name: `TOKEN_NOT_FOUND`
    })

    const decode = verify(token);
    req.user = decode;
    const { id } = req.user;

    User.findByPk(id)
        .then((data) => {
            if (data) next()
            else next({
                name: `INVALID_USER`
            })
        }).catch((err) => {
            next(err);
        });
}

module.exports = authentication;