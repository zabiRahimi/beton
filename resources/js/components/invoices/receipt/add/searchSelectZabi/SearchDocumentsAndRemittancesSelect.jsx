
import { useEffect, useState } from "react";

/**
 * for use in AddCocreteSalesInvoice
 */
const SearchDocumentsAndRemittancesSelect = ({ dataDoRes, type }) => {
    /**
     * دیتای ورودی به کامپوننت را طی یک عملیاتی به دادهایی با فرمت مورد نظر
     * تبدیل شده و در استیت زیر قرار می گیرند
     */
    const [data, setData] = useState([]);
    const [inputDoReSearch, setInputDoReSearch] = useState();
    const [optionsDoReSearched, setOptionsDoReSearched] = useState([]);
    const [id, setId] = useState();
    const [name, setName] = useState();
    const [elementDoReSearchWarning, setElementDoReSearchWarning] = useState();
    const [doReSearchWarning, setDoReSearchWarning] = useState();
    const [warning, setWarning] = useState();
    const [date, setDate] = useState({
        day: '',
        month: '',
        year: ''
    });

    const [label, setLabel] = useState({
        id: '',
        number: ''
    })

    const labels = {
        'check': {
            id: 'شناسه چک',
            owner: 'صاحب حواله',
            number: 'شماره چک'
        },
        'remittance': {
            id: 'شناسه حواله',
            owner: 'خریدار حواله',
            number: 'شماره حواله'
        }
    }

    const handleSetInitialData = () => {
        console.log(12);
        let value;
        if (type === 'check') {
            value = dataDoRes.map((dataDoRe) => (
                {
                    id: dataDoRe.id,
                    name: `${dataDoRe.name}  ${dataDoRe.lastName}`,
                    price: dataDoRe.price,
                    number: dataDoRe.checkNumber,
                    date: dataDoRe.date
                }
            ));
        } else {
            value = dataDoRes.map((dataDoRe) => (
                {
                    id: dataDoRe.id,
                    name: `${dataDoRe.buyerName}  ${dataDoRe.buyerLastName}`,
                    price: dataDoRe.price,
                    number: dataDoRe.remittanceNumber,
                    date: dataDoRe.date
                }
            ));
        }

        setData(value);
        return value;
    }

    

    useEffect(() => {
        if (type) {

            const typeConfig = labels[type];
            if (typeConfig) {
                setLabel(typeConfig);
            }
        }
    }, [type]);

    useEffect(() => {
        if (dataDoRes && data[0] == undefined) {
            handleSetInitialData();
        }
    }, [dataDoRes, data]);

    const handleSetId = (e) => {
        const { value } = e.target;
        setOptionsDoReSearched();
        handleSetInitialData();
        setName();
        handleClearInput('sandRemittanceSZ');
        handleClearWarning();
        if (/^\d*$/.test(value)) {
            setId(parseInt(value, 10));
        } else {
            handleThrowWarning('لطفاً فقط عدد وارد کنید');
        }
    }

    /**
     * هنگامی که کاربر پس از وارد کردن آی دی مورد نظر دکمه سرچ را فشار داد فراخوانی می شود
     * @param {*} e 
     */
    const handleSearchId = (e) => {
        e.preventDefault();
        handleClearInput('idSandRemittanceSZ');
        handleClearInput('name_doRe');
        setOptionsDoReSearched();
        handleClearWarning();
        if (id && data != null) {
            const doReFounds = [data.find(obj => obj.id === id)];
            if (doReFounds[0] != undefined) {
                handleCreateOptions(doReFounds);
            } else {
                handleThrowWarning(`نتیجه‌ای یافت نشد`);
            }
        } else {
            handleThrowWarning('ابتدا شناسه را وارد کنید');
        }
    }


    const handleSearchOptionsByName = async(e) => {
        const { value } = e.target;
        
        // setId();
        // handleClearInput('idSandRemittanceSZ');
        // setOptionsDoReSearched();
        // handleClearWarning();
        if (value ) {
            // setName(value);
            // const newDataOwners = dataDoRes.map(item => ({
            //     id: item.customer.id,
            //     name: `${item.customer.name} ${item.customer.lastName}`
            // }));
            // const doReFounds = handleSearchByName(newDataOwners, value);
            const doReFounds = handleSearchByName(value);


            // if (ids.length > 0) {
            //     let filteredArr = dataDoRes.filter(item => ids.includes(item.customer.id));
            //     const optionsFound = filteredArr.map((data, i) => {
            //         let arr = data.numberplate.split('-');
            //         return {
            //             value: data.id,
            //             value2: data.customer.id,
            //             html: <div key={i} className="mixerAptionSelectFB">
            //                 <span className="mixerNamberpalteSelectFB">
            //                     <div className="numberplateDiv">
            //                         <span className="numberplateDivS1">{arr[0]}</span>
            //                         <span className="numberplateDivS2">{arr[3] == 'ا' ? 'الف' : arr[3]}</span>
            //                         <span className="numberplateDivS3">{arr[1]}</span>
            //                         <span className="numberplateDivS4">{arr[2]}</span>
            //                     </div>
            //                 </span>

            //                 <span className="mixerOwnerSelectFB">
            //                     {data.customer.name}
            //                     {' '}
            //                     {data.customer.lastName}
            //                 </span>

            //             </div>
            //         }
            //     });
            //     setOptionsDoReSearched(optionsFound);
            // } else {
            //     handleThrowWarning('نتیجه‌ای یافت نشد');
            // }

            if (doReFounds[0] != undefined) {
                handleCreateOptions(doReFounds);
            } else {
                handleThrowWarning('نتیجه‌ای یافت نشد');
            }
        }
    }

    const handleSearchByName = (searchTerm) => {
        let val;
        if (data[0]==undefined) {
           val=  handleSetInitialData();
         }
         else{
            val=data
         }
        console.log(val);
        return val
            .filter(item => item.name.includes(searchTerm))
        // .map(item => item.id);
    };

    const handleSetDate = (e) => {
        let { value, name } = e.target;
        (name == 'day' || name == 'month') && (value.length == 1 && (value = 0 + value));
        setDate(perv => ({ ...perv, [name]: value }));
    }

    const handelSearchByDate = () => {
        const value = `${date.year}-${date.month}-${date.day}`;
    }

    const handleCreateOptions = (doReFounds) => {
        const optionsFound = doReFounds.map((doReFound, i) => {
            return {
                value: data.id,
                html: (
                    <div className="containerChekOption_SZabi">
                        <div>
                            <span className="name" title={`${doReFound.name}  ${doReFound.lastName}`}>
                                {doReFound.name} {' '} {doReFound.lastName}
                            </span>

                            <span className="price" title={parseFloat(doReFound.price).toLocaleString()}>
                                {parseFloat(doReFound.price).toLocaleString()}
                            </span>

                            <span className='unit'>
                                تومان
                            </span>
                        </div>
                        <div className='divRow2'>
                            <span className="date" title='1403/01/31'>
                                {doReFound.date}
                            </span>
                            <span className="number" title={doReFound.number}>
                                {doReFound.number}
                            </span>
                        </div>
                    </div>
                )
            }
        });
        setOptionsDoReSearched(optionsFound);
    }

    const handleClearInput = (className) => {
        const element = document.querySelectorAll(`.${className}`);
        element.forEach(input => {
            input.value = '';
        });
    }

    const handleThrowWarning = (warning) => {
        setDoReSearchWarning(true);
        setWarning(warning);
    }

    const handleClearWarning = () => {
        setDoReSearchWarning(false);
        setWarning();
    }

    /**
     * این متد در کامپوننت سلکت و هنگامی که کاربر آپشنی را انتخاب کند و یا از سلکت خارج شود
     * فراخوانی می‌شود
     */
    const handleClearAllSearchDoRe = () => {
        setId();
        handleClearInput('idSandRemittanceSZ');
        handleClearInput('name_doRe');

        setOptionsDoReSearched();
        handleClearWarning();
    }

    useEffect(() => {
        if (dataDoRes && dataDoRes.length > 0) {
            setInputDoReSearch([{
                html:
                    <>
                        <div className="row_SZ">
                            <div className="DIdsInputsMixersACSI_SZ">
                                <input
                                    type="text"
                                    className="idSandRemittanceSZ"
                                    placeholder={label.id}
                                    onInput={(e) => { handleSetId(e) }}
                                    autoComplete="off"
                                />
                                <button onClick={(e) => handleSearchId(e)}><i className="icofont-search-2" /></button>
                            </div>
                            <input
                                type="text"
                                id="nameInput"
                                className="inputMixersACSI_SZ sandRemittanceSZ"
                                onInput={(e) => handleSearchOptionsByName(e)}
                                placeholder={label.owner}
                                autoComplete="off"
                            />
                        </div>
                        <div className="row_SZ rowDatePrice_SZ">

                            <div className="divDate_SZ">
                                <input
                                    type="text"
                                    className="day btnS sandRemittanceSZ"
                                    placeholder="روز"
                                    name="day"
                                    onInput={e => handleSetDate(e)}
                                />
                                <span className="slash"> / </span>
                                <input
                                    type="text"
                                    className="month btnS sandRemittanceSZ"
                                    placeholder="ماه"
                                    name='month'
                                    onInput={(e) => handleSetDate(e)}
                                />
                                <span className="slash"> / </span>
                                <input
                                    type="text"
                                    className="year btnS sandRemittanceSZ"
                                    placeholder="سال"
                                    name="year"
                                    onInput={(e) => handleSetDate(e)}
                                />
                            </div>

                            <input
                                type="text"
                                className="price btnS sandRemittanceSZ"
                                placeholder='مبلغ'

                            />
                        </div>
                        <div className="row_SZ">
                            <input
                                type="text"
                                className="remittanceNumber btnS sandRemittanceSZ"
                                placeholder={label.number}
                            />
                        </div>

                    </>

            }]);
        }
    }, [dataDoRes, id]);

    useEffect(() => {
        handelSearchByDate()
    }, [date])


    useEffect(() => {
        if (warning && doReSearchWarning) {
            setDoReSearchWarning(true);
            setElementDoReSearchWarning(<div className="DWarnCustomersACSI_SZ">
                {warning}
                {' '}
                <i className="icofont-worried " />
            </div>
            );
        } else {
            // setDoReSearchWarning(false);

            // setElementDoReSearchWarning();
        }
    }, [warning]);



    return {
        inputDoReSearch,
        optionsDoReSearched,
        doReSearchWarning,
        elementDoReSearchWarning,
        handleClearAllSearchDoRe
    };
}

export default SearchDocumentsAndRemittancesSelect;