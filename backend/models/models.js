const sequelize = require('../db');

const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login:  {type: DataTypes.STRING, unique: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'},
    // rating:  {type: DataTypes.INTEGER, defaultValue: 0},
});


const Tournaments = sequelize.define('tournaments', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
});

const Teams = sequelize.define('teams', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
});


// const Rating = sequelize.define('rating', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     rate: {type: DataTypes.INTEGER, allowNull: false}
// });


// User.hasOne(Rating);
// Rating.belongsTo(User);

User.hasMany(Tournaments);
Tournaments.belongsTo(User);

User.hasMany(Teams);
Teams.belongsTo(User);


Tournaments.hasMany(Teams);
Teams.belongsTo(Tournaments);

module.exports = {
    User,
    Tournaments,
    Teams
}