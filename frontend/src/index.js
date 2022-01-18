import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TeamsStore from './store/TeamsStore';
import UserStore from './store/UserStore';
import 'bootstrap/dist/css/bootstrap.min.css';
import UsersStore from './store/UsersStore';
import TournamentsStore from './store/TournamentsStore';


export const Context = createContext(null);


ReactDOM.render(
  <Context.Provider value={{
    user: new UserStore(),
    teams: new TeamsStore(),
    tournaments: new TournamentsStore(),
    users: new UsersStore(),
  }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Context.Provider>,
  document.getElementById('root')
);

