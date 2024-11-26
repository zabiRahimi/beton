
import React, { createRef, useEffect, useRef, useState } from 'react';
import DataZabi from "../../../hooks/DateZabi";
import moment from 'jalali-moment';
import SelectZabi from '../../../hooks/SelectZabi';


const AddCocreteSalesInvoiceSearch = ({ getSandRemittances, handelSetDataSearch, totalRecords }) => {
    const {
        checkDate
    } = DataZabi();

    const factoryRef = useRef(null);
    const isCompletedRef = useRef(null);

    const [factory, setFactory] = useState('');
    const [isCompleted, setIsCompleted] = useState('');

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

    const isCompleteds = [
        {
            value: '',
            html: <div className="concreteAptionSelectFB">
                <span className="concreteLabelSelectFB">
                    همه
                </span>
            </div>
        },
        {
            value: true,
            html: <div className="concreteAptionSelectFB">
                <span className="concreteLabelSelectFB">
                    مانده
                </span>
            </div>
        },
        {
            value: false,
            html: <div className="concreteAptionSelectFB">
                <span className="concreteLabelSelectFB">
                    تمام
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
        startDate: '',
        endDate: '',
        date: '',//تاریخ خرید حواله
        id: '',
        buyerName:'',
        buyerLastName:'',
        buyerFather:'',
        remittanceNumber:'',
        price:'',
        isCompleted:'',
        factory:''
    });

    useEffect(() => {
        if (factory) {
            setInput(prev => ({ ...prev, factory}));
        }
    }, [factory]);

    useEffect(() => {
        if (isCompleted) {
            setInput(prev => ({ ...prev, isCompleted }));
        }
    }, [isCompleted]);

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

            if (input.endDate != '') {
                const validDate = checkDate(input.endDate, 'تاریخ پایان جستجو صحیح نیست');
                if (!validDate) {
                    return;
                }
        }
        handelSetDataSearch({
            startDate: input.startDate,
            endDate: input.endDate,
            date:input.date,
            id: input.id,
            buyerName:input.buyerName,
            buyerLastName:input.buyerLastName,
            buyerFather:input.buyerFather,
            remittanceNumber:input.remittanceNumber,
            price:input.price,
            isCompleted:input.isCompleted,
            factory:input.factory
            
        });
        getSandRemittances(
            1,
            input.startDate,
            input.endDate,
            input.date,
            input.id,
            input.buyerName,
            input.buyerLastName,
            input.buyerFather,
            input.remittanceNumber,
            input.price,
            input.isCompleted,
            input.factory,
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

        await getSandRemittances(1, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
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
                        <div className="idInvoiceConcreteSIS_Se">
                            <span className="stringFromDate_Se stringConcreteSIS_Se"> شماره حواله </span>
                            <input
                                type="text"
                                className="idBuerInputConcreteSIS_Se"
                                placeholder='شماره حواله'
                                value={input.remittanceNumber || ''}
                                onInput={e => handleSaveValInput(e, 'remittanceNumber')}
                            />
                        </div>
                        <div className="endtDate_Se">
                            <span className="stringUntilDate_Se stringConcreteSIS_Se"> تاریخ حواله </span>
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
                    <div className="columnConcreteSIS_Se column3ConcreteSIS_Se">
                        <div className="idInvoiceConcreteSIS_Se">
                            <span className="stringFromDate_Se stringConcreteSIS_Se"> مبلغ حواله </span>
                            <input
                                type="text"
                                className="idBuerInputConcreteSIS_Se"
                                placeholder='مبلغ حواله'
                                value={input.price || ''}
                                onInput={e => handleSaveValInput(e, 'price')}
                            />
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
                        <div className="typeConcreteSIS_Se">
                            <span className="stringFromDate_Se stringConcreteSIS_Se stringTypeConcreteSIS_Se"> وضعیت </span>
                            <div className='divSelectTypeConcreteSIS_Se'>
                                <SelectZabi
                                    primaryLabel='انتخاب'
                                    options={isCompleteds}
                                    saveOption={setIsCompleted}
                                    ref={isCompletedRef}
                                />
                            </div>

                        </div>
                    </div>

                    <div className="columnConcreteSIS_Se column4ConcreteSIS_Se"></div>
                </div>
                <div className="secondRowCocreteSIS_Se">
                    <div className="columnConcreteSIS_Se column1ConcreteSIS_Se"></div>
                    <div className="columnConcreteSIS_Se column2ConcreteSIS_Se">
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

                        <div className="buerConcreteSIS_Se idBuerConcreteSIS_Se">
                            <span className="stringFromDate_Se stringConcreteSIS_Se" title='نام‌ پدر'>  نام پدر </span>
                            <input
                                type="text"
                                className="idBuerInputConcreteSIS_Se"
                                placeholder='نام پدر'
                                value={input.buyerFather || ''}
                                onInput={e => handleSaveValInput(e, 'buyerFather')}

                            />
                        </div>

                    </div>
                    <div className="columnConcreteSIS_Se column3ConcreteSIS_Se"></div>
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