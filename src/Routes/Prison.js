import React, {useEffect, useState} from "react";
import SvgStick from "../components/elements/SvgStick";
import SvgDoor from "../components/elements/SvgDoor";
import useStyles from "../assets/js/useStyles";
import Timer from "../components/Timer";

function gateHandler(queue,yard) {
    setTimeout(()=>{
        yard.push(queue[0])
        queue.reverse();
        queue.pop();
        queue.reverse();
        return [queue,yard];
    },8000)
}

const Prison =  React.memo(props => {
    const classes = useStyles();
    let time =  Date.now()
    const [yard,setYard] = useState([{name: 'j1', status: 'yard', time},{name: 'j2', status: 'yard', time},{name: 'j3', status: 'yard', time},{name: 'j4', status: 'yard', time},{name: 'j5', status: 'yard', time},{name: 'j6', status: 'yard', time},{name: 'j7', status: 'yard', time},{name: 'j8', status: 'yard', time},{name: 'j9', status: 'yard', time},{name: 'j10', status: 'yard', time},{name: 'j11', status: 'yard', time},{name: 'j12', status: 'yard', time},{name: 'j13', status: 'yard', time},{name: 'j14', status: 'yard', time},{name: 'j15', status: 'yard', time},{name: 'j16', status: 'yard', time}]);
    const [queue, setQueue] = useState([]);
    const [gate, SetGate] = useState([]);
    const [once, setOnce] =useState(0);

    useEffect(()=>{
        moveRestaurant(yard.length);
        setOnce(prevState => prevState + 1)
    },[])


    function moveRestaurant(size){
        if(once === 0) {
            let old = yard;
            let tmpQueue = [];
            let cnt = 0;
            const interval = setInterval(() => {
                if (old[0] !== undefined) {
                    tmpQueue.push(old[0]);
                    setQueue([...tmpQueue]);
                    old.reverse();
                    old.pop();
                    old.reverse();
                    setYard([...old])
                }

                if (++cnt === size) {
                    clearInterval(interval);
                }

            }, 1000);
            return () => clearInterval(interval);
        }
    }
    const gateDoing =() =>{
        // const interval2 = 0;
        // console.log(queueT)
        setTimeout(() => {
            let tmpYard = yard;
            let tmpQueue = queue;
            console.log(tmpQueue,tmpYard)
            if (tmpQueue[0] !== undefined) {
                tmpYard.push(tmpQueue[0]);
                setYard([...tmpYard])
                tmpQueue.reverse();
                tmpQueue.pop();
                tmpQueue.reverse();
                setQueue([...tmpQueue]);
            }
        }, 1000);

    }

    return (
        <div className={""} dir={"ltr"} style={{background:'#9bf5e4', height:'100vh'}}>
            <div>
                <Timer />
            </div>
            <div className={classes.rowC}>
                <h2 className="d-block mx-auto my-2">yard</h2>
                <div className="col-12 d-flex">
                    {yard.length?
                        yard.map(item => (
                            <SvgStick status={item.status} name={item.name}/>
                        )):
                        <p>nobody !!</p>
                    }
                </div>
            </div>
            <div className={classes.rowC}>
                <h2 className="d-block mx-auto my-2">lobby</h2>
                <div className="col-12 d-flex">
                    {queue.length>8?
                        queue.filter((item,index) => index >=8).map((item , key) => (
                            <SvgStick status={"wait"} name={item.name}/>
                        )):
                        <p>nobody !!</p>
                    }
                </div>
            </div>
            <div className={classes.rowC}>
                <div className={classes.rowC + " col-9"}>
                    <h2 className="d-block mx-auto my-2">stair</h2>
                    <div className="col-12 d-flex" dir={"rtl"}>
                        <SvgDoor/>
                        {queue.length?
                            queue.filter((item,index) => index < 8 && index >0).map(item => (
                                <SvgStick status={"run"} name={item.name}/>
                            )):
                            <p>nobody !!</p>
                        }
                    </div>
                </div>

                <div className="col row">
                    {queue.length?
                        queue.filter((item,index) => index === 0).map(item => (
                            <SvgStick status={"run"} name={item.name}/>
                        )):
                        <p>nobody !!</p>
                    }
                </div>
            </div>
            <button className="btn-primary btn" onClick={gateDoing}>get</button>
        </div>
    );
})

export default Prison;

