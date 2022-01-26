import { $authHost,$host } from "./index";



export const createTournament = async (tournament) => {
    const {data} = await $authHost.post('/api/tournaments', tournament)
    return data
}

export const fetchTournaments = async (title, createdAt) => {
    const {data} = await $authHost.get('/api/tournaments', {params: {
            title, createdAt
        }})
    return data;
}

export const fetchOneTournament = async (id) => {
    const {data} = await $authHost.get('/api/tournaments/' + id)
    
    return data
}

export const fetchGames = async (id) => {
    const {data} = await $host.get('/api/tournaments/' + id)
    return data;
}