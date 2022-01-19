const Router = require('express');
const router = new Router();
const teamsController = require('../controllers/teamsController');


router.post('/', teamsController.createTeam);
router.get('/', teamsController.getAll);
router.delete('/:id', teamsController.deleteTeam);

module.exports = router;