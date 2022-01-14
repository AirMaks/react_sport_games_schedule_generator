import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../index";
import TeamItem from "./TeamItem";



const TeamsList = observer(() => {
    const {teams} = useContext(Context);

    return (
    
        <ul className="teams-list">
            { teams.teams.map((team, index) => (
                <TeamItem teams={teams.teams} key={team.id} team={team} index={index}/>
            ))}
        </ul>
    )
})


export default TeamsList;