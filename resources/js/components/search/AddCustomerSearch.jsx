
import React, { createRef, useEffect, useRef, useState } from 'react';
import DataZabi from "../hooks/DateZabi";
import moment from 'jalali-moment';

const AddCustomerSearch = ({ customerTypesSearch, getCustomers, handelSetDataSearch }) => {
  const {
    checkDate
  } = DataZabi();
  const titleCustomerTypeSearch = useRef(null);
  const [refsSearch, setRefsSearch] = useState({});

  const [showTypeCustomerSearch, setShowTypeCustomerSearch] = useState(false);
  const [customerTypeSelectedSearch, setCustomerTypeSelectedSearch] = useState([]);

  const [date, setDate] = useState({
    start: {
      day: '',
      month: '',
      year: ''
    },
    end: {
      day: '',
      month: '',
      year: ''
    }
  });

  const [input, setInput] = useState({
    startDate: '',
    endDate: '',
    id: '',
    types: [],
    name: '',
    lastName: ''
  });

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
    if(code !=''){
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
  }else{
    titleCustomerTypeSearch.current.textContent ='همه';
    setCustomerTypeSelectedSearch([]);
      setInput(prevState => ({
        ...prevState,
        types: []
      }));
  }
  }

  const handleSearch = () => {
    let startDateMiladi,
      endDateMiladi;

    if (input.startDate != '') {
      const validDate = checkDate(input.startDate, 'تاریخ ابتدای جستجو صحیح نیست');

      if (validDate) {
        startDateMiladi = moment(input.startDate, 'jYYYY/jM/jD').format('YYYY-MM-DD')
      } else {
        return;
      }
    }

    if (input.endDate != '') {
      const validDate = checkDate(input.endDate, 'تاریخ پایان جستجو صحیح نیست');

      if (validDate) {
        endDateMiladi = moment(input.endDate, 'jYYYY/jM/jD').format('YYYY-MM-DD')
      } else {
        return;
      }
    }
    handelSetDataSearch({ startDate: startDateMiladi, endDate: endDateMiladi, id: input.id, types: input.types, name: input.name, lastName: input.lastName });
    getCustomers(1, startDateMiladi, endDateMiladi, input.id, input.types, input.name, input.lastName);
  }

  const handleSaveValInput = (e, input) => {
    let { value } = e.target;
    setInput(prev => ({ ...prev, [input]: value }));
  }

  const handleSetDate = (e, date0, input) => {
    let { value } = e.target,
      day,
      month,
      year,
      valDate;
    value = value.toString();

    if (date0 == 'start') {
      day = date.start.day;
      month = date.start.month;
      year = date.start.year;
    } else {
      day = date.end.day;
      month = date.end.month;
      year = date.end.year;
    }

    if (input == 'day') {
      let { value } = e.target;
      value = value.toString();
      (value != 0 && value.length == 1) && (value = '0' + value);
      (value.length >= 3 && value[0] === '0') && (value = value.slice(1));

      if (value == '' || (Number(value) >= 0 && Number(value) <= 31)) {
        value == 0 ? value = '' : '';
        day = value
        setDate(prev => ({ ...prev, [date0]: { ...prev[date0], [input]: value } }));
      }

    } else if (input == 'month') {
      (value != 0 && value.length == 1) && (value = '0' + value);
      (value.length >= 3 && value[0] === '0') && (value = value.slice(1));
      if (value == '' || (Number(value) >= 0 && Number(value) <= 12)) {
        value == 0 ? value = '' : '';
        month = value;
        setDate(prev => ({ ...prev, [date0]: { ...prev[date0], [input]: value } }));
      }
    } else {
      if (value == '' || (Number(value) >= 1 && Number(value) <= 1500)) {
        value == 0 ? value = '' : '';
        year = value;
        setDate(prev => ({ ...prev, [date0]: { ...prev[date0], [input]: value } }));

      }
    }
    if (year == '' && month == '' && day == '') {
      valDate = '';
    } else {
      valDate = year + '/' + month + '/' + day;
    }
    if (date0 == 'start') {
      setInput(prev => ({ ...prev, startDate: valDate }));
    } else {
      setInput(prev => ({ ...prev, endDate: valDate }));
    }
  }

  const handleClearSearch = async () => {
    setDate({
      start: {
        day: '',
        month: '',
        year: ''
      },
      end: {
        day: '',
        month: '',
        year: ''
      }
    });

    setInput({
      startDate: '',
      endDate: '',
      id: '',
      types: [],
      name: '',
      lastName: ''
    });

    titleCustomerTypeSearch.current.textContent = 'انتخاب';

    await handelSetDataSearch({ startDate: '', endDate: '', id: '', types: [], name: '', lastName: '' });

    await getCustomers(1, '', '', '', [], '', '');
  }

  const handleSetShowCustomerTypeSearch = (e, apply = true) => {
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
            value={date.start.day || ''}
            onInput={e => handleSetDate(e, 'start', 'day')}
          />
          <span className="slashDate_Se">/</span>
          <input
            type="text"
            className="inputDate_Se monthDate_Se"
            placeholder="ماه"
            id="monthFromSearch"
            value={date.start.month || ''}
            onInput={e => handleSetDate(e, 'start', 'month')}
          />
          <span className="slashDate_Se">/</span>
          <input
            type="text"
            className="inputDate_Se yearDate_Se"
            id="yearFromSearch"
            placeholder="سال"
            value={date.start.year || ''}
            onInput={e => handleSetDate(e, 'start', 'year')}
          />

        </div>
        <div className="endtDate_Se">
          <span className="stringUntilDate_Se"> تا تاریخ </span>
          <input
            type="text"
            className="inputDate_Se dayDate_Se"
            id="dayUntilSearch"
            placeholder="روز"
            value={date.end.day || ''}
            onInput={e => handleSetDate(e, 'end', 'day')}
          />
          <span className="slashDate_Se">/</span>
          <input
            type="text"
            className="inputDate_Se monthDate_Se"
            id="monthUntilSearch"
            placeholder="ماه"
            value={date.end.month || ''}
            onInput={e => handleSetDate(e, 'end', 'month')}
          />
          <span className="slashDate_Se">/</span>
          <input
            type="text"
            className="inputDate_Se yearDate_Se"
            id="yearUntilSearch"
            placeholder="سال"
            value={date.end.year || ''}
            onInput={e => handleSetDate(e, 'end', 'year')}
          />
        </div>
      </div>

      <div className="containerIdAType_Se">
        <div className="id_Se">
          <span className="stringIdAType_Se"> شناسه </span>
          <input
            type="text"
            className="inputIdACS_Se"
            value={input.id || ''}
            onInput={e => handleSaveValInput(e, 'id')}
          />
        </div>
        <div className="type_Se"
          tabIndex="0"
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
            <div className="itemCustomerTypeFB" onClick={(e) => AddCustomerTypeSearch(e, '','', '')}
              >
              <div
                className={`checkedItemCustomerTypeFB ${customerTypeSelectedSearch.some(obj => obj.code === 0) && 'IcheckedItemCustomerTypeFB'}`}
              >
                <i className="icofont-check-alt " />
              </div>
              <span className="nameItemcustomerTypeFB" > همه </span>
            </div>

            {showCustomerTypesSearch()}
          </div>}
        </div>
      </div>

      <div className="containerName_Se">
        <div className="name_Se">
          <span className="stringName_Se"> نام </span>
          <input
            type="text"
            className="inputNameACS_Se"
            value={input.name || ''}
            onInput={e => handleSaveValInput(e, 'name')}
          />
        </div>
        <div className="lastName_Se">
          <span className="stringName_Se"> نام‌خانوادگی </span>
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