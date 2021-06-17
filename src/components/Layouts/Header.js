import React  from 'react';
import {NavLink, BrowserRouter as Router} from "react-router-dom";


function Header() {


    return (
        <header>
            <div className="navbar navbar-dark navbar-expand bg-dark shadow-sm">
                <div className="container d-flex justify-content-between">
                    <a href="/apps" className="navbar-brand d-flex align-items-center">
                        <strong>Project Shahed</strong>
                    </a>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/apps/parking">Parking</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/apps/tower-hanoi">Tower of Hanoi</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/apps/bracket">Bracket</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/apps/prison">Prison</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}


export default Header;