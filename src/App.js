import './assets/style/App.css';
import './components/StackParking';
import React from 'react';
import Header from "./components/Layouts/Header";
import Parking from "./Routes/Parking";
import {  BrowserRouter as Router, Switch, Route, Link} from  "react-router-dom"
import Bracket from "./Routes/Bracket";
import TowerHanoi from "./Routes/TowerHanoi";
import Prison from "./Routes/Prison";
import Home from "./Routes/Home";


function App() {
    return (
        <Router>
            <Header />
            <Switch>
                <Route exact path="/apps" component={Home}/>
                <Route exact path={`/apps/parking`} component={Parking} />
                <Route exact path={`/apps/tower-hanoi`} component={TowerHanoi} />
                <Route exact path={`/apps/bracket`} component={Bracket} />
                <Route exact path={`/apps/prison`} component={Prison} />

            </Switch>
        </Router>
    );
}

export default App;
