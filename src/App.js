import './assets/style/App.css';
import './components/StackParking';
import React from 'react';
import Header from "./components/Layouts/Header";
import Parking from "./Routes/Parking";
import {  BrowserRouter as Router, Switch, Route, Link} from  "react-router-dom"
import TodoApp from "./Routes/Todo";
import Bracket from "./Routes/Bracket";
import TowerHanoi from "./Routes/TowerHanoi";


function App() {
    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/parking" component={Parking} />
                <Route path="/tower-hanoi" component={TowerHanoi} />
                <Route path="/bracket" component={Bracket} />
            </Switch>
        </Router>
    );
}

export default App;
