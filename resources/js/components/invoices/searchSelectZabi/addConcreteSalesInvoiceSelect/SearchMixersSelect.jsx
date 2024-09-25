
import { useEffect, useState } from "react";

/**
 * for use in AddCocreteSalesInvoice
 */
const SearchMixersSelect = ({ dataCustomers }) => {

    const [inputMixerSearch, setInputMixerSearch] = useState();
    const [optionsMixerSearched, setOptionsMixerSearched] = useState([]);
    const [id, setId] = useState();
    const [ownerId, setOwnerId] = useState();
    const [elementMixerSearchWarning, MixerSearchWarning] = useState();
    const [mixerSearchWarning, setCustomerSearchWarning] = useState();
    const [warning, setWarning] = useState();
    const [numberplateVal, setNumberplateVal] = useState({
        left: '',
        alphabet: '',
        mid: '',
        right: ''
    });

    const handleSetId = (e) => {
        const { value } = e.target;
        setOptionsMixerSearched();
        handleClearInput('nameInput');
        handleClearWarning();
        if (/^\d*$/.test(value)) {
            setId(parseInt(value, 10));
        } else {
            handleThrowWarning('لطفاً فقط عدد وارد کنید');
        }
    }

    const handleSearchId = (e) => {
        e.preventDefault();
        handleClearInput('nameInput');
        setOptionsMixerSearched();
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
                setOptionsMixerSearched(optionsFound);
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
        setOptionsMixerSearched();
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
                setOptionsMixerSearched(optionsFound);
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

    const handleSetNumberplate = (e, input) => {
        const { value } = e.target;
        let numberplate;
        setNumberplateVal(prev => ({ ...prev, [input]: value }));
        if (input == 'left' && (value || numberplateVal.alphabet || numberplateVal.mid || numberplateVal.right)) {
            numberplate = value + '-' + numberplateVal.mid + '-' + numberplateVal.right + '-' + numberplateVal.alphabet;
            setInput(prev => ({ ...prev, numberplate }));

        } else if (input == 'alphabet' && (value || numberplateVal.left || numberplateVal.mid || numberplateVal.right)) {
            numberplate = numberplateVal.left + '-' + numberplateVal.mid + '-' + numberplateVal.right + '-' + value;
            setInput(prev => ({ ...prev, numberplate }));

        } else if (input == 'mid' && (value || numberplateVal.left || numberplateVal.alphabet || numberplateVal.right)) {
            numberplate = numberplateVal.left + '-' + value + '-' + numberplateVal.right + '-' + numberplateVal.alphabet;
            setInput(prev => ({ ...prev, numberplate }));

        } else if (input == 'right' && (value || numberplateVal.left || numberplateVal.alphabet || numberplateVal.mid)) {
            numberplate = numberplateVal.left + '-' + numberplateVal.mid + '-' + value + '-' + numberplateVal.alphabet;
            setInput(prev => ({ ...prev, numberplate }));
        } else {
            setInput(prev => ({ ...prev, numberplate: '' }));
        }
    }

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
    const handleClearAllSearchMixer = () => {
        handleClearInput('idInput');
        handleClearInput('nameInput');
        setOptionsMixerSearched();
        handleClearWarning();
    }

    useEffect(() => {
        if (dataCustomers && dataCustomers.length > 0) {
            setInputMixerSearch([{
                html: <div className="mainSearchMixerACSI_SZ">
                    <div className="DInputsMixersACSI_SZ">
                        <div className="DIdsInputsMixersACSI_SZ">
                            <input
                                type="text"
                                id="idInput"
                                placeholder="شناسه‌مالک"
                                onInput={(e) => { handleSetId(e) }}
                                autoComplete="off"
                            />
                            <button onClick={(e) => handleSearchId(e)}><i className="icofont-search-2" /></button>
                        </div>
                        <input
                            type="text"
                            id="nameInput"
                            className="inputMixersACSI_SZ"
                            onInput={(e) => handleSearchOptionsCustomers(e)}
                            placeholder="نام و نام‌خانوادگی"
                            autoComplete="off"
                        />
                    </div>
                    <div className="DInputsMixersACSI_SZ">
                        <div className="DIdsInputsMixersACSI_SZ">
                            <input
                                type="text"
                                id="idInput"
                                placeholder="شناسه‌میکسر"
                                onInput={(e) => { handleSetId(e) }}
                                autoComplete="off"
                            />
                            <button onClick={(e) => handleSearchId(e)}><i className="icofont-search-2" /></button>
                        </div>
                        <div className="divNumberplateConcreteSIS_Se">
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    className="text2NumberplateConcreteSIS_Se"
                                    placeholder="00"
                                    maxLength="2"
                                    value={numberplateVal.left || ''}
                                    onInput={e => handleSetNumberplate(e, 'left')}
                                />

                                <select
                                    className="selectChNumberplateConcreteSIS_Se"
                                    value={numberplateVal.alphabet}
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
                                    className="text3NumberplateConcreteSIS_Se"
                                    placeholder="000"
                                    maxLength="3"
                                    value={numberplateVal.mid || ''}
                                    onInput={e => handleSetNumberplate(e, 'mid')}
                                />
                                <input
                                    type="text"
                                    className="textSerialNumberplateConcreteSIS_Se"
                                    placeholder="00"
                                    maxLength="2"
                                    value={numberplateVal.right || ''}
                                    onInput={e => handleSetNumberplate(e, 'right')}
                                />

                            </div>
                    </div>
                </div>

            }]);
        }
    }, [dataCustomers, id]);

    useEffect(() => {
        if (warning && mixerSearchWarning) {
            setCustomerSearchWarning(true);
            MixerSearchWarning(<div className="DWarnCustomersACSI_SZ">
                {warning}
                {' '}
                <i className="icofont-worried " />
            </div>
            );
        } else {
            // setCustomerSearchWarning(false);

            // MixerSearchWarning();
        }
    }, [warning]);

    return {
        inputMixerSearch,
        optionsMixerSearched,
        mixerSearchWarning,
        elementMixerSearchWarning,
        handleClearAllSearchMixer
    };
}

export default SearchMixersSelect;