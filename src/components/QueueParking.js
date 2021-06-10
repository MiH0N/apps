import React, {useEffect, useRef} from 'react';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { spacing } from '@material-ui/system';
import Box from '@material-ui/core/Box';
import 'bootstrap/dist/css/bootstrap.min.css';
import SvgCar from "./SvgCar";
import useStyles from '../assets/js/useStyles';
import Modal from "react-bootstrap/Modal";
import FormAddCar from "./Forms/FormAddCar";
import FormRemoveCar from "./Forms/FormRemoveCar";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} style={{direction:'ltr'}} />;
}

export default function QueueParking() {
    const classes = useStyles();
    const [exitCar,setExitCar] = React.useState(true);
    const [cars, setCars] = React.useState([]);
    const [newCar, setNewCar] = React.useState({id:0,chkin:true, color:'#000', tag:'10الف100'});
    const [ targetCar , setTargetCar] = React.useState({tag:'10الف100'});
    const [lastCar, setLastCar] = React.useState('')
    const [permit, setPermit] = React.useState(true)
    const [modalAddCar,setModalAddCar] = React.useState(0)
    const [errorAdd, setErrorAdd] =React.useState(false);
    const [modalRemoveCar,setModalRemoveCar] = React.useState(0)
    const [errorRemove, setErrorRemove] =React.useState(false);

    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    const handleClickSnackBar = () => {
        setOpenSnackbar(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };

    useEffect(() => {
        let tmp = [];
        let cnt = 0;
        const interval = setInterval(() => {
            let alphabet = 'بپتثجچحخدذرزژسشظطضصعغکگقفلمنوهی'.split('');
            let tag = '101' + alphabet[Math.floor(Math.random()*31)] +'11';
            let color = '#'+Math.floor(Math.random()*16777215).toString(16)
            tmp = [...tmp,{id:Date.parse(new Date()), tag, chkin:true, color, dir:'right', fName:'محمد', lName:'عابدینی'}];
            setCars(tmp);

            if (++cnt === 5) {
                clearInterval(interval);
            }

        }, 1500);
        return () => clearInterval(interval);
    }, []);

    const handleChangeExit = () => {
        setExitCar((prev) => !prev);
    }
    const handleModal = () => {
        setModalAddCar((prev) => !prev);
        setErrorAdd(false)
    }
    const handleModalAdd = () => {
        addCar();
    }
    const handleChangeModalRemove = () => {
        setModalRemoveCar((prev) => !prev);
        setErrorRemove(false)
    }
    const handleModalRemove = () => {

        let  tag = targetCar['one-P']+ targetCar['two-P']+ targetCar['three-P']
        const isTagCar = (element) => element.tag === tag;
        if(cars.findIndex(isTagCar) === -1){
            setErrorRemove(true)
        }
        else if(cars.findIndex(isTagCar) === 0){
            setLastCar(tag);
            handleChangeModalRemove()
            handleClickSnackBar()
            removeCar();
        }
        else {
            setLastCar(tag);
            handleChangeModalRemove()
            let index = 0;
            let tmpParking = [];
            let tmp = cars.slice();

            const interval = setInterval(() => {
                tmp[0].chkin = false;
                (tmp[0].tag === tag ? tmp[0].dir = 'up' : tmp[0].dir = 'left')

                handleChangeExit();
                setTimeout(()=>{
                    if(tmp[0].tag !== tag){
                        let obj = tmp[0];
                        obj.chkin = true;
                        obj.dir = 'right';
                        tmpParking.push(obj)
                    }
                    tmp.reverse();
                    tmp.pop();
                    tmp.reverse();
                    handleChangeExit();
                },1000)
                setCars(tmp);

                if (tmp[0].tag === tag) {

                    const interval2 = setInterval(() => {

                        tmp = [...tmp,tmpParking[0]];
                        tmpParking.reverse()
                        tmpParking.pop();
                        tmpParking.reverse()
                        setCars(tmp);

                        if (!tmpParking.length) {
                            handleClickSnackBar()
                            clearInterval(interval2);
                        }

                    }, 1500);
                    clearInterval(interval);
                }
                index--;

            }, 1500);
            return () => clearInterval(interval);

        }
    }

    const addCar = () =>{
        if(!newCar.hasOwnProperty("one-P")){
            newCar['one-P'] = 100
        }
        if(!newCar.hasOwnProperty("two-P")){
            newCar['two-P'] = 'الف'
        }
        if(!newCar.hasOwnProperty("three-P")){
            newCar['three-P'] = 10
        }
        let  tag = newCar['one-P']+ newCar['two-P']+ newCar['three-P']
        const isTagCar = (element) => element.tag === tag;
        if(cars.findIndex(isTagCar) === -1){
            let carAdd = {tag , chkin:true, id:Date.parse(new Date()), color : newCar['color'],dir:'right'};
            let tmp = [...cars,carAdd];
            setCars(tmp);
            setPermit(true);
            setNewCar({})
            setErrorAdd(false)
            setModalAddCar(false);
        }
        else {
            setErrorAdd(true)
            setPermit(true);
        }
    }
    const removeCar = () =>{
        let tmp = cars.slice();
        tmp[0].chkin = false
        tmp[0].dir = 'up'
        handleChangeExit();
        // tmp[tmp.length - 1].props.in = false
        setTimeout(()=>{
            tmp.reverse()
            tmp.pop();
            tmp.reverse()
            handleChangeExit();
        },1000)

        setCars(tmp);
        // setKey(Date.parse(new Date()))
    }
    const setChangeNewCar =(e) =>{
        setPermit(false);
        let tmp = newCar ;
        tmp = {...tmp, [e.target.name]: e.target.value}
        setNewCar(tmp);
    }
    const setChangeRemoveCar =(e) =>{
        let tmp = targetCar ;
        tmp = {...tmp, [e.target.name]: e.target.value}
        setTargetCar(tmp);
    }

    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                <div >
                    <div className={classes.root + " d-flex"}>
                        <Button variant="contained" disabled={!exitCar} color="primary" onClick={handleModal}>
                            add
                        </Button>
                        {!cars.length ? null :
                            <Button variant="contained" disabled={!exitCar} color="secondary"
                                    onClick={handleChangeModalRemove}>
                                remove
                            </Button>
                        }
                    </div>
                    {!exitCar?
                        <div style={{position: 'absolute', left: '20px', top: '20px', display: 'flex'}}>
                            <p className={'px-2 mx-2'} style={{fontSize:'14px', color:'white'}}>درحال خروج ماشین</p>
                            <CircularProgress />
                            {/*<ClapSpinner size={30} backColor={'#fff'} frontColor={'#2f30a7'} />*/}
                        </div>
                        :null
                    }
                </div>

                <div className={classes.dFlx} style={{ overflowX: 'scroll'}}>

                    {cars.map(item => (
                        <Slide direction={item.dir} timeout={2000} key={item.id} in={item.chkin} mountOnEnter unmountOnExit>
                            <Paper elevation={0} className={classes.paper}>
                                <SvgCar fill={item.color} id={item.id} tag={item.tag}/>
                            </Paper>
                        </Slide>
                    ))}
                </div>
                {/*  Add Modal*/}
                <Modal  show={modalAddCar} onHide={handleModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>ورود ماشین</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormAddCar setChange={setChangeNewCar}/>
                        {errorAdd ?
                            <div className="alert alert-danger mb-0 text-right"  role="alert">
                                شماره پلاک تکراری است و قبلا وارد پارکینگ شده است
                            </div> : null
                        }
                    </Modal.Body>
                    <Modal.Footer>

                        <Button variant="secondary" onClick={handleModal}>
                            Close
                        </Button>
                        <Button variant="primary" disabled={permit} onClick={handleModalAdd}>
                            add
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Remove Modal*/}
                <Modal  show={modalRemoveCar} onHide={handleChangeModalRemove}>
                    <Modal.Header closeButton>
                        <Modal.Title>خروج ماشین</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormRemoveCar setChange={setChangeRemoveCar}/>
                        {errorRemove ?
                            <div className="alert alert-danger mb-0 text-right"  role="alert">
                                شماره پلاک یافت نشد! دوباره امتحان بکنید
                            </div> : null
                        }
                    </Modal.Body>
                    <Modal.Footer>

                        <Button variant="secondary" onClick={handleChangeModalRemove}>
                            Close
                        </Button>
                        <Button variant="primary"  onClick={handleModalRemove}>
                            Remove
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Snackbar open={openSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'left'}}  autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        ماشین {lastCar} خارج شد
                    </Alert>
                </Snackbar>
            </div>
        </div>
    );
}
