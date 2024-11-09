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
const Edit = () => {
    const { inoviceId } = useParams();
    const {
        optionDays,
        optionMonth,
        optionShortYears,
        optionHours,
        optionMinutes,
        optionSeconds,
    } = DataZabi();
    const container = useRef(null);
    const refTimeEditError = useRef(null);
    const refDateEditError = useRef(null);
    const refConcrete_idEdit = useRef(null);
    const refConcrete_idEditError = useRef(null);
    const refUnitPriceEdit = useRef(null);
    const refUnitPriceEditError = useRef(null);
    const refWeightEdit = useRef(null);
    const refWeightEditError = useRef(null);
    const refCubicMetersEdit = useRef(null);
    const refCementStore_idEdit = useRef(null);
    const refCementStore_idEditError = useRef(null);
    const refTotalPriceEdit = useRef(null);
    const refTruck_idEdit = useRef(null);
    const refTruck_idEditError = useRef(null);
    const refDriver_idEdit = useRef(null);
    const refDriver_idEditError = useRef(null);
    const refFareEdit = useRef(null);
    const refFareEditError = useRef(null);
    const refCheckBaxEmamEdit = useRef(null);
    const refCheckBaxShahidEdit = useRef(null);
    const refVahedEditError = useRef(null);
    const refAddressEditError = useRef(null);
    const refConcretingPositionEditError = useRef(null);
    const refCheckedMaskanShahidEdit = useRef(null);

    const [loading, setLoading] = useState(true);
    const [customerId, setCustomerId] = useState('');
    const [concreteId, setConcreteId] = useState('');
    const [truckId, setTruckId] = useState('');
    const [ownerId, setOwnerId] = useState('');
    const [driverId, setDriverId] = useState('');
    const [cementStoreId, setCementStoreId] = useState('');
    const [checkedMaskanMeliEdit, setCheckedMaskanMeliEdit] = useState('');

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

    const { concreteBuyers, concretes, cementStores, mixers, drivers } = RouteService({ setLoading });

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
        
            refUnitPriceEdit && (refUnitPriceEdit.current.value = parseFloat(input.unitPrice).toLocaleString());

            refWeightEdit && (refWeightEdit.current.value = parseFloat(input.weight).toLocaleString());

            refTotalPriceEdit && (refTotalPriceEdit.current.innerHTML = parseFloat(input.totalPrice).toLocaleString());

            refFareEdit && (refFareEdit.current.value = parseFloat(input.fare).toLocaleString());
       

    }, []);

    //     /**
    //      * هنگامی که کاربر مبادرت به دیدن و یا ویرایش کردن یک رکورد میکند
    //      * این متد اطلاعات هر فیلد را برای نمایش تنظیم می کند
    //      * @param {آدی رکورد} id0 
    //      */
    //     const pasteDataForEditing = (id0) => {
    //         let concreteSalesInvoice = concreteSalesInvoices.find(concreteSalesInvoice => concreteSalesInvoice.id === id0);
    //         concreteSalesInvoice && setId(id0);
    //         let numberplate = concreteSalesInvoice.truck.numberplate.split("-");
    //         const { id, created_at, updated_at, ...rest } = concreteSalesInvoice;//نادیده گرفتن کلید های مشخص شده

    //         // کپی از شی برای انجام تغییرات
    //         let datas = { ...rest };
    //         setInputEdit({
    //             customer_id: datas.customer_id,
    //             date: datas.date,
    //             time: datas.time,
    //             weight: datas.weight,
    //             cubicMeters: datas.cubicMeters,
    //             concrete_id: datas.concrete_id,
    //             truck_id: datas.truck_id,
    //             ownerId: datas.truck.customer.id,
    //             driver_id: datas.driver_id,
    //             cementStore_id: datas.cementStore_id,
    //             unitPrice: datas.unitPrice,
    //             totalPrice: datas.totalPrice,
    //             fare: datas.fare,
    //             maskanMeli: datas.maskanMeli,
    //             vahed: datas.vahed,
    //             address: datas.address,
    //             concretingPosition: datas.concretingPosition
    //         });
    //         refCustomer_id.current && refCustomer_id.current.updateData(datas.customer.name + ' ' + datas.customer.lastName);
    //         refConcrete_idEdit.current && refConcrete_idEdit.current.updateData(<div className="concreteAptionSelectFB">
    //             <span className="concreteLabelSelectFB">بتن
    //             </span>
    //             <span className="concreteSelectFB">
    //                 {datas.concrete.concreteName}
    //             </span>
    //         </div>);

    //         refCementStore_idEdit.current && refCementStore_idEdit.current.updateData(datas.cement_store.silo);
    //         refTruck_idEdit.current && refTruck_idEdit.current.updateData(<div className="mixerAptionSelectFB">
    //             <span className="mixerNamberpalteSelectFB">
    //                 <div className="numberplateDiv">
    //                     <span className="numberplateDivS1">{numberplate[0]}</span>
    //                     <span className="numberplateDivS2">{numberplate[3] == 'ا' ? 'الف' : numberplate[3]}</span>
    //                     <span className="numberplateDivS3">{numberplate[1]}</span>
    //                     <span className="numberplateDivS4">{numberplate[2]}</span>
    //                 </div>
    //             </span>

    //             <span className="mixerOwnerSelectFB">
    //                 {datas.truck.customer.name}
    //                 {' '}
    //                 {datas.truck.customer.lastName}
    //             </span>

    //         </div>);
    //         refDriver_idEdit.current && refDriver_idEdit.current.updateData(<div className="personnelAption_addPerS">
    //             <span className="name_addPers">{datas.driver.name}
    //                 {' '}
    //                 {datas.driver.lastName}</span>

    //             <span className="fther_addPers">
    //                 {datas.driver.father || ''}
    //             </span>

    //         </div>);

    //         if (rest.date) {
    //             let parts = rest.date.split("-");
    //             setDate({
    //                 day: parts[2],
    //                 month: parts[1],
    //                 year: parts[0]
    //             });

    //         }

    //         if (rest.time) {
    //             let parts = rest.time.split(":");
    //             setTime({
    //                 second: parts[2],
    //                 minute: parts[1],
    //                 hour: parts[0]
    //             })
    //         }

    //         if (datas.maskanMeli == 'مسکن ملی شهرک امام خمینی') {
    //             setCheckedMaskanMeliEdit('emam');
    //         }
    //         else if (datas.maskanMeli == 'مسکن ملی شهرک شهید رییسی') {
    //             setCheckedMaskanMeliEdit('shahid');

    //         }
    //         else {
    //             setCheckedMaskanMeliEdit('');

    //         }
    //     }


    const resetForm2 = () => {
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

    const { showAddForm, showCreatedRecord, showEditForm, flexDirection, disabledBtnShowForm, disabledBtnShowRecords, hideCreatedRecord, containerShowGeRef, hideShowForm } = useChangeForm({  resetForm2 });

    /**
 * برای پاک کردن پیام خطا و برداشتن رنگ قرمز دور کادر
 * @param {*} e 
 * @param {رف مربوط به تگ نمایش خطا} refErr 
 */
    const clearInputError = (e, refErr, dateAndTime = false, idDivDateAndTime = '', i = null) => {
        if (i !== null && Number(i) >= 0) {
            const addressElemnt = document.getElementById('addressEdit');
            const vahedElemnt = document.getElementById('vahedEdit');
            addressElemnt.classList.remove('borderRedFB');
            refAddressEditError.current.innerHTML = '';

            vahedElemnt.classList.remove('borderRedFB');
            refVahedEditError.current.innerHTML = '';

        } else {
            if (!dateAndTime) {
                e.target.classList.remove('borderRedFB');
                /**
                         * دو خط کد زیر برای زمانی است‌ که کلاس مورد
                         *  نظر بر روی پدر تگهااعمال شده‌است
                         * ابتدا پدری که حاوی کلاس است را پیدا می‌کند
                         *  و سپس کلاس را از تگ پدر حذف 
                         * می‌‌کند، این کدها معمولا برای کامپوننتی
                         *  که سلکت سفارشی را ارائه می‌دهد کاربرد دارد
                        */
                const parentWithClass = e.target.closest('.borderRedFB');
                parentWithClass && parentWithClass.classList.remove('borderRedFB');
            } else {
                const element = document.getElementById(idDivDateAndTime);
                element.classList.remove('borderRedFB');
            }
            refErr.current && (refErr.current.innerHTML = '')
        }
    }

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

            replaceObject(id, response.data.concreteSalesInvoice);
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

                        let id = Object.keys(error.response.data.errors)[0] + 'Edit';
                        if (id != 'cubicMetersEdit' && id != 'totalPriceEdit' && id != 'ownerIdEdit') {
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
                                document.getElementById(key + 'Edit').classList.add('borderRedFB');

                                document.getElementById(key + 'Edit' + 'Error').innerHTML = val;
                            }

                        });
                    }
                }
            )

        setLoading(false)
    }

    /**
* هنگامی که کاربر اطلاعات یک مشتری را ویرایش می‌کند
* اطلاعات جدید در استیت جایگزین اطلاعات قبلی می‌شود
* @param {number} id 
* @param {object} newObject 
*/
    const replaceObject = (id, newObject) => {
        setConcreteSalesInvoices(concreteSalesInvoices.map((object) => {
            if (object.id == id) {
                return newObject;
            } else {
                return object;
            }
        }));
    };

    /**
 * برای خوانایی بهتر قیمت و وزن‌ها اعداد را فرمت دهی می‌کند
 * به صورت دهگان،صدگان و ...
 * @param {ref} ref 
 */
    const formatNubEdit = (input) => {
        let val,
            checkDthot,
            resalt,
            refCurrent;
        switch (input) {
            case 'unitPrice':
                resalt = refUnitPriceEdit.current.value.replace(/[\s,]/g, "");
                refCurrent = refUnitPriceEdit.current;
                break;
            case 'weight':
                resalt = refWeightEdit.current.value.replace(/[\s,]/g, "");
                refCurrent = refWeightEdit.current;
                break;
            case 'fare':
                resalt = refFareEdit.current.value.replace(/[\s,]/g, "");
                refCurrent = refFareEdit.current;
                break;
        }
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
            refCurrent.value = val;
        }
    }

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
            checkedMaskanMeliEdit == "emam" ? (setCheckedMaskanMeliEdit(''), maskanMeli = '') : (setCheckedMaskanMeliEdit('emam'), maskanMeli = 'مسکن ملی شهرک امام خمینی');
        } else {
            checkedMaskanMeliEdit == "shahid" ? (setCheckedMaskanMeliEdit(''), maskanMeli = '') : (setCheckedMaskanMeliEdit('shahid'), maskanMeli = 'مسکن ملی شهرک شهید رییسی');
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

       
            refCubicMetersEdit.current.innerHTML = cubicMeters;
            setInputEdit(prev => ({ ...prev, cubicMeters }));
       
    }

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
                                            {id}
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
                                        <div className="divUpDateAcus element" id='timeEdit'
                                        >
                                            <input
                                                type="text"
                                                className="inputTextDateACus inputDayTDACus element"
                                                placeholder="00"
                                                id="hourEdit"
                                                value={time.second || ''}
                                                onInput={(e) => handleSetTime(e, 0, 'second')}
                                                onFocus={(e) => clearInputError(e, refTimeEditError, true, 'timeEdit')}

                                            />
                                            <span>:</span>
                                            <input
                                                type="text"
                                                className="inputTextDateACus inputMonthTDACus element"
                                                placeholder="00"
                                                value={time.minute || ''}
                                                onInput={(e) => handleSetTime(e, 0, 'minute')}
                                                onFocus={(e) => clearInputError(e, refTimeEditError, true, 'timeEdit')}

                                            />
                                            <span>:</span>
                                            <input
                                                type="text"
                                                className="inputTextDateACus inputYearTDACus element"
                                                placeholder="00"
                                                value={time.hour || ''}
                                                onInput={(e) => { handleSetTime(e, 0, 'hour') }}
                                                onFocus={(e) => clearInputError(e, refTimeEditError, true, 'timeEdit')}
                                            />
                                            <i className="icofont-ui-rating starFB" />
                                        </div>

                                        <div className="divDownDateAcus" >
                                            <select
                                                className="element"
                                                value={time.second}
                                                onChange={(e) => handleSetTime(e, 0, 'second')}
                                                onClick={(e) => clearInputError(e, refTimeEditError, true, 'timeEdit')}
                                            >
                                                <option value=""> ثانیه </option>
                                                {optionSeconds}
                                            </select>
                                            <select
                                                className="element"
                                                value={time.minute}
                                                onChange={(e) => handleSetTime(e, 0, 'minute')}
                                                onClick={(e) => clearInputError(e, refTimeEditError, true, 'timeEdit')}
                                            >
                                                <option value=""> دقیقه </option>
                                                {optionMinutes}
                                            </select>
                                            <select
                                                className="element"
                                                value={time.hour}
                                                onChange={(e) => { handleSetTime(e, 0, 'hour') }}
                                                onClick={(e) => clearInputError(e, refTimeEditError, true, 'timeEdit')}
                                            >
                                                <option value=""> ساعت </option>
                                                {optionHours}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="errorContainerFB elementError" id='timeEditError' ref={refTimeEditError}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB ">
                                    <label htmlFor="day">تاریخ  </label>
                                    <div className="divDateBirth">
                                        <div className="divUpDateAcus element" id="dateEdit"
                                        >
                                            <input
                                                type="text"
                                                className="inputTextDateACus inputDayTDACus element"
                                                placeholder="1"
                                                id="day"
                                                value={date.day || ''}
                                                onInput={(e) => handleSetDate(e, 0, 'day')}
                                                onFocus={(e) => clearInputError(e, refDateEditError, true, 'dateEdit')}
                                            />
                                            <span>/</span>
                                            <input
                                                type="text"
                                                className="inputTextDateACus inputMonthTDACus element"
                                                placeholder="1"
                                                value={date.month || ''}
                                                onInput={(e) => handleSetDate(e, 0, 'month')}
                                                onFocus={(e) => clearInputError(e, refDateEditError, true, 'dateEdit')}
                                            />
                                            <span>/</span>
                                            <input
                                                type="text"
                                                className="inputTextDateACus inputYearTDACus element"
                                                placeholder="1300"
                                                value={date.year || ''}
                                                onInput={(e) => { handleSetDate(e, 0, 'year') }}
                                                onFocus={(e) => clearInputError(e, refDateEditError, true, 'dateEdit')}
                                            />
                                            <i className="icofont-ui-rating starFB" />
                                        </div>

                                        <div className="divDownDateAcus" >
                                            <select
                                                className="element"
                                                value={date.day}
                                                onChange={(e) => handleSetDate(e, 0, 'day')}
                                                onClick={(e) => clearInputError(e, refDateEditError, true, 'dateEdit')}
                                            >
                                                <option value="">روز</option>
                                                {optionDays}
                                            </select>
                                            <select
                                                className="element"
                                                value={date.month}
                                                onChange={(e) => handleSetDate(e, 0, 'month')}
                                                onClick={(e) => clearInputError(e, refDateEditError, true, 'dateEdit')}

                                            >
                                                <option value="">ماه</option>
                                                {optionMonth}
                                            </select>
                                            <select
                                                className="element"
                                                value={date.year}
                                                onChange={(e) => { handleSetDate(e, 0, 'year') }}
                                                onClick={(e) => clearInputError(e, refDateEditError, true, 'dateEdit')}
                                            >
                                                <option value="">سال</option>
                                                {optionShortYears}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="errorContainerFB elementError" id='dateEditError' ref={refDateEditError}> </div>
                            </div>
                        </div>
                        <div className="sectionFB">
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor='concrete_idEdit'> عیار بتن </label>
                                    <div
                                        id='concrete_idEdit'
                                        className="element"
                                        onClick={e => { setInvoiceIndexForConcrete(0); clearInputError(e, refConcrete_idEditError) }}
                                    >
                                        <SelectZabi
                                            primaryLabel='انتخاب'
                                            options={concretes}
                                            saveOption={setConcreteId}
                                            ref={refConcrete_idEdit}
                                        />
                                    </div>
                                    <i className="icofont-ui-rating starFB" />
                                </div>
                                <div className="errorContainerFB elementError" id='concrete_idEditError' ref={refConcrete_idEditError}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor='unitPriceEdit'> قیمت واحد بتن (مترمکعب) </label>
                                    <input
                                        type="text"
                                        id='unitPriceEdit'
                                        className="inputTextUnitFB ltrFB element"
                                        defaultValue={input.unitPrice}
                                        ref={refUnitPriceEdit}
                                        onInput={e => {
                                            handleSaveValInput(e, 'unitPrice', 0);
                                            formatNubEdit('unitPrice');
                                            handleTotalPriceCalculation(e, '', 'unitPrice');
                                        }
                                        }
                                        onFocus={e => clearInputError(e, refUnitPriceEditError)}
                                    />
                                    <span
                                        className="unitFB"
                                        onClick={() => htmlFor('unitPriceEdit')}
                                    >
                                        تومان
                                    </span>
                                    <i className="icofont-ui-rating starFB" />
                                </div>
                                <div
                                    className="errorContainerFB elementError"
                                    id='unitPriceEditError'
                                    ref={refUnitPriceEditError}
                                >
                                </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor='weightEdit'> وزن خالص بار </label>
                                    <input
                                        type="text"
                                        id='weightEdit'
                                        className="inputTextUnitFB ltrFB element"
                                        defaultValue={input.weight}
                                        ref={refWeightEdit}
                                        onInput={e => {
                                            handleSaveValInput(e, 'weight', 0);
                                            formatNubEdit('weight');
                                            handleCubicMetersCalculation(e);
                                            handleTotalPriceCalculation(e, '', 'weight');
                                        }
                                        }
                                        onFocus={e => clearInputError(e, refWeightEditError)}
                                    />
                                    <span
                                        className="unitFB"
                                        onClick={() => htmlFor('weightEdit')}
                                    >
                                        کیلو گرم
                                    </span>
                                    <i className="icofont-ui-rating starFB" />
                                </div>
                                <div
                                    className="errorContainerFB elementError"
                                    id='weightEditError'
                                    ref={refWeightEditError}
                                >
                                </div>
                            </div>
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label> حجم بار </label>
                                    <div className="mainCubicMetersACSL_FB">
                                        <div className="cubicMetersACSL_FB"
                                            ref={refCubicMetersEdit}>{input.cubicMeters}</div>
                                        <span className="spanCubicMetersACSL_FB">
                                            متر مکعب
                                        </span>
                                    </div>
                                </div>

                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor='cementStore_idEdit'> سیلوی سیمان </label>
                                    <div
                                        id='cementStore_idEdit'
                                        className="element"
                                        onClick={e => { clearInputError(e, refCementStore_idEditError); }}
                                    >
                                        <SelectZabi
                                            primaryLabel='انتخاب'
                                            options={cementStores}
                                            saveOption={setCementStoreId}
                                            ref={refCementStore_idEdit}
                                        />
                                    </div>
                                    <i className="icofont-ui-rating starFB" />
                                </div>
                                <div
                                    className="errorContainerFB elementError"
                                    id='cementStore_idEditError'
                                    ref={refCementStore_idEditError}
                                > </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label> قیمت کل </label>
                                    <div className="mainTotalPriceACSL_FB">
                                        <div className="totalPriceACSL_FB"
                                            ref={refTotalPriceEdit}
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
                                    <label htmlFor='truck_idEdit'> میکسر </label>
                                    <div
                                        id='truck_idEdit'
                                        className="element"
                                        onClick={e => { clearInputError(e, refTruck_idEditError); setInvoiceIndexForMixer(0) }}
                                    >
                                        <SelectZabi
                                            primaryLabel='انتخاب'
                                            options={mixers}
                                            saveOption={setTruckId}
                                            saveOption2={setOwnerId}
                                            ref={refTruck_idEdit}
                                        />
                                    </div>
                                    <i className="icofont-ui-rating starFB" />
                                </div>
                                <div
                                    className="errorContainerFB elementError"
                                    id='refTruck_idEditError'
                                    ref={refTruck_idEditError}
                                > </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor='driver_idEdit'> راننده </label>
                                    <div
                                        id='driver_idEdit'
                                        className="element"
                                        onClick={e => { setInvoiceIndexForDriver(0); clearInputError(e, refDriver_idEditError); }}
                                    >
                                        <SelectZabi
                                            primaryLabel='انتخاب'
                                            options={drivers}
                                            saveOption={setDriverId}
                                            ref={refDriver_idEdit}
                                        />
                                    </div>
                                    <i className="icofont-ui-rating starFB" />
                                </div>
                                <div
                                    className="errorContainerFB elementError"
                                    id='driver_idEditError'
                                    ref={refDriver_idEditError}
                                > </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor='fareEdit'> کرایه میکسر </label>
                                    <input
                                        type="text"
                                        id='fareEdit'
                                        className="inputTextUnitFB ltrFB element"
                                        defaultValue={input.fare}
                                        ref={refFareEdit}
                                        onInput={e => {
                                            handleSaveValInput(e, 'fare', 0);
                                            formatNubEdit('fare');
                                        }
                                        }
                                        onFocus={e => clearInputError(e, refFareEditError)}
                                    />
                                    <span
                                        className="unitFB"
                                        onClick={() => htmlFor('fareEdit')}
                                    >
                                        تومان
                                    </span>
                                    <i className="icofont-ui-rating starFB" />
                                </div>
                                <div
                                    className="errorContainerFB elementError"
                                    id='fareEditError'
                                    ref={refFareEditError}
                                >
                                </div>
                            </div>

                        </div>
                        <div className="sectionFB">
                            <div className="containerInputFB">
                                <div className="divInputCheckboxFB">
                                    <input
                                        type="checkbox"
                                        id='emamEdit'
                                        className="inputCheckboxFB  element pointerFB"
                                        onChange={e => {
                                            handleSaveValInput(e, 'maskanMeli', 0,); handleCheckedMaskanMeliEdit(e, `emam`);
                                            clearInputError(e, '', false, '', 0);
                                        }}
                                        checked={checkedMaskanMeliEdit == `emam`}
                                        ref={refCheckBaxEmamEdit}
                                    />
                                    <label htmlFor='emamEdit'
                                        className={`labelCheckboxFB pointerFB  ${checkedMaskanMeliEdit != 'emam' && 'inactiveLabelCSI_FB'}`}
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
                                        id='shahidEdit'
                                        className="inputCheckboxFB  element pointerFB"
                                        value={refCheckedMaskanShahidEdit && refCheckedMaskanShahidEdit.current ? 'مسکن ملی شهرک شهید رییسی' : ''}
                                        onChange={e => {
                                            handleSaveValInput(e, 'maskanMeli', 0, true); handleCheckedMaskanMeliEdit(e, `shahid`);
                                            clearInputError(e, '', false, '', 0);
                                        }}
                                        checked={checkedMaskanMeliEdit == `shahid`}
                                        ref={refCheckBaxShahidEdit}
                                    />
                                    <label htmlFor='shahidEdit'
                                        className={`labelCheckboxFB pointerFB ${checkedMaskanMeliEdit != `shahid` && 'inactiveLabelCSI_FB'}`}
                                    >مسکن ملی (شهرک شهید رئیسی) </label>
                                </div>
                                <div className="errorContainerFB elementError" > </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor='vahedEdit' className={`${(checkedMaskanMeliEdit != 'emam' && checkedMaskanMeliEdit != 'shahid') && 'inactiveLabelCSI_FB'}`}>شماره واحد </label>
                                    <input
                                        type="text"
                                        id='vahedEdit'
                                        className="inputTextFB ltrFB element"
                                        defaultValue={input.vahed}
                                        onInput={e => handleSaveValInput(e, 'vahed', 0)}
                                        onFocus={(e) => clearInputError(e, refVahedEditError)}
                                        disabled={checkedMaskanMeliEdit != 'emam' && checkedMaskanMeliEdit != 'shahid'}
                                    />
                                </div>
                                <div className="errorContainerFB elementError" id='vahedEditError' ref={refVahedEditError}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor='addressEdit'>آدرس</label>
                                    <textarea
                                        id='addressEdit'
                                        className="textareaAddressCSI_FB element"
                                        defaultValue={input.address}
                                        onInput={e => handleSaveValInput(e, 'address', 0)}
                                        onFocus={(e) => clearInputError(e, refAddressEditError)}

                                    />
                                </div>
                                <div
                                    className="errorContainerFB elementError"
                                    id='addressEditError'
                                    ref={refAddressEditError}
                                > </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor='concretingPositionEdit' >موقعیت بتن‌ریزی </label>
                                    <textarea
                                        id='concretingPositionEdit'
                                        className="textareaAddressCSI_FB element"
                                        defaultValue={input.concretingPosition}
                                        onInput={e => handleSaveValInput(e, 'concretingPosition', 0)}
                                        onFocus={(e) => clearInputError(e, refConcretingPositionEditError)}

                                    />
                                </div>
                                <div
                                    className="errorContainerFB elementError"
                                    id='concretingPositionEditError'
                                    ref={refConcretingPositionEditError}
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