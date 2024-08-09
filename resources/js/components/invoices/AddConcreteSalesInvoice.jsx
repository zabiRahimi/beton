import { createRef, useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Title from '../hooks/Title';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import "../../../css/general.css";
import "../../../css/formBeton.css";
import "../../../css/addCustomer.css";
import "../../../css/search.css";
import DataZabi from "../hooks/DateZabi";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ScaleLoader from 'react-spinners/ScaleLoader';
import useChangeForm from '../hooks/useChangeForm';
import SelectZabi from "../hooks/SelectZabi";

const AddConcreteSalesInvoice = () => {
    let navigate = useNavigate();
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

    const refCustomerSearch = useRef(null);
    const refCustomer_id = useRef(null);
    const refCustomer_idError = useRef(null);

    const refTimeEditError = useRef(null);
    const refDateEditError = useRef(null);
    const refConcreteSearch = createRef();
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
    const refTruckSearch = useRef(null);
    const refTruck_idEdit = useRef(null);
    const refTruck_idEditError = useRef(null);
    const refDriverSearch = useRef(null);
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
    const hasCalledGetConcreteBuyers = useRef(false);
    const hasCalledGetConcretes = useRef(false);
    const hasCalledGetMixers = useRef(false);
    const hasCalledGetDrivers = useRef(false);
    const hasCalledGetCementStores = useRef(false);

    const refCheckedMaskanShahidEdit = useRef(null);

    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const [second, setSecond] = useState('');

    const [refInvoice, setRefInvoice] = useState({});

    const [loading, setLoading] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [concretes, setConcretes] = useState([]);
    const [mixers, setMixers] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [cementStores, setCementStores] = useState([]);
    const [concreteSalesInvoices, setConcreteSalesInvoices] = useState(null);
    const [concreteSalesInvoicesForSearch, setConcreteSalesInvoicesForSearch] = useState(null);
    const [ticketNumber, setTicketNumber] = useState('');
    const [isRef, setIsRef] = useState(false);

    /**
     * ###
     * #### استیت‌های مربوط به سرچ و جستجوی فاکتورهای ایجاد شده
     * ###
     */

    const [customersSearch, setCustomersSearch] = useState([{
        value: '',
        html: <div className="personnelAption_addPerS">
            <span className="name_addPers">همه خریداران</span>
        </div>
    }]);
    const [concretesSearch, setConcretesSearch] = useState([{
        value: '',
        html: <div className="personnelAption_addPerS">
            <span className="name_addPers">همه بتن‌ها</span>
        </div>
    }]);
    const [mixersSearch, setMixersSearch] = useState([{
        value: '',
        html: <div className="personnelAption_addPerS">
            <span className="name_addPers">همه میکسر‌ها</span>
        </div>
    }]);
    const [driversSearch, setDriversSearch] = useState([{
        value: '',
        html: <div className="personnelAption_addPerS">
            <span className="name_addPers">همه رانندگان</span>
        </div>
    }]);
    const [fromDateSearch, setFromDateSearch] = useState('');
    const [dayFromSearch, setDayFromSearch] = useState('');
    const [monthFromSearch, setMonthFromSearch] = useState('');
    const [yearFromSearch, setYearFromSearch] = useState('');
    const [untilDateSearch, setUntilDateSearch] = useState('');
    const [dayUntilSearch, setDayUntilSearch] = useState('');
    const [monthUntilSearch, setMonthUntilSearch] = useState('');
    const [yearUntilSearch, setYearUntilSearch] = useState('');
    const [customerSearchId, setCustomerSearchId] = useState('');
    const [concreteSearchId, setConcreteSearchId] = useState('');
    const [truckSearchId, setTruckSearchId] = useState('');
    const [driverSearchId, setDriverSearchId] = useState('');

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

    const [inputEdit, setInputEdit] = useState({
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

    /**
     * id to edit the model
    */
    const [id, setId] = useState(null);
    const sampleInvoice = 'invoice';
    const [invoice, setInvoice] = useState([sampleInvoice]);

    const [maskan, setMaskan] = useState([...invoice.map(item => ''), '']);

    useEffect(() => {
        if (isRef) {
            setMaskan((prev) => [...prev, '']);
        }
    }, [invoice]);

    useEffect(() => {
        // این شرط اطمینان می‌دهد که متد فقط یک بار اجرا شود
        if (!hasCalledGetConcreteSalesInvoices.current) {
            getConcreteSalesInvoices();
            hasCalledGetConcreteSalesInvoices.current = true;
        }
    }, []);

    useEffect(() => {
        // این شرط اطمینان می‌دهد که متد فقط یک بار اجرا شود
        if (!hasCalledGetConcreteBuyers.current) {
            getCSIConcreteBuyers();
            hasCalledGetConcreteBuyers.current = true;
        }
    }, []);

    useEffect(() => {
        if (!hasCalledGetConcretes.current) {
            getCSIConcretes();
            hasCalledGetConcretes.current = true;
        }
    }, []);

    useEffect(() => {
        if (!hasCalledGetMixers.current) {
            getCSIMixers();
            hasCalledGetMixers.current = true;
        }
    }, []);

    useEffect(() => {
        if (!hasCalledGetDrivers.current) {
            getCSIDrivers();
            hasCalledGetDrivers.current = true;
        }
    }, []);

    useEffect(() => {
        if (!hasCalledGetCementStores.current) {
            getCSICementStores();
            hasCalledGetCementStores.current = true;
        }
    }, []);

    /**
    * برای تخصیص رف به هر لیست نوع مشتری که هنگام نمایش مشتریان حاوی 
    * نوع مشتری هر رکورد است
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

    /**
     * دریافت و ذخیره پهنای کامپوننت برای نمایش بهتر لودر
     */
    const [widthComponent, setWidthComponent] = useState(0);
    useEffect(() => {
        let widths = container.current.offsetWidth;
        setWidthComponent(widths)
    }, []);

    useEffect(() => {
        if (customerId) {
            !editMode ? setInput(prev => ({ ...prev, customer_id: customerId })) : setInputEdit(prev => ({ ...prev, customer_id: customerId }));
        }
    }, [customerId]);

    useEffect(() => {
        if (concreteId) {
            if (!editMode) {
                setInput(prevInput => {
                    let invoices = [...prevInput.invoice];
                    invoices[invoiceIndexForConcrete] = { ...invoices[invoiceIndexForConcrete], concrete_id: concreteId };
                    return { ...prevInput, invoice: invoices };
                });
            } else {
                setInputEdit(prev => ({ ...prev, concrete_id: concreteId }));
            }
        }
    }, [concreteId, invoiceIndexForConcrete]);

    useEffect(() => {
        if (truckId) {
            if (!editMode) {
                setInput(prevInput => {
                    let invoices = [...prevInput.invoice];
                    invoices[invoiceIndexForMixer] = { ...invoices[invoiceIndexForMixer], truck_id: truckId, ownerId };
                    return { ...prevInput, invoice: invoices };
                });

            } else {
                setInputEdit(prev => ({ ...prev, truck_id: truckId, ownerId }));

            }
        }
    }, [truckId, invoiceIndexForMixer]);

    useEffect(() => {
        if (driverId) {
            if (!editMode) {
                setInput(prevInput => {
                    let invoices = [...prevInput.invoice];
                    invoices[invoiceIndexForDriver] = { ...invoices[invoiceIndexForDriver], driver_id: driverId };
                    return { ...prevInput, invoice: invoices };
                });

            } else {
                setInputEdit(prev => ({ ...prev, driver_id: driverId }));

            }

        }
        // driverId && setInput(prevInput => {
        //     let invoices = [...prevInput.invoice];
        //     invoices[invoiceIndexForDriver] = { ...invoices[invoiceIndexForDriver], driver_id: driverId };
        //     return { ...prevInput, invoice: invoices };
        // });
    }, [driverId, invoiceIndexForDriver]);

    useEffect(() => {
        if (cementStoreId) {
            if (!editMode) {
                setInput(prevInput => {
                    let invoices = [...prevInput.invoice];
                    invoices[invoiceIndexForCementStore] = { ...invoices[invoiceIndexForCementStore], cementStore_id: cementStoreId };
                    return { ...prevInput, invoice: invoices };
                });
            } else {
                setInputEdit(prev => ({ ...prev, cementStore_id: cementStoreId }));
            }
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

    async function getConcreteSalesInvoices() {
        await axios.get("/api/v1/getConcreteSalesInvoices").then((response) => {
            setConcreteSalesInvoices(response.data.concreteSalesInvoices);
            setConcreteSalesInvoicesForSearch(response.data.concreteSalesInvoices);
            setTicketNumber(response.data.concreteSalesInvoices.length + 1);
        });
    }

    async function getCSIConcreteBuyers() {
        await axios.get("/api/v1/getCSIConcreteBuyers").then((response) => {
            let datas = response.data.concreteBuyers;
            if (datas.length == 0) {
                MySwal.fire({
                    icon: "warning",
                    title: "هشدار",
                    text: `هنوز هیچ مشتری‌ای به عنوان پرسنل ثبت نشده است. لازم است ابتدا خریداران بتن را به عنوان مشتری ثبت کنید.`,
                    confirmButtonText: "  ثبت مشتری   ",
                    showCancelButton: true,
                    cancelButtonText: "کنسل",
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    preConfirm: () => {

                        navigate("/addCustomer");
                    }
                });
            } else {
                datas.map((data, i) => {
                    setCustomers(perv => ([...perv, {
                        value: data.id,
                        html: <div className="personnelAption_addPerS">
                            <span className="name_addPers">{data.name}
                                {' '}
                                {data.lastName}</span>

                            <span className="fther_addPers">
                                {data.father || ''}
                            </span>

                        </div>
                    }]));

                    setCustomersSearch(perv => ([...perv, {
                        value: data.id,
                        html: <div className="personnelAption_addPerS">
                            <span className="name_addPers">{data.name}
                                {' '}
                                {data.lastName}</span>

                            <span className="fther_addPers">
                                {data.father || ''}
                            </span>

                        </div>
                    }]));
                })
            }
        });
    }

    async function getCSIConcretes() {
        await axios.get("/api/v1/getCSIConcretes").then((response) => {
            let datas = response.data.concretes;
            if (datas.length == 0) {
                MySwal.fire({
                    icon: "warning",
                    title: "هشدار",
                    text: `هنوز هیچ عیار بتنی ثبت نشده است. لازم است ابتدا عیار بتن را ثبت کنید.`,
                    confirmButtonText: "  ثبت بتن   ",
                    showCancelButton: true,
                    cancelButtonText: "کنسل",
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    preConfirm: () => {
                        navigate("/addConcrete");
                    }
                });
            } else {
                datas.map((data, i) => {
                    setConcretes(perv => ([...perv, {
                        value: data.id,
                        concreteName: data.concreteName,
                        html: <div className="concreteAptionSelectFB">
                            <span className="concreteLabelSelectFB">بتن
                            </span>

                            <span className="concreteSelectFB">
                                {data.concreteName}
                            </span>

                        </div>
                    }]));

                    setConcretesSearch(perv => ([...perv, {
                        value: data.id,
                        concreteName: data.concreteName,
                        html: <div className="concreteAptionSelectFB">
                            <span className="concreteLabelSelectFB">بتن
                            </span>

                            <span className="concreteSelectFB">
                                {data.concreteName}
                            </span>

                        </div>
                    }]));
                })
            }
        });
    }

    async function getCSICementStores() {
        await axios.get("/api/v1/getCSICementStores").then((response) => {
            let datas = response.data.cementStores;
            if (datas.length == 0) {
                MySwal.fire({
                    icon: "warning",
                    title: "هشدار",
                    text: `هنوز هیچ سیلوی سیمانی ثبت نشده است. لازم است ابتدا سیلو را ثبت کنید.`,
                    confirmButtonText: "  ثبت سیلو   ",
                    showCancelButton: true,
                    cancelButtonText: "کنسل",
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    preConfirm: () => {
                        navigate("/addCementStore");
                    }
                });
            } else {
                datas.map((data, i) => {
                    setCementStores(perv => ([...perv, {
                        value: data.id,
                        cementStoreName: data.silo,
                        html: <div className="mixerAptionSelectFB">
                            <span className="mixerOwnerSelectFB">
                                {data.silo}
                            </span>
                        </div>
                    }]));
                })
            }
        });
    }

    async function getCSIDrivers() {
        await axios.get("/api/v1/getCSIDrivers").then((response) => {
            let datas = response.data.drivers;
            if (datas.length == 0) {
                MySwal.fire({
                    icon: "warning",
                    title: "هشدار",
                    text: `هنوز هیچ راننده‌ای ثبت نشده است. لازم است ابتدا راننده را ثبت کنید.`,
                    confirmButtonText: "  ثبت راننده   ",
                    showCancelButton: true,
                    cancelButtonText: "کنسل",
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    preConfirm: () => {
                        navigate("/addDriver");
                    }
                });
            } else {
                datas.map((data, i) => {
                    setDrivers(perv => ([...perv, {
                        value: data.id,
                        html: <div className="personnelAption_addPerS">
                            <span className="name_addPers">{data.name}
                                {' '}
                                {data.lastName}</span>

                            <span className="fther_addPers">
                                {data.father || ''}
                            </span>

                        </div>
                    }]));
                    setDriversSearch(perv => ([...perv, {
                        value: data.id,
                        html: <div className="containerOption_Se containerOptionDriver_Se">
                            <span className="nameDriver_Se">{data.name}
                                {' '}
                                {data.lastName}</span>

                            <span className="ftherDriver_Se">
                                {data.father || ''}
                            </span>

                        </div>
                    }]));
                })
            }
        });
    }

    async function getCSIMixers() {
        await axios.get("/api/v1/getCSIMixers").then((response) => {
            let datas = response.data.mixers;
            if (datas.length == 0) {
                MySwal.fire({
                    icon: "warning",
                    title: "هشدار",
                    text: `هنوز هیچ کامیونی به عنوان میکسر ثبت نشده است. لازم است ابتدا کامیونی به عنوان میکسر ثبت کنید.`,
                    confirmButtonText: "  ثبت میکسر   ",
                    showCancelButton: true,
                    cancelButtonText: "کنسل",
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    preConfirm: () => {
                        navigate("/addTruck");
                    }
                });
            } else {
                datas.map((data, i) => {
                    let arr = data.numberplate.split('-');
                    setMixers(perv => ([...perv, {
                        value: data.id,
                        value2: data.customer.id,
                        html: <div className="mixerAptionSelectFB">
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
                    }]));

                    setMixersSearch(perv => ([...perv, {
                        value: data.id,
                        value2: data.customer.id,
                        html: <div className="containerOption_Se containerOptionMixer_Se">
                            <span className="mixerNamberpalteSelectFB">
                                <div className="numberplateDiv">
                                    <span className="numberplateDivS1">{arr[0]}</span>
                                    <span className="numberplateDivS2">{arr[3] == 'ا' ? 'الف' : arr[3]}</span>
                                    <span className="numberplateDivS3">{arr[1]}</span>
                                    <span className="numberplateDivS4">{arr[2]}</span>
                                </div>
                            </span>

                            <span className="divOwnerMixer_Se">
                                {data.customer.name}
                                {' '}
                                {data.customer.lastName}
                            </span>

                        </div>
                    }]));
                })
            }
        });
    }

    /**
     * رکوردهای مشتریان ایجاد شده را با فرمت‌دهی مناسب جهت نمایش بر می گرداند
     * @returns 
     */
    const returnCreatedCustomerRecords = () => {
        let length = concreteSalesInvoices.length;
        if (length == 0) {
            return <div className="notResultSearch_Se"> هیچ نتیجه‌ای یافت نشد!! </div>
        }
        const reversedCustomers = concreteSalesInvoices.slice().reverse(); // کپی آرایه اولیه و معکوس کردن آن
        let value = reversedCustomers.map((concreteSalesInvoice, i) => {
            let numberplate = concreteSalesInvoice['truck'].numberplate.split('-');
            let date = concreteSalesInvoice['date'].split('-');
            return <div className="rowListShowACSI_Ge" key={i}>
                <span className="rowNumShowACSI_Ge">{i + 1}</span>{/* ردیف */}
                <span className="ticketNumberACSI_Ge">{concreteSalesInvoice['id']}</span>{/* قبض */}
                <span className="customerACSI_Ge">{concreteSalesInvoice['customer'].name}{'  '}{concreteSalesInvoice['customer'].lastName}</span>{/* خریدار */}
                <span className="concreteACSI_Ge">{concreteSalesInvoice['concrete'].concreteName}</span>{/* بتن */}
                <span className="truckACSI_Ge"><div className="numberplateDiv">
                    <span className="numberplateDivS1">{numberplate[0]}</span>
                    <span className="numberplateDivS2">{numberplate[3] == 'ا' ? 'الف' : numberplate[3]}</span>
                    <span className="numberplateDivS3">{numberplate[1]}</span>
                    <span className="numberplateDivS4">{numberplate[2]}</span>
                </div></span>{/* میکسر */}
                <span className="driverACSI_Ge"> {concreteSalesInvoice['driver'].name}{'  '}{concreteSalesInvoice['driver'].lastName}</span>{/* راننده */}
                <span className="dateACSI_Ge">{`${date[0]}/${date[1]}/${date[2]}`}</span>{/* تاریخ */}
                <span className="timeACSI_Ge">{concreteSalesInvoice['time']}</span>{/* ساعت */}

                <div className="divEditACSI_Ge">
                    <button className="--styleLessBtn btnEditACSI_Ge" title=" ویرایش "
                        onClick={() => { showEditForm(concreteSalesInvoice.id); handleRemoveErrorCustomer() }}
                    >
                        <i className="icofont-pencil iEditGe" />
                    </button>
                </div>

                <div className="divDelACSI_Ge">

                    <button className="--styleLessBtn btnDelACSI_Ge" title=" حذف ">
                        <i className="icofont-trash iDelGe" />
                    </button>
                </div>

            </div>

        })

        return value;
    }

    const changeDay = (e, i) => {
        let { value } = e.target;
        value = value.toString();
        (value != 0 && value.length == 1) && (value = '0' + value);
        (value.length >= 3 && value[0] === '0') && (value = value.slice(1));

        if (value == '' || (Number(value) >= 0 && Number(value) <= 31)) {
            setDay(value);
            if (!editMode) {
                refInvoice[`dayInput${i}`].current.value = value;
                refInvoice[`daySelect${i}`].current.value = value;
            }

        } else {
            e.target.value = day;
        }
        let date = year + '-' + month + '-' + value;
        if (!editMode) {
            setInput(prevInput => {
                let newInvoice;
                newInvoice = [...prevInput.invoice];
                newInvoice[i] = { ...newInvoice[i], date };
                return { ...prevInput, invoice: newInvoice };
            });
        } else {
            setInputEdit(prevInput => ({ ...prevInput, date }));
        }
    }

    const changeMonth = (e, i) => {
        let { value } = e.target;
        value = value.toString();
        (value != 0 && value.length == 1) && (value = '0' + value);
        (value.length >= 3 && value[0] === '0') && (value = value.slice(1));

        if (value == '' || (Number(value) >= 0 && Number(value) <= 12)) {
            setMonth(value);
            if (!editMode) {
                refInvoice[`monthInput${i}`].current.value = value;
                refInvoice[`monthSelect${i}`].current.value = value;
            }
        }
        else {
            e.target.value = month;
        }
        let date = year + '-' + value + '-' + day;
        if (!editMode) {
            setInput(prevInput => {
                let newInvoice;
                newInvoice = [...prevInput.invoice];
                newInvoice[i] = { ...newInvoice[i], date };
                return { ...prevInput, invoice: newInvoice };
            });
        } else {
            setInputEdit(prevInput => ({ ...prevInput, date }));
        }
    }

    const changeYear = (e, i) => {
        let { value } = e.target;
        if (value == '' || (Number(value) >= 1 && Number(value) <= 1500)) {
            setYear(value);
            if (!editMode) {
                refInvoice[`yearInput${i}`].current.value = value;
                refInvoice[`yearSelect${i}`].current.value = value;
            }

        } else {
            e.target.value = year;
        }

        let date = value + '-' + month + '-' + day;
        if (!editMode) {
            setInput(prevInput => {
                let newInvoice;
                newInvoice = [...prevInput.invoice];
                newInvoice[i] = { ...newInvoice[i], date };
                return { ...prevInput, invoice: newInvoice };
            });
        } else {
            setInputEdit(prevInput => ({ ...prevInput, date }));
        }
    }

    const changeDayFromSearch = (e) => {
        let { value } = e.target;
        value = value.toString();
        (value != 0 && value.length == 1) && (value = '0' + value);
        (value.length >= 3 && value[0] === '0') && (value = value.slice(1));

        if (value == '' || (Number(value) >= 0 && Number(value) <= 31)) {
            setDayFromSearch(value);
        }
        let date = yearFromSearch + '-' + monthFromSearch + '-' + value;
        setFromDateSearch(date);
    }

    const changeMonthFromSearch = (e) => {
        let { value } = e.target;
        value = value.toString();
        (value != 0 && value.length == 1) && (value = '0' + value);
        (value.length >= 3 && value[0] === '0') && (value = value.slice(1));

        if (value == '' || (Number(value) >= 0 && Number(value) <= 12)) {
            setMonthFromSearch(value);
        }
        let date = yearFromSearch + '-' + value + '-' + dayFromSearch;
        setFromDateSearch(date);
    }

    const changeYearFromSearch = (e) => {
        let { value } = e.target;
        if (value == '' || (Number(value) >= 1 && Number(value) <= 1500)) {
            setYearFromSearch(value);
        }
        let date = value + '-' + monthFromSearch + '-' + dayFromSearch;
        setFromDateSearch(date);
    }

    const changeDayUntilSearch = (e) => {
        let { value } = e.target;
        value = value.toString();
        (value != 0 && value.length == 1) && (value = '0' + value);
        (value.length >= 3 && value[0] === '0') && (value = value.slice(1));

        if (value == '' || (Number(value) >= 0 && Number(value) <= 31)) {
            setDayUntilSearch(value);
        }
        let date = yearUntilSearch + '-' + monthUntilSearch + '-' + value;
        setUntilDateSearch(date);
    }

    const changeMonthUntilSearch = (e) => {
        let { value } = e.target;
        value = value.toString();
        (value != 0 && value.length == 1) && (value = '0' + value);
        (value.length >= 3 && value[0] === '0') && (value = value.slice(1));

        if (value == '' || (Number(value) >= 0 && Number(value) <= 12)) {
            setMonthUntilSearch(value);
        }
        let date = yearUntilSearch + '-' + value + '-' + dayUntilSearch;
        setUntilDateSearch(date);
    }

    const changeYearUntilSearch = (e) => {
        let { value } = e.target;
        if (value == '' || (Number(value) >= 1 && Number(value) <= 1500)) {
            setYearUntilSearch(value);
        }

        let date = value + '-' + monthUntilSearch + '-' + dayUntilSearch;
        setUntilDateSearch(date);
    }

    const changeHour = (e, i) => {
        let { value } = e.target;
        value = value.toString();
        (value != 0 && value.length == 1) && (value = '0' + value);
        (value.length >= 3 && value[0] === '0') && (value = value.slice(1));

        if (value == '' || (Number(value) >= 0 && Number(value) <= 24)) {
            setHour(value);
            if (!editMode) {
                refInvoice[`hourSelect${i}`].current.value = value;
                refInvoice[`hourInput${i}`].current.value = value;
            }

        } else {
            e.target.value = hour;
        }

        let time = value + ':' + minute + ':' + second;
        if (!editMode) {
            setInput(prevInput => {
                let newInvoice;
                newInvoice = [...prevInput.invoice];
                newInvoice[i] = { ...newInvoice[i], time };
                return { ...prevInput, invoice: newInvoice };
            });
        } else {
            setInputEdit(prevInput => ({ ...prevInput, time }));
        }

    }

    const changeMinute = (e, i) => {
        let { value } = e.target;
        value = value.toString();
        (value != 0 && value.length == 1) && (value = '0' + value);
        (value.length >= 3 && value[0] === '0') && (value = value.slice(1));

        if (value == '' || (Number(value) >= 0 && Number(value) <= 60)) {
            setMinute(value);
            if (!editMode) {
                refInvoice[`minuteSelect${i}`].current.value = value;
                refInvoice[`minuteInput${i}`].current.value = value;
            }

        } else {
            e.target.value = minute;
        }

        let time = hour + ':' + value + ':' + second;
        if (!editMode) {
            setInput(prevInput => {
                let newInvoice;
                newInvoice = [...prevInput.invoice];
                newInvoice[i] = { ...newInvoice[i], time };
                return { ...prevInput, invoice: newInvoice };
            });
        } else {
            setInputEdit(prevInput => ({ ...prevInput, time }));
        }
    }

    const changeSecond = (e, i) => {
        let { value } = e.target;
        value = value.toString();
        (value != 0 && value.length == 1) && (value = '0' + value);
        (value.length >= 3 && value[0] === '0') && (value = value.slice(1));

        if (value == '' || (Number(value) >= 0 && Number(value) <= 60)) {
            setSecond(value);
            if (!editMode) {
                refInvoice[`secondSelect${i}`].current.value = value;
                refInvoice[`secondInput${i}`].current.value = value;
            }

        } else {

            e.target.value = second;
        }
        let time = hour + ':' + minute + ':' + value;
        if (!editMode) {
            setInput(prevInput => {
                let newInvoice;
                newInvoice = [...prevInput.invoice];
                newInvoice[i] = { ...newInvoice[i], time };
                return { ...prevInput, invoice: newInvoice };
            });
        } else {
            setInputEdit(prevInput => ({ ...prevInput, time }));
        }
    }

    /**
     * هنگامی که کاربر مبادرت به دیدن و یا ویرایش کردن یک رکورد میکند
     * این متد اطلاعات هر فیلد را برای نمایش تنظیم می کند
     * @param {آدی رکورد} id0 
     */
    const pasteDataForEditing = (id0) => {
        let concreteSalesInvoice = concreteSalesInvoices.find(concreteSalesInvoice => concreteSalesInvoice.id === id0);
        concreteSalesInvoice && setId(id0);
        let numberplate = concreteSalesInvoice.truck.numberplate.split("-");
        const { id, created_at, updated_at, ...rest } = concreteSalesInvoice;//نادیده گرفتن کلید های مشخص شده

        // کپی از شی برای انجام تغییرات
        let datas = { ...rest };
        setInputEdit({
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
        refConcrete_idEdit.current && refConcrete_idEdit.current.updateData(<div className="concreteAptionSelectFB">
            <span className="concreteLabelSelectFB">بتن
            </span>
            <span className="concreteSelectFB">
                {datas.concrete.concreteName}
            </span>
        </div>);

        refCementStore_idEdit.current && refCementStore_idEdit.current.updateData(datas.cement_store.silo);
        refTruck_idEdit.current && refTruck_idEdit.current.updateData(<div className="mixerAptionSelectFB">
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
        refDriver_idEdit.current && refDriver_idEdit.current.updateData(<div className="personnelAption_addPerS">
            <span className="name_addPers">{datas.driver.name}
                {' '}
                {datas.driver.lastName}</span>

            <span className="fther_addPers">
                {datas.driver.father || ''}
            </span>

        </div>);

        if (rest.date) {
            let parts = rest.date.split("-");
            setYear(parts[0]);
            setMonth(parts[1]);
            setDay(parts[2]);
        }

        if (rest.time) {
            let parts = rest.time.split(":");
            setHour(parts[0]);
            setMinute(parts[1]);
            setSecond(parts[2]);
        }

        if (datas.maskanMeli == 'مسکن ملی شهرک امام خمینی') {
            setCheckedMaskanMeliEdit('emam');
        }
        else if (datas.maskanMeli == 'مسکن ملی شهرک شهید رییسی') {
            setCheckedMaskanMeliEdit('shahid');

        }
        else {
            setCheckedMaskanMeliEdit('');

        }
    }

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

        setHour('');
        setMinute('');
        setSecond('');

        setDay('');
        setMonth('');
        setYear('');

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

        var elements = document.getElementsByClassName('element');
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.remove('borderRedFB');
        }

        var elements = document.getElementsByClassName('elementError');
        for (var i = 0; i < elements.length; i++) {
            elements[i].innerHTML = '';
        }

        handleRemoveAllError();

        // در برخی مواقع لازم نیست کدهای داخل شرط استفاده شود
        if (apply) {
            window.scrollTo({ top: 0 });
        }
    }

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

        setHour('');
        setMinute('');
        setSecond('');

        setDay('');
        setMonth('');
        setYear('');

        setUnitPrice('');
        setFare('');

        setCheckedValue('');
        setMaskan(['']);

        setVahed('');
        setAddress('');
        setConcretingPosition('');

        refCustomer_id.current.updateData('انتخاب');
    }

    const { showAddForm, showCreatedRecord, showEditForm, flexDirection, editMode, disabledBtnShowForm, disabledBtnShowRecords, hideCreatedRecord, containerShowGeRef, hideShowForm } = useChangeForm({ formCurrent, resetForm, pasteDataForEditing, resetForm2 });

    useEffect(() => {
        if (editMode) {
            refUnitPriceEdit && (refUnitPriceEdit.current.value = parseFloat(inputEdit.unitPrice).toLocaleString());

            refWeightEdit && (refWeightEdit.current.value = parseFloat(inputEdit.weight).toLocaleString());

            refTotalPriceEdit && (refTotalPriceEdit.current.innerHTML = parseFloat(inputEdit.totalPrice).toLocaleString());

            refFareEdit && (refFareEdit.current.value = parseFloat(inputEdit.fare).toLocaleString());
        }

    }, [editMode]);

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

        /**
         * چک می‌کند که کاربر در حال ایجاد یک فاکتور جدید است یا 
         * در حال ویرایش یک فاکتور موجود است
         */
        if (!editMode) {

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
                setInput(prevInput => {
                    let newInvoice;
                    if (Array.isArray(prevInput.invoice)) {
                        newInvoice = [...prevInput.invoice];
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

                    return { ...prevInput, invoice: newInvoice };
                });

            } else {

                setInput(prev => ({ ...prev, [input]: value }));
            }

        } else {
            setInputEdit(prev => ({ ...prev, [input]: value }));

        }

    }

    /**
     * برای پاک کردن پیام خطا و برداشتن رنگ قرمز دور کادر
     * @param {*} e 
     * @param {رف مربوط به تگ نمایش خطا} refErr 
     */
    const clearInputError = (e, refErr, dateAndTime = false, idDivDateAndTime = '', i = null) => {
        if (i !== null && Number(i) >= 0) {
            if (!editMode) {
                const addressElemnt = document.getElementById(`invoice.${i}.address`);
                const vahedElemnt = document.getElementById(`invoice.${i}.vahed`);

                addressElemnt.classList.remove('borderRedFB');
                refInvoice[`addressError${i}`].current.innerHTML = '';

                vahedElemnt.classList.remove('borderRedFB');
                refInvoice[`vahedError${i}`].current.innerHTML = '';
            } else {
                const addressElemnt = document.getElementById('addressEdit');
                const vahedElemnt = document.getElementById('vahedEdit');

                addressElemnt.classList.remove('borderRedFB');
                refAddressEditError.current.innerHTML = '';

                vahedElemnt.classList.remove('borderRedFB');
                refVahedEditError.current.innerHTML = '';
            }

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

    const handleSearch = () => {
        let start = fromDateSearch.replace(/-/g, '');
        let end = untilDateSearch.replace(/-/g, '');
        let date = ['1400-01-11', '1401-02-18', '1402-03-15', '1403-04-31', '1404-05-06', '1405-06-23', '1405-07-19', '1406-08-20', '1407-09-21',];
        let filteredInvoice = concreteSalesInvoicesForSearch.filter(invoice => {
            let date2 = invoice.date.replace(/-/g, ''); // حذف خط فاصله از تاریخ و تبدیل آن به یک رشته عددی
            return (start ? date2 >= start : true) && (end ? date2 <= end : true) && (customerSearchId ? invoice.customer_id == customerSearchId : true) && (concreteSearchId ? invoice.concrete_id == concreteSearchId : true) && (truckSearchId ? invoice.truck_id == truckSearchId : true) && (driverSearchId ? invoice.driver_id == driverSearchId : true);

        });
        if (fromDateSearch || untilDateSearch || customerSearchId || concreteSearchId || truckSearchId || driverSearchId) {
            /**
             * استفاده از دستور ست تایم‌اوت و مقدار دهی نال
             * فقط برای اینکه یک تاخیر ایجاد شود که یک جلوه بصری ایجاد کند
             */
            setConcreteSalesInvoices(null);

            setTimeout(() => {
                setConcreteSalesInvoices(filteredInvoice);
            }, 700);
        } else {
            setConcreteSalesInvoices(null);
            setTimeout(() => {
                setConcreteSalesInvoices(concreteSalesInvoicesForSearch);
            }, 400);
        }
    }

    const handleClearSearch = () => {
        setFromDateSearch('');
        setUntilDateSearch('');
        setCustomerSearchId('');
        setConcreteSearchId('');
        setTruckSearchId('');
        setDriverSearchId('');
        document.getElementById('dayFromSearch').value='';
        document.getElementById('monthFromSearch').value='';
        document.getElementById('yearFromSearch').value='';

        document.getElementById('dayUntilSearch').value='';
        document.getElementById('monthUntilSearch').value='';
        document.getElementById('yearUntilSearch').value='';
        
        refCustomerSearch.current.updateData('انتخاب');
        refConcreteSearch.current.updateData('انتخاب');
        refTruckSearch.current.updateData('انتخاب');
        refDriverSearch.current.updateData('انتخاب');

        setConcreteSalesInvoices(null);
        setTimeout(() => {
            setConcreteSalesInvoices(concreteSalesInvoicesForSearch);
        }, 400);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        await axios.post(
            '/api/v1/addConcreteSalesInvoice',
            { ...input },
            {
                headers:
                {
                    'X-CSRF-TOKEN': token,
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }
        ).then((response) => {
            response.data.concreteSalesInvoice.map((invoice) => {
                setConcreteSalesInvoices(prev => [...prev, invoice]);
            });
            setTicketNumber(ticketNumber + response.data.concreteSalesInvoice.length);

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

    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        setLoading(true)
        await axios.patch(
            `/api/v1/editConcreteSalesInvoice/${id}`,
            { ...inputEdit },
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

    const handleCheckedMaskanMeliEdit = (e, value) => {
        let maskanMeli;
        if (value == 'emam') {
            checkedMaskanMeliEdit == "emam" ? (setCheckedMaskanMeliEdit(''), maskanMeli = '') : (setCheckedMaskanMeliEdit('emam'), maskanMeli = 'مسکن ملی شهرک امام خمینی');
        } else {
            checkedMaskanMeliEdit == "shahid" ? (setCheckedMaskanMeliEdit(''), maskanMeli = '') : (setCheckedMaskanMeliEdit('shahid'), maskanMeli = 'مسکن ملی شهرک شهید رییسی');
        }

        setInputEdit(pre => ({ ...pre, maskanMeli }));
    }

    const handleCubicMetersCalculation = (e, i = null) => {
        let { value } = e.target;
        value = value.replace(/,/g, '');
        let cubicMeters = value / 2300;
        cubicMeters = Number(cubicMeters);
        if (!Number.isInteger(cubicMeters)) {
            cubicMeters = cubicMeters.toFixed(2);
        }

        if (!editMode) {
            refInvoice[`cubicMeters${i}`].current.innerHTML = cubicMeters;
            setInput(prevInput => {
                let newInvoice;
                newInvoice = [...prevInput.invoice];
                newInvoice[i] = { ...newInvoice[i], cubicMeters };
                return { ...prevInput, invoice: newInvoice };
            });
        } else {
            refCubicMetersEdit.current.innerHTML = cubicMeters;
            setInputEdit(prev => ({ ...prev, cubicMeters }));
        }
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

            if (!editMode) {
                let unitPrice = input.invoice[i].unitPrice;
                if (Number.isInteger(Number(unitPrice))) {
                    // totalPrice = (unitPrice * cubicMeters).toFixed();
                    totalPrice = unitPrice * cubicMeters;
                    setInput(prevInput => {
                        let newInvoice;
                        newInvoice = [...prevInput.invoice];
                        newInvoice[i] = { ...newInvoice[i], totalPrice };
                        return { ...prevInput, invoice: newInvoice };
                    });
                    refInvoice[`totalPrice${i}`].current.innerHTML = totalPrice.toLocaleString();
                }
            } else {
                let unitPrice = inputEdit.unitPrice;
                if (Number.isInteger(Number(unitPrice))) {
                    totalPrice = unitPrice * cubicMeters;

                    setInputEdit(prev => ({ ...prev, totalPrice }));
                    refTotalPriceEdit.current.innerHTML = totalPrice.toLocaleString();
                }
            }
        } else if (element == 'unitPrice') {
            if (!editMode) {
                let weight = input.invoice[i].weight;
                if (weight && Number(weight)) {
                    cubicMeters = weight / 2300;
                    if (!Number.isInteger(cubicMeters)) {
                        cubicMeters = cubicMeters.toFixed(2);
                    }
                    totalPrice = value * cubicMeters;
                    setInput(prevInput => {
                        let newInvoice;
                        newInvoice = [...prevInput.invoice];
                        newInvoice[i] = { ...newInvoice[i], totalPrice };
                        return { ...prevInput, invoice: newInvoice };
                    });
                    refInvoice[`totalPrice${i}`].current.innerHTML = totalPrice.toLocaleString();
                }
            } else {
                let weight = inputEdit.weight;
                if (weight && Number(weight)) {
                    cubicMeters = weight / 2300;
                    if (!Number.isInteger(cubicMeters)) {
                        cubicMeters = cubicMeters.toFixed(2);
                    }
                    totalPrice = value * cubicMeters;
                    setInputEdit(prev => ({ ...prev, totalPrice }));

                    refTotalPriceEdit.current.innerHTML = totalPrice.toLocaleString();
                }
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
        setInput(prevInput => {
            let newInvoice = [...prevInput.invoice, { date, time: '', weight: '', cubicMeters: "", concrete_id, truck_id: '', driver_id: '', cementStore_id, unitPrice, totalPrice: '', fare, maskanMeli, vahed, address, concretingPosition }];

            return { ...prevInput, invoice: newInvoice };
        });

        handleClearTime();
        setIsChecked(true)
    }

    const handleClearTime = () => {
        setHour('');
        setMinute('');
        setSecond('');
    }

    const handleSetDateForNewInvoice = () => {
        let date = year + '-' + month + '-' + day;
        return date;
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
            <ScaleLoader color="#fff" height={90} width={8} radius={16} loading={loading} cssOverride={{
                backgroundColor: '#6d6b6b',
                position: 'fixed',
                top: 0,
                width: widthComponent + 'px',
                height: '100vh',
                zIndex: 100,
                opacity: 0.2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }} />
            <Title title='ایجاد فاکتور فروش بتن' />
            <div className="headPageGe">
                <button
                    className={`--styleLessBtn btnAddGe ${disabledBtnShowForm ? 'disabledBtnGe' : 'enabledBtnGe'}`}
                    ref={btnAddGeRef} onClick={() => showAddForm(true)}
                    disabled={disabledBtnShowForm}
                >
                    ایجاد فاکتور
                </button>

                <button
                    className={`--styleLessBtn btnGetGe ${disabledBtnShowRecords ? 'disabledBtnGe' : 'enabledBtnGe'} `}
                    ref={btnGetGeRef}
                    onClick={() => { showCreatedRecord(true); handleRemoveAllError() }}
                    disabled={disabledBtnShowRecords}
                >
                    مشاهده فاکتورها
                </button>
            </div>

            <div className={`containerMainAS_Ge ${flexDirection}`}>
                <div className="continerAddGe containerAddCustomer">
                    <form action="" className={`formBeton ${hideShowForm ? 'hideGe' : ''}`} ref={form}>
                        <h5 className={`titleFormFB ${editMode ? '' : 'hideGe'}`}>ویرایش مشتری</h5>
                        <div className="sectionFB">
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="customer_id"> خریدار </label>
                                    <div
                                        id="customer_id"
                                        className="element"
                                        onClick={e => clearInputError(e, refCustomer_idError)}
                                    >
                                        <SelectZabi
                                            primaryLabel='انتخاب'
                                            options={customers}
                                            saveOption={setCustomerId}
                                            ref={refCustomer_id}
                                        />
                                    </div>
                                    <i className="icofont-ui-rating starFB" />
                                </div>
                                <div className="errorContainerFB elementError" id="customer_idError" ref={refCustomer_idError}> </div>
                            </div>
                        </div>

                        {!editMode && (invoice.map((inv, i) => {
                            return <div key={i}>
                                <div className="containerCSI_FB">
                                    <div className="sectionFB">
                                        <div className="containerInputFB">
                                            <div className="divInputFB">
                                                <label>شماره قبض </label>
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
                                                <label htmlFor="day"> ساعت </label>
                                                <div className="divDateBirth">
                                                    <div className="divUpDateAcus element" id={`invoice.${i}.time`}
                                                    >
                                                        <input
                                                            type="text"
                                                            className="inputTextDateACus inputDayTDACus element"
                                                            placeholder="00"
                                                            id="hour"
                                                            onInput={(e) => changeSecond(e, i)}
                                                            onFocus={(e) => clearInputError(e, refInvoice[`timeError${i}`], true, `invoice.${i}.time`)}
                                                            ref={refInvoice[`secondInput${i}`]}
                                                        />
                                                        <span>:</span>
                                                        <input
                                                            type="text"
                                                            className="inputTextDateACus inputMonthTDACus element"
                                                            placeholder="00"
                                                            onInput={(e) => changeMinute(e, i)}
                                                            onFocus={(e) => clearInputError(e, refInvoice[`timeError${i}`], true, `invoice.${i}.time`)}
                                                            ref={refInvoice[`minuteInput${i}`]}
                                                        />
                                                        <span>:</span>
                                                        <input
                                                            type="text"
                                                            className="inputTextDateACus inputYearTDACus element"
                                                            placeholder="00"
                                                            onInput={(e) => { changeHour(e, i) }}
                                                            onFocus={(e) => clearInputError(e, refInvoice[`timeError${i}`], true, `invoice.${i}.time`)}
                                                            ref={refInvoice[`hourInput${i}`]}
                                                        />
                                                        <i className="icofont-ui-rating starFB" />
                                                    </div>

                                                    <div className="divDownDateAcus" >
                                                        <select
                                                            className="element"
                                                            onChange={(e) => changeSecond(e, i)}
                                                            onClick={(e) => clearInputError(e, refInvoice[`timeError${i}`], true, `invoice.${i}.time`)}
                                                            ref={refInvoice[`secondSelect${i}`]}
                                                        >
                                                            <option value=""> ثانیه </option>
                                                            {optionSeconds}
                                                        </select>
                                                        <select
                                                            className="element"
                                                            onChange={(e) => changeMinute(e, i)}
                                                            onClick={(e) => clearInputError(e, refInvoice[`timeError${i}`], true, `invoice.${i}.time`)}
                                                            ref={refInvoice[`minuteSelect${i}`]}
                                                        >
                                                            <option value=""> دقیقه </option>
                                                            {optionMinutes}
                                                        </select>
                                                        <select
                                                            className="element"
                                                            onChange={(e) => { changeHour(e, i) }}
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
                                                            defaultValue={day}
                                                            onInput={(e) => changeDay(e, i)}
                                                            onFocus={(e) => clearInputError(e, refInvoice[`dateError${i}`], true, `invoice.${i}.date`)}
                                                            ref={refInvoice[`dayInput${i}`]}
                                                        />
                                                        <span>/</span>
                                                        <input
                                                            type="text"
                                                            className="inputTextDateACus inputMonthTDACus element"
                                                            placeholder="1"
                                                            defaultValue={month}
                                                            onInput={(e) => changeMonth(e, i)}
                                                            onFocus={(e) => clearInputError(e, refInvoice[`dateError${i}`], true, `invoice.${i}.date`)}
                                                            ref={refInvoice[`monthInput${i}`]}
                                                        />
                                                        <span>/</span>
                                                        <input
                                                            type="text"
                                                            className="inputTextDateACus inputYearTDACus element"
                                                            placeholder="1300"
                                                            defaultValue={year}
                                                            onInput={(e) => { changeYear(e, i) }}
                                                            onFocus={(e) => clearInputError(e, refInvoice[`dateError${i}`], true, `invoice.${i}.date`)}
                                                            ref={refInvoice[`yearInput${i}`]}
                                                        />
                                                        <i className="icofont-ui-rating starFB" />
                                                    </div>

                                                    <div className="divDownDateAcus" >
                                                        <select
                                                            className="element"
                                                            defaultValue={day}
                                                            onChange={(e) => changeDay(e, i)}
                                                            onClick={(e) => clearInputError(e, refInvoice[`dateError${i}`], true, `invoice.${i}.date`)}
                                                            ref={refInvoice[`daySelect${i}`]}
                                                        >
                                                            <option value="">روز</option>
                                                            {optionDays}
                                                        </select>
                                                        <select
                                                            className="element"
                                                            defaultValue={month}
                                                            onChange={(e) => changeMonth(e, i)}
                                                            onClick={(e) => clearInputError(e, refInvoice[`dateError${i}`], true, `invoice.${i}.date`)}
                                                            ref={refInvoice[`monthSelect${i}`]}
                                                        >
                                                            <option value="">ماه</option>
                                                            {optionMonth}
                                                        </select>
                                                        <select
                                                            className="element"
                                                            defaultValue={year}
                                                            onChange={(e) => { changeYear(e, i) }}
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
                                                    <SelectZabi
                                                        primaryLabel='انتخاب'
                                                        options={mixers}
                                                        saveOption={setTruckId}
                                                        saveOption2={setOwnerId}
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
                                                    <SelectZabi
                                                        primaryLabel='انتخاب'
                                                        options={drivers}
                                                        saveOption={setDriverId}
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

                        }))}
                        <div className={`${editMode ? '' : 'hideGe'}`}>
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
                                                        value={second || ''}
                                                        onInput={(e) => changeSecond(e, 0)}
                                                        onFocus={(e) => clearInputError(e, refTimeEditError, true, 'timeEdit')}

                                                    />
                                                    <span>:</span>
                                                    <input
                                                        type="text"
                                                        className="inputTextDateACus inputMonthTDACus element"
                                                        placeholder="00"
                                                        value={minute || ''}
                                                        onInput={(e) => changeMinute(e, 0)}
                                                        onFocus={(e) => clearInputError(e, refTimeEditError, true, 'timeEdit')}

                                                    />
                                                    <span>:</span>
                                                    <input
                                                        type="text"
                                                        className="inputTextDateACus inputYearTDACus element"
                                                        placeholder="00"
                                                        value={hour || ''}
                                                        onInput={(e) => { changeHour(e, 0) }}
                                                        onFocus={(e) => clearInputError(e, refTimeEditError, true, 'timeEdit')}
                                                    />
                                                    <i className="icofont-ui-rating starFB" />
                                                </div>

                                                <div className="divDownDateAcus" >
                                                    <select
                                                        className="element"
                                                        value={second}
                                                        onChange={(e) => changeSecond(e, 0)}
                                                        onClick={(e) => clearInputError(e, refTimeEditError, true, 'timeEdit')}
                                                    >
                                                        <option value=""> ثانیه </option>
                                                        {optionSeconds}
                                                    </select>
                                                    <select
                                                        className="element"
                                                        value={minute}
                                                        onChange={(e) => changeMinute(e, 0)}
                                                        onClick={(e) => clearInputError(e, refTimeEditError, true, 'timeEdit')}
                                                    >
                                                        <option value=""> دقیقه </option>
                                                        {optionMinutes}
                                                    </select>
                                                    <select
                                                        className="element"
                                                        value={hour}
                                                        onChange={(e) => { changeHour(e, 0) }}
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
                                                        value={day || ''}
                                                        onInput={(e) => changeDay(e, 0)}
                                                        onFocus={(e) => clearInputError(e, refDateEditError, true, 'dateEdit')}
                                                    />
                                                    <span>/</span>
                                                    <input
                                                        type="text"
                                                        className="inputTextDateACus inputMonthTDACus element"
                                                        placeholder="1"
                                                        value={month || ''}
                                                        onInput={(e) => changeMonth(e, 0)}
                                                        onFocus={(e) => clearInputError(e, refDateEditError, true, 'dateEdit')}
                                                    />
                                                    <span>/</span>
                                                    <input
                                                        type="text"
                                                        className="inputTextDateACus inputYearTDACus element"
                                                        placeholder="1300"
                                                        value={year || ''}
                                                        onInput={(e) => { changeYear(e, 0) }}
                                                        onFocus={(e) => clearInputError(e, refDateEditError, true, 'dateEdit')}
                                                    />
                                                    <i className="icofont-ui-rating starFB" />
                                                </div>

                                                <div className="divDownDateAcus" >
                                                    <select
                                                        className="element"
                                                        value={day}
                                                        onChange={(e) => changeDay(e, 0)}
                                                        onClick={(e) => clearInputError(e, refDateEditError, true, 'dateEdit')}
                                                    >
                                                        <option value="">روز</option>
                                                        {optionDays}
                                                    </select>
                                                    <select
                                                        className="element"
                                                        value={month}
                                                        onChange={(e) => changeMonth(e, 0)}
                                                        onClick={(e) => clearInputError(e, refDateEditError, true, 'dateEdit')}

                                                    >
                                                        <option value="">ماه</option>
                                                        {optionMonth}
                                                    </select>
                                                    <select
                                                        className="element"
                                                        value={year}
                                                        onChange={(e) => { changeYear(e, 0) }}
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
                                                defaultValue={inputEdit.unitPrice}
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
                                                defaultValue={inputEdit.weight}
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
                                                    ref={refCubicMetersEdit}>{inputEdit.cubicMeters}</div>
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
                                                defaultValue={inputEdit.fare}
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
                                                defaultValue={inputEdit.vahed}
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
                                                defaultValue={inputEdit.address}
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
                                                defaultValue={inputEdit.concretingPosition}
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

                        <div className={`divBtnAddInmoiceCSI_FB ${!editMode ? '' : 'hideGe'}`}>
                            <button onClick={e => { handleAddNewInvoice(e) }}>
                                <i className='icofont-plus' />
                                اضافه کردن فاکتور جدید
                            </button>
                        </div>

                        <div className={`sectionFB divBtnsFB ${!editMode ? '' : 'hideGe'}`}>
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

                        <div className={`sectionFB divBtnsFB ${!editMode ? 'hideGe' : ''}`}>
                            <Button
                                variant="info"
                                className="btnSaveFB"
                                onClick={handleSubmitEdit}
                            >
                                ویرایش
                            </Button>
                        </div>
                    </form>
                </div>

                <div
                    className={`containerShowGe containerShowCustomer  ${hideCreatedRecord ? 'hideGe' : ''}`}
                    ref={containerShowGeRef}
                >
                    <h4 className="titleShowGe"> فاکتورهای ایجاد شده</h4>
                    <div className="divListShowGe">
                        <div className="containerSearch_Se">
                            <div className="containerDate_Se">
                                <div className="startDate_Se">
                                    <span className="stringFromDate_Se"> از تاریخ </span>
                                    <input
                                        type="text"
                                        className="inputDate_Se dayDate_Se"
                                        id="dayFromSearch"
                                        placeholder="روز"
                                        onInput={e => changeDayFromSearch(e)}
                                    />
                                    <span className="slashDate_Se">/</span>
                                    <input
                                        type="text"
                                        className="inputDate_Se monthDate_Se"
                                        placeholder="ماه"
                                        id="monthFromSearch"
                                        onInput={e => changeMonthFromSearch(e)}
                                    />
                                    <span className="slashDate_Se">/</span>
                                    <input
                                        type="text"
                                        className="inputDate_Se yearDate_Se"
                                        id="yearFromSearch"
                                        placeholder="سال"
                                        onInput={e => changeYearFromSearch(e)}
                                    />

                                </div>
                                <div className="endtDate_Se">
                                    <span className="stringUntilDate_Se"> تا تاریخ </span>
                                    <input
                                        type="text"
                                        className="inputDate_Se dayDate_Se"
                                        id="dayUntilSearch"
                                        placeholder="روز"
                                        onInput={e => changeDayUntilSearch(e)}
                                    />
                                    <span className="slashDate_Se">/</span>
                                    <input
                                        type="text"
                                        className="inputDate_Se monthDate_Se"
                                        id="monthUntilSearch"
                                        placeholder="ماه"
                                        onInput={e => changeMonthUntilSearch(e)}
                                    />
                                    <span className="slashDate_Se">/</span>
                                    <input
                                        type="text"
                                        className="inputDate_Se yearDate_Se"
                                        id="yearUntilSearch"
                                        placeholder="سال"
                                        onInput={e => changeYearUntilSearch(e)}
                                    />
                                </div>
                            </div>
                            <div className="containerCustAConc_Se">
                                <div className="customer_Se">
                                    <span className="stringCustAConc_Se stringCustomer_Se"> خریدار </span>
                                    <div className="divSelectSearch_Se">
                                        <SelectZabi
                                            primaryLabel='انتخاب'
                                            options={customersSearch}
                                            saveOption={setCustomerSearchId}
                                            ref={refCustomerSearch}
                                        />
                                    </div>
                                </div>
                                <div className="concrete_Se">
                                    <span className="stringCustAConc_Se stringConcrete_Se"> بتن </span>
                                    <div className="divSelectSearch_Se">
                                        <SelectZabi
                                            primaryLabel='انتخاب'
                                            options={concretesSearch}
                                            saveOption={setConcreteSearchId}
                                            ref={refConcreteSearch}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="containerMixADri_Se">
                                <div className="mixer_Se">
                                    <span className="stringMixADri_Se stringMixer_Se"> میکسر </span>
                                    <div className="divSelectSearch_Se">
                                        <SelectZabi
                                            primaryLabel='انتخاب'
                                            options={mixersSearch}
                                            saveOption={setTruckSearchId}
                                            ref={refTruckSearch}
                                        />
                                    </div>
                                </div>
                                <div className="driver_Se">
                                    <span className="stringMixADri_Se stringDriver_Se"> راننده </span>
                                    <div className="divSelectSearch_Se">
                                        <SelectZabi
                                            primaryLabel='انتخاب'
                                            options={driversSearch}
                                            saveOption={setDriverSearchId}
                                            ref={refDriverSearch}
                                        />
                                    </div>
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
                        <div className="rowListShowGe headRowListShowGe rowListShowACSI_Ge">
                            <span className="rowNumShowACSI_Ge ">ردیف</span>
                            <span className="ticketNumberACSI_Ge ">قبض</span>
                            <span className="customerHeadACSI_Ge">خریدار</span>
                            <span className="concreteACSI_Ge textAlignCenter"> بتن</span>

                            <span className="truckACSI_Ge textAlignCenter">میکسر</span>
                            <span className="driverHeadACSI_Ge">راننده</span>
                            <span className="dateACSI_Ge textAlignCenter">تاریخ</span>
                            <span className="timeACSI_Ge textAlignCenter">ساعت</span>

                            <span className="editHeadShowACSI_Ge"> ویرایش  </span>
                            <span className="delHeadShowACSI_Ge"> حذف </span>
                        </div>
                        {concreteSalesInvoices ? returnCreatedCustomerRecords() : <Skeleton height={40} count={12} />}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddConcreteSalesInvoice;