import {makeStyles} from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),

        },
    },
    wrapper: {
        width: '100%'
    },
    paper: {
        zIndex: 1,
        position: 'relative',
        margin: theme.spacing(1),
    },
    svg: {
        width: 200,
        height: 150,
    },
    svgStick: {
        width: 80,
        height: 80,
    },
    rowC: {
        display: 'flex',
        flexWrap: 'wrap',
        minHeight : '200px'
    },
    polygon: {
        fill: theme.palette.common.white,
        stroke: theme.palette.divider,
        strokeWidth: 1,
    },
    dFlx : {
        display : 'flex',
    },
    container : {
        position: 'relative',
        textAlign: 'center',
        color: 'white',
    },
    containerStick : {
        alignSelf: 'flex-end',
        height: 'min-content',
    },
    centered : {
        position: 'absolute',
        top: '50%',
        left: '50%',
        margin :'0',
        transform: 'translate(-50%, -50%)',
    },
    centeredStick :{
        fontSize: 'medium',
        textAlign: 'center',
    },
    '@global': {
        '*': {
            'scrollbar-width': 'thin',
        },
        '*::-webkit-scrollbar': {
            width: '4px',
            height : '4px'
        },
        '*::-webkit-scrollbar-track': {
            // '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
            borderRadius: 6,
            backgroundColor: 'rgba(35,49,86,0.58)',
        }
    }
}));
