const Router = require('express');
const router = new Router();
const gamesController = require('../controllers/gamesController');
const checkTournamentId = require('../middleware/checkTournamentId');


router.post('/', gamesController.createGame);
router.get('/', gamesController.getAll);
router.get('/:id', gamesController.getOne);

module.exports = router;