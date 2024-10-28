import { createRef, useEffect, useRef, useState } from 'react';
import HeadPage from './HeadPage';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import "../../../../css/general.css";
import "../../../../css/formBeton.css";
import "../../../../css/addCustomer.css";
import "../../../../css/search.css";
import DataZabi from "../../hooks/DateZabi";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ScaleLoader from 'react-spinners/ScaleLoader';
import useChangeForm from '../../hooks/useChangeForm';
import SelectZabi from "../../hooks/SelectZabi";
import SelectZabi2 from "../../hooks/SelectZabi2";
import SearchCustomersSelect from "../searchSelectZabi/addConcreteSalesInvoiceSelect/SearchCustomersSelect";
import SearchMixersSelect from "../searchSelectZabi/addConcreteSalesInvoiceSelect/SearchMixersSelect";
import SearchDriversSelect from "../searchSelectZabi/addConcreteSalesInvoiceSelect/SearchDriversSelect";

import Pagination from "../../hooks/Pagination";
import AddCocreteSalesInvoiceSearch from "../../search/AddConcreteSalesInvoiceSearch";
import RouteService from "./RouteService";
import Helper from './helper/AddHelper';

const Add = () => {
    const [loading, setLoading] = useState(false);
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
    const btnAddGeRef = useRef(null);
    const btnGetGeRef = useRef(null);

    const form = useRef(null);
    const formCurrent = form.current;

    const refCustomer_id = useRef(null);
    const refCustomer_idError = useRef(null);

    const refTimeEditError = useRef(null);
    const refDateEditError = useRef(null);
    const refConcrete_idEdit = createRef();
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

    const nationalCodeErrorRef = useRef(null);

    const hasCalledGetConcreteSalesInvoices = useRef(false);

    const refCheckedMaskanShahidEdit = useRef(null);

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

    const [refInvoice, setRefInvoice] = useState({});
    const [concreteSalesInvoices, setConcreteSalesInvoices] = useState(null);
    const [ticketNumber, setTicketNumber] = useState('');
    const [isRef, setIsRef] = useState(false);
    /**
    * ############### states for paginate
    */
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);

    /**
 * اندیس فاکتوری که کاربر در حال تکمیل آن است را ذخیره می‌کند
 * برای ذخیره مقادیر سلکت‌ها در کلیدهای خودشان
 */
    const [invoiceIndexForConcrete, setInvoiceIndexForConcrete] = useState('');
    const [invoiceIndexForMixer, setInvoiceIndexForMixer] = useState('');
    const [invoiceIndexForDriver, setInvoiceIndexForDriver] = useState('');
    const [invoiceIndexForCementStore, setInvoiceIndexForCementStore] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [concreteId, setConcreteId] = useState('');
    const [truckId, setTruckId] = useState('');
    const [ownerId, setOwnerId] = useState('');
    const [driverId, setDriverId] = useState('');
    const [cementStoreId, setCementStoreId] = useState('');
    const [checkedMaskanMeli, setCheckedMaskanMeli] = useState();
    const [checkedMaskanMeliEdit, setCheckedMaskanMeliEdit] = useState('');

    /**
 * هنگامی که کاربر مبادرت به ایجاد فاکتور جدید می‌کند
 * جهت جایگذاری مقادیر پیش فرض المنت ها از استیت‌های زیر استفاده می‌شود
 */
    const [isNewInvoice, setIsNewInvoice] = useState(false);
    const [indexNewInvoice, setIndexNewInvoice] = useState('');
    const [concreteName, setConcreteName] = useState('');
    const [cementStoreName, setCementStoreName] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [vahed, setVahed] = useState('');
    const [address, setAddress] = useState('');
    const [concretingPosition, setConcretingPosition] = useState('');
    const [fare, setFare] = useState('');
    const [checkedValue, setCheckedValue] = useState('');
    const [isChecked, setIsChecked] = useState(false)

    const sampleInvoice = 'invoice';
    const [invoice, setInvoice] = useState([sampleInvoice]);

    const [maskan, setMaskan] = useState([...invoice.map(item => ''), '']);
    const [input, setInput] = useState({
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

    /**
     * برای تخصیص رف به هر اینپوت 
    */
    useEffect(() => {
        if (invoice) {
            let refs = invoice.reduce((acc, cur, i) => {
                acc[`time${i}`] = createRef();
                acc[`secondInput${i}`] = createRef();
                acc[`secondSelect${i}`] = createRef();
                acc[`minuteInput${i}`] = createRef();
                acc[`minuteSelect${i}`] = createRef();
                acc[`hourInput${i}`] = createRef();
                acc[`hourSelect${i}`] = createRef();
                acc[`timeError${i}`] = createRef();
                acc[`date${i}`] = createRef();
                acc[`dayInput${i}`] = createRef();
                acc[`daySelect${i}`] = createRef();
                acc[`monthInput${i}`] = createRef();
                acc[`monthSelect${i}`] = createRef();
                acc[`yearInput${i}`] = createRef();
                acc[`yearSelect${i}`] = createRef();
                acc[`dateError${i}`] = createRef();
                acc[`weight${i}`] = createRef();
                acc[`weightError${i}`] = createRef();
                acc[`cubicMeters${i}`] = createRef();
                acc[`concrete_id${i}`] = createRef();
                acc[`concrete_idError${i}`] = createRef();
                acc[`truck_id${i}`] = createRef();
                acc[`truck_idError${i}`] = createRef();
                acc[`driver_id${i}`] = createRef();
                acc[`driver_idError${i}`] = createRef();
                acc[`cementStore_id${i}`] = createRef();
                acc[`cementStore_idError${i}`] = createRef();
                acc[`unitPrice${i}`] = createRef();
                acc[`unitPriceError${i}`] = createRef();
                acc[`totalPrice${i}`] = createRef();
                acc[`fare${i}`] = createRef();
                acc[`fareError${i}`] = createRef();
                acc[`maskanMeli${i}`] = createRef();
                acc[`vahed${i}`] = createRef();
                acc[`vahedError${i}`] = createRef();
                acc[`address${i}`] = createRef();
                acc[`addressError${i}`] = createRef();
                acc[`concretingPosition${i}`] = createRef();
                acc[`concretingPositionError${i}`] = createRef();
                acc[`checkBaxEmam${i}`] = createRef();
                acc[`checkBaxShahid${i}`] = createRef();
                acc[`checkedMaskanEmam${i}`] = createRef();
                acc[`checkedMaskanEmam${i}`].current = true;
                acc[`checkedMaskanShahid${i}`] = createRef();
                acc[`checkedMaskanShahid${i}`].current = true;
                return acc;
            }, {});
            setRefInvoice(refs);
            setIsRef(true);
        }
    }, [invoice]);

    useEffect(() => {
        if (customerId) {
            setInput(prev => ({ ...prev, customer_id: customerId }))
        }
    }, [customerId]);

    useEffect(() => {
        if (concreteId) {
            setInput(perv => {
                let invoices = [...perv.invoice];
                invoices[invoiceIndexForConcrete] = { ...invoices[invoiceIndexForConcrete], concrete_id: concreteId };
                return { ...perv, invoice: invoices };
            });
        }
    }, [concreteId, invoiceIndexForConcrete]);

    useEffect(() => {
        if (truckId) {
            setInput(perv => {
                let invoices = [...perv.invoice];
                invoices[invoiceIndexForMixer] = { ...invoices[invoiceIndexForMixer], truck_id: truckId, ownerId };
                return { ...perv, invoice: invoices };
            });
        }
    }, [truckId, invoiceIndexForMixer]);

    useEffect(() => {
        if (driverId) {
            setInput(perv => {
                let invoices = [...perv.invoice];
                invoices[invoiceIndexForDriver] = { ...invoices[invoiceIndexForDriver], driver_id: driverId };
                return { ...perv, invoice: invoices };
            });
        }
    }, [driverId, invoiceIndexForDriver]);

    useEffect(() => {
        if (cementStoreId) {
            setInput(perv => {
                let invoices = [...perv.invoice];
                invoices[invoiceIndexForCementStore] = { ...invoices[invoiceIndexForCementStore], cementStore_id: cementStoreId };
                return { ...perv, invoice: invoices };
            });
        }
    }, [cementStoreId, invoiceIndexForCementStore]);

    useEffect(() => {
        if (isRef && refInvoice[`concrete_id${indexNewInvoice}`]) {
            concreteName && refInvoice[`concrete_id${indexNewInvoice}`].current.updateData(<div className="defaultConcreteNameACSI_FB"><span>بتن</span> <span>{concreteName}</span></div>);
        }
        setIsNewInvoice(false);
    }, [isNewInvoice, isRef]);

    useEffect(() => {
        if (isRef && refInvoice[`cementStore_id${indexNewInvoice}`]) {
            cementStoreName && refInvoice[`cementStore_id${indexNewInvoice}`].current.updateData(<div className="defaultConcreteNameACSI_FB"> <span>{cementStoreName}</span></div>);
        }
        setIsNewInvoice(false);
    }, [isNewInvoice, isRef]);

    useEffect(() => {
        let index = invoice.length - 1;
        if (isRef) {
            input.invoice[index].unitPrice && refInvoice[`unitPrice${index}`] && (refInvoice[`unitPrice${index}`].current.value = parseFloat(input.invoice[index].unitPrice).toLocaleString());
            input.invoice[index].fare && refInvoice[`fare${index}`] && (refInvoice[`fare${index}`].current.value = parseFloat(input.invoice[index].fare).toLocaleString());
        }

    }, [isNewInvoice]);

    const handleSetDate = (e, i, input) => {
        let { value } = e.target,
            valDate;
        value = value.toString();
        if (input == 'day') {
            (value != 0 && value.length == 1) && (value = '0' + value);
            (value.length >= 3 && value[0] === '0') && (value = value.slice(1));
            if (value == '' || (Number(value) >= 0 && Number(value) <= 31)) {
                setDate(prev => ({ ...prev, [input]: value }));
                refInvoice[`dayInput${i}`].current.value = value;
                refInvoice[`daySelect${i}`].current.value = value;
            } else {
                e.target.value = date.day;
            }
            valDate = date.year + '-' + date.month + '-' + value;
            setInput(perv => {
                let newInvoice;
                newInvoice = [...perv.invoice];
                newInvoice[i] = { ...newInvoice[i], date: valDate };
                return { ...perv, invoice: newInvoice };
            });
        } else if (input == 'month') {
            (value != 0 && value.length == 1) && (value = '0' + value);
            (value.length >= 3 && value[0] === '0') && (value = value.slice(1));
            if (value == '' || (Number(value) >= 0 && Number(value) <= 12)) {
                setDate(prev => ({ ...prev, [input]: value }));
                refInvoice[`monthInput${i}`].current.value = value;
                refInvoice[`monthSelect${i}`].current.value = value;
            }
            else {
                e.target.value = date.month;
            }
            valDate = date.year + '-' + value + '-' + date.day;
            setInput(perv => {
                let newInvoice;
                newInvoice = [...perv.invoice];
                newInvoice[i] = { ...newInvoice[i], date: valDate };
                return { ...perv, invoice: newInvoice };
            });
        } else if (input = 'year') {
            if (value == '' || (Number(value) >= 1 && Number(value) <= 1500)) {
                setDate(prev => ({ ...prev, [input]: value }));
                refInvoice[`yearInput${i}`].current.value = value;
                refInvoice[`yearSelect${i}`].current.value = value;
            } else {
                e.target.value = date.year;
            }
            valDate = value + '-' + date.month + '-' + date.day;
            setInput(perv => {
                let newInvoice;
                newInvoice = [...perv.invoice];
                newInvoice[i] = { ...newInvoice[i], date: valDate };
                return { ...perv, invoice: newInvoice };
            });
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
                refInvoice[`secondSelect${i}`].current.value = value;
                refInvoice[`secondInput${i}`].current.value = value;
            } else {
                e.target.value = time.second;
            }
            valTime = time.hour + ':' + time.minute + ':' + value;
            setInput(perv => {
                let newInvoice;
                newInvoice = [...perv.invoice];
                newInvoice[i] = { ...newInvoice[i], time: valTime };
                return { ...perv, invoice: newInvoice };
            });
        } else if (input == 'minute') {
            (value != 0 && value.length == 1) && (value = '0' + value);
            (value.length >= 3 && value[0] === '0') && (value = value.slice(1));
            if (value == '' || (Number(value) >= 0 && Number(value) <= 60)) {
                setTime(prev => ({ ...prev, [input]: value }));
                refInvoice[`minuteSelect${i}`].current.value = value;
                refInvoice[`minuteInput${i}`].current.value = value;
            } else {
                e.target.value = time.minute;
            }
            valTime = time.hour + ':' + value + ':' + time.second;
            setInput(perv => {
                let newInvoice;
                newInvoice = [...perv.invoice];
                newInvoice[i] = { ...newInvoice[i], time: valTime };
                return { ...perv, invoice: newInvoice };
            });
        } else if (input = 'hour') {
            (value != 0 && value.length == 1) && (value = '0' + value);
            (value.length >= 3 && value[0] === '0') && (value = value.slice(1));
            if (value == '' || (Number(value) >= 0 && Number(value) <= 24)) {
                setTime(prev => ({ ...prev, [input]: value }));
                refInvoice[`hourSelect${i}`].current.value = value;
                refInvoice[`hourInput${i}`].current.value = value;
            } else {
                e.target.value = time.hour;
            }
            valTime = value + ':' + time.minute + ':' + time.second;
            setInput(perv => {
                let newInvoice;
                newInvoice = [...perv.invoice];
                newInvoice[i] = { ...newInvoice[i], time: valTime };
                return { ...perv, invoice: newInvoice };
            });
        }
    }

    useEffect(() => {
        if (isRef) {
            setMaskan((prev) => [...prev, '']);
        }
    }, [invoice]);

    const resetForm = (apply = true) => {
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

        refInvoice[`cubicMeters0`].current.innerHTML = '0';

        refInvoice[`totalPrice0`].current.innerHTML = '0';

        refCustomer_id.current.updateData('انتخاب');
        refInvoice[`concrete_id0`].current.updateData('انتخاب');
        refInvoice[`cementStore_id0`].current.updateData('انتخاب');
        refInvoice[`truck_id0`].current.updateData('انتخاب');
        refInvoice[`driver_id0`].current.updateData('انتخاب');
        handleRemoveAllError();

        // در برخی مواقع لازم نیست کدهای داخل شرط استفاده شود
        if (apply) {
            window.scrollTo({ top: 0 });
        }
    }

    const { concreteBuyers, concretes, cementStores, mixers, drivers } = RouteService({ token, setLoading });

    const { inputCustomerSearch, optionsCustomersSearched, customerSearchWarning, elementCustomerSearchWarning, handleClearAllSearch } = SearchCustomersSelect({ dataCustomers: concreteBuyers.datas });

    const { inputMixerSearch, optionsMixersSearched, mixerSearchWarning, elementMixerSearchWarning, handleClearAllSearchMixer } = SearchMixersSelect({ dataMixers: mixers.datas });

    const { inputDriverSearch, optionsDriversSearched, driverSearchWarning, elementDriverSearchWarning, handleClearAllSearchDriver } = SearchDriversSelect({ dataDrivers: drivers.datas });


    const { showAddForm, showCreatedRecord, showEditForm, flexDirection, editMode, disabledBtnShowForm, disabledBtnShowRecords, hideCreatedRecord, containerShowGeRef, hideShowForm } = useChangeForm({ formCurrent, resetForm });

    /**
     * ذخیره مقادیر ورودی‌های کاربر در استیت
     * @param {*} e 
     * @param {*} input 
     */
    const handleSaveValInput = (e, input, i, customer = false) => {
        let { value } = e.target;
        switch (input) {
            case 'unitPrice':
                value = value.replace(/,/g, '');
                setUnitPrice(value);
                break;
            case 'weight':
                value = value.replace(/,/g, '');
                break;
            case 'fare':
                value = value.replace(/,/g, '');
                setFare(value);
                break;
            case 'vahed':
                setVahed(value);
                break;
            case 'address':
                setAddress(value);
                break;
            case 'concretingPosition':
                setConcretingPosition(value);
                break;
        }

        if (input == 'maskanMeli') {
            /**
             * چنانچه کاربر مبادرت به ایجاد بیش از یک فاکتور کند
             * کدهای زیر جهت نمایش مسکن ملی بطور پیش فرض در فاکتور جدید
             * اقدام می‌کنند
             */
            const copyMaskan = [...maskan];
            copyMaskan[i] = value;
            copyMaskan[maskan.length - 1] = value;
            setMaskan(copyMaskan);
        }

        if (!customer) {
            setInput(perv => {
                let newInvoice;
                if (Array.isArray(perv.invoice)) {
                    newInvoice = [...perv.invoice];
                    newInvoice[i] = { ...newInvoice[i], [input]: value };
                } else {
                    newInvoice[i] = {
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
                    }
                    newInvoice[i] = { ...newInvoice[i], [input]: value };
                }

                return { ...perv, invoice: newInvoice };
            });

        } else {

            setInput(prev => ({ ...prev, [input]: value }));
        }
    }

    const{clearInputError, htmlFor}=Helper();

//     /**
//  * برای پاک کردن پیام خطا و برداشتن رنگ قرمز دور کادر
//  * @param {*} e 
//  * @param {رف مربوط به تگ نمایش خطا} refErr 
//  */
//     const clearInputError = (e, refErr, dateAndTime = false, idDivDateAndTime = '', i = null) => {
//         if (i !== null && Number(i) >= 0) {
//             const addressElemnt = document.getElementById(`invoice.${i}.address`);
//             const vahedElemnt = document.getElementById(`invoice.${i}.vahed`);

//             addressElemnt.classList.remove('borderRedFB');
//             refInvoice[`addressError${i}`].current.innerHTML = '';

//             vahedElemnt.classList.remove('borderRedFB');
//             refInvoice[`vahedError${i}`].current.innerHTML = '';
//         } else {
//             if (!dateAndTime) {
//                 e.target.classList.remove('borderRedFB');
//                 /**
//                          * دو خط کد زیر برای زمانی است‌ که کلاس مورد
//                          *  نظر بر روی پدر تگهااعمال شده‌است
//                          * ابتدا پدری که حاوی کلاس است را پیدا می‌کند
//                          *  و سپس کلاس را از تگ پدر حذف 
//                          * می‌‌کند، این کدها معمولا برای کامپوننتی
//                          *  که سلکت سفارشی را ارائه می‌دهد کاربرد دارد
//                         */
//                 const parentWithClass = e.target.closest('.borderRedFB');
//                 parentWithClass && parentWithClass.classList.remove('borderRedFB');
//             } else {
//                 const element = document.getElementById(idDivDateAndTime);
//                 element.classList.remove('borderRedFB');
//             }
//             refErr.current && (refErr.current.innerHTML = '')
//         }
//     }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        await axios.post(
            '/api/v1/concreteSalesInvoices',
            { ...input },
            {
                headers:
                {
                    'X-CSRF-TOKEN': token,
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }
        ).then((response) => {
            const resutl = response.data.concreteSalesInvoice;
            resutl.map((invoice) => {
                setConcreteSalesInvoices(prev => [invoice, ...prev]);
            });
            setTicketNumber(ticketNumber + resutl.length);
            setTotalRecords(totalRecords + resutl.length)

            form.current.reset();
            MySwal.fire({
                icon: "success",
                title: "با موفقیت ثبت شد",
                confirmButtonText: "  متوجه شدم  ",
                timer: 3000,
                timerProgressBar: true,
                customClass: {
                    timerProgressBar: '--progressBarColorBlue',
                },
                didClose: () => resetForm(),
            });

        })
            .catch(
                error => {

                    if (error.response && error.response.status == 422) {

                        let id = Object.keys(error.response.data.errors)[0];
                        const checkCubicMeters = /^invoice\.\d+\.cubicMeters$/;
                        const checkTotalPrice = /^invoice\.\d+\.totalPrice$/;
                        const checkOwnerId = /^invoice\.\d+\.ownerId$/;

                        if (!checkCubicMeters.test(id) && !checkTotalPrice.test(id) && !checkOwnerId.test(id)) {
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
                                document.getElementById(key).classList.add('borderRedFB');

                                document.getElementById(key + 'Error').innerHTML = val;
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
    const formatNub = (input, i) => {
        let val,
            checkDthot,
            resalt,
            refCurrent;
        switch (input) {
            case 'weight':
                resalt = refInvoice[`weight${i}`].current.value.replace(/[\s,]/g, "");
                refCurrent = refInvoice[`weight${i}`].current;
                break;
            case 'unitPrice':
                resalt = refInvoice[`unitPrice${i}`].current.value.replace(/[\s,]/g, "");
                refCurrent = refInvoice[`unitPrice${i}`].current;
                break;
            case 'totalPrice':
                resalt = refInvoice[`totalPrice${i}`].current.value.replace(/[\s,]/g, "");
                refCurrent = refInvoice[`totalPrice${i}`].current;
                break;
            case 'fare':
                resalt = refInvoice[`fare${i}`].current.value.replace(/[\s,]/g, "");
                refCurrent = refInvoice[`fare${i}`].current;
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

//     /**
// * اگر دقت شود در این‌پوت‌های دریافت وزن‌ها و قیمت بتن، واحدها به صورت
// * کیلوگرم و تومان اضافه شدن که درواقع جزیی از این پوت نیستن برای اینکه
// * اگر احتمالا کاربر برروی این واحدها کلید کرد فوکوس در این‌پوت مربوطه
// * ایجاد شود از این متد استفاده می‌شود، برای تجربه کاربری بهتر
// * @param {number} id 
// */
//     const htmlFor = (id) => {
//         document.getElementById(id).focus()
//     }

    const handleCheckedMaskanMeli = (e, value, i) => {
        let checked;
        if (value == `emam${i}` && isChecked && checkedValue == 'مسکن ملی شهرک امام خمینی') {
            const copyMaskan = [...maskan];
            copyMaskan[i] = '';
            copyMaskan[maskan.length - 1] = '';
            setMaskan(copyMaskan);
            checked = false;
            const checkbox = e.target;
            checkbox.checked = !checkbox.checked;
            setCheckedValue('');
        } else if (value == `shahid${i}` && isChecked && checkedValue == 'مسکن ملی شهرک شهید رییسی') {
            const copyMaskan = [...maskan];
            copyMaskan[i] = '';
            copyMaskan[maskan.length - 1] = '';
            setMaskan(copyMaskan);
            checked = false;
            const checkbox = e.target;
            checkbox.checked = !checkbox.checked;
            setCheckedValue('');
        }
        else {
            if (value == `emam${i}`) {
                checked = refInvoice[`checkedMaskanEmam${i}`].current;
            } else if (value == `shahid${i}`) {
                checked = refInvoice[`checkedMaskanShahid${i}`].current;
            }

            if (value == `emam${i}`) {
                refInvoice[`checkedMaskanEmam${i}`].current = !checked;
                refInvoice[`checkedMaskanShahid${i}`].current = true;
            } else if (value == `shahid${i}`) {
                refInvoice[`checkedMaskanShahid${i}`].current = !checked;
                refInvoice[`checkedMaskanEmam${i}`].current = true;
            }
        }

        if (checked) {
            setCheckedMaskanMeli(value);

        } else {
            setCheckedMaskanMeli('');
        }
        setIsChecked(false)
    }

    const handleCubicMetersCalculation = (e, i = null) => {
        let { value } = e.target;
        value = value.replace(/,/g, '');
        let cubicMeters = value / 2300;
        cubicMeters = Number(cubicMeters);
        if (!Number.isInteger(cubicMeters)) {
            cubicMeters = cubicMeters.toFixed(2);
        }
        refInvoice[`cubicMeters${i}`].current.innerHTML = cubicMeters;
        setInput(perv => {
            let newInvoice;
            newInvoice = [...perv.invoice];
            newInvoice[i] = { ...newInvoice[i], cubicMeters };
            return { ...perv, invoice: newInvoice };
        });
    }

    const handleTotalPriceCalculation = (e, i, element) => {
        let cubicMeters,
            totalPrice,
            { value } = e.target;
        value = value.replace(/,/g, '');
        value = Number(value);

        if (element == 'weight') {
            cubicMeters = value / 2300;
            if (!Number.isInteger(cubicMeters)) {
                cubicMeters = cubicMeters.toFixed(2);
            }
            let unitPrice = input.invoice[i].unitPrice;
            if (Number.isInteger(Number(unitPrice))) {
                totalPrice = unitPrice * cubicMeters;
                setInput(perv => {
                    let newInvoice;
                    newInvoice = [...perv.invoice];
                    newInvoice[i] = { ...newInvoice[i], totalPrice };
                    return { ...perv, invoice: newInvoice };
                });
                refInvoice[`totalPrice${i}`].current.innerHTML = totalPrice.toLocaleString();
            }

        } else if (element == 'unitPrice') {
            let weight = input.invoice[i].weight;
            if (weight && Number(weight)) {
                cubicMeters = weight / 2300;
                if (!Number.isInteger(cubicMeters)) {
                    cubicMeters = cubicMeters.toFixed(2);
                }
                totalPrice = value * cubicMeters;
                setInput(perv => {
                    let newInvoice;
                    newInvoice = [...perv.invoice];
                    newInvoice[i] = { ...newInvoice[i], totalPrice };
                    return { ...perv, invoice: newInvoice };
                });
                refInvoice[`totalPrice${i}`].current.innerHTML = totalPrice.toLocaleString();
            }
        }
    }

    const handleAddNewInvoice = (e) => {
        e.preventDefault();
        setIndexNewInvoice(invoice.length);
        setInvoice([...invoice, sampleInvoice]);
        setIsNewInvoice(true);
        let date = handleSetDateForNewInvoice();
        let concrete_id = handleSetConcreteForNewInvoice();
        let maskanMeli = handleSetMaskanMeliForNewInvoice();
        let cementStore_id = handleSetCementStoreForNewInvoice();
        setInput(perv => {
            let newInvoice = [...perv.invoice, { date, time: '', weight: '', cubicMeters: "", concrete_id, truck_id: '', driver_id: '', cementStore_id, unitPrice, totalPrice: '', fare, maskanMeli, vahed, address, concretingPosition }];

            return { ...perv, invoice: newInvoice };
        });

        handleClearTime();
        setIsChecked(true)
    }

    const handleClearTime = () => {
        setTime({
            second: '',
            minute: '',
            hour: ''
        });
    }

    const handleSetDateForNewInvoice = () => {
        let valDate = date.year + '-' + date.month + '-' + date.day;
        return valDate;
    }

    const handleSetConcreteForNewInvoice = () => {
        let concrete_id = input.invoice[invoice.length - 1].concrete_id;
        concrete_id && (setConcreteName(concretes.filter(concrete => concrete.value == concrete_id)[0]['concreteName']));
        return concrete_id;
    }

    const handleSetCementStoreForNewInvoice = () => {
        let cementStore_id = input.invoice[invoice.length - 1].cementStore_id;
        cementStore_id && (setCementStoreName(cementStores.filter(cementStore => cementStore.value == cementStore_id)[0]['cementStoreName']));
        return cementStore_id;
    }

    const handleSetMaskanMeliForNewInvoice = () => {
        let maskanMeli = input.invoice[invoice.length - 1].maskanMeli;
        const copyMaskan = [...maskan];
        copyMaskan[maskan.length - 1] = maskanMeli;
        setMaskan(copyMaskan);
        setCheckedValue(maskanMeli);
        return maskanMeli;
    }

    const handleDelInvoice = (i) => {
        const updatedInputInvoice = input.invoice.slice(0, -1);
        const updatedInvoice = invoice.slice(0, -1);
        setInvoice(updatedInvoice);
        setInput({ ...input, invoice: updatedInputInvoice });
    }

    const handleRemoveAllError = () => {
        var elements = document.getElementsByClassName('element');
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.remove('borderRedFB');
        }

        var elements = document.getElementsByClassName('elementError');
        for (var i = 0; i < elements.length; i++) {
            elements[i].innerHTML = '';
        }

    }

    const handleRemoveErrorCustomer = () => {
        document.getElementById('customer_id').classList.remove('borderRedFB');
        document.getElementById('customer_idError').innerHTML = '';
    }

    return (
        <div ref={container}>
            <HeadPage
                loading={loading}
                title='ایجاد فاکتور خرید بتن'
                displayBtnAdd={false}
                displayBtnShow={true}
            />
            <div className={`containerMainAS_Ge ${flexDirection}`}>
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
                        {invoice.map((inv, i) => (
                             <div key={i}>
                                <div className="containerCSI_FB">
                                    <div className="sectionFB">
                                        <div className="containerInputFB">
                                            <div className="divInputFB">
                                                <label>شماره فاکتور </label>
                                                <div className="mainTicketNumberACSI_FB">
                                                    <div className="ticketNumberACSI_FB">
                                                        {ticketNumber + i}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="errorContainerFB elementError"> </div>
                                        </div>
                                        <div className="containerInputFB">
                                            <div className="divDelInvoiceACSL_FB">
                                                {
                                                    i != 0 && i == invoice.length - 1 && <button
                                                        type="button"
                                                        className="--styleLessBtn btnDelInvoiceACSL_FB"
                                                        onClick={e =>
                                                            handleDelInvoice(i)
                                                        }
                                                    >
                                                        <span className="spanDelInvoiceACSL_FB"> حذف فاکتور </span>
                                                        <i className="icofont-ui-delete iDelInvoiceACSL_FB" />
                                                    </button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sectionFB">
                                        <div className="containerInputFB">
                                            <div className="divInputFB ">
                                                <label > ساعت </label>
                                                <div className="divDateBirth">
                                                    <div className="divUpDateAcus element" id={`invoice.${i}.time`}
                                                    >
                                                        <input
                                                            type="text"
                                                            className="inputTextDateACus inputDayTDACus element"
                                                            placeholder="00"
                                                            onInput={(e) => handleSetTime(e, i, 'second')}
                                                            onFocus={(e) => clearInputError(e, refInvoice[`timeError${i}`], true, `invoice.${i}.time`)}
                                                            ref={refInvoice[`secondInput${i}`]}
                                                        />
                                                        <span>:</span>
                                                        <input
                                                            type="text"
                                                            className="inputTextDateACus inputMonthTDACus element"
                                                            placeholder="00"
                                                            onInput={(e) => handleSetTime(e, i, 'minute')}
                                                            onFocus={(e) => clearInputError(e, refInvoice[`timeError${i}`], true, `invoice.${i}.time`)}
                                                            ref={refInvoice[`minuteInput${i}`]}
                                                        />
                                                        <span>:</span>
                                                        <input
                                                            type="text"
                                                            className="inputTextDateACus inputYearTDACus element"
                                                            placeholder="00"
                                                            onInput={(e) => { handleSetTime(e, i, 'hour') }}
                                                            onFocus={(e) => clearInputError(e, refInvoice[`timeError${i}`], true, `invoice.${i}.time`)}
                                                            ref={refInvoice[`hourInput${i}`]}
                                                        />
                                                        <i className="icofont-ui-rating starFB" />
                                                    </div>
                                                    <div className="divDownDateAcus" >
                                                        <select
                                                            className="element"
                                                            onChange={(e) => handleSetTime(e, i, 'second')}
                                                            onClick={(e) => clearInputError(e, refInvoice[`timeError${i}`], true, `invoice.${i}.time`)}
                                                            ref={refInvoice[`secondSelect${i}`]}
                                                        >
                                                            <option value=""> ثانیه </option>
                                                            {optionSeconds}
                                                        </select>
                                                        <select
                                                            className="element"
                                                            onChange={(e) => handleSetTime(e, i, 'minute')}
                                                            onClick={(e) => clearInputError(e, refInvoice[`timeError${i}`], true, `invoice.${i}.time`)}
                                                            ref={refInvoice[`minuteSelect${i}`]}
                                                        >
                                                            <option value=""> دقیقه </option>
                                                            {optionMinutes}
                                                        </select>
                                                        <select
                                                            className="element"
                                                            onChange={(e) => { handleSetTime(e, i, 'hour') }}
                                                            onClick={(e) => clearInputError(e, refInvoice[`timeError${i}`], true, `invoice.${i}.time`)}
                                                            ref={refInvoice[`hourSelect${i}`]}
                                                        >
                                                            <option value=""> ساعت </option>
                                                            {optionHours}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="errorContainerFB elementError" id={`invoice.${i}.timeError`} ref={refInvoice[`timeError${i}`]}> </div>
                                        </div>
                                        <div className="containerInputFB">
                                            <div className="divInputFB ">
                                                <label htmlFor="day">تاریخ  </label>
                                                <div className="divDateBirth">
                                                    <div className="divUpDateAcus element" id={`invoice.${i}.date`}
                                                    >
                                                        <input
                                                            type="text"
                                                            className="inputTextDateACus inputDayTDACus element"
                                                            placeholder="1"
                                                            id="day"
                                                            defaultValue={date.day}
                                                            onInput={(e) => handleSetDate(e, i, 'day')}
                                                            onFocus={(e) => clearInputError(e, refInvoice[`dateError${i}`], true, `invoice.${i}.date`)}
                                                            ref={refInvoice[`dayInput${i}`]}
                                                        />
                                                        <span>/</span>
                                                        <input
                                                            type="text"
                                                            className="inputTextDateACus inputMonthTDACus element"
                                                            placeholder="1"
                                                            defaultValue={date.month}
                                                            onInput={(e) => handleSetDate(e, i, 'month')}
                                                            onFocus={(e) => clearInputError(e, refInvoice[`dateError${i}`], true, `invoice.${i}.date`)}
                                                            ref={refInvoice[`monthInput${i}`]}
                                                        />
                                                        <span>/</span>
                                                        <input
                                                            type="text"
                                                            className="inputTextDateACus inputYearTDACus element"
                                                            placeholder="1300"
                                                            defaultValue={date.year}
                                                            onInput={(e) => { handleSetDate(e, i, 'year') }}
                                                            onFocus={(e) => clearInputError(e, refInvoice[`dateError${i}`], true, `invoice.${i}.date`)}
                                                            ref={refInvoice[`yearInput${i}`]}
                                                        />
                                                        <i className="icofont-ui-rating starFB" />
                                                    </div>
                                                    <div className="divDownDateAcus" >
                                                        <select
                                                            className="element"
                                                            defaultValue={date.day}
                                                            onChange={(e) => handleSetDate(e, i, 'day')}
                                                            onClick={(e) => clearInputError(e, refInvoice[`dateError${i}`], true, `invoice.${i}.date`)}
                                                            ref={refInvoice[`daySelect${i}`]}
                                                        >
                                                            <option value="">روز</option>
                                                            {optionDays}
                                                        </select>
                                                        <select
                                                            className="element"
                                                            defaultValue={date.month}
                                                            onChange={(e) => handleSetDate(e, i, 'month')}
                                                            onClick={(e) => clearInputError(e, refInvoice[`dateError${i}`], true, `invoice.${i}.date`)}
                                                            ref={refInvoice[`monthSelect${i}`]}
                                                        >
                                                            <option value="">ماه</option>
                                                            {optionMonth}
                                                        </select>
                                                        <select
                                                            className="element"
                                                            defaultValue={date.year}
                                                            onChange={(e) => { handleSetDate(e, i, 'year') }}
                                                            onClick={(e) => clearInputError(e, refInvoice[`dateError${i}`], true, `invoice.${i}.date`)}
                                                            ref={refInvoice[`yearSelect${i}`]}
                                                        >
                                                            <option value="">سال</option>
                                                            {optionShortYears}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="errorContainerFB elementError" id={`invoice.${i}.dateError`} ref={refInvoice[`dateError${i}`]}> </div>
                                        </div>
                                    </div>
                                    <div className="sectionFB">
                                        <div className="containerInputFB">
                                            <div className="divInputFB">
                                                <label htmlFor={`invoice.${i}.concrete_id`}> عیار بتن </label>
                                                <div
                                                    id={`invoice.${i}.concrete_id`}
                                                    className="element"
                                                    onClick={e => { setInvoiceIndexForConcrete(i); clearInputError(e, refInvoice[`concrete_idError${i}`]) }}
                                                >
                                                    <SelectZabi
                                                        primaryLabel='انتخاب'
                                                        options={concretes}
                                                        saveOption={setConcreteId}
                                                        ref={refInvoice[`concrete_id${i}`]}
                                                    />
                                                </div>
                                                <i className="icofont-ui-rating starFB" />
                                            </div>
                                            <div className="errorContainerFB elementError" id={`invoice.${i}.concrete_idError`} ref={refInvoice[`concrete_idError${i}`]}> </div>
                                        </div>
                                        <div className="containerInputFB">
                                            <div className="divInputFB">
                                                <label htmlFor={`invoice.${i}.unitPrice`}> قیمت واحد بتن (مترمکعب) </label>
                                                <input
                                                    type="text"
                                                    id={`invoice.${i}.unitPrice`}
                                                    className="inputTextUnitFB ltrFB element"
                                                    defaultValue={unitPrice}
                                                    ref={refInvoice[`unitPrice${i}`]}
                                                    onInput={e => {
                                                        handleSaveValInput(e, 'unitPrice', i);
                                                        formatNub('unitPrice', i);
                                                        handleTotalPriceCalculation(e, i, 'unitPrice');
                                                    }
                                                    }
                                                    onFocus={e => clearInputError(e, refInvoice[`unitPriceError${i}`])}
                                                />
                                                <span
                                                    className="unitFB"
                                                    onClick={() => htmlFor(`invoice.${i}.unitPrice`)}
                                                >
                                                    تومان
                                                </span>
                                                <i className="icofont-ui-rating starFB" />
                                            </div>
                                            <div
                                                className="errorContainerFB elementError"
                                                id={`invoice.${i}.unitPriceError`}
                                                ref={refInvoice[`unitPriceError${i}`]}
                                            >
                                            </div>
                                        </div>
                                        <div className="containerInputFB">
                                            <div className="divInputFB">
                                                <label htmlFor={`invoice.${i}.weight`}> وزن خالص بار </label>
                                                <input
                                                    type="text"
                                                    id={`invoice.${i}.weight`}
                                                    className="inputTextUnitFB ltrFB element"
                                                    defaultValue={input.invoice[i].weight}
                                                    ref={refInvoice[`weight${i}`]}
                                                    onInput={e => {
                                                        handleSaveValInput(e, 'weight', i);
                                                        formatNub('weight', i);
                                                        handleCubicMetersCalculation(e, i);
                                                        handleTotalPriceCalculation(e, i, 'weight');
                                                    }
                                                    }
                                                    onFocus={e => clearInputError(e, refInvoice[`weightError${i}`])}
                                                />
                                                <span
                                                    className="unitFB"
                                                    onClick={() => htmlFor(`invoice.${i}.weight`)}
                                                >
                                                    کیلو گرم
                                                </span>
                                                <i className="icofont-ui-rating starFB" />
                                            </div>
                                            <div
                                                className="errorContainerFB elementError"
                                                id={`invoice.${i}.weightError`}
                                                ref={refInvoice[`weightError${i}`]}
                                            >
                                            </div>
                                        </div>
                                        <div className="containerInputFB">
                                            <div className="divInputFB">
                                                <label> حجم بار </label>
                                                <div className="mainCubicMetersACSL_FB">
                                                    <div className="cubicMetersACSL_FB"
                                                        ref={refInvoice[`cubicMeters${i}`]}>0</div>
                                                    <span className="spanCubicMetersACSL_FB">
                                                        متر مکعب
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="containerInputFB">
                                            <div className="divInputFB">
                                                <label htmlFor={`invoice.${i}.cementStore_id`}> سیلوی سیمان </label>
                                                <div
                                                    id={`invoice.${i}.cementStore_id`}
                                                    className="element"
                                                    onClick={e => { clearInputError(e, refInvoice[`cementStore_idError${i}`]); setInvoiceIndexForCementStore(i) }}
                                                >
                                                    <SelectZabi
                                                        primaryLabel='انتخاب'
                                                        options={cementStores}
                                                        saveOption={setCementStoreId}
                                                        ref={refInvoice[`cementStore_id${i}`]}
                                                    />
                                                </div>
                                                <i className="icofont-ui-rating starFB" />
                                            </div>

                                            <div className="errorContainerFB elementError" id={`invoice.${i}.cementStore_idError`} ref={refInvoice[`cementStore_idError${i}`]} > </div>
                                        </div>
                                        <div className="containerInputFB">
                                            <div className="divInputFB">
                                                <label> قیمت کل </label>
                                                <div className="mainTotalPriceACSL_FB">
                                                    <div className="totalPriceACSL_FB"
                                                        ref={refInvoice[`totalPrice${i}`]}
                                                    >0</div>
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
                                                <label htmlFor={`invoice.${i}.truck_id`}> میکسر </label>
                                                <div
                                                    id={`invoice.${i}.truck_id`}
                                                    className="element"
                                                    onClick={e => { clearInputError(e, refInvoice[`truck_idError${i}`]); setInvoiceIndexForMixer(i) }}
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
                                                        ref={refInvoice[`truck_id${i}`]}
                                                    />
                                                </div>
                                                <i className="icofont-ui-rating starFB" />
                                            </div>
                                            <div className="errorContainerFB elementError" id={`invoice.${i}.truck_idError`} ref={refInvoice[`truck_idError${i}`]} > </div>
                                        </div>
                                        <div className="containerInputFB">
                                            <div className="divInputFB">
                                                <label htmlFor={`invoice.${i}.driver_id`}> راننده </label>
                                                <div
                                                    id={`invoice.${i}.driver_id`}
                                                    className="element"
                                                    onClick={e => { setInvoiceIndexForDriver(i); clearInputError(e, refInvoice[`driver_idError${i}`]); }}
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
                                                        ref={refInvoice[`driver_id${i}`]}
                                                    />
                                                </div>
                                                <i className="icofont-ui-rating starFB" />
                                            </div>
                                            <div className="errorContainerFB elementError" id={`invoice.${i}.driver_idError`} ref={refInvoice[`driver_idError${i}`]} > </div>
                                        </div>
                                        <div className="containerInputFB">
                                            <div className="divInputFB">
                                                <label htmlFor={`invoice.${i}.fare`}> کرایه میکسر </label>
                                                <input
                                                    type="text"
                                                    id={`invoice.${i}.fare`}
                                                    className="inputTextUnitFB ltrFB element"
                                                    defaultValue={fare}
                                                    ref={refInvoice[`fare${i}`]}
                                                    onInput={e => {
                                                        handleSaveValInput(e, 'fare', i);
                                                        formatNub('fare', i);
                                                    }
                                                    }
                                                    onFocus={e => clearInputError(e, refInvoice[`fareError${i}`])}
                                                />
                                                <span
                                                    className="unitFB"
                                                    onClick={() => htmlFor(`invoice.${i}.fare`)}
                                                >
                                                    تومان
                                                </span>
                                                <i className="icofont-ui-rating starFB" />
                                            </div>
                                            <div
                                                className="errorContainerFB elementError"
                                                id={`invoice.${i}.fareError`}
                                                ref={refInvoice[`fareError${i}`]}
                                            >
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sectionFB">
                                        <div className="containerInputFB">
                                            <div className="divInputCheckboxFB">
                                                <input
                                                    type="checkbox"
                                                    id={`invoice.${i}.emam`}
                                                    className="inputCheckboxFB  element pointerFB"
                                                    value={refInvoice[`checkedMaskanEmam${i}`] && refInvoice[`checkedMaskanEmam${0}`].current ? 'مسکن ملی شهرک امام خمینی' : ''}
                                                    onChange={e => {
                                                        handleSaveValInput(e, 'maskanMeli', i,); handleCheckedMaskanMeli(e, `emam${i}`, i);
                                                        clearInputError(e, '', false, '', i);
                                                    }}
                                                    checked={checkedMaskanMeli == `emam${i}` || maskan[i] == 'مسکن ملی شهرک امام خمینی'}

                                                    ref={refInvoice[`checkBaxEmam${i}`]}
                                                />
                                                <label htmlFor={`invoice.${i}.emam`}
                                                    className={`labelCheckboxFB pointerFB  ${maskan[i] != 'مسکن ملی شهرک امام خمینی' && 'inactiveLabelCSI_FB'}`}
                                                    id={`labelEmam${i}`}>مسکن ملی (شهرک امام خمینی) </label>
                                            </div>
                                            <div className="errorContainerFB elementError" > </div>
                                        </div>
                                        <div className="containerInputFB">
                                        </div>
                                        <div className="containerInputFB">
                                            <div className="divInputCheckboxFB">
                                                <input
                                                    type="checkbox"
                                                    id={`invoice.${i}.shahid`}
                                                    className="inputCheckboxFB  element pointerFB"
                                                    value={refInvoice[`checkedMaskanShahid${i}`] && refInvoice[`checkedMaskanShahid${i}`].current ? 'مسکن ملی شهرک شهید رییسی' : ''}
                                                    onChange={e => {
                                                        handleSaveValInput(e, 'maskanMeli', i,); handleCheckedMaskanMeli(e, `shahid${i}`, i);
                                                        clearInputError(e, '', false, '', i);
                                                    }}
                                                    checked={checkedMaskanMeli == `shahid${i}` || maskan[i] == 'مسکن ملی شهرک شهید رییسی'}
                                                    ref={refInvoice[`checkBaxShahid${i}`]}
                                                />
                                                <label htmlFor={`invoice.${i}.shahid`}
                                                    className={`labelCheckboxFB pointerFB ${maskan[i] != 'مسکن ملی شهرک شهید رییسی' && 'inactiveLabelCSI_FB'}`}
                                                >مسکن ملی (شهرک شهید رئیسی) </label>
                                            </div>
                                            <div className="errorContainerFB elementError" id="nationalCodeError" ref={nationalCodeErrorRef}> </div>
                                        </div>
                                        <div className="containerInputFB">
                                            <div className="divInputFB">
                                                <label htmlFor={`invoice.${i}.vahed`} className={`${(maskan[i] != 'مسکن ملی شهرک شهید رییسی' && maskan[i] != 'مسکن ملی شهرک امام خمینی') && 'inactiveLabelCSI_FB'}`}>شماره واحد </label>
                                                <input
                                                    type="text"
                                                    id={`invoice.${i}.vahed`}
                                                    className="inputTextFB ltrFB element"
                                                    defaultValue={vahed}
                                                    onInput={e => handleSaveValInput(e, 'vahed', i)}
                                                    onFocus={(e) => clearInputError(e, refInvoice[`vahedError${i}`])}
                                                    disabled={maskan[i] != 'مسکن ملی شهرک شهید رییسی' && maskan[i] != 'مسکن ملی شهرک امام خمینی'}
                                                />
                                            </div>
                                            <div className="errorContainerFB elementError" id={`invoice.${i}.vahedError`} ref={refInvoice[`vahedError${i}`]}> </div>
                                        </div>
                                        <div className="containerInputFB">
                                            <div className="divInputFB">
                                                <label htmlFor={`invoice.${i}.address`}>آدرس</label>
                                                <textarea
                                                    id={`invoice.${i}.address`}
                                                    className="textareaAddressCSI_FB element"
                                                    defaultValue={address}
                                                    onInput={e => handleSaveValInput(e, 'address', i)}
                                                    onFocus={(e) => clearInputError(e, refInvoice[`addressError${i}`])}
                                                />
                                            </div>
                                            <div className="errorContainerFB elementError" id={`invoice.${i}.addressError`} ref={refInvoice[`addressError${i}`]}> </div>
                                        </div>
                                        <div className="containerInputFB">
                                            <div className="divInputFB">
                                                <label htmlFor={`invoice.${i}.concretingPosition`} >موقعیت بتن‌ریزی </label>
                                                <textarea
                                                    id={`invoice.${i}.concretingPosition`}
                                                    className="textareaAddressCSI_FB element"
                                                    defaultValue={concretingPosition}
                                                    onInput={e => handleSaveValInput(e, 'concretingPosition', i)}
                                                    onFocus={(e) => clearInputError(e, refInvoice[`concretingPositionError${i}`])}
                                                />
                                            </div>
                                            <div className="errorContainerFB elementError" id={`invoice.${i}.concretingPositionError`} ref={refInvoice[`concretingPositionError${i}`]}> </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className='divBtnAddInmoiceCSI_FB'>
                            <button onClick={e => { handleAddNewInvoice(e) }}>
                                <i className='icofont-plus' />
                                اضافه کردن فاکتور جدید
                            </button>
                        </div>
                        <div className='sectionFB divBtnsFB '>
                            <Button
                                variant="success"
                                className="btnSaveFB"
                                onClick={handleSubmit}
                            >
                                ثبت
                            </Button>
                            <Button
                                type="reset"
                                variant="warning"
                                className="btnDelFB"
                                onClick={resetForm}
                            >
                                پاک کن
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Add;
