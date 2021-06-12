import React, {useEffect, useState} from "react";
import solveHanoi from "../assets/functions/solveHanoi";
import Modal from "react-bootstrap/Modal";
import Button from "@material-ui/core/Button";
import useStyles from "../assets/js/useStyles";

function createTower(n) {
    return [...Array(n)].map((_, i) => n - i);
}

function createTowers(tw1, tw2, tw3) {
    return [tw1, tw2, tw3];
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
        ans.push(i)
    }
    return ans;
}

function lockTower(towers, n) {
    let wher = [];
    wher.fill(0,0,n)
    for(let j=0; j<3; j++){
        for(let i=1; i<=n; i++){
            if(towers[j].findIndex(hanoi => hanoi === i) !== -1)
                wher[towers[j][towers[j].findIndex(hanoi => hanoi === i)]] = j;
        }
    }
    return wher;
}
function aux(t1, t2) {
    let arr = [0,0,0];
    arr[t1-1] = 1;
    arr[t2-1]= 1;
    return arr.indexOf(0)+1;
}
function ClutterTowers(blocks,initialBlockNum) {
    let towers = blocks;
    let soul = [];
    let wher = lockTower(towers,initialBlockNum);
    for(let i=1; i<initialBlockNum; i++){
        if(wher[i] !== wher[i+1]){
            let slv = solveHanoi(i,wher[i]+1 , aux(wher[i]+1,wher[i+1]+1), wher[i+1]+1)
            soul = soul.concat(slv)
            wher = lockTower(towers,initialBlockNum);
        }
    }
    return soul;
}
function randomArray() {
    const rndInt = Math.random() * (4 - 1) + 1;
    const rndInt2 = Math.random() * (7 - 1) + 4;
    let arr = [9,6,3,4,1,7,5,8,2]
    return [arr.slice(0, rndInt).sort(function(a, b){return b - a}),arr.slice(rndInt, rndInt2).sort(function(a, b){return b - a}),arr.slice(rndInt2, 9).sort(function(a, b){return b - a})];

}

function TowerHanoi() {
    let random = randomArray();
    const classes = useStyles();
    const [initialBlockNum, setInitialBlockNum] = useState(9);
    const [optionNum, setOptionNum] = useState(setOption(initialBlockNum));
    const [modalCreat, setModalCreat] = useState(false);
    const [blocks, setBlocks] = useState(createTowers(random[0],random[1],random[2]));
    const [cursor, setCursor] = useState(0);
    const [solution, setSolution] = useState(ClutterTowers(blocks,initialBlockNum));
    const [error, setError] = useState(0)
    const [arrTower, setArrTower] = useState([[],[],[],[]])
    const [key,setKey] = useState(1);


    useEffect(()=>{
        setSolution(ClutterTowers(blocks,initialBlockNum));

    }, [])

    const handleModalCreat = (e) =>{
        setModalCreat(!modalCreat)
    }
    const creatTowerModal = (e) =>{
        let arr1 = arrTower[1].filter(val => arrTower[2].includes(val));
        let arr2 = arrTower[1].filter(val => arrTower[3].includes(val));
        let arr3 = arrTower[2].filter(val => arrTower[3].includes(val));
        let same = arr1.length + arr2.length + arr3.length
        let all = arrTower[1].length + arrTower[2].length + arrTower[3].length
        if(same !== 0 || all-same!=9){
            setError(true)
        }
        else {
            setInitialBlockNum(9)
            arrTower[1].sort(function(a, b){return b - a});
            arrTower[2].sort(function(a, b){return b - a});
            arrTower[3].sort(function(a, b){return b - a});
            const blks = createTowers(arrTower[1],arrTower[2],arrTower[3]);
            setBlocks(blks);
            setCursor(0);
            setSolution(ClutterTowers(blocks,initialBlockNum));
            setKey(key+1);
            setError(false)
            handleModalCreat()
        }
    }

    const setChangeOption = (e) =>{
        const { options } = e.target;
        const value = arrTower;
        for (let i = 0, l = options.length; i < l; i += 1) {
            let val = options[i].value.split(":");
            if (options[i].selected) {
                if(value[val[1]].indexOf(val[0]) === -1) {
                    value[val[1]].push(val[0]);
                }
            }
            else {
                const index = value[val[1]].indexOf(val[0]);
                if (index > -1) {
                    value[val[1]].splice(index, 1);
                }
            }
        }
        setArrTower(value)
    }

    const handleInputNum = e => {
        if (e.keyCode === 13) {
            const num = Number(e.target.value);
            if (num > 0 && num < 15) {
                const blks = createTowers(num);
                setBlocks(blks);
                setCursor(0);
                setSolution(solveHanoi(num));
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
            <div className="App-tail" key={key}>

                {/*<div>*/}
                {/*    Height : <input onKeyDown={handleInputNum} />*/}
                {/*</div>*/}
                <div className="d-flex justify-content-center align-items-center mb-3">
                    <div>{`Move :`}</div>
                    <button className="mr-1 ml-3 btn btn-outline-success" onClick={handleLeft}>{"<"}</button>
                    <button className="mr-3 ml-1 btn btn-outline-success" onClick={handleRight}>{">"}</button>
                    <button className="mx-2 btn btn-primary d-none" onClick={handleModalCreat}>{"+"}</button>
                </div>
                {solution.length ?
                    <Solutions style={{
                        overflowY: 'auto',
                        background: 'aquamarine',
                        height: 'inherit',
                    }} value={solution} cursor={cursor}/> : null
                }
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
                                            <option value={item+":1"} name={1} >{item}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="form-inline mx-2">
                                <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">2:</label>
                                <select className="custom-select my-1 mr-sm-2" id="gp2" multiple>
                                    {
                                        optionNum.map(item => (
                                            <option value={item+":2"} name={2} >{item}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="form-inline mx-2">
                                <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">3:</label>
                                <select className="custom-select my-1 mr-sm-2" id="gp3" multiple>
                                    {
                                        optionNum.map(item => (
                                            <option value={item+":3"} name={3} >{item}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </form>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {error ?
                        <div className="alert alert-danger mb-0 text-right"  role="alert">
                            لطفا دیسک های تکراری انتخاب نکنید
                        </div> : null
                    }
                    <Button variant="secondary" onClick={handleModalCreat}>
                        Close
                    </Button>
                    <Button variant="primary"  onClick={creatTowerModal}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default TowerHanoi;
