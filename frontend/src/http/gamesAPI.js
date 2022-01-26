import { $host } from "./index";



export const createGame = async (game) => {
    const {data} = await $host.post('/api/games', game)
    return data
}



export const fetchGames = async (tournamentId) => {
    const {data} = await $host.get('/api/games', {params: {
            tournamentId
        }})
    return data;
}

