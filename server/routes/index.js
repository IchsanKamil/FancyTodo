const router = require('express').Router();
const todoRouter = require('./todo.js');
const userRouter = require('./user.js');

router.use('/', userRouter);
router.use('/todos', todoRouter);

module.exports = router;