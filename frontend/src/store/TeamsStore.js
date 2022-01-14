import {makeAutoObservable} from "mobx";


export default class TeamsStore {
    constructor() {
        this._teams = [
            {id: 1, name: "Real Madrid"},
            {id: 2, name: "Barcelona"},
            {id: 3, name: "Atletico"},
            // {id: 4, name: "MU"}
        ];
        makeAutoObservable(this);
    }


    setTeams(teams) {
        this._teams = teams;
    }

   

    get teams() {
        return this._teams;
    }
}