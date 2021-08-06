import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
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
          <Switch>
            <Route exact path="/">
              <Menu />
            </Route>
            <Route exact path="/krug">
              <Krug />
            </Route>
            <Route exact path="/turnir">
              <Turnir />
            </Route>
            <Route exact path="/setka">
              <Setka />
            </Route>
            <Redirect from="/" exact to="/" />
          </Switch>
        </Router>
      </div>
    );
  }
  