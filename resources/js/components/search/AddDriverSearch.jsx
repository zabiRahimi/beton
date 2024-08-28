
import React, { createRef, useEffect, useMemo, useRef, useState } from 'react';


const AddDriverSearch = ({  getDrivers, handelSetDataSearch }) => {

  const [input, setInput] = useState({
    id: '',
    name: '',
    lastName: ''
  });

  const handleSaveValInput = (e, input) => {
    let { value } = e.target;
    setInput(prev => ({ ...prev, [input]: value }));
  }

  const handleSearch = () => {
    handelSetDataSearch({ id: input.id, name: input.name, lastName: input.lastName});
    getDrivers(1, input.id, input.name, input.lastName);
  }

  const handleClearSearch = async () => {
    setInput({
      id: '',
      name: '',
      lastName: ''
    });
    await handelSetDataSearch({ id: '', name: '', lastName: ''});
    await getDrivers(1, '', '', '');
  }

  return (
    <div className="containerSearch_Se">


      <div className="containerIdAType_Se containerIdDriver_Se">
        <div className="id_Se">
          <span className="stringIdAType_Se stringIdDriver_Se"> شناسه </span>
          <input
            type="text"
            className="inputIdACS_Se inputIdTruckATS_Se"
            value={input.id || ''}
            onInput={e => handleSaveValInput(e, 'id')}
          />
        </div>
        <div></div>
      </div>

      <div className='containerName_Se containerOwner_Se'>

        <div className="name_Se">
          <span className="stringOwner_Se"> نام‌راننده </span>
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

export default AddDriverSearch;