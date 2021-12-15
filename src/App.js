import React, {Fragment} from 'react';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";

  import Turnir from './Turnir';
  import Krug from './Krug';
  import Setka from './Setka';
  
  import './App.scss';


  const Menu = () => (
    <ul className="menu">
        <li><Link to="/krug">Круговой формат</Link></li>
        <li><Link to="/turnir">Турнир</Link></li>
        <li><Link to="/setka">Сетка</Link></li>
    </ul>
  );



  
  export default function App() {
    return (
      <div className="app">
        <Router>
          <Fragment>
            <Routes>
                <Route exact path='/' element={<Menu/>}/>
                <Route exact path='/krug' element={<Krug/>} />
                <Route exact path='/turnir' element={<Turnir/>} />
                <Route exact path='/setka' element={<Setka/>}/>
            </Routes>
          </Fragment>
        </Router>
      </div>
    );
  }
  