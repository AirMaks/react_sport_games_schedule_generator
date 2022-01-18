import { useContext, useEffect } from 'react';
import { Context } from '../index';
import TournamentsList from '../components/TournamentsList';
import { fetchTournaments } from '../http/tournamentsAPI';

const TournamentsPage = () => {

    const {tournaments} = useContext(Context);

    useEffect(() => {
        fetchTournaments().then(data => {
            tournaments.setTournaments(data)
        })

    }, []);

    return (
        <TournamentsList />
    )
}


export default TournamentsPage;