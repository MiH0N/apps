import React from 'react';


function FormRemoveCar(props) {
    let alphabet = 'بپتثجچحخدذرزژسشظطضصعغکگقفلمنوهی'.split('');
    let OpAlphbt = [];
    for (let element of alphabet) {
        OpAlphbt.push(<option value={element}>{element}</option>)
    }

    return (
        <form onChange={props.setChange}>
            <p style={{textAlign: 'start'}}>پلاک ماشین</p>
            <div className="">
                <div className="">
                    <div className="form-row">
                        <div className="col-md-4 col-sm-4 mb-3">
                            <input type="number" name={'one-P'} max={999} min={100} defaultValue={100} className="form-control"/>
                        </div>
                        <div className="col-md-4 col-sm-4 mb-3">
                            <select className="custom-select " id="inlineFormCustomSelect" name={'two-P'}>
                                <option selected>...</option>
                                <option  value="الف">الف</option>
                                {OpAlphbt}
                            </select>
                        </div>
                        <div className="col-md-4 mb-3">
                            <input type="number" max={99} min={10} defaultValue={10} name={'three-P'} className="form-control"/>
                        </div>

                    </div>
                </div>
            </div>
        </form>
    );
}

export default FormRemoveCar;
