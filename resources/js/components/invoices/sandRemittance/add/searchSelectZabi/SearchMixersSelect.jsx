
import { useEffect, useState } from "react";

/**
 * for use in AddCocreteSalesInvoice
 */
const SearchMixersSelect = ({ dataMixers }) => {
    const [inputMixerSearch, setInputMixerSearch] = useState();
    const [optionsMixersSearched, setOptionsMixerSearched] = useState([]);
    const [id, setId] = useState();
    const [ownerId, setOwnerId] = useState();
    const [elementMixerSearchWarning, MixerSearchWarning] = useState();
    const [mixerSearchWarning, setCustomerSearchWarning] = useState();
    const [warning, setWarning] = useState();
    const [numberplate, setNumberplate] = useState({
        left: '',
        alphabet: '',
        mid: '',
        right: ''
    });

    const handleSetId = (e) => {
        const { value } = e.target;
        setOwnerId();
        setNumberplate({
            left: '',
            alphabet: '',
            mid: '',
            right: ''
        })
        setOptionsMixerSearched();
        handleClearInput('ownerId_mixer');
        handleClearInput('ownerName_mixer');
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
        handleClearInput('ownerId_mixer');
        handleClearInput('ownerName_mixer');
        handleClearInput('numberplate_mixer');
        setOptionsMixerSearched();
        handleClearWarning();
        if (id) {
            const mixerFound = [dataMixers.find(obj => obj.id === id)];
            if (mixerFound[0] != undefined) {
                const optionsFound = mixerFound.map((data, i) => {
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
                setOptionsMixerSearched(optionsFound);
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
        setNumberplate(
            {
                left: '',
                alphabet: '',
                mid: '',
                right: ''
            }
        );
        handleClearInput('id_mixer');
        handleClearInput('ownerName_mixer');
        handleClearInput('numberplate_mixer');
        setOptionsMixerSearched();
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
        setNumberplate(
            {
                left: '',
                alphabet: '',
                mid: '',
                right: ''
            }
        );
        handleClearInput('id_mixer');
        handleClearInput('ownerName_mixer');
        handleClearInput('numberplate_mixer');
        setOptionsMixerSearched();
        handleClearWarning();
        if (ownerId) {
            const customerIdsFound = dataMixers.filter(obj => obj.customer.id === ownerId);
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
                setOptionsMixerSearched(optionsFound);
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
        setNumberplate({
            left: '',
            alphabet: '',
            mid: '',
            right: ''
        })
        handleClearInput('ownerId_mixer');
        handleClearInput('id_mixer');
        handleClearInput('numberplate_mixer');
        setOptionsMixerSearched();
        handleClearWarning();
        if (value) {
            const newDataOwners = dataMixers.map(item => ({
                id: item.customer.id,
                name: `${item.customer.name} ${item.customer.lastName}`
            }));
            const ids = handleSearchByOwnerName(newDataOwners, value);

            if (ids.length > 0) {
                let filteredArr = dataMixers.filter(item => ids.includes(item.customer.id));
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
                setOptionsMixerSearched(optionsFound);
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

    const handleSetNumberplate = (e, input) => {
        const { value } = e.target;
        setId();
        setOwnerId();
        handleClearInput('ownerId_mixer');
        handleClearInput('ownerName_mixer');
        handleClearInput('id_mixer');
        setOptionsMixerSearched();
        handleClearWarning();
        setNumberplate(prev => ({ ...prev, [input]: value }));
    }

    const handleSearchByNumberplate = () => {
        if (numberplate.left || numberplate.alphabet || numberplate.mid || numberplate.right) {
            const filteredMixers = dataMixers.filter(item => {
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
                setOptionsMixerSearched(optionsFound);
            } else {
                setOptionsMixerSearched();
                handleThrowWarning('نتیجه‌ای یافت نشد');
            }

        } else {
            setOptionsMixerSearched();
        }
    }

    const handleClearInput = (className) => {
        const element = document.querySelectorAll(`.${className}`);
        element.forEach(input => {
            input.value = '';
        });
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
        setId();
        setOwnerId();
        setNumberplate({
            left: '',
            alphabet: '',
            mid: '',
            right: ''
        });
        handleClearInput('ownerId_mixer');
        handleClearInput('ownerName_mixer');
        handleClearInput('id_mixer');
        handleClearInput('numberplate_mixer');
        setOptionsMixerSearched();
        handleClearWarning();
    }

    useEffect(() => {
        if (dataMixers && dataMixers.length > 0) {
            setInputMixerSearch([{
                html: <div className="mainSearchMixerACSI_SZ">
                    <div className="DInputsMixersACSI_SZ">
                        <div className="DIdsInputsMixersACSI_SZ">
                            <input
                                type="text"
                                className="ownerId_mixer"
                                placeholder="شناسه‌مالک"
                                onInput={(e) => { handleSetOwnerId(e) }}
                                autoComplete="off"
                            />
                            <button onClick={(e) => handleSearchOwnerId(e)}><i className="icofont-search-2" /></button>
                        </div>
                        <input
                            type="text"
                            id="nameInput"
                            className="inputMixersACSI_SZ ownerName_mixer"
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
    }, [dataMixers, id, ownerId]);

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

    useEffect(() => {
        if (numberplate.left || numberplate.alphabet || numberplate.mid || numberplate.right) {
            handleSearchByNumberplate();
        }
    }, [numberplate]);

    return {
        inputMixerSearch,
        optionsMixersSearched,
        mixerSearchWarning,
        elementMixerSearchWarning,
        handleClearAllSearchMixer
    };
}

export default SearchMixersSelect;