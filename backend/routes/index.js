const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const tournamentsRouter = require('./tournamentsRouter');
const teamsRouter = require('./teamsRouter');
const gamesRouter = require('./gamesRouter');



router.use('/user', userRouter);
router.use('/tournaments', tournamentsRouter);
router.use('/teams', teamsRouter);
router.use('/users', userRouter);
router.use('/games', gamesRouter);

module.exports = router;