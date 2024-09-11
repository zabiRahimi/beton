
import React, { createRef, useEffect, useRef, useState } from 'react';
import DataZabi from "../hooks/DateZabi";
import moment from 'jalali-moment';
import SelectZabi from '../hooks/SelectZabi';
// import iran from "../../../assets/images/iran.png";


const AddCocreteSalesInvoiceSearch = ({ getConcreteSalesInvoices, handelSetDataSearch, concretes }) => {
    const {
        checkDate
    } = DataZabi();

    const isConcreteRef = useRef(false);
    const [concreteRef, setConcreteRef] = useState();
    const [showSearchFilds, setShowSearchFilds] = useState(true);

    const [date, setDate] = useState({
        start: {
            day: '',
            month: '',
            year: ''
        },
        end: {
            day: '',
            month: '',
            year: ''
        }
    });

    const [input, setInput] = useState({
        startDate: '',
        endDate: '',
        id: '',
        concrete_id: '',
        customer_id: '',
        customerName: '',
        customerLastName: '',
        truck_id: '',
        numberplate: '',
        owner_id: '',
        ownerName: '',
        ownerLastName: '',
        driver_id: '',
        driverName: '',
        driverLastName: '',
    });

    const [concreteId, setConcreteId] = useState('');
    const [numberplateVal, setNumberplateVal] = useState({
        left: '',
        alphabet: '',
        mid: '',
        right: ''
    });
    useEffect(() => {
        if (!showSearchFilds) {
            let concreteRef = createRef();
            setConcreteRef(concreteRef);
            isConcreteRef.current = true;
        }
    }, [showSearchFilds]);

    useEffect(() => {
        if (concreteId) {
            setInput(prev => ({ ...prev, concrete_id: concreteId }));

        }
    }, [concreteId]);

    const handleShowSearchFilds = () => {
        setShowSearchFilds(perv => !perv);
    }

    const handleSearch = () => {

        if (input.startDate != '') {
            const validDate = checkDate(input.startDate, 'تاریخ ابتدای جستجو صحیح نیست');
            if (!validDate) {
                return;
            }
        }

        if (input.endDate != '') {
            const validDate = checkDate(input.endDate, 'تاریخ پایان جستجو صحیح نیست');
            if (!validDate) {
                return;
            }
        }
        handelSetDataSearch({
            startDate: input.startDate,
            endDate: input.endDate,
            id: input.id,
            concrete_id: input.concrete_id,
            customer_id: input.customer_id,
            customerName: input.customerName,
            customerLastName: input.customerLastName,
            truck_id: input.truck_id,
            numberplate: input.numberplate,
            owner_id: input.owner_id,
            ownerName: input.ownerName,
            ownerLastName: input.ownerLastName,
            driver_id: input.driver_id,
            driverName: input.driverName,
            driverLastName: input.driverLastName
        });
        getConcreteSalesInvoices(
            1,
            input.startDate,
            input.endDate,
            input.id,
            input.concrete_id,
            input.customer_id,
            input.customerName,
            input.customerLastName,
            input.truck_id,
            input.numberplate,
            input.owner_id,
            input.ownerName,
            input.ownerLastName,
            input.driver_id,
            input.driverName,
            input.driverLastName,
        );
    }

    const handleSaveValInput = (e, input) => {
        let { value } = e.target;
        setInput(prev => ({ ...prev, [input]: value }));
    }

    const handleSetDate = (e, date0, input) => {
        let { value } = e.target,
            day,
            month,
            year,
            valDate;
        value = value.toString();

        if (date0 == 'start') {
            day = date.start.day;
            month = date.start.month;
            year = date.start.year;
        } else {
            day = date.end.day;
            month = date.end.month;
            year = date.end.year;
        }

        if (input == 'day') {
            let { value } = e.target;
            value = value.toString();
            (value != 0 && value.length == 1) && (value = '0' + value);
            (value.length >= 3 && value[0] === '0') && (value = value.slice(1));

            if (value == '' || (Number(value) >= 0 && Number(value) <= 31)) {
                value == 0 ? value = '' : '';
                day = value
                setDate(prev => ({ ...prev, [date0]: { ...prev[date0], [input]: value } }));
            }

        } else if (input == 'month') {
            (value != 0 && value.length == 1) && (value = '0' + value);
            (value.length >= 3 && value[0] === '0') && (value = value.slice(1));
            if (value == '' || (Number(value) >= 0 && Number(value) <= 12)) {
                value == 0 ? value = '' : '';
                month = value;
                setDate(prev => ({ ...prev, [date0]: { ...prev[date0], [input]: value } }));
            }
        } else {
            if (value == '' || (Number(value) >= 1 && Number(value) <= 1500)) {
                value == 0 ? value = '' : '';
                year = value;
                setDate(prev => ({ ...prev, [date0]: { ...prev[date0], [input]: value } }));

            }
        }
        if (year == '' && month == '' && day == '') {
            valDate = '';
        } else {
            valDate = year + '/' + month + '/' + day;
        }
        if (date0 == 'start') {
            setInput(prev => ({ ...prev, startDate: valDate }));
        } else {
            setInput(prev => ({ ...prev, endDate: valDate }));
        }
    }

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

    const handleClearSearch = async () => {
        setNumberplateVal({
            left: '',
            alphabet: '',
            mid: '',
            right: ''
        });

        setDate({
            start: {
                day: '',
                month: '',
                year: ''
            },
            end: {
                day: '',
                month: '',
                year: ''
            }
        });

        setInput({
            startDate: '',
            endDate: '',
            id: '',
            concrete_id: '',
            customer_id: '',
            customerName: '',
            customerLastName: '',
            truck_id: '',
            numberplate: '',
            owner_id: '',
            ownerName: '',
            ownerLastName: '',
            driver_id: '',
            driverName: '',
            driverLastName: ''
        });

        if (isConcreteRef && concreteRef.current) {
            concreteRef.current.updateData('انتخاب');
        }


        await handelSetDataSearch({
            startDate: '',
            endDate: '',
            id: '',
            concrete_id: '',
            customer_id: '',
            customerName: '',
            customerLastName: '',
            truck_id: '',
            numberplate: '',
            owner_id: '',
            ownerName: '',
            ownerLastName: '',
            driver_id: '',
            driverName: '',
            driverLastName: ''
        });

        await getConcreteSalesInvoices(1, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
    }

    return (
        <div className="mainConcreteSIS_Se">
            <div className="headConcreteSIS_Se">
                {showSearchFilds ?
                    <button className='searchBtnsCoSIS_Se showSearchBtnCoSIS_Se ' onClick={handleShowSearchFilds}>
                        {/* <span>نمایش فیلدهای جستجو</span> */}
                        <i className='icofont-search-2 iSearchCoSIS_Se'/>
                        {/* <i className="icofont-eye eyeCoSIS_Se"></i> */}
                    </button>
                    :
                    <button className='searchBtnsCoSIS_Se closeSearchBtnCoSIS_Se' onClick={() => { handleShowSearchFilds(); handleClearSearch() }}>
                        {/* <span>بستن فیلدهای جستجو</span> */}
                        <i className='icofont-search-2 iSearchCoSIS_Se'/>
                        <i className='icofont-close-line iCloseLineSIS_Se'/>
                        {/* <i className="icofont-eye-blocked eyeBlockedCoSIS_Se"></i> */}
                    </button>
                }
            </div>

            {!showSearchFilds && <div className="containerConcreteSIS_Se">
                <div className="firstRowConcreteSIS_Se">
                    <div className="columnConcreteSIS_Se column1ConcreteSIS_Se">
                        <div className="startDate_Se">
                            <span className="stringFromDate_Se stringConcreteSIS_Se"> از تاریخ </span>
                            <div className="divInputsDateConcreteSIS_Se">
                                <input
                                    type="text"
                                    className="inputDate_Se dayDate_Se dayDateConcreteSIS_Se"
                                    id="dayFromSearch"
                                    placeholder="روز"
                                    value={date.start.day || ''}
                                    onInput={e => handleSetDate(e, 'start', 'day')}
                                />
                                <span className="slashDate_Se slashDateConcreteSIS_Se">/</span>
                                <input
                                    type="text"
                                    className="inputDate_Se monthDate_Se monthDateConcreteSIS_Se"
                                    placeholder="ماه"
                                    id="monthFromSearch"
                                    value={date.start.month || ''}
                                    onInput={e => handleSetDate(e, 'start', 'month')}
                                />
                                <span className="slashDate_Se slashDateConcreteSIS_Se">/</span>
                                <input
                                    type="text"
                                    className="inputDate_Se yearDate_Se yearDateConcreteSIS_Se"
                                    id="yearFromSearch"
                                    placeholder="سال"
                                    value={date.start.year || ''}
                                    onInput={e => handleSetDate(e, 'start', 'year')}
                                />
                            </div>
                        </div>
                        <div className="endtDate_Se">
                            <span className="stringUntilDate_Se stringConcreteSIS_Se"> تا تاریخ </span>
                            <div className="divInputsDateConcreteSIS_Se">
                                <input
                                    type="text"
                                    className="inputDate_Se dayDate_Se dayDateConcreteSIS_Se"
                                    id="dayUntilSearch"
                                    placeholder="روز"
                                    value={date.end.day || ''}
                                    onInput={e => handleSetDate(e, 'end', 'day')}
                                />
                                <span className="slashDate_Se slashDateConcreteSIS_Se">/</span>
                                <input
                                    type="text"
                                    className="inputDate_Se monthDate_Se monthDateConcreteSIS_Se"
                                    id="monthUntilSearch"
                                    placeholder="ماه"
                                    value={date.end.month || ''}
                                    onInput={e => handleSetDate(e, 'end', 'month')}
                                />
                                <span className="slashDate_Se slashDateConcreteSIS_Se">/</span>
                                <input
                                    type="text"
                                    className="inputDate_Se yearDate_Se yearDateConcreteSIS_Se"
                                    id="yearUntilSearch"
                                    placeholder="سال"
                                    value={date.end.year || ''}
                                    onInput={e => handleSetDate(e, 'end', 'year')}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="columnConcreteSIS_Se column2ConcreteSIS_Se">
                        <div className="idInvoiceConcreteSIS_Se">
                            <span className="stringFromDate_Se stringConcreteSIS_Se"> شماره قبض </span>
                            <input
                                type="text"
                                className="idBuerInputConcreteSIS_Se"
                                placeholder='شماره قبض'
                                value={input.id || ''}
                                onInput={e => handleSaveValInput(e, 'id')}
                            />
                        </div>
                        <div className="typeConcreteSIS_Se">
                            <span className="stringFromDate_Se stringConcreteSIS_Se stringTypeConcreteSIS_Se"> بتن </span>
                            <div className='divSelectTypeConcreteSIS_Se'>
                                <SelectZabi
                                    primaryLabel='انتخاب'
                                    options={concretes}
                                    saveOption={setConcreteId}
                                    ref={isConcreteRef && concreteRef}
                                />
                            </div>

                        </div>

                    </div>
                    <div className="columnConcreteSIS_Se column3ConcreteSIS_Se">
                        <div className="buerConcreteSIS_Se idBuerConcreteSIS_Se">
                            <span className="stringFromDate_Se stringConcreteSIS_Se"> شناسه خریدار </span>
                            <input
                                type="text"
                                className="idBuerInputConcreteSIS_Se"
                                placeholder='شناسه خریدار'
                                value={input.customer_id || ''}
                                onInput={e => handleSaveValInput(e, 'customer_id')}
                            />
                        </div>
                        <div className="buerConcreteSIS_Se idBuerConcreteSIS_Se">
                            <span className="stringFromDate_Se stringConcreteSIS_Se"> نام خریدار </span>
                            <input
                                type="text"
                                className="idBuerInputConcreteSIS_Se"
                                placeholder='نام خریدار'
                                value={input.customerName || ''}
                                onInput={e => handleSaveValInput(e, 'customerName')}
                            />
                        </div>
                        <div className="buerConcreteSIS_Se idBuerConcreteSIS_Se">
                            <span className="stringFromDate_Se stringConcreteSIS_Se" title='نام‌خانوادگی خریدار'> نام‌خانوادگی خریدار </span>
                            <input
                                type="text"
                                className="idBuerInputConcreteSIS_Se"
                                placeholder='نام خانوادگی خریدار'
                                value={input.customerLastName || ''}
                                onInput={e => handleSaveValInput(e, 'customerLastName')}

                            />
                        </div>

                    </div>
                    <div className="columnConcreteSIS_Se column4ConcreteSIS_Se"></div>
                </div>
                <div className="secondRowCocreteSIS_Se">
                    <div className="columnConcreteSIS_Se column1ConcreteSIS_Se">
                        <div className="buerConcreteSIS_Se idBuerConcreteSIS_Se">
                            <span className="stringFromDate_Se stringConcreteSIS_Se"> شناسه‌مالک میکسر </span>
                            <input
                                type="text"
                                className="idBuerInputConcreteSIS_Se"
                                placeholder='شناسه مالک میکسر'
                                value={input.owner_id || ''}
                                onInput={e => handleSaveValInput(e, 'owner_id')}
                            />
                        </div>
                        <div className="buerConcreteSIS_Se idBuerConcreteSIS_Se">
                            <span className="stringFromDate_Se stringConcreteSIS_Se"> نام‌‌مالک میکسر </span>
                            <input
                                type="text"
                                className="idBuerInputConcreteSIS_Se"
                                placeholder='نام مالک میکسر'
                                value={input.ownerName || ''}
                                onInput={e => handleSaveValInput(e, 'ownerName')}
                            />
                        </div>
                        <div className="buerConcreteSIS_Se idBuerConcreteSIS_Se">
                            <span className="stringFromDate_Se stringConcreteSIS_Se"> نام‌خانوادگی مالک </span>
                            <input
                                type="text"
                                className="idBuerInputConcreteSIS_Se"
                                placeholder='نام خانوادگی مالک میکسر'
                                value={input.ownerLastName || ''}
                                onInput={e => handleSaveValInput(e, 'ownerLastName')}
                            />
                        </div>
                    </div>

                    <div className="columnConcreteSIS_Se column2ConcreteSIS_Se">
                        <div className="buerConcreteSIS_Se idBuerConcreteSIS_Se">
                            <span className="stringFromDate_Se stringConcreteSIS_Se"> شناسه میکسر </span>
                            <input
                                type="text"
                                className="idBuerInputConcreteSIS_Se"
                                placeholder='شناسه میکسر'
                                value={input.truck_id || ''}
                                onInput={e => handleSaveValInput(e, 'truck_id')}
                            />
                        </div>
                        <div className="buerConcreteSIS_Se idBuerConcreteSIS_Se">
                            <span className="stringFromDate_Se stringConcreteSIS_Se"> پلاک </span>
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

                    <div className="columnConcreteSIS_Se column3ConcreteSIS_Se">
                        <div className="buerConcreteSIS_Se idBuerConcreteSIS_Se">
                            <span className="stringFromDate_Se stringConcreteSIS_Se"> شناسه راننده </span>
                            <input
                                type="text"
                                className="idBuerInputConcreteSIS_Se"
                                placeholder='شناسه راننده'
                                value={input.driver_id || ''}
                                onInput={e => handleSaveValInput(e, 'driver_id')}
                            />
                        </div>
                        <div className="buerConcreteSIS_Se idBuerConcreteSIS_Se">
                            <span className="stringFromDate_Se stringConcreteSIS_Se" > نام‌ راننده </span>
                            <input
                                type="text"
                                className="idBuerInputConcreteSIS_Se"
                                placeholder='نام راننده'
                                value={input.driverName || ''}
                                onInput={e => handleSaveValInput(e, 'driverName')}
                            />
                        </div>
                        <div className="buerConcreteSIS_Se idBuerConcreteSIS_Se">
                            <span className="stringFromDate_Se stringConcreteSIS_Se"> نام‌خانوادگی راننده </span>
                            <input
                                type="text"
                                className="idBuerInputConcreteSIS_Se"
                                placeholder='نام خانوادگی راننده'
                                value={input.driverLastName || ''}
                                onInput={e => handleSaveValInput(e, 'driverLastName')}
                            />
                        </div>
                    </div>

                    <div className="columnConcreteSIS_Se column4ConcreteSIS_Se">
                        <div className="divBtnDelSearch_Se">
                            <button
                                className="--styleLessBtn btnDelSearch"
                                onClick={handleClearSearch}
                            >
                                <span className="sritngDelSearch_Se"> حذف جستجو </span>
                                <i className="icofont-close-circled icofontDelSearch_Se"></i>
                            </button>
                        </div>
                        <div className="divBtnSearch_Se">
                            <button
                                className="--styleLessBtn btnSearch"
                                onClick={handleSearch}
                            >
                                <span className="sritngSearch_Se"> جستجو </span>
                                <i className="icofont-search-2 icofontSearch_Se"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default AddCocreteSalesInvoiceSearch;