const ApiError = require('../error/ApiError');
const {Tournaments} = require('../models/models');
class TournamentsController {
    
    async create(req, res, next) {

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

    async getOne(req, res) {
        const {id} = req.params;

        const tournament = await Tournaments.findOne({where: {id}});

        return res.json(tournament);
    }

    
}


module.exports = new TournamentsController();