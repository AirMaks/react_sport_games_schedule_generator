const ApiError = require('../error/ApiError');
const {Games} = require('../models/models');



class GamesController {
    
    async createGame(req, res, next) {

        try {
            const {team_home, team_away, team_home_score, team_away_score, tournamentId, round} = req.body;
            const game = await Games.create({team_home, team_away, team_home_score, team_away_score, tournamentId, round});
            return res.json(game);
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
        
    }

    async getAll(req, res, next) {

        try {
        
            
            const games = await Games.findAll();
            
      
            return res.json(games);
            
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
        
        
        
    }

   

    async getOne(req, res) {
        const {id} = req.params;

        const game = await Games.findOne({where: {id}});

        return res.json(game);
    }

    
} 


module.exports = new GamesController();