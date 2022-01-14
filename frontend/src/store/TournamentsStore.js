import {makeAutoObservable} from "mobx";


export default class TournamentsStore {
    constructor() {
        this._tournaments = [
            {id: 1, name: "Champions League"},
            {id: 2, name: "Europe League"},
            {id: 3, name: "Premier League"},
        ];
        makeAutoObservable(this);
    }


    setTournaments(tournaments) {
        this._tournaments = tournaments;
    }

   

    get tournaments() {
        return this._tournaments;
    }
}