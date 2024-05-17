import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import '../../../css/selectZabi.css';
function SelectZabi({options, primaryLabel}) {
    const labelRef= useRef(null);
    const [currentElement, setCurrentElement] = useState(primaryLabel);
    const select = () => {
        return <div>
            <div>select zabi</div>
            <div>option zabi</div>
        </div>
    }

    const changeLabel =(val)=>{
        
        // labelRef.current.textContent=val;
        // ReactDOM.render(val, labelRef.current);
        
    //     const root = ReactDOM.createRoot(labelRef.current);

    //    console.log(root);
    }
    
    const showOption=()=>{
        let vals;
        vals=options.map((val, i)=>{
            return <div className='containerOptionSZ' key={i} onClick={()=>setCurrentElement(val.html)}>
                {val.html}
                 </div>
        })
        return vals;
    }

    return (
        <div className='mainSZ'>
            <div className='titleSZ'>
                <span className="labelSZ" ref={labelRef}> {currentElement}</span>
                <i className="icofont-caret-down " />
            </div>
            <div className='mainOptionSZ' >
                {showOption()}
            </div>
        </div>
    );
}

export default SelectZabi;

// import Title from '../hooks/Title'
// const AddPersonnelSlip=()=>{
// return(
// <div className=''>
//  <SelectZabi />
// </div>
// )
// }
// export default AddPersonnelSlip























































;