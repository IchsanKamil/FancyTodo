const router = require('express').Router();
const todoRouter = require('./todo.js');
const userRouter = require('./user.js');

router.use('/todos', todoRouter);
router.use('/', userRouter);

module.exports = router;