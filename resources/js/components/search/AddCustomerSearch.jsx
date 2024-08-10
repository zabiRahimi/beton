
import React, { createRef, useEffect, useRef, useState } from 'react';

const AddCustomerSearch = ({ customerTypesSearch, getCustomers }) => {
  const showTyepCustomerSearchRef = useRef(null);

  const titleCustomerTypeSearch = useRef(null);
  const [refsSearch, setRefsSearch] = useState({});

  const [showTypeCustomerSearch, setShowTypeCustomerSearch] = useState(false);
  const [customerTypeSelectedSearch, setCustomerTypeSelectedSearch] = useState([]);

  const [startDate, setStartDate] = useState(null);
  const [startDay, setStartDay] = useState(null);
  const [startMonth, setStartMonth] = useState(null);
  const [startYear, setStartYear] = useState(null);

  const [endDate, setEndDate] = useState(null);
  const [endDay, setEndDay] = useState(null);
  const [endMonth, setEndMonth] = useState(null);
  const [endYear, setEndYear] = useState(null);

  const [id, setId] = useState(null);
  const [type, setType] = useState([]);

  const [name, setName] = useState(null);
  const [lastName, setlastName] = useState(null);

  const sendDataToParent = () => {
    updateParent('Hello from Child');
  };

  useEffect(() => {
    if (customerTypesSearch) {

      const newRefsSearch = customerTypesSearch.reduce((acc, value) => {
        acc[value.code] = createRef();
        return acc;
      }, {});
      setRefsSearch(newRefsSearch);
    }
  }, []);

  /**
 * نمایش آیتم های نوع مشتری برای جستجو
 * @returns 
 */
  const showCustomerTypesSearch = () => {
    let value = customerTypesSearch.map((customerType, i) => {

      return <div className="itemCustomerTypeFB" onClick={(e) => AddCustomerTypeSearch(e, customerType['code'], customerType['type'], customerType['subtype'])}
        key={i}>
        <div
          className={`checkedItemCustomerTypeFB ${customerTypeSelectedSearch.some(obj => obj.code === customerType['code'])&& 'IcheckedItemCustomerTypeFB'}`}
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
    let ref = refsSearch[code]
    let val = ref.current.classList.toggle('IcheckedItemCustomerTypeFB');

    if (val) {
      setCustomerTypeSelectedSearch(old => [...old, { code, type, subtype }]);

      const typesString = customerTypeSelectedSearch.map((item) => `${item.type} ${item.subtype || ''}`).join(' , ');
      titleCustomerTypeSearch.current.textContent = typesString ? typesString + ',' + type + ' ' + (subtype || '') : type + ' ' + (subtype || '');


    } else {
      const updated = customerTypeSelectedSearch.filter(item => item.code !== code);
      setCustomerTypeSelectedSearch(updated);

      const typesString = updated.map((item) => `${item.type} ${item.subtype || ''}`).join(' , ');
      titleCustomerTypeSearch.current.textContent = typesString ? typesString : 'انتخاب';
    }
  }

  const handleKeepItemsSelected = () => {

    console.log(customerTypeSelectedSearch);
  }
  const handleSearch = () => {
    getCustomers(1, startDate, endDate, id, type, name, lastName);
  }

  const handleClearSearch = () => {
    // setFromDateSearch('');
    // setUntilDateSearch('');
    // setCustomerSearchId('');
    // setConcreteSearchId('');
    // setTruckSearchId('');
    // setDriverSearchId('');
    // document.getElementById('dayFromSearch').value='';
    // document.getElementById('monthFromSearch').value='';
    // document.getElementById('yearFromSearch').value='';

    // document.getElementById('dayUntilSearch').value='';
    // document.getElementById('monthUntilSearch').value='';
    // document.getElementById('yearUntilSearch').value='';

    // refCustomerSearch.current.updateData('انتخاب');
    // refConcreteSearch.current.updateData('انتخاب');
    // refTruckSearch.current.updateData('انتخاب');
    // refDriverSearch.current.updateData('انتخاب');

    // setConcreteSalesInvoices(null);
    // setTimeout(() => {
    //     setConcreteSalesInvoices(concreteSalesInvoicesForSearch);
    // }, 400);
  }

  const handleSetShowCustomerTypeSearch = (e, apply = true) => {
    // e.stopPropagation();
    if (apply) {
      setShowTypeCustomerSearch(false);

    } else {
      setShowTypeCustomerSearch(pre => !pre);

    }
  }


  return (
    <div className="containerSearch_Se">
      <div className="containerDate_Se">
        <div className="startDate_Se">
          <span className="stringFromDate_Se"> از تاریخ </span>
          <input
            type="text"
            className="inputDate_Se dayDate_Se"
            id="dayFromSearch"
            placeholder="روز"
            onInput={e => changeDayFromSearch(e)}
          />
          <span className="slashDate_Se">/</span>
          <input
            type="text"
            className="inputDate_Se monthDate_Se"
            placeholder="ماه"
            id="monthFromSearch"
            onInput={e => changeMonthFromSearch(e)}
          />
          <span className="slashDate_Se">/</span>
          <input
            type="text"
            className="inputDate_Se yearDate_Se"
            id="yearFromSearch"
            placeholder="سال"
            onInput={e => changeYearFromSearch(e)}
          />

        </div>
        <div className="endtDate_Se">
          <span className="stringUntilDate_Se"> تا تاریخ </span>
          <input
            type="text"
            className="inputDate_Se dayDate_Se"
            id="dayUntilSearch"
            placeholder="روز"
            onInput={e => changeDayUntilSearch(e)}
          />
          <span className="slashDate_Se">/</span>
          <input
            type="text"
            className="inputDate_Se monthDate_Se"
            id="monthUntilSearch"
            placeholder="ماه"
            onInput={e => changeMonthUntilSearch(e)}
          />
          <span className="slashDate_Se">/</span>
          <input
            type="text"
            className="inputDate_Se yearDate_Se"
            id="yearUntilSearch"
            placeholder="سال"
            onInput={e => changeYearUntilSearch(e)}
          />
        </div>
      </div>

      <div className="containerIdAType_Se">
        <div className="id_Se">
          <span className="stringIdAType_Se"> شناسه </span>
          <input type="text" className="inputIdACS_Se" />
          {/* <div className="divSelectSearch_Se"></div> */}
        </div>
        <div className="type_Se"
          tabIndex="0"
          // onFocus={() => { }}
          onBlur={(e) => handleSetShowCustomerTypeSearch(e)}>
          <span className="stringIdAType_Se"> نوع مشتری </span>
          <div
            className="titleTypeACS_Se"
            onClick={(e) => handleSetShowCustomerTypeSearch(e, false)}
          >
            <span
              className="spanTitleType_Se"
              ref={titleCustomerTypeSearch}
            >انتخاب
            </span>
            {!showTypeCustomerSearch && <i className='icofont-rounded-down'></i>}
            {showTypeCustomerSearch && <i className='icofont-rounded-up'></i>}
          </div>
          {showTypeCustomerSearch && <div
            className="showTypeACS_Se"
          >
            {showCustomerTypesSearch()}
          </div>}
        </div>
      </div>

      <div className="containerName_Se">
        <div className="name_Se">
          <span className="stringName_Se"> نام </span>
          <input type="text" className="inputNameACS_Se" />
        </div>
        <div className="lastName_Se">
          <span className="stringName_Se"> نام‌خانوادگی </span>
          <input type="text" className="inputNameACS_Se" />
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