import {BrowserRouter as Router, Link, NavLink, Route, Switch, useRouteMatch} from "react-router-dom";
import Header from "../components/Layouts/Header";
import Parking from "./Parking";
import TowerHanoi from "./TowerHanoi";
import Bracket from "./Bracket";
import Prison from "./Prison";
import React from "react";
import ImgMediaCard from "../components/ImgMediaCard";
import prison from './../assets/images/prison.png';
import hanoi from  './../assets/images/hanoi.png';
import parking from './../assets/images/parking.png';
import bracket from  './../assets/images/bracket.png';


function Home() {
    let match = useRouteMatch();
    return (
        <>
            <div className="cards-list-c">
                <div>
                    <Link to={`${match.url}/parking`} className={"a-c ml-3"}>
                        <div className="card-c 3">
                            <div className="card_image-c">
                                <img src={parking}/>
                            </div>
                            <div className="card_title-c">
                                <p>Parking</p>
                            </div>
                        </div>
                    </Link>
                </div>
                <div>
                    <Link  to={`${match.url}/prison`}  className={"a-c ml-3"}>
                        <div className="card-c 1">
                            <div className="card_image-c"><img src={prison}/></div>
                            <div className="card_title-c title-white-c">
                                <p>Prison</p>
                            </div>
                        </div>
                    </Link>
                </div>

                <div>
                    <Link to={`${match.url}/tower-hanoi`} className={"a-c ml-3"}>
                        <div className="card-c 4">
                            <div className="card_image-c">
                                <img src={hanoi}/>
                            </div>
                            <div className="card_title-c title-black-c">
                                <p>Tower of Hanoi</p>
                            </div>
                        </div>
                    </Link>
                </div>
                <div>
                    <Link to={`${match.url}/bracket`} className={"a-c ml-3"}>
                        <div className="card-c 2">
                            <div className="card_image-c">
                                <img  src={bracket}/>
                            </div>
                            <div className="card_title-c title-white-c">
                                <p>Bracket</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Home;
