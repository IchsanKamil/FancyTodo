const router = require('express').Router();
const TodoController = require('../controllers/TodoController.js');
const authentication = require('../middlewares/authentication.js');
const authorization = require('../middlewares/authorization.js');

router.use(authentication);
router.post('/', TodoController.create);
router.get('/', TodoController.findAll);
router.get('/:id', authorization, TodoController.findOne)
router.put('/:id', authorization, TodoController.update);
router.delete('/:id', authorization, TodoController.destroy);

module.exports = router;