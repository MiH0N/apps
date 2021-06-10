import React , {useState} from "react";
import Calculator from "../components/Calculator";


export default function Bracket() {
    const [output, setOutput] = useState('');
    const [error, setError] = useState(false);
    const [answer, setAnswer] = useState('');

    let setStandard = (inp) =>{
        let arr = [];
        let num = '';
        for (let i = 0; i < inp.length; i++){
            if((inp[i]>=0 && inp[i]<=9) || inp[i] === '.'){
                num += inp[i];
            }
            else {
                arr.push(num);
                arr.push(inp[i])
                num = '';
            }
        }
        arr.push(num);
        return arr;
    }
    let checkError = (arr)=>{
        let ck = [];
        for (let i = 0; i < arr.length; i++){
            ck.push(typeof (arr[i]) !== 'number')
        }
        for (let i = 1; i < arr.length; i++){
            if(ck[i] * ck[i-1] ){
                return true;
            }
        }
        return false;
    }

    let stepOne = (inp, opra1 , opra2) => {
        let arr = setStandard(inp);
        let sOne = [];
        let i = 0;
        while (i < arr.length) {
            if(arr[i] === opra1  || arr[i] === opra2){
                let opra = arr[i];
                let  top = sOne[sOne.length-1];
                sOne.pop();
                i++;
                while (arr[i] ==='') i++;
                sOne.push('(' + top + opra + arr[i] + ')')
                i++;
            }
            else {
                if(arr[i] !=='') sOne.push(arr[i])
                i++;
            }
        }
        const result = sOne.filter(el => el.length > 0);
        return result;

    }
    const changeInput = (e)=>{
        if (e.target.name === 'clear') {
            setOutput("")
        }
        else if(e.target.name === '0' && output.length>0){
            setOutput(output + e.target.name)
        }
        else {
            if(e.target.name ==='.' && !output.length){
                setOutput('0' + e.target.name)
            }
            setOutput(output + e.target.name)
        }
    }
    const setParentheses = ()=>{
        console.log(checkError(output))
        if(checkError(output)){
            let s1 = stepOne(output,'^','!');
            let s2 = stepOne(s1,'/','*');
            let s3 = stepOne(s2 , '+', '-');
            setAnswer(s3)
        }
        else {
            setError(true);
            setAnswer('error in input')
        }

    }
    return (
        <div className={"body-cal"} dir={"ltr"}>
            <div className="col-4 col-md-6">
                <Calculator setChange={changeInput} out={output} finalSub={setParentheses}/>
            </div>
            <div className="col-5 d-flex my-auto flex-column">
                <div className="d-flex ">
                    <h3 className={"d-inline-block mx-2"}>set Parentheses :</h3>
                    <h5 className={"d-inline-block mx-2 align-self-center"} style={error?{color:'red'}:{}}>{answer}</h5>
                </div>
                <div className="d-flex">
                    <h3 className={"d-inline-block mx-2"}>is error ?</h3>
                    <h5 className={"d-inline-block mx-2 align-self-center"}>{error ? 'Yes' : 'No'}</h5>
                </div>
            </div>
        </div>
    );
}

