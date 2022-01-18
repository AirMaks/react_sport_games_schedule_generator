import { $authHost } from "./index";





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