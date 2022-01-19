// import { observer } from "mobx-react-lite";
// import { useContext, useState } from "react";
// import { fetchTeams, removeTeam } from "../http/teamsAPI";
// import { Context } from "../index";
// import TeamItem from "./TeamItem";



// const TeamsList = observer(() => {
//     const {teams} = useContext(Context);
//     const [teamsLen, setTeamsLen] = useState(0);

//     const deleteTeam = () => {
//         // [...teams].map((_, index) => {
//         //     if (index === -1) return false;
//         //     if (teams.length < 4) return false;
//         //     return index === teams.indexOf(e.target.parentNode.childNodes[1].textContent) ? teams.splice(index, 1) : false;
//         // })
//         // teams.setTeams([...teams]);

//         removeTeam(teams.teams.id)
//         console.log('click');

//         fetchTeams().then(data => {
//             setTeamsLen(data.length);
//             teams.setTeams([...data])
//         })
//     }
//     return (
    
        
//     )
// })


// export default TeamsList;