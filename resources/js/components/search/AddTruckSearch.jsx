
import React, { createRef, useEffect, useMemo, useRef, useState } from 'react';
import DataZabi from "../hooks/DateZabi";
import moment from 'jalali-moment';
import SelectZabi from '../hooks/SelectZabi';

const AddCustomerSearch = ({ truckTypes, getTrucks, handelSetDataSearch }) => {
  
 
  
  const refTruckTypes = useRef(null);


  const [refsSearch, setRefsSearch] = useState({});
  const [itemTruckTypes, setItemTruckTypes] = useState([{
    value: '',
    html: <div className="divItemTruckType_Se" >
      <span className="itemTruckType_Se"> همه </span>
    </div>
  }]);
  const [truckType, setTruckType] = useState('');

const [namberplate0, setNamberplate0] = useState({
  left:'',
  alhpa
})
  const [input, setInput] = useState({
    id: '',
    truckType,
    name:'',
    lastName:'',
    namberplate: ''
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

  const handleSearch = () => {
    handelSetDataSearch({  id: input.id, truckType: input.truckType, name: input.name, lastName: input.lastName, namberplate: input.namberplate });
    getTrucks(1,  input.id, input.truckType, input.name, input.lastName, input.namberplate);
  }

  const handleSaveValInput = (e, input) => {
    let { value } = e.target;
    setInput(prev => ({ ...prev, [input]: value }));
  }

  const handleClearSearch = async () => {
    setInput({
      id: '',
      truckType: '',
      name: '',
      lastName:'',
      namberplate: '',
      
    });
    await handelSetDataSearch({ id: '', truckType:'', name:'', lastName:'', namberplate: '' });
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

      <div className="containerMainNamberplate_Se">
        <div className="name_Se">
          <span className="stringNamberplate_Se"> پلاک </span>
          <div className="mainNamberplate_Se">
            <div className="containerInputNamberplate_Se">
              {/* <div className="iconNamberplate_Se">
               {!allowShowListNamberplate ? <i className="icofont-caret-down " onClick={handleSetAllowNamberplate}></i> :
               <i className="icofont-caret-up" onClick={handleSetAllowNamberplate}></i>
               }
                
              </div> */}
              <input type="text" className="leftInputNamberplate_Se" placeholder='00' />
              <select name="" id="" className='selectNamberplate_Se'>
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
              <input type="text" className="midInputNamberplate_Se" placeholder='000' />
              <div className="divIranNamberplate">
                <span className='iranNamberplate'> ایران </span>
                <input type="text" className="rightInputNamberplate_Se" placeholder='00' />
              </div>
            </div>
            {/* {
              allowShowListNamberplate &&
              <div className="containerRowNamberplate_Se">
                namberplate
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

export default AddCustomerSearch;