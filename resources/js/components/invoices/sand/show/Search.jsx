
import React, { useEffect, useRef, useState } from 'react';
import DataZabi from "../../../hooks/DateZabi";
import SelectZabi from '../../../hooks/SelectZabi';
import RouteService from "./RouteService";

import { formatNub, htmlFor } from './Helper';

const Search = ({ getSandInvoices, handelSetDataSearch, totalRecords }) => {
    const {
        checkDate,
        convertToGregorian
    } = DataZabi();
    const sandTypeRef = useRef(null);
    const sandStoreRef = useRef(null);
    const priceRef = useRef(null);
    const factoryRef = useRef(null);
    
    const [remittanceOptions, setRemittanceOptions] = useState([]);

    const [dumpTrucks, setDumpTrucks] = useState('');
    const [dumpTruckOptions, setDumpTruckOptions] = useState([]);
    const [dumpTruckId, setDumpTruckId] = useState('');
    const [dumpTruckOwnerId, setDumpTruckOwnerId] = useState('');

    const [drivers, setDrivers] = useState('');
    const [driverOptions, setDriverOptions] = useState([]);
    const [driverId, setDrvierId] = useState('');

    const [numberplateVal, setNumberplateVal] = useState({
        left: '',
        alphabet: '',
        mid: '',
        right: ''
    });

    const sandTypes = [
        {
            value: '',
            html: <div className="sandAptionSelectFB">همه</div>
        },
        {
            value: 'ماسه شسته',
            html: <div className="sandAptionSelectFB">ماسه شسته</div>
        },
        {
            value: 'ماسه 06',
            html: <div className="sandAptionSelectFB">ماسه 06</div>
        },
        {
            value: 'شن بادامی',
            html: <div className="sandAptionSelectFB">شن بادامی</div>
        },
        {
            value: 'شن نخودی',
            html: <div className="sandAptionSelectFB">شن نخودی</div>
        },
        {
            value: 'سایر',
            html: <div className="sandAptionSelectFB">سایر</div>
        }
    ];
    const [sandType, setsandType] = useState('');

    const [sandStoreOptions, setSandStoreOptions] = useState([]);
    const [sandStoreId, setSandStoreId] = useState('');
    const [factory, setFactory] = useState('');

    const factorys = [
        {
            value: '',
            html: <div className="concreteAptionSelectFB">
                <span className="concreteLabelSelectFB">
                    همه
                </span>
            </div>
        },
        {
            value: 'شهرداری ارسنجان',
            html: <div className="concreteAptionSelectFB">
                <span className="concreteLabelSelectFB">
                    شهرداری ارسنجان
                </span>
            </div>
        },
        {
            value: 'ریگزار جمال‌آباد',
            html: <div className="concreteAptionSelectFB">
                <span className="concreteLabelSelectFB">
                    ریگزار جمال‌آباد
                </span>
            </div>
        },
        {
            value: 'سایر',
            html: <div className="concreteAptionSelectFB">
                <span className="concreteLabelSelectFB">
                    سایر
                </span>
            </div>
        }
    ];

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
        },
        date: {
            day: '',
            month: '',
            year: ''
        }
    });

    const [input, setInput] = useState({
        startDate: '',//تاریخ ثبت حواله
        endDate: '',
        date: '',//تاریخ بارگیری
        id: '',
        billNumber: '',
        sandType: '',
        sandStoreId: '',
        dumpTruckOwnerId: '',
        dumpTruckOwnerName: '',
        dumpTruckOwnerLastName: '',
        dumpTruckId: '',
        numberplate: '',
        driverId: '',
        driverName: '',
        driverLastName: '',
        sandRemittanceId: '',
        sandRemittanceNumber: '',
        sandRemittanceBuyerName: '',
        sandRemittanceBuyerLastName: '',
        sandRemittancePrice: '',
        factory: ''
    });

    RouteService({  setSandStoreOptions });

    useEffect(() => {
        setInput(prev => ({ ...prev, factory }));
    }, [factory]);

    useEffect(() => {
        setInput(prev => ({ ...prev, sandType }));
    }, [sandType]);

    useEffect(() => {
        setInput(prev => ({ ...prev, sandStoreId }));
    }, [sandStoreId]);

    const handleShowSearchFilds = () => {
        setShowSearchFilds(perv => !perv);
    }

    const handleSearch = () => {
        const dateFields = ['startDate', 'endDate', 'date'];
        const errorMessages = {
            startDate: 'تاریخ ابتدای جستجو صحیح نیست',
            endDate: 'تاریخ پایان جستجو صحیح نیست',
            date: 'تاریخ حواله صحیح نیست'
        };
        for (const field of dateFields) {
            if (input[field] !== '') {
                const validDate = checkDate(input[field], errorMessages[field]); if (!validDate) { return; }
            }
        }
        //تبدیل به تاریخ میلادی
        const startDate = convertToGregorian(input.startDate);
        const endDate = input.endDate && `${convertToGregorian(input.endDate)} 23:59:59`;
        handelSetDataSearch({
            startDate,
            endDate,
            date: input.date,
            id: input.id,
            billNumber: input.billNumber,
            sandType: input.sandType,
            sandStoreId: input.sandStoreId,
            dumpTruckOwnerId: input.dumpTruckOwnerId,
            dumpTruckOwnerName: input.dumpTruckOwnerName,
            dumpTruckOwnerLastName: input.dumpTruckOwnerLastName,
            dumpTruckId: input.dumpTruckId,
            numberplate: input.numberplate,
            driverId: input.driverId,
            driverName: input.driverName,
            driverLastName: input.driverLastName,
            sandRemittanceId: input.sandRemittanceId,
            sandRemittanceNumber: input.sandRemittanceNumber,
            sandRemittanceBuyerName: input.sandRemittanceBuyerName,
            sandRemittanceBuyerLastName: input.sandRemittanceBuyerLastName,
            sandRemittancePrice: input.sandRemittancePrice,
            factory: input.factory

        });

        getSandInvoices(
            1,
            startDate,
            endDate,
            input.date,//تاریخ بارگیری
            input.id,
            input.billNumber,
            input.sandType,
            input.sandStoreId,
            input.dumpTruckOwnerId,
            input.dumpTruckOwnerName,
            input.dumpTruckOwnerLastName,
            input.dumpTruckId,
            input.numberplate,
            input.driverId,
            input.driverName,
            input.driverLastName,
            input.sandRemittanceId,
            input.sandRemittanceNumber,
            input.sandRemittanceBuyerName,
            input.sandRemittanceBuyerLastName,
            input.sandRemittancePrice,
            input.factory
        );
    }

    const handleSaveValInput = (e, input) => {
        let { value } = e.target;
        if (input == 'sandRemittancePrice') {
            value = value.replace(/,/g, '');
        }
        setInput(prev => ({ ...prev, [input]: value }));
    }

    const padValue = (val) => {
        if (val != 0 && val.length == 1) {
            val = '0' + val;
        }
        if (val.length >= 3 && val[0] === '0') {
            val = val.slice(1);
        }
        return val;
    };

    const validateAndSetDate = (val, min, max, inputType, date0) => {
        val = padValue(val);
        if (val == '' || (Number(val) >= min && Number(val) <= max)) {
            val == 0 ? val = '' : '';
            setDate(prev => ({ ...prev, [date0]: { ...prev[date0], [inputType]: val } }));
        }
        return val;
    };

    const handleSetDate = (e, date0, input) => {
        let { value } = e.target;
        value = value.toString();
        let selectedDate, day, month, year, valDate;
        switch (date0) {
            case 'start':
                selectedDate = date.start;
                break;
            case 'end':
                selectedDate = date.end;
                break;
            case 'date':
                selectedDate = date.date;
                break;
        }
        if (selectedDate) {
            day = selectedDate.day;
            month = selectedDate.month;
            year = selectedDate.year;
        }
        if (input === 'day') {
            day = validateAndSetDate(value, 0, 31, 'day', date0);
        } else if (input === 'month') {
            month = validateAndSetDate(value, 0, 12, 'month', date0);
        } else {
            year = validateAndSetDate(value, 1, 1500, 'year', date0);
        }

        valDate = (year == '' && month == '' && day == '') ? '' : `${year}-${month}-${day}`;
        const dateKey = (date0 === 'date') ? 'date' : `${date0}Date`;
        setInput(prev => ({ ...prev, [dateKey]: valDate }));
    };

    const handleClearSearch = async () => {
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
            },
            date: {
                day: '',
                month: '',
                year: ''
            }
        });

        setNumberplateVal({
            left: '',
            alphabet: '',
            mid: '',
            right: ''
        });

        setInput({
            startDate: '',
            endDate: '',
            date: '',
            id: '',
            billNumber: '',
            sandRemittanceId: '',
            sandRemittanceNumber: '',
            sandRemittanceBuyerName: '',
            sandRemittanceBuyerLastName: '',
            sandRemittancePrice: '',
            dumpTruckId: '',
            dumpTruckOwnerId: '',
            dumpTruckOwnerName: '',
            dumpTruckOwnerLastName: '',
            driverId: '',
            driverName: '',
            driverLastName: '',
            sandType: '',
            sandStoreId: '',
            factory: ''
        });

        setsandType('');
        setSandStoreId('');
        setFactory('');
        sandTypeRef.current.updateData('انتخاب');
        sandStoreRef.current.updateData('انتخاب');
        factoryRef.current.updateData('انتخاب');

        await handelSetDataSearch({

        });

        await getSandInvoices(1, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
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

    return (
        <div className="mainConcreteSIS_Se">
            <div className="headConcreteSIS_Se">
                {showSearchFilds ?
                    <button className='searchBtnsCoSIS_Se showSearchBtnCoSIS_Se ' onClick={handleShowSearchFilds}>
                        <i className='icofont-search-2 iSearchCoSIS_Se' />
                        <i className='icofont-check-alt ' />
                    </button>
                    :
                    <button className='searchBtnsCoSIS_Se closeSearchBtnCoSIS_Se' onClick={() => { handleShowSearchFilds(); handleClearSearch() }}>
                        <i className='icofont-search-2 iSearchCoSIS_Se' />
                        <i className='icofont-close-line iCloseLineSIS_Se' />
                    </button>
                }

                <div className="divShowTotalConcreteSIS_Se">
                    <span>تعداد قبض‌ها</span>
                    <div>{totalRecords}</div>
                </div>
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
                        <div className="endtDate_Se">
                            <span className="stringUntilDate_Se stringConcreteSIS_Se"> تاریخ بارگیری </span>
                            <div className="divInputsDateConcreteSIS_Se">
                                <input
                                    type="text"
                                    className="inputDate_Se dayDate_Se dayDateConcreteSIS_Se"
                                    id="dayUntilSearch"
                                    placeholder="روز"
                                    value={date.date.day || ''}
                                    onInput={e => handleSetDate(e, 'date', 'day')}
                                />
                                <span className="slashDate_Se slashDateConcreteSIS_Se">/</span>
                                <input
                                    type="text"
                                    className="inputDate_Se monthDate_Se monthDateConcreteSIS_Se"
                                    id="monthUntilSearch"
                                    placeholder="ماه"
                                    value={date.date.month || ''}
                                    onInput={e => handleSetDate(e, 'date', 'month')}
                                />
                                <span className="slashDate_Se slashDateConcreteSIS_Se">/</span>
                                <input
                                    type="text"
                                    className="inputDate_Se yearDate_Se yearDateConcreteSIS_Se"
                                    id="yearUntilSearch"
                                    placeholder="سال"
                                    value={date.date.year || ''}
                                    onInput={e => handleSetDate(e, 'date', 'year')}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="columnConcreteSIS_Se column2ConcreteSIS_Se">
                        <div className="idInvoiceConcreteSIS_Se">
                            <span className="stringFromDate_Se stringConcreteSIS_Se"> شناسه </span>
                            <input
                                type="text"
                                className="idBuerInputConcreteSIS_Se"
                                placeholder='شناسه'
                                value={input.id || ''}
                                onInput={e => handleSaveValInput(e, 'id')}
                            />
                        </div>

                        <div className="buerConcreteSIS_Se idBuerConcreteSIS_Se">
                            <span className="stringFromDate_Se stringConcreteSIS_Se" title='شماره قبض'> شماره قبض </span>
                            <input
                                type="text"
                                className="idBuerInputConcreteSIS_Se"
                                placeholder='شماره قبض'
                                value={input.billNumber || ''}
                                onInput={e => handleSaveValInput(e, 'billNumber')}
                            />
                        </div>
                        <div className="buerConcreteSIS_Se idBuerConcreteSIS_Se">
                            <span className="stringFromDate_Se stringConcreteSIS_Se" title='نوع شن‌وماسه'> نوع شن‌وماسه </span>
                            <div className='divSelectTypeConcreteSIS_Se'>
                                <SelectZabi
                                    primaryLabel='انتخاب'
                                    options={sandTypes}
                                    saveOption={setsandType}
                                    ref={sandTypeRef}
                                />
                            </div>
                        </div>
                        <div className="buerConcreteSIS_Se idBuerConcreteSIS_Se">
                            <span className="stringFromDate_Se stringConcreteSIS_Se" title='سیلوی تخلیه'> سیلوی تخلیه </span>
                            <div className='divSelectTypeConcreteSIS_Se'>
                                <SelectZabi
                                    primaryLabel='انتخاب'
                                    options={sandStoreOptions}
                                    saveOption={setSandStoreId}
                                    ref={sandStoreRef}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="columnConcreteSIS_Se column3ConcreteSIS_Se">
                        <div className="buerConcreteSIS_Se idBuerConcreteSIS_Se">
                            <span className="stringFromDate_Se stringConcreteSIS_Se" title='شناسه‌مالک کمپرسی'> شناسه‌مالک کمپرسی </span>
                            <input
                                type="text"
                                className="idBuerInputConcreteSIS_Se"
                                placeholder='شناسه مالک کمپرسی'
                                value={input.dumpTruckOwnerId || ''}
                                onInput={e => handleSaveValInput(e, 'dumpTruckOwnerId')}
                            />
                        </div>
                        <div className="buerConcreteSIS_Se idBuerConcreteSIS_Se">
                            <span className="stringFromDate_Se stringConcreteSIS_Se" title='نام مالک کمپرسی'> نام‌‌مالک کمپرسی </span>
                            <input
                                type="text"
                                className="idBuerInputConcreteSIS_Se"
                                placeholder='نام مالک کمپرسی'
                                value={input.dumpTruckOwnerName || ''}
                                onInput={e => handleSaveValInput(e, 'dumpTruckOwnerName')}
                            />
                        </div>
                        <div className="buerConcreteSIS_Se idBuerConcreteSIS_Se">
                            <span className="stringFromDate_Se stringConcreteSIS_Se" title='نام‌خانوادگی مالک کمپرسی'> نام‌خانوادگی مالک </span>
                            <input
                                type="text"
                                className="idBuerInputConcreteSIS_Se"
                                placeholder='نام خانوادگی مالک کمپرسی'
                                value={input.dumpTruckOwnerLastName || ''}
                                onInput={e => handleSaveValInput(e, 'dumpTruckOwnerLastName')}
                            />
                        </div>

                        <div className="buerConcreteSIS_Se idBuerConcreteSIS_Se">
                            <span className="stringFromDate_Se stringConcreteSIS_Se" title='شناسه کمپرسی'> شناسه کمپرسی </span>
                            <input
                                type="text"
                                className="idBuerInputConcreteSIS_Se"
                                placeholder='شناسه کمپرسی'
                                value={input.dumpTruckId || ''}
                                onInput={e => handleSaveValInput(e, 'dumpTruckId')}
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

                    <div className="columnConcreteSIS_Se column4ConcreteSIS_Se"></div>
                </div>
                <div className="secondRowCocreteSIS_Se">
                    <div className="columnConcreteSIS_Se column1ConcreteSIS_Se">
                        <div className="idInvoiceConcreteSIS_Se">
                            <span className="stringFromDate_Se stringConcreteSIS_Se" title='شناسه حواله'> شناسه حواله </span>
                            <input
                                type="text"
                                className="idBuerInputConcreteSIS_Se"
                                placeholder='شناسه حواله'
                                value={input.sandRemittanceId || ''}
                                onInput={e => handleSaveValInput(e, 'sandRemittanceId')}
                            />
                        </div>

                        <div className="buerConcreteSIS_Se idBuerConcreteSIS_Se">
                            <span className="stringFromDate_Se stringConcreteSIS_Se" title='نام خریدار حواله'> نام خریدار حواله </span>
                            <input
                                type="text"
                                className="idBuerInputConcreteSIS_Se"
                                placeholder='نام خریدار حواله'
                                value={input.sandRemittanceBuyerName || ''}
                                onInput={e => handleSaveValInput(e, 'sandRemittanceBuyerName')}
                            />
                        </div>
                        <div className="buerConcreteSIS_Se idBuerConcreteSIS_Se">
                            <span className="stringFromDate_Se stringConcreteSIS_Se" title='نام‌خانوادگی خریدار حواله'> نام‌خانوادگی خریدار حواله </span>
                            <input
                                type="text"
                                className="idBuerInputConcreteSIS_Se"
                                placeholder='نام خانوادگی خریدار حواله'
                                value={input.sandRemittanceBuyerLastName || ''}
                                onInput={e => handleSaveValInput(e, 'sandRemittanceBuyerLastName')}

                            />
                        </div>
                    </div>
                    <div className="columnConcreteSIS_Se column2ConcreteSIS_Se">
                        <div className="idInvoiceConcreteSIS_Se">
                            <span className="stringFromDate_Se stringConcreteSIS_Se"> شماره حواله </span>
                            <input
                                type="text"
                                className="idBuerInputConcreteSIS_Se"
                                placeholder='شماره حواله'
                                value={input.sandRemittanceNumber || ''}
                                onInput={e => handleSaveValInput(e, 'sandRemittanceNumber')}
                            />
                        </div>
                        <div className="idInvoiceConcreteSIS_Se">
                            <span className="stringFromDate_Se stringConcreteSIS_Se"> مبلغ حواله </span>
                            <input
                                type="text"
                                className=" priceSIS_Se ltrFB rtlPlaceholderFB"
                                id='price'
                                placeholder='مبلغ حواله'
                                onInput={e => { handleSaveValInput(e, 'sandRemittancePrice'); formatNub(priceRef.current); }}
                                ref={priceRef}
                            />
                            <span
                                className="unitFB"
                                onClick={() => htmlFor('price')}
                            >
                                تومان
                            </span>
                        </div>
                        <div className="typeConcreteSIS_Se">
                            <span className="stringFromDate_Se stringConcreteSIS_Se stringTypeConcreteSIS_Se"> کارخانه </span>
                            <div className='divSelectTypeConcreteSIS_Se'>
                                <SelectZabi
                                    primaryLabel='انتخاب'
                                    options={factorys}
                                    saveOption={setFactory}
                                    ref={factoryRef}
                                />
                            </div>

                        </div>
                    </div>
                    <div className="columnConcreteSIS_Se column3ConcreteSIS_Se">
                        <div className="buerConcreteSIS_Se idBuerConcreteSIS_Se">
                            <span className="stringFromDate_Se stringConcreteSIS_Se" title='شناسه‌ راننده'> شناسه‌ راننده </span>
                            <input
                                type="text"
                                className="idBuerInputConcreteSIS_Se"
                                placeholder='شناسه راننده'
                                value={input.driverId || ''}
                                onInput={e => handleSaveValInput(e, 'driverId')}
                            />
                        </div>
                        <div className="buerConcreteSIS_Se idBuerConcreteSIS_Se">
                            <span className="stringFromDate_Se stringConcreteSIS_Se" title='نام راننده'> نام‌‌ راننده </span>
                            <input
                                type="text"
                                className="idBuerInputConcreteSIS_Se"
                                placeholder='نام راننده'
                                value={input.driverName || ''}
                                onInput={e => handleSaveValInput(e, 'driverName')}
                            />
                        </div>
                        <div className="buerConcreteSIS_Se idBuerConcreteSIS_Se">
                            <span className="stringFromDate_Se stringConcreteSIS_Se" title='نام‌خانوادگی راننده'> نام‌خانوادگی راننده </span>
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
}

export default Search;