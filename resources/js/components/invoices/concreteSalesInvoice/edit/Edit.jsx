import { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import SearchCustomersSelect from "./searchSelectZabi/SearchCustomersSelect";
import SearchMixersSelect from "./searchSelectZabi/SearchMixersSelect";
import SearchDriversSelect from "./searchSelectZabi/SearchDriversSelect";
import RouteService from "./RouteService";
import useChangeForm from "../../../hooks/useChangeForm";
import DataZabi from "../../../hooks/DateZabi";
import SelectZabi from "../../../hooks/SelectZabi";
import SelectZabi2 from "../../../hooks/SelectZabi2";
import {
    clearInputError,
    htmlFor,
    formatNub,
    handleCheckedMaskanMeli,
    handleCubicMetersCalculation,
    handleTotalPriceCalculation,
    handleAddNewInvoice,
    handleDelInvoice,
    handleRemoveAllError
} from './Helper';
const Edit = () => {
    const { invoiceId } = useParams();
    const {
        optionDays,
        optionMonth,
        optionShortYears,
        optionHours,
        optionMinutes,
        optionSeconds,
    } = DataZabi();
    const container = useRef(null);
    const end = useRef(false);
    const refTimeError = useRef(null);
    const refDateError = useRef(null);
    const refCustomer_id = useRef(null);
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

    /**
       * id to edit the model
      */
    const [id, setId] = useState(null);
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

    const { concreteBuyers, concretes, cementStores, mixers, drivers } = RouteService({ invoiceId,setLoading, setConcreteSalesInvoice });

    useEffect(() => {
        if (customerId) {
            setInput(prev => ({ ...prev, customer_id: customerId }));
        }
    }, [customerId]);

    useEffect(() => {
        if (concreteId) {
            setInput(prev => ({ ...prev, concrete_id: concreteId }));
        }
    }, [concreteId]);

    useEffect(() => {
        if (truckId) {
            setInput(prev => ({ ...prev, truck_id: truckId, ownerId }));
        }
    }, [truckId]);

    useEffect(() => {
        if (driverId) {
            setInput(prev => ({ ...prev, driver_id: driverId }));
        }
    }, [driverId]);

    useEffect(() => {
        if (cementStoreId) {
            setInput(prev => ({ ...prev, cementStore_id: cementStoreId }));
        }
    }, [cementStoreId]);


    const handleSetDate = (e, input) => {
        let { value } = e.target,
            valDate;
        value = value.toString();
        if (input == 'day') {
            (value != 0 && value.length == 1) && (value = '0' + value);
            (value.length >= 3 && value[0] === '0') && (value = value.slice(1));
            if (value == '' || (Number(value) >= 0 && Number(value) <= 31)) {
                setDate(prev => ({ ...prev, [input]: value }));
            } else {
                e.target.value = date.day;
            }
            valDate = date.year + '-' + date.month + '-' + value;
            setInput(perv => ({ ...perv, date: valDate }));
        } else if (input == 'month') {
            (value != 0 && value.length == 1) && (value = '0' + value);
            (value.length >= 3 && value[0] === '0') && (value = value.slice(1));
            if (value == '' || (Number(value) >= 0 && Number(value) <= 12)) {
                setDate(prev => ({ ...prev, [input]: value }));
            }
            else {
                e.target.value = date.month;
            }
            valDate = date.year + '-' + value + '-' + date.day;
            setInput(perv => ({ ...perv, date: valDate }));
        } else if (input = 'year') {
            if (value == '' || (Number(value) >= 1 && Number(value) <= 1500)) {
                setDate(prev => ({ ...prev, [input]: value }));
            } else {
                e.target.value = date.year;
            }
            valDate = value + '-' + date.month + '-' + date.day;
            setInput(perv => ({ ...perv, date: valDate }));
        }
    }

    const handleSetTime = (e, i, input) => {
        let { value } = e.target,
            valTime;
        value = value.toString();
        if (input == 'second') {
            (value != 0 && value.length == 1) && (value = '0' + value);
            (value.length >= 3 && value[0] === '0') && (value = value.slice(1));
            if (value == '' || (Number(value) >= 0 && Number(value) <= 60)) {
                setTime(prev => ({ ...prev, [input]: value }));
            } else {
                e.target.value = time.second;
            }
            valTime = time.hour + ':' + time.minute + ':' + value;
            setInput(perv => ({ ...perv, time: valTime }));
        } else if (input == 'minute') {
            (value != 0 && value.length == 1) && (value = '0' + value);
            (value.length >= 3 && value[0] === '0') && (value = value.slice(1));
            if (value == '' || (Number(value) >= 0 && Number(value) <= 60)) {
                setTime(prev => ({ ...prev, [input]: value }));
            } else {
                e.target.value = time.minute;
            }
            valTime = time.hour + ':' + value + ':' + time.second;
            setInput(perv => ({ ...perv, time: valTime }));
        } else if (input = 'hour') {
            (value != 0 && value.length == 1) && (value = '0' + value);
            (value.length >= 3 && value[0] === '0') && (value = value.slice(1));
            if (value == '' || (Number(value) >= 0 && Number(value) <= 24)) {
                setTime(prev => ({ ...prev, [input]: value }));
            } else {
                e.target.value = time.hour;
            }
            valTime = value + ':' + time.minute + ':' + time.second;
            setInput(perv => ({ ...perv, time: valTime }));
        }
    }

    // const { concreteBuyers, concretes, cementStores, mixers, drivers } = RouteService({ token, setLoading });

    const { inputCustomerSearch, optionsCustomersSearched, customerSearchWarning, elementCustomerSearchWarning, handleClearAllSearch } = SearchCustomersSelect({ dataCustomers: concreteBuyers.datas });

    const { inputMixerSearch, optionsMixersSearched, mixerSearchWarning, elementMixerSearchWarning, handleClearAllSearchMixer } = SearchMixersSelect({ dataMixers: mixers.datas });

    const { inputDriverSearch, optionsDriversSearched, driverSearchWarning, elementDriverSearchWarning, handleClearAllSearchDriver } = SearchDriversSelect({ dataDrivers: drivers.datas });

useEffect(() => {
  if (concreteSalesInvoice) {
    pasteData(concreteSalesInvoice);
  }
}, [concreteSalesInvoice])

   

    useEffect(() => {
        if (concreteSalesInvoice) {
            refUnitPrice.current.value && (refUnitPrice.current.value = parseFloat(input.unitPrice).toLocaleString());

            refWeight.current.value && (refWeight.current.value = parseFloat(input.weight).toLocaleString());

            refTotalPrice.current.value && (refTotalPrice.current.innerHTML = parseFloat(input.totalPrice).toLocaleString());

            refFare.current.value && (refFare.current.value = parseFloat(input.fare).toLocaleString());
        }
    }, [concreteSalesInvoice, end.current]);

        /**
         * هنگامی که کاربر مبادرت به دیدن و یا ویرایش کردن یک رکورد میکند
         * این متد اطلاعات هر فیلد را برای نمایش تنظیم می کند
         * @param {آدی رکورد} id0 
         */
        const pasteData = (concreteSalesInvoice) => {
            console.log(concreteSalesInvoice);
            
            let numberplate = concreteSalesInvoice.truck.numberplate.split("-");
            const { id, created_at, updated_at, ...rest } = concreteSalesInvoice;//نادیده گرفتن کلید های مشخص شده

            // کپی از شی برای انجام تغییرات
            let datas = { ...rest };
            setInput({
                customer_id: datas.customer_id,
                date: datas.date,
                time: datas.time,
                weight: datas.weight,
                cubicMeters: datas.cubicMeters,
                concrete_id: datas.concrete_id,
                truck_id: datas.truck_id,
                ownerId: datas.truck.customer.id,
                driver_id: datas.driver_id,
                cementStore_id: datas.cementStore_id,
                unitPrice: datas.unitPrice,
                totalPrice: datas.totalPrice,
                fare: datas.fare,
                maskanMeli: datas.maskanMeli,
                vahed: datas.vahed,
                address: datas.address,
                concretingPosition: datas.concretingPosition
            });
            refCustomer_id.current && refCustomer_id.current.updateData(datas.customer.name + ' ' + datas.customer.lastName);
            refConcrete_id.current && refConcrete_id.current.updateData(<div className="concreteAptionSelectFB">
                <span className="concreteLabelSelectFB">بتن
                </span>
                <span className="concreteSelectFB">
                    {datas.concrete.concreteName}
                </span>
            </div>);

            refCementStore_id.current && refCementStore_id.current.updateData(datas.cement_store.silo);
            refTruck_id.current && refTruck_id.current.updateData(<div className="mixerAptionSelectFB">
                <span className="mixerNamberpalteSelectFB">
                    <div className="numberplateDiv">
                        <span className="numberplateDivS1">{numberplate[0]}</span>
                        <span className="numberplateDivS2">{numberplate[3] == 'ا' ? 'الف' : numberplate[3]}</span>
                        <span className="numberplateDivS3">{numberplate[1]}</span>
                        <span className="numberplateDivS4">{numberplate[2]}</span>
                    </div>
                </span>

                <span className="mixerOwnerSelectFB">
                    {datas.truck.customer.name}
                    {' '}
                    {datas.truck.customer.lastName}
                </span>

            </div>);
            refDriver_id.current && refDriver_id.current.updateData(<div className="personnelAption_addPerS">
                <span className="name_addPers">{datas.driver.name}
                    {' '}
                    {datas.driver.lastName}</span>

                <span className="fther_addPers">
                    {datas.driver.father || ''}
                </span>

            </div>);

            if (rest.date) {
                let parts = rest.date.split("-");
                setDate({
                    day: parts[2],
                    month: parts[1],
                    year: parts[0]
                });

            }

            if (rest.time) {
                let parts = rest.time.split(":");
                setTime({
                    second: parts[2],
                    minute: parts[1],
                    hour: parts[0]
                })
            }

            if (datas.maskanMeli == 'مسکن ملی شهرک امام خمینی') {
                setCheckedMaskanMeli('emam');
            }
            else if (datas.maskanMeli == 'مسکن ملی شهرک شهید رییسی') {
                setCheckedMaskanMeli('shahid');

            }
            else {
                setCheckedMaskanMeli('');

            }
            end.current = true;
        }


    const resetForm = () => {
        setInvoice([sampleInvoice]);
        setInput({
            customer_id: '',
            invoice: [{
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
            }],
        });

        setCustomerId('');
        setConcreteId('');
        setTruckId('');
        setOwnerId('');
        setDriverId('');
        setCementStoreId('');
        setCheckedMaskanMeli();

        setTime({
            second: '',
            minute: '',
            hour: ''
        });

        setDate({
            day: '',
            month: '',
            year: ''
        });

        setUnitPrice('');
        setFare('');

        setCheckedValue('');
        setMaskan(['']);

        setVahed('');
        setAddress('');
        setConcretingPosition('');

        refCustomer_id.current.updateData('انتخاب');
    }

    const { showAddForm, showCreatedRecord, showForm, flexDirection, disabledBtnShowForm, disabledBtnShowRecords, hideCreatedRecord, containerShowGeRef, hideShowForm } = useChangeForm({  resetForm });

  

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        await axios.patch(
            `/api/v1/editConcreteSalesInvoice/${id}`,
            { ...input },
            {
                headers:
                {
                    'X-CSRF-TOKEN': token,
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }
        ).then((response) => {
            MySwal.fire({
                icon: "success",
                title: "با موفقیت ویرایش شد",
                confirmButtonText: "  متوجه شدم  ",
                timer: 3000,
                timerProgressBar: true,
                customClass: {
                    timerProgressBar: '--progressBarColorBlue',
                },
                didClose: () => window.scrollTo({ top: 60, behavior: 'smooth' }),
            });

        })
            .catch(
                error => {
                    if (error.response && error.response.status == 422) {

                        let id = Object.keys(error.response.data.errors)[0] + '';
                        if (id != 'cubicMeters' && id != 'totalPrice' && id != 'ownerId') {
                            const element = document.getElementById(id);
                            let scrollPosition = window.scrollY || window.pageYOffset;

                            const top = element.getBoundingClientRect().top + scrollPosition - 20;
                            window.scrollTo({
                                top: top,
                                behavior: 'smooth'
                            });
                        }
                        Object.entries(error.response.data.errors).map(([key, val]) => {
                            if (!key.includes('cubicMeters') && !key.includes('totalPrice') && !key.includes('ownerId')) {
                                document.getElementById(key + '').classList.add('borderRedFB');

                                document.getElementById(key + '' + 'Error').innerHTML = val;
                            }

                        });
                    }
                }
            )

        setLoading(false)
    }



    /**
 * برای خوانایی بهتر قیمت و وزن‌ها اعداد را فرمت دهی می‌کند
 * به صورت دهگان،صدگان و ...
 * @param {ref} ref 
 */
   

    /**
* اگر دقت شود در این‌پوت‌های دریافت وزن‌ها و قیمت بتن، واحدها به صورت
* کیلوگرم و تومان اضافه شدن که درواقع جزیی از این پوت نیستن برای اینکه
* اگر احتمالا کاربر برروی این واحدها کلید کرد فوکوس در این‌پوت مربوطه
* ایجاد شود از این متد استفاده می‌شود، برای تجربه کاربری بهتر
* @param {number} id 
*/
    const htmlFor = (id) => {
        document.getElementById(id).focus()
    }

    const handleCheckedMaskanMeli = (e, value) => {
        let maskanMeli;
        if (value == 'emam') {
            checkedMaskanMeli == "emam" ? (setCheckedMaskanMeli(''), maskanMeli = '') : (setCheckedMaskanMeli('emam'), maskanMeli = 'مسکن ملی شهرک امام خمینی');
        } else {
            checkedMaskanMeli == "shahid" ? (setCheckedMaskanMeli(''), maskanMeli = '') : (setCheckedMaskanMeli('shahid'), maskanMeli = 'مسکن ملی شهرک شهید رییسی');
        }

        setInput(pre => ({ ...pre, maskanMeli }));
    }

    const handleCubicMetersCalculation = (e, i = null) => {
        let { value } = e.target;
        value = value.replace(/,/g, '');
        let cubicMeters = value / 2300;
        cubicMeters = Number(cubicMeters);
        if (!Number.isInteger(cubicMeters)) {
            cubicMeters = cubicMeters.toFixed(2);
        }

       
            refCubicMeters.current.innerHTML = cubicMeters;
            setInput(prev => ({ ...prev, cubicMeters }));
       
    }
const handleSaveValInput= ()=> {}
    return (
        <div ref={container}>
            <form>
                <div>
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
                                                onInput={(e) => handleSetTime(e, 0, 'second')}
                                                onFocus={(e) => clearInputError(e, refTimeError, true, 'time')}

                                            />
                                            <span>:</span>
                                            <input
                                                type="text"
                                                className="inputTextDateACus inputMonthTDACus element"
                                                placeholder="00"
                                                value={time.minute || ''}
                                                onInput={(e) => handleSetTime(e, 0, 'minute')}
                                                onFocus={(e) => clearInputError(e, refTimeError, true, 'time')}

                                            />
                                            <span>:</span>
                                            <input
                                                type="text"
                                                className="inputTextDateACus inputYearTDACus element"
                                                placeholder="00"
                                                value={time.hour || ''}
                                                onInput={(e) => { handleSetTime(e, 0, 'hour') }}
                                                onFocus={(e) => clearInputError(e, refTimeError, true, 'time')}
                                            />
                                            <i className="icofont-ui-rating starFB" />
                                        </div>

                                        <div className="divDownDateAcus" >
                                            <select
                                                className="element"
                                                value={time.second}
                                                onChange={(e) => handleSetTime(e, 0, 'second')}
                                                onClick={(e) => clearInputError(e, refTimeError, true, 'time')}
                                            >
                                                <option value=""> ثانیه </option>
                                                {optionSeconds}
                                            </select>
                                            <select
                                                className="element"
                                                value={time.minute}
                                                onChange={(e) => handleSetTime(e, 0, 'minute')}
                                                onClick={(e) => clearInputError(e, refTimeError, true, 'time')}
                                            >
                                                <option value=""> دقیقه </option>
                                                {optionMinutes}
                                            </select>
                                            <select
                                                className="element"
                                                value={time.hour}
                                                onChange={(e) => { handleSetTime(e, 0, 'hour') }}
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
                                                onInput={(e) => handleSetDate(e, 0, 'day')}
                                                onFocus={(e) => clearInputError(e, refDateError, true, 'date')}
                                            />
                                            <span>/</span>
                                            <input
                                                type="text"
                                                className="inputTextDateACus inputMonthTDACus element"
                                                placeholder="1"
                                                value={date.month || ''}
                                                onInput={(e) => handleSetDate(e, 0, 'month')}
                                                onFocus={(e) => clearInputError(e, refDateError, true, 'date')}
                                            />
                                            <span>/</span>
                                            <input
                                                type="text"
                                                className="inputTextDateACus inputYearTDACus element"
                                                placeholder="1300"
                                                value={date.year || ''}
                                                onInput={(e) => { handleSetDate(e, 0, 'year') }}
                                                onFocus={(e) => clearInputError(e, refDateError, true, 'date')}
                                            />
                                            <i className="icofont-ui-rating starFB" />
                                        </div>

                                        <div className="divDownDateAcus" >
                                            <select
                                                className="element"
                                                value={date.day}
                                                onChange={(e) => handleSetDate(e, 0, 'day')}
                                                onClick={(e) => clearInputError(e, refDateError, true, 'date')}
                                            >
                                                <option value="">روز</option>
                                                {optionDays}
                                            </select>
                                            <select
                                                className="element"
                                                value={date.month}
                                                onChange={(e) => handleSetDate(e, 0, 'month')}
                                                onClick={(e) => clearInputError(e, refDateError, true, 'date')}

                                            >
                                                <option value="">ماه</option>
                                                {optionMonth}
                                            </select>
                                            <select
                                                className="element"
                                                value={date.year}
                                                onChange={(e) => { handleSetDate(e, 0, 'year') }}
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
                                            handleTotalPriceCalculation(e, '', 'unitPrice');
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
                                            handleCubicMetersCalculation(e);
                                            handleTotalPriceCalculation(e, '', 'weight');
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
                                        >
                                        </div>
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
                                        onClick={e => { clearInputError(e, refTruck_idError); setInvoiceIndexForMixer(0) }}
                                    >
                                        <SelectZabi
                                            primaryLabel='انتخاب'
                                            options={mixers}
                                            saveOption={setTruckId}
                                            saveOption2={setOwnerId}
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
                                        onClick={e => { setInvoiceIndexForDriver(0); clearInputError(e, refDriver_idError); }}
                                    >
                                        <SelectZabi
                                            primaryLabel='انتخاب'
                                            options={drivers}
                                            saveOption={setDriverId}
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
                                            handleSaveValInput(e, 'maskanMeli', 0,); handleCheckedMaskanMeli(e, `emam`);
                                            clearInputError(e, '', false, '', 0);
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
                                            handleSaveValInput(e, 'maskanMeli', 0, true); handleCheckedMaskanMeli(e, `shahid`);
                                            clearInputError(e, '', false, '', 0);
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
    )
}
export default Edit;