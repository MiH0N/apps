import React from 'react';


function FormAddCar(props) {
    let alphabet = 'بپتثجچحخدذرزژسشظطضصعغکگقفلمنوهی'.split('');
    let OpAlphbt = [];
    for (let element of alphabet) {
        OpAlphbt.push(<option value={element}>{element}</option>)
    }

    return (
        <form onChange={props.setChange}>
            <div className="form-row">
                <div className="col-md-6 mb-3">
                    <label  className="col-sm-6 col-form-label px-1" style={{display: 'block' ,textAlign: 'justify'}}>نام :</label>
                    <input type="text" className="form-control " id="" name={"fName"} placeholder="نام"
                           required/>

                </div>
                <div className="col-md-6 mb-3">
                    <label  className="col-sm-6 col-form-label px-1" style={{display: 'block' ,textAlign: 'justify'}}>نام خانوادگی:</label>
                    <input type="text" className="form-control " name={"lName"} id="" placeholder="نام خانوادگی"
                           required/>
                    {/*<div className="invalid-feedback">*/}
                    {/*    Please provide a valid city.*/}
                    {/*</div>*/}
                </div>
            </div>
            <p style={{textAlign: 'start'}}>پلاک ماشین</p>
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
                    <div className="col-md-4 col-sm-4 mb-3">
                        <input type="number" max={99} min={10} defaultValue={10} name={'three-P'} className="form-control"/>
                    </div>

                </div>
            </div>
            <div className="d-flex mb-3" style={{textAlign: 'right'}}>
                <label htmlFor="exampleColorInput" className="col-sm-6 col-form-label">رنگ :</label>
                <div className="col-sm-6">
                    <input type="color" className="form-control form-control-color"
                           id="color" name="color" defaultValue={'#000'} title="Choose your color" />
                </div>
            </div>



        </form>
    );
}

export default FormAddCar;
