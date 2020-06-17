module.exports = (err, req, res, next) => {
    let code = '';
    let msg = '';

    switch (err.name) {
        case 'SequelizeValidationError':
            let errors = [];
            err.errors.forEach(el => {
                errors.push(el.message);
            });

            code = 400
            msg = errors
            break;

        case 'EMAIL/PASSWORD_NOT_MATCH':
            code = 400
            msg = `Email/Password not match`
            break;

        case 'SequelizeUniqueConstraintError':
            code = 401
            msg = err.errors[0].message
            break;

        case 'INVALID_USER':
            code = 401
            msg = `Invalid user`
            break;

        case 'NOT_AUTHORIZED':
            code = 403
            msg = `You are not authorized to do this`
            break;

        case 'TODO_NOT_FOUND':
            code = 404
            msg = `Todo with id ${err.id} not found`
            break;

        case 'TOKEN_NOT_FOUND':
            code = 404
            msg = `Token not found`
            break;

        default:
            code = 500
            msg = `Internal server error`
            break;
    }

    if (err.code) res.status(err.code).json(err.msg)
    else res.status(code).json(msg)
}