import { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import HeadPage from '../HeadPage';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import SearchCustomersSelect from "./searchSelectZabi/SearchCustomersSelect";
import SearchMixersSelect from "./searchSelectZabi/SearchMixersSelect";
import SearchDriversSelect from "./searchSelectZabi/SearchDriversSelect";
import RouteService from "./RouteService";
import DataZabi from "../../../hooks/DateZabi";
import SelectZabi from "../../../hooks/SelectZabi";
import SelectZabi2 from "../../../hooks/SelectZabi2";
import {
    handleSetDate,
    handleSetTime,
    clearInputError,
    htmlFor,
    formatNub,
    handleCheckedMaskanMeli,
    handleCubicMetersCalculation,
    handleTotalPriceCalculation,

} from './Helper';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const Edit = () => {
    const { invoiceId } = useParams();
    const MySwal = withReactContent(Swal);
    const {
        optionDays,
        optionMonth,
        optionShortYears,
        optionHours,
        optionMinutes,
        optionSeconds,
    } = DataZabi();
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    const container = useRef(null);
    const loadingEnd = useRef(false);
    const form = useRef(null);
    const refTimeError = useRef(null);
    const refDateError = useRef(null);
    const refCustomer_id = useRef(null);
    const refCustomer_idError = useRef(null);
    const refConcrete_id = useRef(null);
    const refConcrete_idError = useRef(null);
    const refUnitPrice = useRef(null);
    const refUnitPriceError = useRef(null);
    const refWeight = useRef(null);
    const refWeightError = useRef(null);
    const refCubicMeters = useRef(null);
    const refCementStore_id = useRef(null);
    const refCementStore_idError = useRef(null);
    const refTotalPrice = useRef(null);
    const refTruck_id = useRef(null);
    const refTruck_idError = useRef(null);
    const refDriver_id = useRef(null);
    const refDriver_idError = useRef(null);
    const refFare = useRef(null);
    const refFareError = useRef(null);
    const refCheckBaxEmam = useRef(null);
    const refCheckBaxShahid = useRef(null);
    const refVahedError = useRef(null);
    const refAddressError = useRef(null);
    const refConcretingPositionError = useRef(null);
    const refCheckedMaskanShahid = useRef(null);

    const [loading, setLoading] = useState(true);
    const [concreteSalesInvoice, setConcreteSalesInvoice] = useState(null);
    const [customerId, setCustomerId] = useState('');
    const [concreteId, setConcreteId] = useState('');
    const [truckId, setTruckId] = useState('');
    const [ownerId, setOwnerId] = useState('');
    const [driverId, setDriverId] = useState('');
    const [cementStoreId, setCementStoreId] = useState('');
    const [checkedMaskanMeli, setCheckedMaskanMeli] = useState('');
    const [date, setDate] = useState({
        day: '',
        month: '',
        year: ''
    });
    const [time, setTime] = useState({
        second: '',
        minute: '',
        hour: ''
    });
    const [input, setInput] = useState({
        customer_id: '',
        date: '',
        time: '',
        weight: '',
        cubicMeters: "",
        concrete_id: '',
        truck_id: '',
        ownerId: '',
        driver_id: '',
        cementStore_id: '',
        unitPrice: '',
        totalPrice: '',
        fare: '',
        maskanMeli: '',
        vahed: '',
        address: '',
        concretingPosition: ''
    });

    const { concreteBuyers, concretes, cementStores, mixers, drivers } = RouteService({ invoiceId, setLoading, setConcreteSalesInvoice });

    useEffect(() => {
        customerId && setInput(prev => ({ ...prev, customer_id: customerId }));
    }, [customerId]);

    useEffect(() => {
        concreteId && setInput(prev => ({ ...prev, concrete_id: concreteId }));
    }, [concreteId]);

    useEffect(() => {
        truckId && setInput(prev => ({ ...prev, truck_id: truckId, ownerId }));
    }, [truckId]);

    useEffect(() => {
        driverId && setInput(prev => ({ ...prev, driver_id: driverId }));
    }, [driverId]);

    useEffect(() => {
        cementStoreId && setInput(prev => ({ ...prev, cementStore_id: cementStoreId }));
    }, [cementStoreId]);

    const { inputCustomerSearch, optionsCustomersSearched, customerSearchWarning, elementCustomerSearchWarning, handleClearAllSearch } = SearchCustomersSelect({ dataCustomers: concreteBuyers.datas });

    const { inputMixerSearch, optionsMixersSearched, mixerSearchWarning, elementMixerSearchWarning, handleClearAllSearchMixer } = SearchMixersSelect({ dataMixers: mixers.datas });

    const { inputDriverSearch, optionsDriversSearched, driverSearchWarning, elementDriverSearchWarning, handleClearAllSearchDriver } = SearchDriversSelect({ dataDrivers: drivers.datas });

    useEffect(() => {
        concreteSalesInvoice && pasteData(concreteSalesInvoice);
    }, [concreteSalesInvoice])

    useEffect(() => {
        if (concreteSalesInvoice) {
            refUnitPrice.current.value && (refUnitPrice.current.value = parseFloat(input.unitPrice).toLocaleString());
            refWeight.current.value && (refWeight.current.value = parseFloat(input.weight).toLocaleString());
            refTotalPrice && (refTotalPrice.current.innerHTML = parseFloat(input.totalPrice).toLocaleString());
            refFare.current.value && (refFare.current.value = parseFloat(input.fare).toLocaleString());
        }
    }, [concreteSalesInvoice, loadingEnd.current]);

    /**
 * هنگامی که کاربر مبادرت به دیدن و یا ویرایش کردن یک رکورد می‌کند
 * این متد اطلاعات هر فیلد را برای نمایش تنظیم می‌کند
 * @param {آیدی رکورد} concreteSalesInvoice 
 */
    const pasteData = (concreteSalesInvoice) => {
        // جدا کردن شماره پلاک و اطلاعات مورد نیاز از رکورد
        let numberplate = concreteSalesInvoice.truck.numberplate.split("-");
        const {
            id, created_at, updated_at,
            customer, truck, driver, concrete, cement_store, ...rest
        } = concreteSalesInvoice;

        // تنظیم ورودی‌های فرم
        setInput({
            ...rest,
            ownerId: truck.customer.id,
        });

        // به‌روزرسانی داده‌ها در فیلدهای ورودی
        updateSelectData(refCustomer_id, `${customer.name} ${customer.lastName}`);
        updateSelectData(refConcrete_id, (
            <div className="concreteAptionSelectFB">
                <span className="concreteLabelSelectFB">بتن</span>
                <span className="concreteSelectFB">{concrete.concreteName}</span>
            </div>
        ));
        updateSelectData(refCementStore_id, cement_store.silo);
        updateSelectData(refTruck_id, (
            <div className="mixerAptionSelectFB">
                <span className="mixerNamberpalteSelectFB">
                    <div className="numberplateDiv">
                        <span className="numberplateDivS1">{numberplate[0]}</span>
                        <span className="numberplateDivS2">{numberplate[3] === 'ا' ? 'الف' : numberplate[3]}</span>
                        <span className="numberplateDivS3">{numberplate[1]}</span>
                        <span className="numberplateDivS4">{numberplate[2]}</span>
                    </div>
                </span>
                <span className="mixerOwnerSelectFB">{truck.customer.name} {truck.customer.lastName}</span>
            </div>
        ));
        updateSelectData(refDriver_id, (
            <div className="personnelAption_addPerS">
                <span className="name_addPers">{driver.name} {driver.lastName}</span>
                <span className="fther_addPers">{driver.father || ''}</span>
            </div>
        ));

        // تنظیم تاریخ و زمان
        if (rest.date) {
            let [year, month, day] = rest.date.split("-");
            setDate({ day, month, year });
        }
        if (rest.time) {
            let [hour, minute, second] = rest.time.split(":");
            setTime({ hour, minute, second });
        }

        // تنظیم ماسکن ملی
        setCheckedMaskanMeli(
            rest.maskanMeli === 'مسکن ملی شهرک امام خمینی' ? 'emam' :
                rest.maskanMeli === 'مسکن ملی شهرک شهید رییسی' ? 'shahid' :
                    ''
        );

        loadingEnd.current = true;
    };

    // تابع کمکی برای به‌روزرسانی داده‌ها در فیلدهای ورودی
    const updateSelectData = (ref, value) => {
        ref.current && ref.current.updateData(value);
    };


    /**
    * ذخیره مقادیر ورودی‌های کاربر در استیت
    * @param {*} e 
    * @param {*} input 
    */
    const handleSaveValInput = (e, input) => {
        let { value } = e.target;
        // حذف جداکننده‌های هزارگان برای فیلدهای عددی
        if (['unitPrice', 'weight', 'fare'].includes(input)) {
            value = value.replace(/,/g, '');
        }
        setInput(prev => ({ ...prev, [input]: value }));
    }
    

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setLoading(true)
    //     await axios.patch(
    //         `/api/v1/concreteSalesInvoices/${invoiceId}
    //         `,
    //         { ...input },
    //         {
    //             headers:
    //             {
    //                 'X-CSRF-TOKEN': token,
    //                 'Content-Type': 'application/json; charset=utf-8'
    //             }
    //         }
    //     ).then((response) => {
    //         MySwal.fire({
    //             icon: "success",
    //             title: "با موفقیت ویرایش شد",
    //             confirmButtonText: "  متوجه شدم  ",
    //             timer: 3000,
    //             timerProgressBar: true,
    //             customClass: {
    //                 timerProgressBar: '--progressBarColorBlue',
    //             },
    //             didClose: () => window.scrollTo({ top: 60, behavior: 'smooth' }),
    //         });

    //     })
    //         .catch(
    //             error => {
    //                 if (error.response && error.response.status == 422) {

    //                     let id = Object.keys(error.response.data.errors)[0] + '';
    //                     if (id != 'cubicMeters' && id != 'totalPrice' && id != 'ownerId') {
    //                         const element = document.getElementById(id);
    //                         let scrollPosition = window.scrollY || window.pageYOffset;

    //                         const top = element.getBoundingClientRect().top + scrollPosition - 20;
    //                         window.scrollTo({
    //                             top: top,
    //                             behavior: 'smooth'
    //                         });
    //                     }
    //                     Object.entries(error.response.data.errors).map(([key, val]) => {
    //                         if (!key.includes('cubicMeters') && !key.includes('totalPrice') && !key.includes('ownerId')) {
    //                             document.getElementById(key + '').classList.add('borderRedFB');

    //                             document.getElementById(key + '' + 'Error').innerHTML = val;
    //                         }

    //                     });
    //                 }
    //             }
    //         )

    //     setLoading(false)
    // }

/**
 * ارسال فرم به سرور برای به‌روزرسانی فاکتور
 * @param {*} e 
 */
const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const response = await axios.patch(
            `/api/v1/concreteSalesInvoices/${invoiceId}`,
            { ...input },
            {
                headers: {
                    'X-CSRF-TOKEN': token,
                    'Content-Type': 'application/json; charset=utf-8',
                },
            }
        );
        MySwal.fire({
            icon: "success",
            title: "با موفقیت ویرایش شد",
            confirmButtonText: "متوجه شدم",
            timer: 3000,
            timerProgressBar: true,
            customClass: {
                timerProgressBar: '--progressBarColorBlue',
            },
            didClose: () => window.scrollTo({ top: 60, behavior: 'smooth' }),
        });
    } catch (error) {
        if (error.response && error.response.status === 422) {
            handleValidationErrors(error.response.data.errors);
        }
    } finally {
        setLoading(false);
    }
};

