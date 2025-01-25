
import { useEffect, useState } from "react";

/**
 * for use in AddCocreteSalesInvoice
 */
const SearchDocumentsAndRemittancesSelect = ({ dataDoRes, type }) => {
    const [inputDoReSearch, setInputDoReSearch] = useState();
    const [optionsDoReSearched, setOptionsDoReSearched] = useState([]);
    const [id, setId] = useState();
    const [ownerId, setOwnerId] = useState();
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

    useEffect(() => {
        if (type) {

            const typeConfig = labels[type];
            if (typeConfig) {
                setLabel(typeConfig);
            }
        }
    }, [type]);

    const handleSetId = (e) => {
        const { value } = e.target;
        setOwnerId();

        setOptionsDoReSearched();
        handleClearInput('idSandRemittanceSZ');
        handleClearInput('ownerName_doRe');
        handleClearInput('numberplate_mixer');
        handleClearWarning();
        if (/^\d*$/.test(value)) {
            setId(parseInt(value, 10));
        } else {
            handleThrowWarning('لطفاً فقط عدد وارد کنید');
        }
    }

    const handleSearchId = (e) => {
        e.preventDefault();
        setOwnerId();
        handleClearInput('idSandRemittanceSZ');
        handleClearInput('ownerName_doRe');
        handleClearInput('numberplate_mixer');
        setOptionsDoReSearched();
        handleClearWarning();
        if (id) {
            const doReFound = [dataDoRes.find(obj => obj.id === id)];
            if (doReFound[0] != undefined) {
                const optionsFound = doReFound.map((data, i) => {
                    const adjustedData = type === 'check' ?
                        {
                            name: data.ownerName,
                            lastName: data.ownerLastName,
                            number: data.checkNumber
                        } :
                        {
                            name: data.buyerName,
                            lastName: data.buyerLastName,
                            number: remittanceNumber
                        };
                    return {
                        value: data.id,
                        html: (
                            <div className="containerChekOption_SZabi">
                                <div>
                                    <span className="name" title={`${adjustedData.name}  ${adjustedData.lastName}`}>
                                        {adjustedData.name} {' '} {adjustedData.lastName}
                                    </span>

                                    <span className="price" title='3,000,000,000'>
                                        {data.price}
                                    </span>

                                    <span className='unit'>
                                        تومان
                                    </span>
                                </div>
                                <div className='divRow2'>
                                    <span className="date" title='1403/01/31'>
                                        {data.date}
                                    </span>
                                    <span className="number" title={adjustedData.number}>
                                        {adjustedData.number}
                                    </span>
                                </div>
                            </div>
                        )
                    }
                });
                setOptionsDoReSearched(optionsFound);
            } else {
                handleThrowWarning(`نتیجه‌ای یافت نشد`);
            }
        } else {
            handleThrowWarning('ابتدا شناسه میکسر را وارد کنید');
        }
    }

    const handleSearchOptionsByName = (e) => {
        const { value } = e.target;
        setId();
        handleClearInput('idSandRemittanceSZ');
        // handleClearInput('id_mixer');
        // handleClearInput('numberplate_mixer');
        setOptionsDoReSearched();
        handleClearWarning();
        if (value) {
            const newDataOwners = dataDoRes.map(item => ({
                id: item.customer.id,
                name: `${item.customer.name} ${item.customer.lastName}`
            }));
            const ids = handleSearchByName(newDataOwners, value);

            if (ids.length > 0) {
                let filteredArr = dataDoRes.filter(item => ids.includes(item.customer.id));
                const optionsFound = filteredArr.map((data, i) => {
                    let arr = data.numberplate.split('-');
                    return {
                        value: data.id,
                        value2: data.customer.id,
                        html: <div key={i} className="mixerAptionSelectFB">
                            <span className="mixerNamberpalteSelectFB">
                                <div className="numberplateDiv">
                                    <span className="numberplateDivS1">{arr[0]}</span>
                                    <span className="numberplateDivS2">{arr[3] == 'ا' ? 'الف' : arr[3]}</span>
                                    <span className="numberplateDivS3">{arr[1]}</span>
                                    <span className="numberplateDivS4">{arr[2]}</span>
                                </div>
                            </span>

                            <span className="mixerOwnerSelectFB">
                                {data.customer.name}
                                {' '}
                                {data.customer.lastName}
                            </span>

                        </div>
                    }
                });
                setOptionsDoReSearched(optionsFound);
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

    const handleSetDate = (e) => {
        let { value, name } = e.target;
        (name=='day'|| name=='month') && (value.length== 1 && (value=0+value));
        setDate(prev => ({ ...prev, [name]: value }));
        // handleSearchByDate();
    }
    console.log(date);

   const handleSearchByDate = ()=>{
    const value= `${date.year}.-.${date.month}.-.${date.day}`;
    
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
        handleClearInput('ownerName_doRe');
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
                                <input type="text"
                                    className="day btnS sandRemittanceSZ"
                                    placeholder="روز"
                                    name="day"
                                    onInput={(e) => handleSetDate(e)}
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
    }, [dataDoRes, id, ownerId]);

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