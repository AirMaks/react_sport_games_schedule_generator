import { observer } from "mobx-react-lite";



const TeamItem = observer(({team, index, teams}) => {
  

    return (
        <li key={team.id}>
            <span>{`${index + 1}.`}</span>
            <div>{`${team.name}`}</div>
            {teams.length > 3 && <span className="remove-btn" ></span>}
        </li>
    )
})


export default TeamItem;