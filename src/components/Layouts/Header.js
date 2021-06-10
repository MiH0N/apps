import React  from 'react';
import {NavLink, BrowserRouter as Router} from "react-router-dom";


function Header() {


    return (
        <header>
            <div className="navbar navbar-dark navbar-expand bg-dark shadow-sm">
                <div className="container d-flex justify-content-between">
                    <a href="#" className="navbar-brand d-flex align-items-center">
                        <strong>Parking Shahed</strong>
                    </a>
                    <ul className="navbar-nav mr-auto">
                        {/*<li className="nav-item">*/}
                        {/*    <Link className="nav-link" exact to="/" activeStyle={{*/}
                        {/*        color : 'red'*/}
                        {/*    }}>Home</Link>*/}
                        {/*</li>*/}
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/parking">Parking</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/timer">Timer</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/bracket">Bracket</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}


export default Header;