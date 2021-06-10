import Header from "../components/Layouts/Header";
import StackParking from "../components/StackParking";
import QueueParking from "../components/QueueParking";
import React from "react";

function Parking() {
    return (
        <>
            <h3 className={"App-header"}> Stack Parking</h3>
            <StackParking />
            <h3 className={"App-header"}> Queue Parking</h3>
            <QueueParking />
        </>
    );
}

export default Parking;
