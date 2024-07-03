import { useState, useEffect, useRef,forwardRef, useImperativeHandle } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../../../css/selectZabi.css';
const SelectZabi=forwardRef(({options, primaryLabel, saveOption, saveOption2=null, saveOption3=null},ref)=> {
    const labelRef= useRef(null);
    const mainOptionRef= useRef(null);
    const [currentElement, setCurrentElement] = useState(primaryLabel);
    useImperativeHandle(ref, () => ({
        updateData(value) {
            setCurrentElement(value);
        }
      }));
    
    
    const returnOptions=()=>{
        let vals;
        vals=options.map((val, i)=>{
            return <div className='containerOptionSZ' key={i} onClick={()=>{setCurrentElement(val.html); changeHandle(val.value, val.value2?val.value2:null, val.value3?val.value3:null) } }>
                {val.html}
                 </div>
        })
        return vals;
    }

    const optionDisplayHandle=(apply=true)=>{
        if (apply) {
            mainOptionRef.current.classList.add('--hidden');
        } else {
            mainOptionRef.current.classList.toggle('--hidden');
        }
    }

    const changeHandle =(val, val2, val3)=>{
        saveOption(val);
        console.log(`val = ${val} ---- val2 = ${val2}`);
        if (val2 && typeof saveOption2 === 'function') {
            // console.log('ok');
            console.error(val2);
          }

          if (typeof saveOption === 'function') {
            // console.log('ok');
            console.error('ok');
          }
          
       
        // val2 && saveOption2 && saveOption2(val2); 
        optionDisplayHandle();
    }

    return (
        <div 
        className='mainSZ'
        onBlur={optionDisplayHandle}
        tabIndex="0" 
        >
            <div 
            className='titleSZ'
            onClick={()=>{optionDisplayHandle(false)}}
            
            >
                <span className="labelSZ" ref={labelRef}> {currentElement}</span>
                <i className="icofont-caret-down iSZ" />
            </div>
            <div className='mainOptionSZ --hidden'  ref={mainOptionRef} >
                {options.length>0 ? returnOptions() : <Skeleton height={32} count={6} />}
            </div>
        </div>
    );
})

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