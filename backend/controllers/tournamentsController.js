const ApiError = require('../error/ApiError');

const {Games} = require('../models/models');
const {Tournaments} = require('../models/models');



class TournamentsController {
    
    async createTournament(req, res, next) { 

        try {
            const {title} = req.body;
            const tournaments = await Tournaments.create({title});
            return res.json(tournaments);
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
        
    }

    async getAll(req, res) {
        const tournaments = await Tournaments.findAll();
        return res.json(tournaments);
    }

    async getAllGames(req, res, next) {

        try {
            let {id} = req.params
        
            
            const games = await Games.findAll({where: {tournamentId: id}});


      
            return res.json(games);
            
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
        
        
        
    }

    async getOne(req, res) {
        const {id} = req.params;

        const tournament = await Tournaments.findOne({where: {id}});

        return res.json(tournament);
    }

    
}


module.exports = new TournamentsController();