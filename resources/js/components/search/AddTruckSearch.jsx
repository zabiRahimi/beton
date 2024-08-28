
import React, { createRef, useEffect, useMemo, useRef, useState } from 'react';
import DataZabi from "../hooks/DateZabi";
import moment from 'jalali-moment';
import SelectZabi from '../hooks/SelectZabi';

const AddTruckSearch = ({ truckTypes, getTrucks, handelSetDataSearch }) => {
  const refTruckTypes = useRef(null);
  
  const [itemTruckTypes, setItemTruckTypes] = useState([{
    value: '',
    html: <div className="divItemTruckType_Se"  onClick={(e)=>{setTruckType('')}}>
      <span className="itemTruckType_Se"> همه </span>
    </div>
  }]);
  const [truckType, setTruckType] = useState('');

  const [numberplateVal, setNumberplateVal] = useState({
    left: '',
    alphabet: '',
    mid: '',
    right: ''
  });

  const [input, setInput] = useState({
    id: '',
    truckType:'',
    name: '',
    lastName: '',
    numberplate: ''
  });

  useMemo(() => {
    truckTypes && truckTypes.map((item, i) => {
      setItemTruckTypes(perv => ([...perv, {
        value: item,
        html: <div className="divItemTruckType_Se" key={i}>
          <span className="itemTruckType_Se">{item}</span>
        </div>
      }]));
    })
  }, []);

  useEffect(() => {
    
         setInput(prev => ({ ...prev, truckType }));
    
}, [truckType]);

  const handleSetNumberplate=(e, input)=>{
    const {value}=e.target;
    let numberplate;
     setNumberplateVal(prev => ({ ...prev, [input]: value }));
    if(input== 'left' && (value || numberplateVal.alphabet || numberplateVal.mid || numberplateVal.right)){
       numberplate= value + '-' + numberplateVal.mid + '-' + numberplateVal.right + '-' + numberplateVal.alphabet;
       setInput(prev => ({ ...prev, numberplate }));

    }else if(input== 'alphabet' && (value || numberplateVal.left || numberplateVal.mid || numberplateVal.right)){
      numberplate= numberplateVal.left + '-' + numberplateVal.mid + '-' + numberplateVal.right + '-' + value;
      // numberplate=value
      setInput(prev => ({ ...prev, numberplate }));

   }else if(input== 'mid' && (value || numberplateVal.left || numberplateVal.alphabet || numberplateVal.right)){
    numberplate= numberplateVal.left + '-' + value + '-' + numberplateVal.right + '-' + numberplateVal.alphabet;
    setInput(prev => ({ ...prev, numberplate }));

 }else if(input== 'right' && (value || numberplateVal.left || numberplateVal.alphabet || numberplateVal.mid) ){
  numberplate= numberplateVal.left + '-' + numberplateVal.mid + '-' + value + '-' + numberplateVal.alphabet;
  setInput(prev => ({ ...prev, numberplate }));

} else {
      setInput(prev => ({ ...prev, numberplate: '' }));
    }
  }

  const handleSaveValInput = (e, input) => {
    let { value } = e.target;
    setInput(prev => ({ ...prev, [input]: value }));
  }

  const handleSearch = () => {
    handelSetDataSearch({ id: input.id, truckType: input.truckType, name: input.name, lastName: input.lastName, numberplate: input.numberplate });
    getTrucks(1, input.id, input.truckType, input.name, input.lastName, input.numberplate);
  }

  const handleClearSearch = async () => {
    setNumberplateVal({
      left:'',
      alphabet:'',
      mid:'',
      right:''
    });

    setInput({
      id: '',
      truckType: '',
      name: '',
      lastName: '',
      numberplate: '',

    });
    setTruckType('');
    refTruckTypes.current.updateData('انتخاب');
    await handelSetDataSearch({ id: '', truckType: '', name: '', lastName: '', numberplate: '' });
    await getTrucks(1, '', '', '', '', '');
  }

  return (
    <div className="containerSearch_Se">


      <div className="containerIdAType_Se containerIdATypeTruck_Se">
        <div className="id_Se">
          <span className="stringIdAType_Se stringIdATypeTruck_Se"> شناسه </span>
          <input
            type="text"
            className="inputIdACS_Se inputIdTruckATS_Se"
            value={input.id || ''}
            onInput={e => handleSaveValInput(e, 'id')}
          />
        </div>
        <div className="type_Se truckType_Se">
          <span className="stringIdAType_Se stringIdATypeTruck_Se"> نوع کامیون </span>
          <SelectZabi
            primaryLabel='انتخاب'
            options={itemTruckTypes}
            saveOption={setTruckType}
            ref={refTruckTypes}
          />

        </div>
      </div>

      <div className='containerName_Se containerOwner_Se'>

        <div className="name_Se">
          <span className="stringOwner_Se"> نام‌مالک </span>
          <input
            type="text"
            className="inputNameACS_Se"
            value={input.name || ''}
            onInput={e => handleSaveValInput(e, 'name')}
          />
        </div>

        <div className="lastName_Se">
          <span className="stringOwner_Se"> نام‌خانوادگی </span>
          <input
            type="text"
            className="inputNameACS_Se"
            value={input.lastName || ''}
            onInput={e => handleSaveValInput(e, 'lastName')}
          />
        </div>
      </div>

      <div className="containerMainNumberplate_Se">
        <div className="name_Se">
          <span className="stringNumberplate_Se"> پلاک </span>
          <div className="mainNumberplate_Se">
            <div className="containerInputNumberplate_Se">
              {/* <div className="iconNumberplate_Se">
               {!allowShowListNumberplate ? <i className="icofont-caret-down " onClick={handleSetAllowNumberplate}></i> :
               <i className="icofont-caret-up" onClick={handleSetAllowNumberplate}></i>
               }
                
              </div> */}
              <input type="text" className="leftInputNumberplate_Se" placeholder='00'
              maxLength="2"
              value={numberplateVal.left || ''}
              onInput={e=>handleSetNumberplate(e, 'left')} 
              />
              <select name="" id="" className='selectNumberplate_Se'
              value={numberplateVal.alphabet}
              onChange={e=>handleSetNumberplate(e, 'alphabet')} 
              >
                <option value=""> حرف </option>
                <option value="ا"> الف </option>
                <option value="ب"> ب </option>
                <option value="پ"> پ </option>
                <option value="ت"> ت </option>
                <option value="ث"> ث </option>
                <option value="ج"> ج </option>
                <option value="چ"> چ </option>
                <option value="ح"> ح </option>
                <option value="خ"> خ </option>
                <option value="د"> د </option>
                <option value="ذ"> ذ </option>
                <option value="ر"> ر </option>
                <option value="ز"> ز </option>
                <option value="ژ"> ژ </option>
                <option value="س"> س </option>
                <option value="ش"> ش </option>
                <option value="ص"> ص </option>
                <option value="ض"> ض </option>
                <option value="ط"> ط </option>
                <option value="ظ"> ظ </option>
                <option value="ع"> ع </option>
                <option value="غ"> غ </option>
                <option value="ف"> ف </option>
                <option value="ق"> ق </option>
                <option value="ک"> ک </option>
                <option value="گ"> گ </option>
                <option value="ل"> ل </option>
                <option value="م"> م </option>
                <option value="ن"> ن </option>
                <option value="و"> و </option>
                <option value="ه"> ه </option>
                <option value="ی"> ی </option>
              </select>
              <input type="text" className="midInputNumberplate_Se" placeholder='000'
              maxLength="3"
              value={numberplateVal.mid || ''}
              onInput={e=>handleSetNumberplate(e, 'mid')} 
               />
              <div className="divIranNumberplate_Se">
                <span className='iranNumberplate_Se'> ایران </span>
                <input type="text" className="rightInputNumberplate_Se" placeholder='00'
                maxLength="2"
              value={numberplateVal.right || ''}
                onInput={e=>handleSetNumberplate(e, 'right')} 
                 />
              </div>
            </div>
            {/* {
              allowShowListNumberplate &&
              <div className="containerRowNumberplate_Se">
                numberplate
              </div>
            } */}

          </div>
        </div>
        <div className="lastName_Se">

        </div>
      </div>

      <div className="divSearch_Se">
        <div className="divBtnDelSearch_Se">
          <button
            className="--styleLessBtn btnDelSearch"
            onClick={handleClearSearch}
          >
            <span className="sritngDelSearch_Se"> حذف جستجو </span>
            <i className="icofont-close-circled icofontDelSearch_Se"></i>
          </button>
        </div>
        <div className="divBtnSearch_Se">
          <button
            className="--styleLessBtn btnSearch"
            onClick={handleSearch}
          >
            <span className="sritngSearch_Se"> جستجو </span>
            <i className="icofont-search-2 icofontSearch_Se"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTruckSearch;