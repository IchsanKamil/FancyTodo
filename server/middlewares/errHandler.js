module.exports = (err, req, res, next) => {
    switch (err.name) {
        case 'SequelizeValidationError':
            let errors = [];
            
            err.errors.forEach(el => {
                errors.push(el.message);
            });
            res.status(400).json(errors)
            break;

        // case 'SequelizeValidationError':
        //     let errors = [];
        //     err.errors.forEach(el => {
        //         errors.push(el.message);
        //     });
        //     res.status(400).json(errors)
        //     break;

        default:
            res.status(500).json({
                msg: `Internal server error`
            })
            break;
    }
}