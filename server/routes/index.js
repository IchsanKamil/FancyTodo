const router = require('express').Router();
const todoRouter = require('./todo.js');
const userRouter = require('./user.js');
const holidayRouter = require('./pubHoliday.js');

router.use('/', userRouter);
router.use('/todos', todoRouter);
router.use('/publicHolidays', holidayRouter);

module.exports = router;