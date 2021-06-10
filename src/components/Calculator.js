import React from "react";


export default function Calculator(props) {
    return (
        <>
            <div className="frame-cal p-lg-4 pl-md-2 pl-sm-1" >
                <div className="top-cal">
                    <input name="result" className={"output-cal "} disabled id="result" defaultValue={props.out}/>
                </div>
                <div className="functionbox-cal">
                    <div className="rowone">
                        <button className=" button-cal seven" onClick={props.setChange} name="7">7</button>
                        <button className=" button-cal eight" onClick={props.setChange} name="8">8</button>
                        <button className=" button-cal nine" onClick={props.setChange} name="9">9</button>
                        <button className=" button-cal operator" onClick={props.setChange} name="/">    &divide;</button>
                    </div>
                    <div className="rowtwo-cal">
                        <button className=" button-cal four" onClick={props.setChange} name="4">4</button>
                        <button className=" button-cal five" onClick={props.setChange} name="5">5</button>
                        <button className=" button-cal six" onClick={props.setChange} name="6">6</button>
                        <button className=" button-cal operator" onClick={props.setChange} name="*">x</button>
                    </div>
                    <div className="rowthree-cal">
                        <button className=" button-cal one" onClick={props.setChange} name="1">1</button>
                        <button className=" button-cal two" onClick={props.setChange} name="2">2</button>
                        <button className=" button-cal three" onClick={props.setChange} name="3">3</button>
                        <button className=" button-cal operator" onClick={props.setChange} name="-">-</button>
                    </div>
                    <div className="rowfour-cal">
                        <button className=" button-cal zero" onClick={props.setChange} name="0">0</button>
                        <button className=" button-cal operator" onClick={props.setChange} name=".">.</button>
                        <button className=" button-cal operator" onClick={props.setChange} name="^">^</button>
                        <button className=" button-cal operator" onClick={props.setChange} name="+">+</button>
                    </div>
                    <div className="rowfive-cal">
                        <button className=" button-cal buttonclear-cal" onClick={props.setChange} name="clear">C</button>
                        <button className="col-8 button-cal zero" id="submit" onClick={props.finalSub}>submit</button>
                    </div>
                </div>
            </div>
        </>
    );
}

