const router = require('express').Router();
const TodoController = require('../controllers/TodoController.js');

router.post('/', TodoController.create);
router.get('/', TodoController.index);
router.put('/:id', TodoController.update);
router.delete('/:id', TodoController.destroy);

module.exports = router;