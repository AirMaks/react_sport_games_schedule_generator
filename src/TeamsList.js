


const TeamsList = (props) => (

    <ul className="teams-list">
        { props.teams.map((team, index) => (
        <li className={`team-item_${index}`} key={`${index}_team`}>
            <span key={`${index}_team`}>
            {`${index + 1}.`}
            </span>
            <div>{`${team}`}</div>
            {props.teams.length > 3 ? <span className="remove-btn" onClick={e => props.removeTeam(e)}></span>: null}
        </li>))
        }
    </ul>
)


export default TeamsList;