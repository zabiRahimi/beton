
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
    const [label, setLabel] = useState({
        id: '',
        number: ''
    })

    const labels = {
        'check': {
            id: 'شناسه چک',
            number: 'شماره چک'

        }
    }

    useEffect(() => {
        if (type) {

            const typeConfig = paymentOptions[type];
            if (typeConfig) {
                setLabel(typeConfig);
            }
        }
    }, [type]);

    const handleSetId = (e) => {
        const { value } = e.target;
        setOwnerId();

        setOptionsDoReSearched();
        handleClearInput('ownerId_doRe');
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
        handleClearInput('ownerId_doRe');
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

    const handleSetOwnerId = (e) => {
        const { value } = e.target;
        setId();
        handleClearInput('id_mixer');
        handleClearInput('ownerName_doRe');
        handleClearInput('numberplate_mixer');
        setOptionsDoReSearched();
        handleClearWarning();
        if (/^\d*$/.test(value)) {
            setOwnerId(parseInt(value, 10));
        } else {
            handleThrowWarning('لطفاً فقط عدد وارد کنید');
        }
    }

    const handleSearchOwnerId = (e) => {
        e.preventDefault();
        setId();
        handleClearInput('id_mixer');
        handleClearInput('ownerName_doRe');
        handleClearInput('numberplate_mixer');
        setOptionsDoReSearched();
        handleClearWarning();
        if (ownerId) {
            const customerIdsFound = dataDoRes.filter(obj => obj.customer.id === ownerId);
            if (customerIdsFound[0] != undefined) {
                const optionsFound = customerIdsFound.map((data, i) => {
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
                handleThrowWarning(`نتیجه‌ای یافت نشد`);
            }
        } else {
            handleThrowWarning('ابتدا شناسه مالک را وارد کنید');
        }
    }

    const handleSearchOptionsByOwners = (e) => {
        const { value } = e.target;
        setId();
        setOwnerId();
        handleClearInput('ownerId_doRe');
        handleClearInput('id_mixer');
        handleClearInput('numberplate_mixer');
        setOptionsDoReSearched();
        handleClearWarning();
        if (value) {
            const newDataOwners = dataDoRes.map(item => ({
                id: item.customer.id,
                name: `${item.customer.name} ${item.customer.lastName}`
            }));
            const ids = handleSearchByOwnerName(newDataOwners, value);

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

    const handleSearchByOwnerName = (newArr, searchTerm) => {
        return newArr
            .filter(item => item.name.includes(searchTerm))
            .map(item => item.id);
    };



    const handleSearchByNumberplate = () => {
        if (numberplate.left || numberplate.alphabet || numberplate.mid || numberplate.right) {
            const filteredMixers = dataDoRes.filter(item => {
                const [leftPart, midPart, rightPart, alphabetPart] = item.numberplate.split('-');
                return (
                    (numberplate.left === '' || leftPart.includes(numberplate.left)) &&
                    (numberplate.alphabet === '' || alphabetPart === numberplate.alphabet) &&
                    (numberplate.mid === '' || midPart.includes(numberplate.mid)) &&
                    (numberplate.right === '' || rightPart.includes(numberplate.right))
                );
            });
            if (filteredMixers.length > 0) {
                const optionsFound = filteredMixers.map((data, i) => {
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
                setOptionsDoReSearched();
                handleThrowWarning('نتیجه‌ای یافت نشد');
            }

        } else {
            setOptionsDoReSearched();
        }
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
        setOwnerId();
        handleClearInput('ownerId_doRe');
        handleClearInput('ownerName_doRe');
        handleClearInput('id_mixer');
        handleClearInput('numberplate_mixer');
        setOptionsDoReSearched();
        handleClearWarning();
    }

    useEffect(() => {
        if (dataDoRes && dataDoRes.length > 0) {
            setInputDoReSearch([{
                html: <div className="mainSearchMixerACSI_SZ">
                    <div className="DInputsMixersACSI_SZ">
                        <div className="DIdsInputsMixersACSI_SZ">
                            <input
                                type="text"
                                className="ownerId_doRe"
                                placeholder={labeld.id}
                                onInput={(e) => { handleSetOwnerId(e) }}
                                autoComplete="off"
                            />
                            <button onClick={(e) => handleSearchOwnerId(e)}><i className="icofont-search-2" /></button>
                        </div>
                        <input
                            type="text"
                            id="nameInput"
                            className="inputMixersACSI_SZ ownerName_doRe"
                            onInput={(e) => handleSearchOptionsByOwners(e)}
                            placeholder="نام و نام‌خانوادگی"
                            autoComplete="off"
                        />
                    </div>
                    <div className="DInputsMixersACSI_SZ D2InputsMixersACSI_SZ">
                        <div className="DIdsInputsMixersACSI_SZ">
                            <input
                                type="text"
                                id="idInput"
                                className="id_mixer"
                                placeholder="شناسه‌میکسر"
                                onInput={(e) => { handleSetId(e) }}
                                autoComplete="off"
                            />
                            <button onClick={(e) => handleSearchId(e)}><i className="icofont-search-2" /></button>
                        </div>
                        <div className="DNumberplateACSI_SZ">
                            <input
                                type="text"
                                name=""
                                id=""
                                className="text2NumberplateACSI_SZ numberplate_mixer"
                                placeholder="00"
                                maxLength="2"
                                // value={numberplate.left || ''}
                                onInput={e => handleSetNumberplate(e, 'left')}
                            />

                            <select
                                className="selectChNumberplateACSI_SZ numberplate_mixer"
                                // value={numberplate.alphabet}
                                onChange={e => handleSetNumberplate(e, 'alphabet')}
                            >
                                <option value=""> حرف </option>
                                <option value="ا"> الف </option>
                                <option value="ب"> ب </option>
                                <option value="پ"> پ </option>
                                <option value="ت"> ت </option>
                                <option value="ث"> ث </option>
                                <option value="ج"> ج </option>
                                <option value="چ"> چ </option>
                                <option value="ح"> ح </option>
                                <option value="خ"> خ </option>
                                <option value="د"> د </option>
                                <option value="ذ"> ذ </option>
                                <option value="ر"> ر </option>
                                <option value="ز"> ز </option>
                                <option value="ژ"> ژ </option>
                                <option value="س"> س </option>
                                <option value="ش"> ش </option>
                                <option value="ص"> ص </option>
                                <option value="ض"> ض </option>
                                <option value="ط"> ط </option>
                                <option value="ظ"> ظ </option>
                                <option value="ع"> ع </option>
                                <option value="غ"> غ </option>
                                <option value="ف"> ف </option>
                                <option value="ق"> ق </option>
                                <option value="ک"> ک </option>
                                <option value="گ"> گ </option>
                                <option value="ل"> ل </option>
                                <option value="م"> م </option>
                                <option value="ن"> ن </option>
                                <option value="و"> و </option>
                                <option value="ه"> ه </option>
                                <option value="ی"> ی </option>
                            </select>

                            <input
                                type="text"
                                name=""
                                id=""
                                className="text3NumberplateACSI_SZ numberplate_mixer"
                                placeholder="000"
                                maxLength="3"
                                // value={numberplate.mid || ''}
                                onInput={e => handleSetNumberplate(e, 'mid')}
                            />
                            <input
                                type="text"
                                className="textSerialNumberplateACSI_SZ numberplate_mixer"
                                placeholder="00"
                                maxLength="2"
                                // value={numberplate.right || ''}
                                onInput={e => handleSetNumberplate(e, 'right')}
                            />

                        </div>
                    </div>
                </div>

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

    useEffect(() => {
        if (numberplate.left || numberplate.alphabet || numberplate.mid || numberplate.right) {
            handleSearchByNumberplate();
        }
    }, [numberplate]);

    return {
        inputDoReSearch,
        optionsDoReSearched,
        doReSearchWarning,
        elementDoReSearchWarning,
        handleClearAllSearchDoRe
    };
}

export default SearchDocumentsAndRemittancesSelect;