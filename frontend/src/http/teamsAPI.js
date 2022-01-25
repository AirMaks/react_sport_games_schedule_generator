import { $host } from "./index";



export const createTeam = async (team) => {
    const {data} = await $host.post('/api/teams', team)
    return data
}

export const removeTeam = async (id) => {
    const {data} = await $host.delete('/api/teams/' + id)
    return data
}

export const removeAllTeams = async () => {
    const {data} = await $host.delete('/api/teams')
    return data
}

export const fetchTeams = async (name) => {
    const {data} = await $host.get('/api/teams', {params: {
            name
        }})

    return data;
}

