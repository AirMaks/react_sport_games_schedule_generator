const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const {User} = require('../models/models');
const jwt = require('jsonwebtoken');


const generateJWT = (id, login, role) => {
    return jwt.sign({id, login, role}, process.env.SECRET_KEY, {expiresIn: '24h'});
}




class UserController {
    async registration(req, res, next) {
        const {login, password, role} = req.body;
        
        if (!login || !password) {
            return next(ApiError.badRequest('Incorrect login or password'));
        }

        const candidate = await User.findOne({where: {login}});
        if (candidate) {
            return next(ApiError.badRequest('User with the same login is already exists'));
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({login, role, password: hashPassword});
        const token = generateJWT(user.id, user.login, user.role);
        return res.json({token});
    }

    async login(req, res, next) {
        const {login, password} = req.body;
        const user = await User.findOne({where: {login}});

        if (!user) {
            return next(ApiError.badRequest('User with this login is not exist'));
        }

        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.badRequest('Incorrect password'));
        }

        const token = generateJWT(user.id, user.login, user.role);

        return res.json({token});

    }

    async check(req, res, next) {

        const token = generateJWT(req.user.id, req.user.login, req.user.role);
        return res.json({token});
        
    }

    async getAll(req, res) {
        const users = await User.findAll();
        return res.json(users);
    }
}

module.exports = new UserController(); 