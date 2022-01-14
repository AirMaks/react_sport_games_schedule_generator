const Router = require('express');
const router = new Router();
const teamsController = require('../controllers/teamsController');


router.post('/', teamsController.create);
router.get('/', teamsController.getAll);
router.delete('/', teamsController.delete);

module.exports = router;