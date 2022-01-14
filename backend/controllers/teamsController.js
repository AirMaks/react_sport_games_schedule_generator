const ApiError = require('../error/ApiError');
const {Teams} = require('../models/models');
class TeamsController {
    
    async create(req, res, next) {

        try {
            const {name, tournamentId} = req.body;
            const teams = await Teams.create({name, tournamentId});
            return res.json(teams);
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
        
    }

    async getAll(req, res) {
        let {userId} = req.query;
        const teams = await Teams.findAll({where:{userId}});
        return res.json(teams);
    }

    async delete(req, res) {
        let {id} = req.body;
        const teams = await Teams.destroy({where:{id}});
        return res.json(teams);
    }

    
}


module.exports = new TeamsController();