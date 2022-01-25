const Router = require('express');
const router = new Router();
const teamsController = require('../controllers/teamsController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');


router.post('/', teamsController.createTeam);
router.get('/', teamsController.getAll);
router.delete('/:id', teamsController.deleteTeam);
router.delete('/', teamsController.deleteAllTeams);

module.exports = router;