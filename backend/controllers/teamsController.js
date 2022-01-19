const ApiError = require('../error/ApiError');
const {Teams} = require('../models/models');
class TeamsController {
    
    async createTeam(req, res, next) {

        try {
            const {name, tournamentId, userId} = req.body;
            const team = await Teams.create({name, tournamentId, userId});
            return res.json(team);
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
        
    }

    async getAll(req, res) {
        const teams = await Teams.findAll();
        return res.json(teams);
    }

    async deleteTeam(req, res) {
        let {id} = req.params;
        const teams = await Teams.destroy({where:{id}});
        return res.json(teams);
    }

    
}


module.exports = new TeamsController();