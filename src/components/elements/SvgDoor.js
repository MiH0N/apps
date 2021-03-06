import Car from "../../assets/svgs/car.svg";
import React from "react";
import useStyles from '../../assets/js/useStyles';


function SvgDoor(props) {
    // style={{position:'absolute', right:'0'}}
    const classes = useStyles();
    return (
        <>
            <div  className={classes.container} >
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                     className={classes.svg} viewBox="0 0 720.000000 1280.000000"
                     preserveAspectRatio="xMidYMid meet">

                    <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
                       fill="#000000" stroke="none">
                        <path d="M2950 12123 c-1171 -15 -1783 -25 -1827 -30 l-53 -5 6 -646 c5 -630
39 -2290 69 -3395 18 -638 21 -2370 10 -4732 -6 -1075 -4 -1710 4 -2135 7
-333 14 -624 17 -647 l5 -43 72 0 c128 0 144 10 182 104 l15 39 202 -7 c111
-4 220 -11 243 -16 42 -10 3207 -6 3652 5 l242 6 16 -30 c8 -17 15 -37 15 -46
0 -14 34 -33 68 -39 8 -1 17 -8 21 -15 5 -8 28 -11 66 -9 55 3 60 5 78 36 17
29 18 39 8 71 -8 28 -7 116 5 357 20 421 22 652 6 920 -10 177 -10 235 0 295
16 96 14 1765 -3 2003 -8 108 -10 343 -5 740 4 319 10 919 15 1331 5 413 14
912 20 1110 12 386 32 4332 24 4602 l-5 162 -82 5 c-90 6 -2716 14 -3086 9z"/>
                    </g>
                </svg>

            </div>
        </>
    );
}

export default SvgDoor;
