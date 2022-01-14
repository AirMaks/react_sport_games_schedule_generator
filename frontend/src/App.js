import React from 'react';

import {BrowserRouter as Router} from "react-router-dom";

 
  
import './App.scss';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';

  
  export default function App() {
    return (
      <div className="app">
          <Router>
            <NavBar />
            <AppRouter/>
          </Router>
      </div>
    );
  }
  