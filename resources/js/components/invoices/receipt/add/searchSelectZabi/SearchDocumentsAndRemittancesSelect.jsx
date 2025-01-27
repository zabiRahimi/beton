
import { useEffect, useRef, useState } from "react";

const SearchDocumentsAndRemittancesSelect = ({ dataDoRes, type }) => {
    const priceDoReRef = useRef(null)
    /**
     * دیتای ورودی به کامپوننت را طی یک عملیاتی به دادهایی با فرمت مورد نظر
     * تبدیل شده و در استیت زیر قرار می گیرند
     */
    const [data, setData] = useState([]);
    const [inputDoReSearch, setInputDoReSearch] = useState();
    const [optionsDoReSearched, setOptionsDoReSearched] = useState([]);
    const [id, setId] = useState();
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [number, setNumber] = useState();
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
        let value;
        if (type === 'check') {
            value = dataDoRes.map((dataDoRe) => (
                {
                    id: dataDoRe.id,
                    name: `${dataDoRe.name} ${dataDoRe.lastName}`,
                    price: parseFloat(dataDoRe.price).toLocaleString(),
                    number: dataDoRe.checkNumber,
                    date: dataDoRe.date
                }
            ));
        } else {
            value = dataDoRes.map((dataDoRe) => (
                {
                    id: dataDoRe.id,
                    name: `${dataDoRe.buyerName} ${dataDoRe.buyerLastName}`,
                    price: parseFloat(dataDoRe.price).toLocaleString(),
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

    useEffect(() => {
        /**
         * هر دو متغیر زیر مقادیر پیدا شده را در خود ذخیره می کنند
         * تنها تفاوت بین این دو این است که متغیر اول همیشه باید یک مقدار اولیه داشته
         * باشد ولی متغیر دوم در ابتدای کار همواره باید خالی باشد
         * برنامه به این صورت کار می کند که در هر بار پرس و جو مقدار متغیر اول محدود می شود
         * به همان مقدار پیدا شده و باز همین مقدار پیدا شده با فیلدهای بعدی نیز 
         * فیلتر می شوند، این برای این است که کاربر بتواند با چند فیلد به نتیجه دلخواه خود
         * نزدیکتر شود
         */
        let founded = data;
        let doReFounds = [];
        if (!id) {

            if (name) {
                const result = handleSearchByName(founded, name);
                doReFounds = result;
                founded = result;
            }
            if (price) {
                const result = handleSearchByPrice(founded, price);
                doReFounds = result;
                founded = result;
            }
            if (date.day || date.year || date.month) {
                const result = handleSearchByDate(founded);
                doReFounds = result;
                founded = result;
            }
            if (number) {
                const result = handleSearchByNumber(founded, number);
                doReFounds = result;
                founded = result;
            }
            if (doReFounds[0] != undefined) {
                handleCreateOptions(doReFounds);
            } else if (name || price || date.day || date.year || date.month || number) {

                handleThrowWarning('نتیجه‌ای یافت نشد');
            }
        }
    }, [name, price, id, date.day, date.year, date.month, number]);

    const handleSetId = (e) => {
        const { value } = e.target;
        setOptionsDoReSearched();
        handleSetInitialData();
        setName();
        setPrice();
        setDate({
            day: '',
            month: '',
            year: ''
        });
        setNumber();
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
        if (id && data[0] !== undefined) {
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

    const handleSearchOptionsByName = async (e) => {
        const { value } = e.target;
        setName(value);
        setId();
        handleClearInput('idSandRemittanceSZ');
        setOptionsDoReSearched();
        handleClearWarning();
    }

    const handleSearchByName = (_data, searchTerm) => {
        return _data.filter(item => item.name.includes(searchTerm))
    };

    const handleSearchOptionsByPrice = async (e) => {
        const { value } = e.target;
        setPrice(value);
        setId();
        handleClearInput('idSandRemittanceSZ');
        setOptionsDoReSearched();
        handleClearWarning();
    }

    const handleSearchByPrice = (_data, searchTerm) => {
        return _data.filter(item => item.price.includes(searchTerm))
    };

    const handleSetDate = (e) => {
        let { value, name } = e.target;
        setId();
        handleClearInput('idSandRemittanceSZ');
        setOptionsDoReSearched();
        handleClearWarning();
        (name == 'day' || name == 'month') && (value.length == 1 && (value = 0 + value));
        setDate(perv => ({ ...perv, [name]: value }));
    }

    const handleSearchByDate = (_data) => {
        /**
         * تاریخ به روز، ماه، سال قسیم کرده و هر کدام در کلیدی به نام خودش
         * گذاشته و به شی اضافه می کند
         */
        const parsedDateArray = _data.map(item => {
            const [year, month, day] = item.date.split('-');
            return {
                ...item,
                day,
                month,
                year,
            };
        });

        /**
         * چنانچه هر کدام از کلیدهای روز، ماه، سال که در کد بالا به شی اضافه شدند بدون 
         * مقدار بودند نادیده گرفته می شوند ولی اگر مقدار داشتن بر اساس همان مقدار آرایه
         * فیلتر می شود
         */
        const filteredArray = parsedDateArray.filter(item => {
            const matchDay = date.day ? item.day === date.day : true;
            const matchMonth = date.month ? item.month === date.month : true;
            const matchYear = date.year ? item.year === date.year : true;

            return matchDay && matchMonth && matchYear;
        });

        /**
         *  در ابتدای متد کلیدهای روز، ماه، سال برای انجام عملیات اضافه شده بودند
         * در کد زیر حذف می شوند 
         */
        const finalArray = filteredArray.map(({ day, month, year, ...rest }) => rest);

        return finalArray;
    }

    const handleSearchOptionsByNumber = async (e) => {
        const { value } = e.target;
        setNumber(value);
        setId();
        handleClearInput('idSandRemittanceSZ');
        setOptionsDoReSearched();
        handleClearWarning();
    }

    const handleSearchByNumber = (_data, searchTerm) => {
        return _data.filter(item => item.number.includes(searchTerm))
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

                            <span className="price" title={doReFound.price}>
                                {doReFound.price}
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

    const formatNub = (refCurrent) => {
        const element = document.getElementById('priceDoRe');
        let val,
            checkDthot,
            resalt = element.value.replace(/[\s,]/g, "");
        // چک می کند که آیا آخرین کارکتر وارد شده علامت "." است؟
        if (resalt.slice(-1) == '.') {
            checkDthot = true;
        } else {
            checkDthot = false;
        }
        // چک می کند فقط رشته عددی باشد
        if (parseFloat(resalt)) {
            val = parseFloat(resalt);
            /**
             * طبق شرط بالا چنانچه آخرین کارکتر "." دوباره این
             * علامت را به آخر رشته اضافه می کند
             */
            val = checkDthot ? val.toLocaleString() + '.' : val.toLocaleString();

            element.value = val;
        }
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
                                onInput={(e) => {
                                    formatNub('priceDoRe');
                                    handleSearchOptionsByPrice(e);
                                }}
                                id="priceDoRe"
                            // ref={priceDoReRef}
                            />
                        </div>
                        <div className="row_SZ">
                            <input
                                type="text"
                                className="remittanceNumber btnS sandRemittanceSZ"
                                placeholder={label.number}
                                onInput={e => handleSearchOptionsByNumber(e)}
                            />
                        </div>

                    </>

            }]);
        }
    }, [dataDoRes, id]);

    useEffect(() => {
        if (warning && doReSearchWarning) {
            setDoReSearchWarning(true);
            setElementDoReSearchWarning(<div className="DWarnCustomersACSI_SZ">
                {warning}
                {' '}
                <i className="icofont-worried " />
            </div>
            );
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