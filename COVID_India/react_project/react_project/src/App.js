import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import NavBar from './components/navBar';
import Home from './pages/home';
import TestvsCases from './pages/testVsCases';
import AgeGroups from './pages/ageGroups';
import HospitalBeds from './pages/hospitalBeds';

function App() {
  return (
    <Router>
        
        <NavBar/>
        <div className="container">
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/testvscases" component={TestvsCases}></Route>
          <Route exact path="/agegroup" component={AgeGroups}></Route>
          <Route exact path="/hospitalsbeds" component={HospitalBeds}></Route>
        </Switch>
        </div>
        
       
      
      </Router>
  );
}

export default App;
