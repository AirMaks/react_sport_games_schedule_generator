import { observer } from "mobx-react-lite";
import { useContext } from "react";
import Container from "react-bootstrap/Container";
import { Context } from "../index";
import Tournament from "./TournamentItem";



const TournamentsList = observer(() => {
    const {tournaments} = useContext(Context);
    return (
        <Container>
            <h1 className="mt-5">Список турниров</h1>
            <ul className="mt-5 tournaments-list">
                { tournaments.tournaments.map((tournament, index) => (
                    <Tournament key={tournament.id} tournament={tournament} index={index}/>
                ))}
            </ul>
        </Container>
    )
})

export default TournamentsList;



