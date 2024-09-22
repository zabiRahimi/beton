import { useEffect, useState } from "react";

/**
 * for use in AddCocreteSalesInvoice
 */
const SearchCustomersSelect = ({ dataCustomers }) => {

    const [inputCustomerSearch, setInputCustomerSearch] = useState();
    const [optionsCustomersSearched, setOptionsCustomersSearched] = useState([]);
    const [customerId, setCustomerId] = useState();
    const [elementCustomerSearchWarning, setElementCustomerSearchWarning] = useState();
    const [customerSearchWarning, setCustomerSearchWarning] = useState();
    const [warning, setWarning] = useState();

    const handleSetSearchIdCustomer = (e) => {
        const { value } = e.target;
        setOptionsCustomersSearched();
        handleClearInput('inputStringSearchCustomerACSI');
        handleClearWarning();
        setCustomerId(value);
    }

    const handleSearchIDCustomer = (e) => {
        e.preventDefault();
        if (customerId) {
            console.log('ok');
            const newDataCustomer = [dataCustomers.find(obj => obj.id == customerId)];
            if (newDataCustomer[0] != undefined) {
                const newSearchOptions = newDataCustomer.map((data, i) => ({
                    value: data.id,
                    html: <div key={i} className="personnelAption_addPerS">
                        <span className="name_addPers">{data.name} {data.lastName}</span>
                        <span className="fther_addPers">{data.father || ''}</span>
                    </div>
                }));
                setOptionsCustomersSearched(newSearchOptions);
            } else {
                setCustomerSearchWarning(true);
                setWarning('نتیجه‌ای یافت نشد');
                setOptionsCustomersSearched();
            }
        } else {
            console.warn('no');
            setCustomerSearchWarning(true);
            setWarning('لطفا شناسه را وارد کنید');
            setOptionsCustomersSearched();
        }
    }

    const handleSearchOptionsCustomers = (e) => {

        const { value } = e.target;
        handleClearInput('inputIDSearchCustomerACSI');
        handleClearWarning();

        const newDataCustomers = dataCustomers.map(item => ({
            id: item.id,
            name: `${item.name} ${item.lastName}`
        }));
        const ids = handleSearchByName(newDataCustomers, value);

        if (value && ids.length > 0) {
            let filteredArr = dataCustomers.filter(item => ids.includes(item.id));

            const newSearchOptions = filteredArr.map((data, i) => ({
                value: data.id,
                html: <div key={i} className="personnelAption_addPerS">
                    <span className="name_addPers">{data.name} {data.lastName}</span>
                    <span className="fther_addPers">{data.father || ''}</span>
                </div>
            }));
            setOptionsCustomersSearched(newSearchOptions);
        } else if (value) {
            setOptionsCustomersSearched();
            setCustomerSearchWarning(true);
            setWarning('نتیجه‌ای یافت نشد');
        } else {
            setOptionsCustomersSearched();
            handleClearWarning();
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

    const handleThrowWarning = () => {
    }
    const handleClearWarning = () => {
        setCustomerSearchWarning(false);
        setWarning();
    }

    useEffect(() => {
        if (dataCustomers && dataCustomers.length > 0) {

            setInputCustomerSearch([{
                html: <div className="DInputsCustomersACSI_SZ">
                    <div className="DIdsInputsCustomersACSI_SZ">
                        <input
                            type="text"
                            id="inputIDSearchCustomerACSI"
                            placeholder="شناسه"
                            onInput={(e) => { handleSetSearchIdCustomer(e) }}
                        />
                        <button onClick={(e) => handleSearchIDCustomer(e)}><i className="icofont-search-2" /></button>

                    </div>
                    <input
                        type="text"
                        id="inputStringSearchCustomerACSI"
                        className="inputCustomersACSI_SZ"
                        onInput={(e) => handleSearchOptionsCustomers(e)}
                        placeholder="نام و نام‌خانوادگی"
                    />
                </div>
            }]);
        }
    }, [dataCustomers, customerId]);

    useEffect(() => {

        if (warning && customerSearchWarning) {
            setCustomerSearchWarning(true);

            setElementCustomerSearchWarning(<div className="DWarnCustomersACSI_SZ">
                {warning}
            </div>
            );
        } else {
            setCustomerSearchWarning(false);

            setElementCustomerSearchWarning();
        }
    }, [warning, customerSearchWarning]);

    return {
        inputCustomerSearch,
        optionsCustomersSearched,
        customerSearchWarning,
        elementCustomerSearchWarning
    };
}

export default SearchCustomersSelect;