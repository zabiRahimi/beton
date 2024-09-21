import { useEffect, useState } from "react";

/**
 * for use in AddCocreteSalesInvoice
 */
const SearchSelectCustomer = ({ dataCustomers }) => {

    const [searchInputCustomer, setSearchInputCustomer] = useState();
    const [searchOptionsCustomers, setSearchOptionsCustomers] = useState([]);
    const [searchIdCustomer, setSearchIdCustomer] = useState();
    const [divWarnCustomer, setDivWarnCustomer] = useState();
    const [warnSearchCustomer, setWarnSearchCustomer] = useState();
    const [stringWarnCustomer, setStringWarnCustomer] = useState();

    const handleSetSearchIdCustomer = (e) => {
        const { value } = e.target;
        handleClearInputSearchSelect('inputStringSearchCustomerACSI');

        if (value) {
            setSearchIdCustomer(value);
        } else {
            setSearchIdCustomer();
            setWarnSearchCustomer(false);
            setStringWarnCustomer();
            setSearchOptionsCustomers();
        }
    }

    const searchIDCutomer = (e) => {
        e.preventDefault();
        const newDataCustomer = [dataCustomers.find(obj => obj.id == searchIdCustomer)];

        if (newDataCustomer[0] != undefined) {
            const newSearchOptions = newDataCustomer.map((data, i) => ({
                value: data.id,
                html: <div key={i} className="personnelAption_addPerS">
                    <span className="name_addPers">{data.name} {data.lastName}</span>
                    <span className="fther_addPers">{data.father || ''}</span>
                </div>
            }));
            setWarnSearchCustomer(false);
            setStringWarnCustomer();
            setSearchOptionsCustomers(newSearchOptions);
        } else if (searchIdCustomer) {
            setWarnSearchCustomer(true);
            setStringWarnCustomer('نتیجه‌ای یافت نشد');
            setSearchOptionsCustomers();
        } else {
            setWarnSearchCustomer(false);
            setStringWarnCustomer();
            setSearchOptionsCustomers();
        }
    }

    const handleSearchOptionsCustomers = (e) => {

        const { value } = e.target;
        handleClearInputSearchSelect('inputIDSearchCustomerACSI');
        const newDataCustomers = dataCustomers.map(item => ({
            id: item.id,
            name: `${item.name} ${item.lastName}`
        }));
        const ids = searchByName(newDataCustomers, value);

        if (value && ids.length > 0) {
            let filteredArr = dataCustomers.filter(item => ids.includes(item.id));

            const newSearchOptions = filteredArr.map((data, i) => ({
                value: data.id,
                html: <div key={i} className="personnelAption_addPerS">
                    <span className="name_addPers">{data.name} {data.lastName}</span>
                    <span className="fther_addPers">{data.father || ''}</span>
                </div>
            }));
            setSearchOptionsCustomers(newSearchOptions);
        } else if (value) {
            setSearchOptionsCustomers();
            setWarnSearchCustomer(true);
            setStringWarnCustomer('نتیجه‌ای یافت نشد');
        } else {
            setSearchOptionsCustomers();
            setWarnSearchCustomer(false);
            setStringWarnCustomer();
        }
    }

    const searchByName = (newArr, searchTerm) => {
        return newArr
            .filter(item => item.name.includes(searchTerm))
            .map(item => item.id);
    };

    const handleClearInputSearchSelect = (id) => {
        const element = document.getElementById(id);
        element.value = '';
    }

    useEffect(() => {
        if (dataCustomers && dataCustomers.length > 0) {

            setSearchInputCustomer([{
                html: <div className="DInputsCustomersACSI_SZ">
                    <div className="DIdsInputsCustomersACSI_SZ">
                        <input
                            type="text"
                            id="inputIDSearchCustomerACSI"
                            placeholder="شناسه"
                            onInput={(e) => { handleSetSearchIdCustomer(e) }}
                        />
                        <button onClick={(e) => searchIDCutomer(e)}><i className="icofont-search-2" /></button>

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
    }, [dataCustomers, searchIdCustomer]);

    useEffect(() => {

        if (stringWarnCustomer && warnSearchCustomer) {
            setWarnSearchCustomer(true);

            setDivWarnCustomer(<div className="DWarnCustomersACSI_SZ">
                {stringWarnCustomer}
            </div>
            );
        } else {
            setWarnSearchCustomer(false);

            setDivWarnCustomer();
        }
    }, [stringWarnCustomer, warnSearchCustomer]);

    return {
        searchInputCustomer,
        searchOptionsCustomers,
        warnSearchCustomer,
        divWarnCustomer
    };
}

export default SearchSelectCustomer;