/**
 * مدیریت خطاهای اعتبارسنجی و پیمایش به محل خطا
 * @param {Object} errors 
 */
const handleValidationErrors = (errors) => {
    let firstErrorKey = Object.keys(errors)[0];
    if (!['cubicMeters', 'totalPrice', 'ownerId'].includes(firstErrorKey)) {
        scrollToElement(firstErrorKey);
    }
    Object.entries(errors).forEach(([key, val]) => {
        if (!['cubicMeters', 'totalPrice', 'ownerId'].includes(key)) {
            document.getElementById(key).classList.add('borderRedFB');
            document.getElementById(`${key}Error`).innerHTML = val;
        }
    });
};

/**
 * پیمایش به محل خطای اعتبارسنجی
 * @param {string} id 
 */
const scrollToElement = (id) => {
    const element = document.getElementById(id);
    const scrollPosition = window.scrollY || window.pageYOffset;
    const top = element.getBoundingClientRect().top + scrollPosition - 20;
    window.scrollTo({
        top: top,
        behavior: 'smooth',
    });
};


    return (
        <div ref={container}>
            <HeadPage
                loading={loading}
                title='ویرایش فاکتور خرید بتن'
                displayBtnAdd={true}
                displayBtnShow={true}
            />
            <div className='containerMainAS_Ge'>
                <div className="continerAddGe containerAddCustomer">
                    <form className='formBeton' ref={form}>
                        <div className="sectionFB">
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="customer_id"> خریدار </label>
                                    <div
                                        id="customer_id"
                                        className="element"
                                        onClick={e => clearInputError(e, refCustomer_idError)}
                                    >
                                        <SelectZabi2
                                            primaryLabel='انتخاب'
                                            options={concreteBuyers.options}
                                            saveOption={setCustomerId}
                                            input={inputCustomerSearch}
                                            optionsSearched={optionsCustomersSearched}
                                            warning={customerSearchWarning}
                                            elementWarning={elementCustomerSearchWarning}
                                            clearSearch={handleClearAllSearch}
                                            ref={refCustomer_id}
                                        />
                                    </div>
                                    <i className="icofont-ui-rating starFB" />
                                </div>
                                <div className="errorContainerFB elementError" id="customer_idError" ref={refCustomer_idError}> </div>
                            </div>
                        </div>
                        <div className="containerCSI_FB">
                            <div className="sectionFB">
                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label>شماره قبض </label>
                                        <div className="mainTicketNumberACSI_FB">
                                            <div className="ticketNumberACSI_FB">
                                                {invoiceId}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="errorContainerFB elementError" > </div>
                                </div>
                            </div>
                            <div className="sectionFB">
                                <div className="containerInputFB">
                                    <div className="divInputFB ">
                                        <label htmlFor="day"> ساعت </label>
                                        <div className="divDateBirth">
                                            <div className="divUpDateAcus element" id='time'
                                            >
                                                <input
                                                    type="text"
                                                    className="inputTextDateACus inputDayTDACus element"
                                                    placeholder="00"
                                                    id="hour"
                                                    value={time.second || ''}
                                                    onInput={(e) => handleSetTime(e, 'second', time, setTime, setInput)}
                                                    onFocus={(e) => clearInputError(e, refTimeError, true, 'time')}

                                                />
                                                <span>:</span>
                                                <input
                                                    type="text"
                                                    className="inputTextDateACus inputMonthTDACus element"
                                                    placeholder="00"
                                                    value={time.minute || ''}
                                                    onInput={(e) => handleSetTime(e, 'minute', time, setTime, setInput)}
                                                    onFocus={(e) => clearInputError(e, refTimeError, true, 'time')}

                                                />
                                                <span>:</span>
                                                <input
                                                    type="text"
                                                    className="inputTextDateACus inputYearTDACus element"
                                                    placeholder="00"
                                                    value={time.hour || ''}
                                                    onInput={(e) => { handleSetTime(e, 'hour', time, setTime, setInput) }}
                                                    onFocus={(e) => clearInputError(e, refTimeError, true, 'time')}
                                                />
                                                <i className="icofont-ui-rating starFB" />
                                            </div>

                                            <div className="divDownDateAcus" >
                                                <select
                                                    className="element"
                                                    value={time.second}
                                                    onChange={(e) => handleSetTime(e, 'second', time, setTime, setInput)}
                                                    onClick={(e) => clearInputError(e, refTimeError, true, 'time')}
                                                >
                                                    <option value=""> ثانیه </option>
                                                    {optionSeconds}
                                                </select>
                                                <select
                                                    className="element"
                                                    value={time.minute}
                                                    onChange={(e) => handleSetTime(e, 'minute', time, setTime, setInput)}
                                                    onClick={(e) => clearInputError(e, refTimeError, true, 'time')}
                                                >
                                                    <option value=""> دقیقه </option>
                                                    {optionMinutes}
                                                </select>
                                                <select
                                                    className="element"
                                                    value={time.hour}
                                                    onChange={(e) => { handleSetTime(e, 'hour', time, setTime, setInput) }}
                                                    onClick={(e) => clearInputError(e, refTimeError, true, 'time')}
                                                >
                                                    <option value=""> ساعت </option>
                                                    {optionHours}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="errorContainerFB elementError" id='timeError' ref={refTimeError}> </div>
                                </div>

                                <div className="containerInputFB">
                                    <div className="divInputFB ">
                                        <label htmlFor="day">تاریخ  </label>
                                        <div className="divDateBirth">
                                            <div className="divUpDateAcus element" id="date"
                                            >
                                                <input
                                                    type="text"
                                                    className="inputTextDateACus inputDayTDACus element"
                                                    placeholder="1"
                                                    id="day"
                                                    value={date.day || ''}
                                                    onInput={(e) => handleSetDate(e, 'day', date, setDate, setInput)}
                                                    onFocus={(e) => clearInputError(e, refDateError, true, 'date')}
                                                />
                                                <span>/</span>
                                                <input
                                                    type="text"
                                                    className="inputTextDateACus inputMonthTDACus element"
                                                    placeholder="1"
                                                    value={date.month || ''}
                                                    onInput={(e) => handleSetDate(e, 'month', date, setDate, setInput)}
                                                    onFocus={(e) => clearInputError(e, refDateError, true, 'date')}
                                                />
                                                <span>/</span>
                                                <input
                                                    type="text"
                                                    className="inputTextDateACus inputYearTDACus element"
                                                    placeholder="1300"
                                                    value={date.year || ''}
                                                    onInput={(e) => { handleSetDate(e, 'year', date, setDate, setInput) }}
                                                    onFocus={(e) => clearInputError(e, refDateError, true, 'date')}
                                                />
                                                <i className="icofont-ui-rating starFB" />
                                            </div>

                                            <div className="divDownDateAcus" >
                                                <select
                                                    className="element"
                                                    value={date.day}
                                                    onChange={(e) => handleSetDate(e, 'day', date, setDate, setInput)}
                                                    onClick={(e) => clearInputError(e, refDateError, true, 'date')}
                                                >
                                                    <option value="">روز</option>
                                                    {optionDays}
                                                </select>
                                                <select
                                                    className="element"
                                                    value={date.month}
                                                    onChange={(e) => handleSetDate(e, 'month', date, setDate, setInput)}
                                                    onClick={(e) => clearInputError(e, refDateError, true, 'date')}

                                                >
                                                    <option value="">ماه</option>
                                                    {optionMonth}
                                                </select>
                                                <select
                                                    className="element"
                                                    value={date.year}
                                                    onChange={(e) => { handleSetDate(e, 'year', date, setDate, setInput) }}
                                                    onClick={(e) => clearInputError(e, refDateError, true, 'date')}
                                                >
                                                    <option value="">سال</option>
                                                    {optionShortYears}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="errorContainerFB elementError" id='dateError' ref={refDateError}> </div>
                                </div>
                            </div>
                            <div className="sectionFB">
                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label htmlFor='concrete_id'> عیار بتن </label>
                                        <div
                                            id='concrete_id'
                                            className="element"
                                            onClick={e => { setInvoiceIndexForConcrete(0); clearInputError(e, refConcrete_idError) }}
                                        >
                                            <SelectZabi
                                                primaryLabel='انتخاب'
                                                options={concretes}
                                                saveOption={setConcreteId}
                                                ref={refConcrete_id}
                                            />
                                        </div>
                                        <i className="icofont-ui-rating starFB" />
                                    </div>
                                    <div className="errorContainerFB elementError" id='concrete_idError' ref={refConcrete_idError}> </div>
                                </div>

                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label htmlFor='unitPrice'> قیمت واحد بتن (مترمکعب) </label>
                                        <input
                                            type="text"
                                            id='unitPrice'
                                            className="inputTextUnitFB ltrFB element"
                                            defaultValue={input.unitPrice}
                                            ref={refUnitPrice}
                                            onInput={e => {
                                                handleSaveValInput(e, 'unitPrice', 0);
                                                formatNub(refUnitPrice.current);
                                                handleTotalPriceCalculation(e, 'unitPrice', input, setInput, refTotalPrice);
                                            }
                                            }
                                            onFocus={e => clearInputError(e, refUnitPriceError)}
                                        />
                                        <span
                                            className="unitFB"
                                            onClick={() => htmlFor('unitPrice')}
                                        >
                                            تومان
                                        </span>
                                        <i className="icofont-ui-rating starFB" />
                                    </div>
                                    <div
                                        className="errorContainerFB elementError"
                                        id='unitPriceError'
                                        ref={refUnitPriceError}
                                    >
                                    </div>
                                </div>

                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label htmlFor='weight'> وزن خالص بار </label>
                                        <input
                                            type="text"
                                            id='weight'
                                            className="inputTextUnitFB ltrFB element"
                                            defaultValue={input.weight}
                                            ref={refWeight}
                                            onInput={e => {
                                                handleSaveValInput(e, 'weight', 0);
                                                formatNub(refWeight.current);
                                                handleCubicMetersCalculation(e, refCubicMeters, setInput);
                                                handleTotalPriceCalculation(e, 'weight', input, setInput, refTotalPrice);
                                            }
                                            }
                                            onFocus={e => clearInputError(e, refWeightError)}
                                        />
                                        <span
                                            className="unitFB"
                                            onClick={() => htmlFor('weight')}
                                        >
                                            کیلو گرم
                                        </span>
                                        <i className="icofont-ui-rating starFB" />
                                    </div>
                                    <div
                                        className="errorContainerFB elementError"
                                        id='weightError'
                                        ref={refWeightError}
                                    >
                                    </div>
                                </div>
                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label> حجم بار </label>
                                        <div className="mainCubicMetersACSL_FB">
                                            <div className="cubicMetersACSL_FB"
                                                ref={refCubicMeters}>{input.cubicMeters}</div>
                                            <span className="spanCubicMetersACSL_FB">
                                                متر مکعب
                                            </span>
                                        </div>
                                    </div>

                                </div>

                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label htmlFor='cementStore_id'> سیلوی سیمان </label>
                                        <div
                                            id='cementStore_id'
                                            className="element"
                                            onClick={e => { clearInputError(e, refCementStore_idError); }}
                                        >
                                            <SelectZabi
                                                primaryLabel='انتخاب'
                                                options={cementStores}
                                                saveOption={setCementStoreId}
                                                ref={refCementStore_id}
                                            />
                                        </div>
                                        <i className="icofont-ui-rating starFB" />
                                    </div>
                                    <div
                                        className="errorContainerFB elementError"
                                        id='cementStore_idError'
                                        ref={refCementStore_idError}
                                    > </div>
                                </div>

                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label> قیمت کل </label>
                                        <div className="mainTotalPriceACSL_FB">
                                            <div className="totalPriceACSL_FB"
                                                ref={refTotalPrice}
                                            > </div>
                                            <span className="spanTotalPriceACSL_FB">
                                                تومان
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="sectionFB">
                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label htmlFor='truck_id'> میکسر </label>
                                        <div
                                            id='truck_id'
                                            className="element"
                                            onClick={e => { clearInputError(e, refTruck_idError) }}
                                        >
                                            <SelectZabi2
                                                primaryLabel='انتخاب'
                                                options={mixers.options}
                                                saveOption={setTruckId}
                                                saveOption2={setOwnerId}
                                                input={inputMixerSearch}
                                                optionsSearched={optionsMixersSearched}
                                                warning={mixerSearchWarning}
                                                elementWarning={elementMixerSearchWarning}
                                                clearSearch={handleClearAllSearchMixer}
                                                ref={refTruck_id}
                                            />
                                        </div>
                                        <i className="icofont-ui-rating starFB" />
                                    </div>
                                    <div
                                        className="errorContainerFB elementError"
                                        id='refTruck_idError'
                                        ref={refTruck_idError}
                                    > </div>
                                </div>

                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label htmlFor='driver_id'> راننده </label>
                                        <div
                                            id='driver_id'
                                            className="element"
                                            onClick={e => { clearInputError(e, refDriver_idError); }}
                                        >
                                            <SelectZabi2
                                                primaryLabel='انتخاب'
                                                options={drivers.options}
                                                saveOption={setDriverId}
                                                input={inputDriverSearch}
                                                optionsSearched={optionsDriversSearched}
                                                warning={driverSearchWarning}
                                                elementWarning={elementDriverSearchWarning}
                                                clearSearch={handleClearAllSearchDriver}
                                                ref={refDriver_id}
                                            />
                                        </div>
                                        <i className="icofont-ui-rating starFB" />
                                    </div>
                                    <div
                                        className="errorContainerFB elementError"
                                        id='driver_idError'
                                        ref={refDriver_idError}
                                    > </div>
                                </div>

                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label htmlFor='fare'> کرایه میکسر </label>
                                        <input
                                            type="text"
                                            id='fare'
                                            className="inputTextUnitFB ltrFB element"
                                            defaultValue={input.fare}
                                            ref={refFare}
                                            onInput={e => {
                                                handleSaveValInput(e, 'fare', 0);
                                                formatNub(refFare.current);
                                            }
                                            }
                                            onFocus={e => clearInputError(e, refFareError)}
                                        />
                                        <span
                                            className="unitFB"
                                            onClick={() => htmlFor('fare')}
                                        >
                                            تومان
                                        </span>
                                        <i className="icofont-ui-rating starFB" />
                                    </div>
                                    <div
                                        className="errorContainerFB elementError"
                                        id='fareError'
                                        ref={refFareError}
                                    >
                                    </div>
                                </div>

                            </div>
                            <div className="sectionFB">
                                <div className="containerInputFB">
                                    <div className="divInputCheckboxFB">
                                        <input
                                            type="checkbox"
                                            id='emam'
                                            className="inputCheckboxFB  element pointerFB"
                                            onChange={e => {
                                                handleSaveValInput(e, 'maskanMeli', 0,); handleCheckedMaskanMeli(`emam`, checkedMaskanMeli, setCheckedMaskanMeli, setInput);
                                                clearInputError(e, '', false, '', true, refVahedError.current, refAddressError.current);
                                            }}
                                            checked={checkedMaskanMeli == `emam`}
                                            ref={refCheckBaxEmam}
                                        />
                                        <label htmlFor='emam'
                                            className={`labelCheckboxFB pointerFB  ${checkedMaskanMeli != 'emam' && 'inactiveLabelCSI_FB'}`}
                                            id={`labelEmam`}>مسکن ملی (شهرک امام خمینی) </label>
                                    </div>
                                    <div className="errorContainerFB elementError" > </div>
                                </div>

                                <div className="containerInputFB">
                                </div>

                                <div className="containerInputFB">
                                    <div className="divInputCheckboxFB">
                                        <input
                                            type="checkbox"
                                            id='shahid'
                                            className="inputCheckboxFB  element pointerFB"
                                            value={refCheckedMaskanShahid && refCheckedMaskanShahid.current ? 'مسکن ملی شهرک شهید رییسی' : ''}
                                            onChange={e => {
                                                handleSaveValInput(e, 'maskanMeli', 0, true); handleCheckedMaskanMeli(`shahid`, checkedMaskanMeli, setCheckedMaskanMeli, setInput);
                                                clearInputError(e, '', false, '', true, refVahedError.current, refAddressError.current);
                                            }}
                                            checked={checkedMaskanMeli == `shahid`}
                                            ref={refCheckBaxShahid}
                                        />
                                        <label htmlFor='shahid'
                                            className={`labelCheckboxFB pointerFB ${checkedMaskanMeli != `shahid` && 'inactiveLabelCSI_FB'}`}
                                        >مسکن ملی (شهرک شهید رئیسی) </label>
                                    </div>
                                    <div className="errorContainerFB elementError" > </div>
                                </div>

                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label htmlFor='vahed' className={`${(checkedMaskanMeli != 'emam' && checkedMaskanMeli != 'shahid') && 'inactiveLabelCSI_FB'}`}>شماره واحد </label>
                                        <input
                                            type="text"
                                            id='vahed'
                                            className="inputTextFB ltrFB element"
                                            defaultValue={input.vahed}
                                            onInput={e => handleSaveValInput(e, 'vahed', 0)}
                                            onFocus={(e) => clearInputError(e, refVahedError)}
                                            disabled={checkedMaskanMeli != 'emam' && checkedMaskanMeli != 'shahid'}
                                        />
                                    </div>
                                    <div className="errorContainerFB elementError" id='vahedError' ref={refVahedError}> </div>
                                </div>

                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label htmlFor='address'>آدرس</label>
                                        <textarea
                                            id='address'
                                            className="textareaAddressCSI_FB element"
                                            defaultValue={input.address}
                                            onInput={e => handleSaveValInput(e, 'address', 0)}
                                            onFocus={(e) => clearInputError(e, refAddressError)}
                                        />
                                    </div>
                                    <div
                                        className="errorContainerFB elementError"
                                        id='addressError'
                                        ref={refAddressError}
                                    > </div>
                                </div>

                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label htmlFor='concretingPosition' >موقعیت بتن‌ریزی </label>
                                        <textarea
                                            id='concretingPosition'
                                            className="textareaAddressCSI_FB element"
                                            defaultValue={input.concretingPosition}
                                            onInput={e => handleSaveValInput(e, 'concretingPosition', 0)}
                                            onFocus={(e) => clearInputError(e, refConcretingPositionError)}

                                        />
                                    </div>
                                    <div
                                        className="errorContainerFB elementError"
                                        id='concretingPositionError'
                                        ref={refConcretingPositionError}
                                    > </div>
                                </div>

                            </div>
                        </div>

                        <div className='sectionFB divBtnsFB' >
                            <Button
                                variant="info"
                                className="btnSaveFB"
                                onClick={handleSubmit}
                            >
                                ویرایش
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}
export default Edit;