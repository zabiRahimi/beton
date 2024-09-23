import { useEffect, useState } from "react";

/**
 * for use in AddCocreteSalesInvoice
 */
const SearchCustomersSelect = ({ dataCustomers }) => {

    const [inputCustomerSearch, setInputCustomerSearch] = useState();
    const [optionsCustomersSearched, setOptionsCustomersSearched] = useState([]);
    const [id, setId] = useState();
    const [elementCustomerSearchWarning, setElementCustomerSearchWarning] = useState();
    const [customerSearchWarning, setCustomerSearchWarning] = useState();
    const [warning, setWarning] = useState();

    const handleSetId = (e) => {
        const { value } = e.target;
        setOptionsCustomersSearched();
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
        setOptionsCustomersSearched();
        if (id) {
            const customerIdsFound = [dataCustomers.find(obj => obj.id === id)];
            if (customerIdsFound[0] != undefined) {
                const optionsFound = customerIdsFound.map((data, i) => ({
                    value: data.id,
                    html: <div key={i} className="personnelAption_addPerS">
                        <span className="name_addPers">{data.name} {data.lastName}</span>
                        <span className="fther_addPers">{data.father || ''}</span>
                    </div>
                }));
                setOptionsCustomersSearched(optionsFound);
            } else {
                handleThrowWarning(`نتیجه‌ای یافت نشد`);
            }
        } else {
            handleThrowWarning('ابتدا شناسه را وارد کنید');
        }
    }

    const handleSearchOptionsCustomers = (e) => {
        const { value } = e.target;
        setId();
        handleClearInput('idInput');
        setOptionsCustomersSearched();
        handleClearWarning();
        if (value) {
            const newDataCustomers = dataCustomers.map(item => ({
                id: item.id,
                name: `${item.name} ${item.lastName}`
            }));
            const ids = handleSearchByName(newDataCustomers, value);

            if (ids.length > 0) {
                let filteredArr = dataCustomers.filter(item => ids.includes(item.id));
                const optionsFound = filteredArr.map((data, i) => ({
                    value: data.id,
                    html: <div key={i} className="personnelAption_addPerS">
                        <span className="name_addPers">{data.name} {data.lastName}</span>
                        <span className="fther_addPers">{data.father || ''}</span>
                    </div>
                }));
                setOptionsCustomersSearched(optionsFound);
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

    const handleClearInput = (id) => {
        const element = document.getElementById(id);
        element.value = '';
    }

    const handleThrowWarning = (warning) => {
        setCustomerSearchWarning(true);
        setWarning(warning);
    }

    const handleClearWarning = () => {
        setCustomerSearchWarning(false);
        setWarning();
    }

    /**
     * این متد در کامپوننت سلکت و هنگامی که کاربر آپشنی را انتخاب کند و یا از سلکت خارج شود
     * فراخوانی می‌شود
     */
    const handleClearAllSearch = () => {
        handleClearInput('idInput');
        handleClearInput('nameInput');
        setOptionsCustomersSearched();
        handleClearWarning();
    }

    useEffect(() => {
        if (dataCustomers && dataCustomers.length > 0) {
            setInputCustomerSearch([{
                html: <div className="DInputsCustomersACSI_SZ">
                    <div className="DIdsInputsCustomersACSI_SZ">
                        <input
                            type="text"
                            id="idInput"
                            placeholder="شناسه"
                            onInput={(e) => { handleSetId(e) }}
                            autoComplete="off"
                        />
                        <button onClick={(e) => handleSearchId(e)}><i className="icofont-search-2" /></button>
                    </div>
                    <input
                        type="text"
                        id="nameInput"
                        className="inputCustomersACSI_SZ"
                        onInput={(e) => handleSearchOptionsCustomers(e)}
                        placeholder="نام و نام‌خانوادگی"
                        autoComplete="off"
                    />
                </div>
            }]);
        }
    }, [dataCustomers, id]);

    useEffect(() => {
        if (warning && customerSearchWarning) {
            setCustomerSearchWarning(true);
            setElementCustomerSearchWarning(<div className="DWarnCustomersACSI_SZ">
                {warning}
                {' '}
                <i className="icofont-worried " />
            </div>
            );
        } else {
            // setCustomerSearchWarning(false);

            // setElementCustomerSearchWarning();
        }
    }, [warning]);

    return {
        inputCustomerSearch,
        optionsCustomersSearched,
        customerSearchWarning,
        elementCustomerSearchWarning,
        handleClearAllSearch
    };
}

export default SearchCustomersSelect;