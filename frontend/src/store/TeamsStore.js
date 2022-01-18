import {makeAutoObservable} from "mobx";


export default class TeamsStore {
    constructor() {
        this._teams = [];
        makeAutoObservable(this);
    }


    setTeams(teams) {
        this._teams = teams;
    }

   

    get teams() {
        return this._teams;
    }
}