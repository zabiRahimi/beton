
import React, { createRef, useEffect, useRef, useState } from 'react';
import DataZabi from "../hooks/DateZabi";
import moment from 'jalali-moment';

const AddCocreteSalesInvoiceSearch = ({ getConcreteSalesInvoices, handelSetDataSearch }) => {
    const {
        checkDate
    } = DataZabi();

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
        concrete_id: '',
        cusotmer_id: '',
        customerName: '',
        custoemrLastName: '',
        truck_id: '',
        numberplate: '',
        owner_id: '',
        ownerName: '',
        ownerLastName: '',
        driver_id: '',
        driverName: '',
        driverLastName: '',
    });

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
            concrete_id: input.concrete_id,
            cusotmer_id: input.cusotmer_id,
            customerName: input.customerName,
            custoemrLastName: input.custoemrLastName,
            truck_id: input.truck_id,
            numberplate: input.numberplate,
            owner_id: input.owner_id,
            ownerName: input.ownerName,
            ownerLastName: input.ownerLastName,
            driver_id: input.driver_id,
            driverName: input.driverName,
            driverLastName: input.driverLastName
        });
        getCustomers(
            1,
            input.startDate,
            input.endDate,
            input.concrete_id,
            input.cusotmer_id,
            input.customerName,
            input.custoemrLastName,
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
            }
        });

        setInput({
            startDate: '',
            endDate: '',
            id: '',
            types: [],
            name: '',
            lastName: ''
        });

        titleCustomerTypeSearch.current.textContent = 'انتخاب';

        await handelSetDataSearch({ startDate: '', endDate: '', id: '', types: [], name: '', lastName: '' });

        await getCustomers(1, '', '', '', [], '', '');

        // setFromDateSearch('');
        // setUntilDateSearch('');
        // setCustomerSearchId('');
        // setConcreteSearchId('');
        // setTruckSearchId('');
        // setDriverSearchId('');
        // document.getElementById('dayFromSearch').value='';
        // document.getElementById('monthFromSearch').value='';
        // document.getElementById('yearFromSearch').value='';

        // document.getElementById('dayUntilSearch').value='';
        // document.getElementById('monthUntilSearch').value='';
        // document.getElementById('yearUntilSearch').value='';

        // refCustomerSearch.current.updateData('انتخاب');
        // refConcreteSearch.current.updateData('انتخاب');
        // refTruckSearch.current.updateData('انتخاب');
        // refDriverSearch.current.updateData('انتخاب');

        // setConcreteSalesInvoices(null);
        // setTimeout(() => {
        //     setConcreteSalesInvoices(concreteSalesInvoicesForSearch);
        // }, 400);
    }

    const handleSetShowCustomerTypeSearch = (e, apply = true) => {
        // e.stopPropagation();
        if (apply) {
            setShowTypeCustomerSearch(false);

        } else {
            setShowTypeCustomerSearch(pre => !pre);

        }
    }

    return (
        <div className="containerSearch_Se">
            <div className="containerDate_Se">
                <div className="startDate_Se">
                    <span className="stringFromDate_Se"> از تاریخ </span>
                    <input
                        type="text"
                        className="inputDate_Se dayDate_Se"
                        id="dayFromSearch"
                        placeholder="روز"
                        value={date.start.day || ''}
                        onInput={e => handleSetDate(e, 'start', 'day')}
                    />
                    <span className="slashDate_Se">/</span>
                    <input
                        type="text"
                        className="inputDate_Se monthDate_Se"
                        placeholder="ماه"
                        id="monthFromSearch"
                        value={date.start.month || ''}
                        onInput={e => handleSetDate(e, 'start', 'month')}
                    />
                    <span className="slashDate_Se">/</span>
                    <input
                        type="text"
                        className="inputDate_Se yearDate_Se"
                        id="yearFromSearch"
                        placeholder="سال"
                        value={date.start.year || ''}
                        onInput={e => handleSetDate(e, 'start', 'year')}
                    />

                </div>
                <div className="endtDate_Se">
                    <span className="stringUntilDate_Se"> تا تاریخ </span>
                    <input
                        type="text"
                        className="inputDate_Se dayDate_Se"
                        id="dayUntilSearch"
                        placeholder="روز"
                        value={date.end.day || ''}
                        onInput={e => handleSetDate(e, 'end', 'day')}
                    />
                    <span className="slashDate_Se">/</span>
                    <input
                        type="text"
                        className="inputDate_Se monthDate_Se"
                        id="monthUntilSearch"
                        placeholder="ماه"
                        value={date.end.month || ''}
                        onInput={e => handleSetDate(e, 'end', 'month')}
                    />
                    <span className="slashDate_Se">/</span>
                    <input
                        type="text"
                        className="inputDate_Se yearDate_Se"
                        id="yearUntilSearch"
                        placeholder="سال"
                        value={date.end.year || ''}
                        onInput={e => handleSetDate(e, 'end', 'year')}
                    />
                </div>
            </div>

            <div className="containerIdAType_Se">
                <div className="id_Se">
                    <span className="stringIdAType_Se"> شناسه </span>
                    <input
                        type="text"
                        className="inputIdACS_Se"
                        value={input.id || ''}
                        onInput={e => handleSaveValInput(e, 'id')}
                    />
                </div>
                <div className="type_Se"
                    tabIndex="0"
                    onBlur={(e) => handleSetShowCustomerTypeSearch(e)}>
                    <span className="stringIdAType_Se"> نوع مشتری </span>
                    <div
                        className="titleTypeACS_Se"
                        onClick={(e) => handleSetShowCustomerTypeSearch(e, false)}
                    >
                        <span
                            className="spanTitleType_Se"
                            ref={titleCustomerTypeSearch}
                        >انتخاب
                        </span>
                        {!showTypeCustomerSearch && <i className='icofont-rounded-down'></i>}
                        {showTypeCustomerSearch && <i className='icofont-rounded-up'></i>}
                    </div>
                    {showTypeCustomerSearch && <div
                        className="showTypeACS_Se"
                    >
                        <div className="itemCustomerTypeFB" onClick={(e) => AddCustomerTypeSearch(e, '', '', '')}
                        >
                            <div
                                className={`checkedItemCustomerTypeFB ${customerTypeSelectedSearch.some(obj => obj.code === 0) && 'IcheckedItemCustomerTypeFB'}`}
                            >
                                <i className="icofont-check-alt " />
                            </div>
                            <span className="nameItemcustomerTypeFB" > همه </span>
                        </div>

                        {showCustomerTypesSearch()}
                    </div>}
                </div>
            </div>

            <div className="containerName_Se">
                <div className="name_Se">
                    <span className="stringName_Se"> نام </span>
                    <input
                        type="text"
                        className="inputNameACS_Se"
                        value={input.name || ''}
                        onInput={e => handleSaveValInput(e, 'name')}
                    />
                </div>
                <div className="lastName_Se">
                    <span className="stringName_Se"> نام‌خانوادگی </span>
                    <input
                        type="text"
                        className="inputNameACS_Se"
                        value={input.lastName || ''}
                        onInput={e => handleSaveValInput(e, 'lastName')}
                    />
                </div>
            </div>

            <div className="divSearch_Se">
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
    );
};

export default AddCocreteSalesInvoiceSearch;