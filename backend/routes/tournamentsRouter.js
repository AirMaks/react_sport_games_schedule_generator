const Router = require('express');
const router = new Router();
const tournamentsController = require('../controllers/tournamentsController');


router.post('/', tournamentsController.create);
router.get('/', tournamentsController.getAll);
router.get('/:id', tournamentsController.getOne);

module.exports = router;