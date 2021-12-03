


const TeamsList = (props) => (

    <ul className="teams-list">
        { props.teams.map((team, index) => (
        <li className={`team-item_${index}`} key={`${index}_team`}><span key={`${index}_team`}>{`${index + 1}.`}</span>{`${team}`}</li>))
        }
    </ul>
)


export default TeamsList;