import {makeAutoObservable} from "mobx";


export default class TournamentsStore {
    constructor() {
        this._tournaments = [];
        makeAutoObservable(this);
    }


    setTournaments(tournaments) {
        this._tournaments = tournaments;
    }

   

    get tournaments() {
        return this._tournaments;
    }
}