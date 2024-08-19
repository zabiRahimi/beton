
import React, { createRef, useEffect, useMemo, useRef, useState } from 'react';
import DataZabi from "../hooks/DateZabi";
import moment from 'jalali-moment';
import SelectZabi from '../hooks/SelectZabi';

const AddCustomerSearch = ({ truckTypes, getCustomers, handelSetDataSearch }) => {
  const {
    checkDate
  } = DataZabi();
  const showTyepCustomerSearchRef = useRef(null);
  const titleCustomerTypeSearch = useRef(null);
  const refTruckTypes = useRef(null);


  const [refsSearch, setRefsSearch] = useState({});

  const [showTypeCustomerSearch, setShowTruckTypeSearch] = useState(false);
  const [customerTypeSelectedSearch, setCustomerTypeSelectedSearch] = useState([]);
const [itemTruckTypes, setItemTruckTypes] = useState([ {
  value: '',
  html: <div className="divItemTruckType_Se" >
      <span className="itemTruckType_Se"> همه </span>
  </div>
}]);
const [truckType, setTruckType] = useState('');


  const [input, setInput] = useState({
    id: '',
    truckType ,
    namberplate: '',
    owner: ''
  });


  useEffect(() => {
    if (truckTypes) {

      const newRefsSearch = truckTypes.reduce((acc, value) => {
        acc[value.code] = createRef();
        return acc;
      }, {});
      setRefsSearch(newRefsSearch);
    }
  }, []);

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
  
  /**
 * نمایش آیتم های نوع مشتری برای جستجو
 * @returns 
 */
  const showTruckTypeSearch = () => {
    let value = truckTypes.map((customerType, i) => {

      return <div className="itemCustomerTypeFB" onClick={(e) => AddCustomerTypeSearch(e, customerType['code'], customerType['type'], customerType['subtype'])}
        key={i}>
        <div
          className={`checkedItemCustomerTypeFB ${customerTypeSelectedSearch.some(obj => obj.code === customerType['code']) && 'IcheckedItemCustomerTypeFB'}`}
          key={customerType['code']}
          ref={refsSearch[customerType.code]}
        >
          <i className="icofont-check-alt " />
        </div>
        <span className="nameItemcustomerTypeFB" > {customerType['type']} {customerType['subtype']} </span>
      </div>
    })
    return value;
  }

  /**
    * فرآیند انتخاب نوع مشتری برای جستجو
    * @param {*} e 
    * @param {*} code 
    * @param {*} type 
    * @param {*} subtype 
    */
  const AddCustomerTypeSearch = (e, code, type, subtype) => {
    e.preventDefault();
    if (code != '') {
      let ref = refsSearch[code]
      let val = ref.current.classList.toggle('IcheckedItemCustomerTypeFB');

      if (val) {
        setCustomerTypeSelectedSearch(old => [...old, { code, type, subtype }]);
        setInput(prevState => ({
          ...prevState,
          types: [...prevState.types, code]
        }));
        const typesString = customerTypeSelectedSearch.map((item) => `${item.type} ${item.subtype || ''}`).join(' , ');
        titleCustomerTypeSearch.current.textContent = typesString ? typesString + ',' + type + ' ' + (subtype || '') : type + ' ' + (subtype || '');

      } else {
        const updated = customerTypeSelectedSearch.filter(item => item.code !== code);
        setCustomerTypeSelectedSearch(updated);
        setInput(prevState => ({
          ...prevState,
          types: prevState.types.filter(type => type !== code)
        }));
        const typesString = updated.map((item) => `${item.type} ${item.subtype || ''}`).join(' , ');
        titleCustomerTypeSearch.current.textContent = typesString ? typesString : 'انتخاب';
      }
    } else {
      titleCustomerTypeSearch.current.textContent = 'همه';
      setCustomerTypeSelectedSearch([]);
      setInput(prevState => ({
        ...prevState,
        types: []
      }));
    }
  }

  const handleSearch = () => {
    handelSetDataSearch({ startDate: startDateMiladi, endDate: endDateMiladi, id: input.id, types: input.types, name: input.name, lastName: input.lastName });
    getCustomers(1, startDateMiladi, endDateMiladi, input.id, input.types, input.name, input.lastName);
  }

  const handleSaveValInput = (e, input) => {
    let { value } = e.target;
    setInput(prev => ({ ...prev, [input]: value }));
  }



  const handleClearSearch = async () => {


    setInput({
      id: '',
      types: [],
      namberplate: '',
      owner: ''
    });

    titleCustomerTypeSearch.current.textContent = 'انتخاب';

    await handelSetDataSearch({ id: '', types: [], namberplate: '', owner: '' });

    await getCustomers(1, '', '', '', [], '', '');

  }

  const handleSetShowTruckTypeSearch = (e, apply = true) => {
    // e.stopPropagation();
    if (apply) {
      setShowTruckTypeSearch(false);

    } else {
      setShowTruckTypeSearch(pre => !pre);

    }
  }

  return (
    <div className="containerSearch_Se">


      <div className="containerIdAType_Se">
        <div className="id_Se">
          <span className="stringIdAType_Se"> شناسه </span>
          <input
            type="text"
            className="inputIdACS_Se inputIdTruckATS_Se"
            value={input.id || ''}
            onInput={e => handleSaveValInput(e, 'id')}
          />
        </div>
        <div className="type_Se truckType_Se">
          <span className="stringIdAType_Se"> نوع کامیون </span>
          <SelectZabi
            primaryLabel='انتخاب'
            options={itemTruckTypes}
            saveOption={setTruckType}
            ref={refTruckTypes}
          />

        </div>
      </div>

      <div className="containerName_Se">
        <div className="name_Se">
          <span className="stringName_Se"> پلاک </span>
          <div className="mainNamberplate_Se">
            <div className="containerInputNamberplate_Se">
              <div className="iconNamberplate_Se">
                <i className="icofont-caret-down "></i>
                <i className="icofont-caret-up"></i>
              </div>
              <input type="text" className="leftInputNamberplpate_Se" />
              <select name="" id=""></select>
              <input type="text" className="midInputNamberplpate_Se" />
              <input type="text" className="rightInputNamberplpate_Se" />
            </div>
            <div className="containerRowNamberplate_Se">

            </div>
          </div>
        </div>
        <div className="lastName_Se">
          <span className="stringName_Se"> نام‌مالک </span>
          <input
            type="text"
            className="inputNameACS_Se"
            value={input.lastName || ''}
            onInput={e => handleSaveValInput(e, 'lastName')}
          />
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