import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { TOURNAMENTS_ROUTE } from "../utils/constants";


const TournamentItem = observer(({tournament, index}) => {
    const navigate = useNavigate(); 
    let date = new Date(tournament.createdAt);
    return (
        <li key={tournament.id} className="d-flex align-items-end">
            <span>{`${index + 1}.`}</span>
            <div onClick={() => navigate(TOURNAMENTS_ROUTE + '/' + tournament.id)}>{`${tournament.title}`}</div>
            <span className="ms-3" style={{color: "#ccc", fontSize: 12}}>{`${date.toLocaleString('en-GB').split(',').join(' ')}`}</span>
            <span className="remove-btn" ></span>
        </li>
    )
})

export default TournamentItem;

