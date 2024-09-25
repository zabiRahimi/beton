import { useEffect, useState } from "react";

/**
 * for use in AddCocreteSalesInvoice
 */
const SearchDriversSelect = ({ dataDrivers }) => {
console.log(dataDrivers);
    const [inputDriverSearch, setInputDriverSearch] = useState();
    const [optionsDriversSearched, setOptionsDriversSearched] = useState([]);
    const [id, setId] = useState();
    const [elementDriverSearchWarning, setElementDriverSearchWarning] = useState();
    const [driverSearchWarning, setDriverSearchWarning] = useState();
    const [warning, setWarning] = useState();

    const handleSetId = (e) => {
        const { value } = e.target;
        setOptionsDriversSearched();
        handleClearInput('nameInput');
        handleClearWarning();
        if (/^\d*$/.test(value)) {
            setId(parseInt(value,10));
          } else {
            handleThrowWarning('لطفاً فقط عدد وارد کنید');
          }
    }

    const handleSearchId = (e) => {
        e.preventDefault();
        handleClearInput('nameInput');
        setOptionsDriversSearched();
        if (id) {
            const driverIdsFound = [dataDrivers.find(obj => obj.id === id)];
            if (driverIdsFound[0] != undefined) {
                const optionsFound = driverIdsFound.map((data, i) => ({
                    value: data.id,
                    html: <div key={i} className="personnelAption_addPerS">
                        <span className="name_addPers">{data.name} {data.lastName}</span>
                        <span className="fther_addPers">{data.father || ''}</span>
                    </div>
                }));
                setOptionsDriversSearched(optionsFound);
            } else {
                handleThrowWarning(`نتیجه‌ای یافت نشد`);
            }
        } else {
            handleThrowWarning('ابتدا شناسه را وارد کنید');
        }
    }

    const handleSearchOptionsDrivers = (e) => {
        const { value } = e.target;
        setId();
        handleClearInput('idInput');
        setOptionsDriversSearched();
        handleClearWarning();
        if (value) {
            const newDataDrivers = dataDrivers.map(item => ({
                id: item.id,
                name: `${item.name} ${item.lastName}`
            }));
            const ids = handleSearchByName(newDataDrivers, value);

            if (ids.length > 0) {
                let filteredArr = dataDrivers.filter(item => ids.includes(item.id));
                const optionsFound = filteredArr.map((data, i) => ({
                    value: data.id,
                    html: <div key={i} className="personnelAption_addPerS">
                        <span className="name_addPers">{data.name} {data.lastName}</span>
                        <span className="fther_addPers">{data.father || ''}</span>
                    </div>
                }));
                setOptionsDriversSearched(optionsFound);
            } else {
                handleThrowWarning('نتیجه‌ای یافت نشد');
            }
        }
    }

    const handleSearchByName = (newArr, searchTerm) => {
        return newArr
            .filter(item => item.name.includes(searchTerm))
            .map(item => item.id);
    };

    const handleClearInput = (className) => {
        // const element = document.getElementById(id);
        // element.value = '';
        const inputs = document.querySelectorAll(`.${className}`);
        inputs.forEach(input => {
          input.value = '';
        });
    }

    const handleThrowWarning = (warning) => {
        setDriverSearchWarning(true);
        setWarning(warning);
    }

    const handleClearWarning = () => {
        setDriverSearchWarning(false);
        setWarning();
    }

    /**
     * این متد در کامپوننت سلکت و هنگامی که کاربر آپشنی را انتخاب کند و یا از سلکت خارج شود
     * فراخوانی می‌شود
     */
    const handleClearAllSearchDriver = () => {
        handleClearInput('idInput');
        handleClearInput('nameInput');
        setId();
        setOptionsDriversSearched();
        handleClearWarning();
    }

    useEffect(() => {
        if (dataDrivers && dataDrivers.length > 0) {
            setInputDriverSearch([{
                html: <div className="DInputsDriversACSI_SZ">
                    <div className="DIdsInputsDriversACSI_SZ">
                        <input
                            type="text"
                            // id="idInput_driver"
                            className="idInput"
                            placeholder="شناسه"
                            onInput={(e) => { handleSetId(e) }}
                            autoComplete="off"
                        />
                        <button onClick={(e) => handleSearchId(e)}><i className="icofont-search-2" /></button>
                    </div>
                    <input
                        type="text"
                        // id="nameInput_driver"
                        className="inputDriversACSI_SZ nameInput"
                        onInput={(e) => handleSearchOptionsDrivers(e)}
                        placeholder="نام و نام‌خانوادگی"
                        autoComplete="off"
                    />
                </div>
            }]);
        }
    }, [dataDrivers, id]);

    useEffect(() => {
        if (warning && driverSearchWarning) {
            setDriverSearchWarning(true);
            setElementDriverSearchWarning(<div className="DWarnDriversACSI_SZ">
                {warning}
                {' '}
                <i className="icofont-worried " />
            </div>
            );
        }
    }, [warning]);

    return {
        inputDriverSearch,
        optionsDriversSearched,
        driverSearchWarning,
        elementDriverSearchWarning,
        handleClearAllSearchDriver
    };
}

export default SearchDriversSelect;