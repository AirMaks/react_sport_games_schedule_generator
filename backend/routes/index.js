const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const tournamentsRouter = require('./tournamentsRouter');
const teamsRouter = require('./teamsRouter');



router.use('/user', userRouter);
router.use('/tournaments', tournamentsRouter);
router.use('/teams', teamsRouter);

module.exports = router;