import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from "../index";
import { fetchTeams, removeTeam } from "../http/teamsAPI";


const TeamItem = observer(({team, index}) => {
    const {teams} = useContext(Context);
    const [teamsLen, setTeamsLen] = useState(0);

    useEffect(() => {
        fetchTeams().then(data => {
            
            teams.setTeams([...data])
            setTeamsLen(data.length);
        })
    }, [teams.teams])
    const deleteTeam = (id) => {
        // [...teams].map((_, index) => {
        //     if (index === -1) return false;
        //     if (teams.length < 4) return false;
        //     return index === teams.indexOf(e.target.parentNode.childNodes[1].textContent) ? teams.splice(index, 1) : false;
        // })
        // teams.setTeams([...teams]);

        removeTeam(id)
        console.log(teams.teams.length);
        fetchTeams().then(data => {
            
            teams.setTeams([...data])
            setTeamsLen(data.length);
        })
        
    }

    
    return (
        <li key={team.id}>
            <span>{`${index + 1}.`}</span>
            <div>{`${team.name}`}</div>
            {teamsLen > 3 && <span className="remove-btn" onClick={() => deleteTeam(team.id)}></span>}
        </li>
    )
})


export default TeamItem;