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
    city: {type: DataTypes.STRING, allowNull: true},
});

const Players = sequelize.define('players', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    lastname: {type: DataTypes.STRING, allowNull: true},
    number: {type: DataTypes.INTEGER, allowNull: true}
});


const PlayerRoles = sequelize.define('player_roles', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    role: {type: DataTypes.STRING, allowNull: true},
})


const PlayerStats = sequelize.define('player_stats', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    number_of_games: {type: DataTypes.STRING, allowNull: true},
    goals: {type: DataTypes.STRING, allowNull: true},
    assists: {type: DataTypes.STRING, allowNull: true},
    yellow_cards: {type: DataTypes.STRING, allowNull: true},
    red_cards: {type: DataTypes.STRING, allowNull: true},
})

const Schedules = sequelize.define('schedules', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})


const Games = sequelize.define('games', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    team_home: {type: DataTypes.STRING, allowNull: false},
    team_away: {type: DataTypes.STRING, allowNull: false},
    team_home_score: {type: DataTypes.STRING, allowNull: false},
    team_away_score: {type: DataTypes.STRING, allowNull: false},
})

const GameStats = sequelize.define('game_stats', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    team_home_goal: {type: DataTypes.STRING, allowNull: true},
    team_away_goal: {type: DataTypes.STRING, allowNull: true},
    team_home_assist: {type: DataTypes.STRING, allowNull: true},
    team_away_assist: {type: DataTypes.STRING, allowNull: true},
    team_home_yellow: {type: DataTypes.STRING, allowNull: true},
    team_away_yellow: {type: DataTypes.STRING, allowNull: true},
    team_home_red: {type: DataTypes.STRING, allowNull: true},
    team_away_red: {type: DataTypes.STRING, allowNull: true},
})


const GameInfos = sequelize.define('game_infos', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    date: {type: DataTypes.STRING, allowNull: true},
    stadium: {type: DataTypes.STRING, allowNull: true},
    number_of_visitors: {type: DataTypes.STRING, allowNull: true},
    weather: {type: DataTypes.STRING, allowNull: true},
})


const PlayersPlayerRoles = sequelize.define('players_player_roles', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const TournamentsTeams = sequelize.define('tournaments_teams', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const TournamentsPlayers = sequelize.define('tournaments_players', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const PlayersGames = sequelize.define('players_games', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})
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


Teams.hasMany(Players)
Players.belongsTo(Teams)


Players.hasOne(PlayerStats)
PlayerStats.belongsTo(Players)

Schedules.hasMany(Games)
Games.belongsTo(Schedules)

GameStats.hasOne(GameInfos)
GameInfos.belongsTo(GameStats)


Players.belongsToMany(Games, {through: PlayersGames})
Games.belongsToMany(Players, {through: PlayersGames})

Players.belongsToMany(PlayerRoles, {through: PlayersPlayerRoles})
PlayerRoles.belongsToMany(Players, {through: PlayersPlayerRoles})

Tournaments.belongsToMany(Teams, {through: TournamentsTeams});
Teams.belongsToMany(Tournaments, {through: TournamentsTeams});


Tournaments.belongsToMany(Players, {through: TournamentsPlayers});
Players.belongsToMany(Tournaments, {through: TournamentsPlayers});


module.exports = {
    User,
    Tournaments,
    Teams,
    Players,
    PlayerStats,
    PlayerRoles,
    PlayersPlayerRoles,
    TournamentsTeams,
    TournamentsPlayers,
    PlayersGames 
}