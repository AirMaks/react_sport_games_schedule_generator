import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';

import {BrowserRouter as Router} from "react-router-dom";
import { Context } from './index';
import Spinner from 'react-bootstrap/Spinner';

 
  
import './App.scss';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { check } from './http/userAPI';

  
const App = observer(() => {


    const {user} = useContext(Context);
    const [loading, setLoading] = useState(true);


   

      useEffect(() => {
          check().then(() => {
            user.setUser(true);
            user.setIsAuth(true);
          }).finally(() => setLoading(false))
  
      }, []);

    
    

    // if (loading) {
    //   return <Spinner style={{position: "absolute", top: "50%", left: "50%"}} className='m-auto d-flex justify-content-center align-items-center' animation="grow"/>
    // }

    return (
      <div className="app">
          <Router>
            <NavBar />
            <AppRouter/>
          </Router>
      </div>
    );
})

export default App;
  