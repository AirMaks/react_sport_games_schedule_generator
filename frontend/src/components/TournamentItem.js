import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { TOURNAMENTS_ROUTE } from "../utils/constants";


const TournamentItem = observer(({tournament, index}) => {
    const navigate = useNavigate(); 
    return (
        <li key={tournament.id}>
            <span>{`${index + 1}.`}</span>
            <div onClick={() => navigate(TOURNAMENTS_ROUTE + '/' + tournament.id)}>{`${tournament.name}`}</div>
            <span className="remove-btn" ></span>
        </li>
    )
})

export default TournamentItem;

