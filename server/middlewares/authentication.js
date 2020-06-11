const { User } = require('../models');
const { verify } = require('../helpers/jwt.js');

const authentication = (req, res, next) => {
    const { access_token } = req.headers;

    if (!access_token) res.status(404).json({
        msg: `Token not found`
    })

    const decode = verify(access_token);
    req.user = decode;
    const { id } = req.user;

    // res.send(req.user)
    User.findByPk(id)
    // User.findOne({
    //     where: { id }
    // })
        .then((data) => {
            if (data) next()
            else {
                req.status(404).json({
                    msg: `Invalid User`
                })
            }
        }).catch((err) => {
            req.status(401).json({
                msg: err.message
            })
        });
}

module.exports = authentication;