import React, {useEffect, useState} from "react";
import solveHanoi from "../assets/functions/solveHanoi";
import Modal from "react-bootstrap/Modal";
import Button from "@material-ui/core/Button";

function createTower(n) {
    return [...Array(n)].map((_, i) => n - i);
}

function createTowers(h) {
    return [createTower(h), [2,1], []];
}

function move(blocks, from, to) {
    blocks[to].push(blocks[from].pop());
    return [...blocks];
}

function Block({ value, ...props }) {
    return (
        <div
            {...props}
            className="hanoi-block"
            style={{ width: `${value * 3}vw` }}>
        </div>
    );
}

function Bottom({ index, ...props }) {
    return (
        <>
            <div className="hanoi-bottom"></div>
            <div className="hanoi-desc">{index}</div>
        </>
    );
}

function HanoiTower({ blocks, ...props }) {
    const height = blocks.reduce((acc, l) => acc + l.length, 0);
    const xs = [...Array(blocks.length)].map((_, x) => {
        const h = blocks[x].length;
        return (
            <div key={x} className="hanoi-block-container">
                {[...Array(height)].map((_, y) => {
                    const idx = height - y - 1;
                    return <Block key={idx} value={idx < h ? blocks[x][idx] : 0} />;
                })}
                <Bottom index={x + 1} />
            </div>
        );
    });
    return <div className="hanoi-container">{xs}</div>;
}

function Solutions({ value, cursor, ...props }) {
    return (
        <div {...props}>
            {value.map(({ num, from, to }, i) => (
                <div
                    key={i}
                    className={i === cursor ? "sol-highlight" : "sol-normal"}
                >{`${num} : ${from} --> ${to}`}</div>
            ))}
        </div>
    );
}

function setOption(n) {
    let ans = [];
    for(let i=1; i<=n; i++){
        ans.push({number:i,gp:1});
    }
    return ans;
}

function TowerHanoi() {
    const initialBlockNum = 3;
    const [optionNum, setOptionNum] = useState(setOption(initialBlockNum));
    const [modalCreat, setModalCreat] = useState(false);
    const [blocks, setBlocks] = useState(createTowers(initialBlockNum));
    const [cursor, setCursor] = useState(0);
    const [solution, setSolution] = useState(solveHanoi(initialBlockNum));

    const handleModalCreat = (e) =>{
        setModalCreat(!modalCreat)
    }

    const setChangeOption = (e) =>{
        const { options } = e.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                let val = options[i].value.split(":");
                value.push({number:val[0],gp:val[1]});
            }
            else{
                let val = options[i].value.split(":");
                value.push({number:val[0],gp:val[1]});
            }
        }
        console.log(value)
    }

    const handleInputNum = e => {
        if (e.keyCode === 13) {
            const num = Number(e.target.value);
            if (num > 0 && num < 15) {
                const blks = createTowers(num);
                setBlocks(blks);
                setCursor(0);
                setSolution(solveHanoi(num));
                console.log(solveHanoi(num))
            }
            e.target.value = "";
        }
    };

    const handleLeft = e => {
        if (cursor > 0) {
            const { from, to } = solution[cursor - 1];
            setBlocks(move(blocks, to - 1, from - 1));
            setCursor(cursor - 1);
        }
    };
    const handleRight = e => {
        if (cursor < solution.length) {
            const { from, to } = solution[cursor];
            setBlocks(move(blocks, from - 1, to - 1));
            setCursor(cursor + 1);
        }
    };

    return (
        <div className="App" dir={"ltr"}>
            <div className="App-header">Tower of Hanoi</div>
            <div className="App-body mt-3">
                <HanoiTower blocks={blocks} />
            </div>
            <div className="App-tail">

                <div>
                    Height : <input onKeyDown={handleInputNum} />
                </div>
                <div>
                    {`Move `}
                    <button onClick={handleLeft}>{"<"}</button>
                    <button onClick={handleRight}>{">"}</button>
                    <button onClick={handleModalCreat}>{"+"}</button>
                </div>
                <Solutions value={solution} cursor={cursor} />
            </div>
            <Modal  show={modalCreat} onHide={handleModalCreat}>
                <Modal.Header closeButton>
                    <Modal.Title>create tower</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-center" dir={"ltr"}>
                        <form className="form-inline mx-2 row" onChange={setChangeOption}>
                            <div className="form-inline mx-2">
                                <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">1:</label>
                                <select className="custom-select my-1 mr-sm-2" id="gp1" multiple>
                                    {
                                        optionNum.map(item => (
                                            <option value={item.number+':'+item.gp} name={item.gp} disabled={item.gp !== 1}>{item.number}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="form-inline mx-2">
                                <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">2:</label>
                                <select className="custom-select my-1 mr-sm-2" id="gp2" multiple>
                                    {
                                        optionNum.map(item => (
                                            <option value={item.number} name={item.gp} disabled={item.gp !== 2}>{item.number}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="form-inline mx-2">
                                <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">3:</label>
                                <select className="custom-select my-1 mr-sm-2" id="gp3" multiple>
                                    {
                                        optionNum.map(item => (
                                            <option value={item.number} name={item.gp} disabled={item.gp !== 3}>{item.number}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </form>

                    </div>
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="secondary" onClick={handleModalCreat}>
                        Close
                    </Button>
                    <Button variant="primary"  onClick={handleModalCreat}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default TowerHanoi;
