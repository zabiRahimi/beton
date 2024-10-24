import { createRef, useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Title from '../../hooks/Title';
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
    const hasCalledGetConcreteBuyers = useRef(false);
    const hasCalledGetConcretes = useRef(false);
    const hasCalledGetMixers = useRef(false);
    const hasCalledGetDrivers = useRef(false);
    const hasCalledGetCementStores = useRef(false);

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

    const [loading, setLoading] = useState(false);
    const [dataCustomers, setDataCustomers] = useState();
    // const [customers, setCustomers] = useState([]);
    // const [concreteBuyers, setConcreteBuyers]= useState([]);
    const [concretes, setConcretes] = useState([]);
    const [dataMixers, setDataMixers] = useState([]);
    // const [mixers, setMixers] = useState([]);
    const [dataDrivers, setDataDrivers] = useState();
    const [drivers, setDrivers] = useState([]);
    const [cementStores, setCementStores] = useState([]);
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

    const [search, setSearch] = useState({
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

    // useEffect(() => {
    //     // این شرط اطمینان می‌دهد که متد فقط یک بار اجرا شود
    //     if (!hasCalledGetConcreteBuyers.current) {
    //         getCSIConcreteBuyers();
    //         hasCalledGetConcreteBuyers.current = true;
    //     }
    // }, []);

    // useEffect(() => {
    //     if (!hasCalledGetConcretes.current) {
    //         getCSIConcretes();
    //         hasCalledGetConcretes.current = true;
    //     }
    // }, []);

    // useEffect(() => {
    //     if (!hasCalledGetMixers.current) {
    //         getCSIMixers();
    //         hasCalledGetMixers.current = true;
    //     }
    // }, []);

    // useEffect(() => {
    //     if (!hasCalledGetDrivers.current) {
    //         getCSIDrivers();
    //         hasCalledGetDrivers.current = true;
    //     }
    // }, []);

    // useEffect(() => {
    //     if (!hasCalledGetCementStores.current) {
    //         getCSICementStores();
    //         hasCalledGetCementStores.current = true;
    //     }
    // }, []);

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
                setInput(perv => {
                    let invoices = [...perv.invoice];
                    invoices[invoiceIndexForConcrete] = { ...invoices[invoiceIndexForConcrete], concrete_id: concreteId };
                    return { ...perv, invoice: invoices };
                });
            } else {
                setInputEdit(prev => ({ ...prev, concrete_id: concreteId }));
            }
        }
    }, [concreteId, invoiceIndexForConcrete]);

    useEffect(() => {
        if (truckId) {
            if (!editMode) {
                setInput(perv => {
                    let invoices = [...perv.invoice];
                    invoices[invoiceIndexForMixer] = { ...invoices[invoiceIndexForMixer], truck_id: truckId, ownerId };
                    return { ...perv, invoice: invoices };
                });

            } else {
                setInputEdit(prev => ({ ...prev, truck_id: truckId, ownerId }));

            }
        }
    }, [truckId, invoiceIndexForMixer]);

    useEffect(() => {
        if (driverId) {
            if (!editMode) {
                setInput(perv => {
                    let invoices = [...perv.invoice];
                    invoices[invoiceIndexForDriver] = { ...invoices[invoiceIndexForDriver], driver_id: driverId };
                    return { ...perv, invoice: invoices };
                });

            } else {
                setInputEdit(prev => ({ ...prev, driver_id: driverId }));

            }

        }
    }, [driverId, invoiceIndexForDriver]);

    useEffect(() => {
        if (cementStoreId) {
            if (!editMode) {
                setInput(perv => {
                    let invoices = [...perv.invoice];
                    invoices[invoiceIndexForCementStore] = { ...invoices[invoiceIndexForCementStore], cementStore_id: cementStoreId };
                    return { ...perv, invoice: invoices };
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

    async function getConcreteSalesInvoices(
        page = 1,
        startDate = search.startDate,
        endDate = search.endDate,
        id = search.id,
        concrete_id = search.concrete_id,
        customer_id = search.customer_id,
        customerName = search.customerName,
        customerLastName = search.customerLastName,
        truck_id = search.truck_id,
        numberplate = search.numberplate,
        owner_id = search.owner_id,
        ownerName = search.ownerName,
        ownerLastName = search.ownerLastName,
        driver_id = search.driver_id,
        driverName = search.driverName,
        driverLastName = search.driverLastName) {
        setLoading(true)
        await axios.get(`/api/v1/getConcreteSalesInvoices?page=${page}`, {
            params: {
                startDate,
                endDate,
                id,
                concrete_id,
                customer_id,
                customerName,
                customerLastName,
                truck_id,
                numberplate,
                owner_id,
                ownerName,
                ownerLastName,
                driver_id,
                driverName,
                driverLastName
            }
        }).then((response) => {
            const salesInvoices = response.data.concreteSalesInvoices;
            setConcreteSalesInvoices(salesInvoices.data);
            setTotalPage(salesInvoices.last_page);
            setTotalRecords(salesInvoices.total);
            if (salesInvoices.current_page == 1) {
                setTicketNumber(salesInvoices.data[0]['id'] + 1);
            }
            window.scrollTo({
                top: top,
                behavior: 'smooth'
            });
        }).catch(
            error => {
                if (error.response && error.response.status == 422) {
                    const objErrors = error.response.data.errors;
                    // دریافت اولین کلید آبجکت و سپس مقدار آن
                    const firstKey = Object.keys(objErrors)[0];
                    const firstValue = objErrors[firstKey];
                    MySwal.fire({
                        icon: "warning",
                        title: "هشدار",
                        html: `<div style="color: red;">${firstValue[0]}</div>`,
                        confirmButtonText: "متوجه شدم!",
                        confirmButtonColor: "#d33",
                    });
                }
            }
        )
        setTimeout(() => {
            // setLoading(false)
        }, 300);
    }

    /**
    * از طریق کامپوننت فرزند این متد فراخوانی و مقدار دهی می‌شود
    * from AddCustomerSearch.jsx
    * @param {} data 
    */
    const handelSetDataSearch = (data) => {
        setSearch(data);
    }

    // async function getCSIConcreteBuyers() {
    //     await axios.get("/api/v1/getCSIConcreteBuyers").then((response) => {
    //         let datas = response.data.concreteBuyers;
    //         setDataCustomers(datas);
    //         if (datas.length == 0) {
    //             MySwal.fire({
    //                 icon: "warning",
    //                 title: "هشدار",
    //                 text: `هنوز هیچ مشتری‌ای به عنوان پرسنل ثبت نشده است. لازم است ابتدا خریداران بتن را به عنوان مشتری ثبت کنید.`,
    //                 confirmButtonText: "  ثبت مشتری   ",
    //                 showCancelButton: true,
    //                 cancelButtonText: "کنسل",
    //                 confirmButtonColor: "#3085d6",
    //                 cancelButtonColor: "#d33",
    //                 preConfirm: () => {

    //                     navigate("/addCustomer");
    //                 }
    //             });
    //         } else {
    //             datas.map((data, i) => {
    //                 setCustomers(perv => ([...perv, {
    //                     value: data.id,
    //                     html: <div className="personnelAption_addPerS">
    //                         <span className="name_addPers">{data.name}
    //                             {' '}
    //                             {data.lastName}</span>

    //                         <span className="fther_addPers">
    //                             {data.father || ''}
    //                         </span>

    //                     </div>
    //                 }]));
    //             })
    //         }
    //     });
    // }

    // async function getCSIConcretes() {
    //     await axios.get("/api/v1/getCSIConcretes").then((response) => {
    //         let datas = response.data.concretes;
    //         if (datas.length == 0) {
    //             // MySwal.fire({
    //             //     icon: "warning",
    //             //     title: "هشدار",
    //             //     text: `هنوز هیچ عیار بتنی ثبت نشده است. لازم است ابتدا عیار بتن را ثبت کنید.`,
    //             //     confirmButtonText: "  ثبت بتن   ",
    //             //     showCancelButton: true,
    //             //     cancelButtonText: "کنسل",
    //             //     confirmButtonColor: "#3085d6",
    //             //     cancelButtonColor: "#d33",
    //             //     preConfirm: () => {
    //             //         navigate("/addConcrete");
    //             //     }
    //             // });
    //         } else {
    //             datas.map((data, i) => {
    //                 setConcretes(perv => ([...perv, {
    //                     value: data.id,
    //                     concreteName: data.concreteName,
    //                     html: <div className="concreteAptionSelectFB">
    //                         <span className="concreteLabelSelectFB">بتن
    //                         </span>

    //                         <span className="concreteSelectFB">
    //                             {data.concreteName}
    //                         </span>

    //                     </div>
    //                 }]));
    //             })
    //         }
    //     });
    // }

    // async function getCSICementStores() {
    //     await axios.get("/api/v1/getCSICementStores").then((response) => {
    //         let datas = response.data.cementStores;
    //         if (datas.length == 0) {
    //             // MySwal.fire({
    //             //     icon: "warning",
    //             //     title: "هشدار",
    //             //     text: `هنوز هیچ سیلوی سیمانی ثبت نشده است. لازم است ابتدا سیلو را ثبت کنید.`,
    //             //     confirmButtonText: "  ثبت سیلو   ",
    //             //     showCancelButton: true,
    //             //     cancelButtonText: "کنسل",
    //             //     confirmButtonColor: "#3085d6",
    //             //     cancelButtonColor: "#d33",
    //             //     preConfirm: () => {
    //             //         navigate("/addCementStore");
    //             //     }
    //             // });
    //         } else {
    //             datas.map((data, i) => {
    //                 setCementStores(perv => ([...perv, {
    //                     value: data.id,
    //                     cementStoreName: data.silo,
    //                     html: <div className="mixerAptionSelectFB">
    //                         <span className="mixerOwnerSelectFB">
    //                             {data.silo}
    //                         </span>
    //                     </div>
    //                 }]));
    //             })
    //         }
    //     });
    // }

    // async function getCSIDrivers() {
    //     await axios.get("/api/v1/getCSIDrivers").then((response) => {
    //         let datas = response.data.drivers;
    //         setDataDrivers(datas);
    //         if (datas.length == 0) {
    //             // MySwal.fire({
    //             //     icon: "warning",
    //             //     title: "هشدار",
    //             //     text: `هنوز هیچ راننده‌ای ثبت نشده است. لازم است ابتدا راننده را ثبت کنید.`,
    //             //     confirmButtonText: "  ثبت راننده   ",
    //             //     showCancelButton: true,
    //             //     cancelButtonText: "کنسل",
    //             //     confirmButtonColor: "#3085d6",
    //             //     cancelButtonColor: "#d33",
    //             //     preConfirm: () => {
    //             //         navigate("/addDriver");
    //             //     }
    //             // });
    //         } else {
    //             datas.map((data, i) => {
    //                 setDrivers(perv => ([...perv, {
    //                     value: data.id,
    //                     html: <div className="personnelAption_addPerS">
    //                         <span className="name_addPers">{data.name}
    //                             {' '}
    //                             {data.lastName}</span>

    //                         <span className="fther_addPers">
    //                             {data.father || ''}
    //                         </span>

    //                     </div>
    //                 }]));
    //             })
    //         }
    //     });
    // }

    // async function getCSIMixers() {
    //     await axios.get("/api/v1/getCSIMixers").then((response) => {
    //         let datas = response.data.mixers;
    //         setDataMixers(datas);
    //         if (datas.length == 0) {
    //             // MySwal.fire({
    //             //     icon: "warning",
    //             //     title: "هشدار",
    //             //     text: `هنوز هیچ کامیونی به عنوان میکسر ثبت نشده است. لازم است ابتدا کامیونی به عنوان میکسر ثبت کنید.`,
    //             //     confirmButtonText: "  ثبت میکسر   ",
    //             //     showCancelButton: true,
    //             //     cancelButtonText: "کنسل",
    //             //     confirmButtonColor: "#3085d6",
    //             //     cancelButtonColor: "#d33",
    //             //     preConfirm: () => {
    //             //         navigate("/addTruck");
    //             //     }
    //             // });
    //         } else {
    //             datas.map((data, i) => {
    //                 let arr = data.numberplate.split('-');
    //                 setMixers(perv => ([...perv, {
    //                     value: data.id,
    //                     value2: data.customer.id,
    //                     html: <div className="mixerAptionSelectFB">
    //                         <span className="mixerNamberpalteSelectFB">
    //                             <div className="numberplateDiv">
    //                                 <span className="numberplateDivS1">{arr[0]}</span>
    //                                 <span className="numberplateDivS2">{arr[3] == 'ا' ? 'الف' : arr[3]}</span>
    //                                 <span className="numberplateDivS3">{arr[1]}</span>
    //                                 <span className="numberplateDivS4">{arr[2]}</span>
    //                             </div>
    //                         </span>
    //                         <span className="mixerOwnerSelectFB">
    //                             {data.customer.name}
    //                             {' '}
    //                             {data.customer.lastName}
    //                         </span>

    //                     </div>
    //                 }]));
    //             })
    //         }
    //     });
    // }

    /**
     * رکوردهای مشتریان ایجاد شده را با فرمت‌دهی مناسب جهت نمایش بر می گرداند
     * @returns 
     */
    const returnCreatedCustomerRecords = () => {
        let length = concreteSalesInvoices.length;
        if (length == 0) {
            return <div className="notResultSearch_Se"> هیچ نتیجه‌ای یافت نشد!! </div>
        }
        let value = concreteSalesInvoices.map((concreteSalesInvoice, i) => {
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

    const handleSetDate = (e, i, input) => {
        let { value } = e.target,
            valDate;
        value = value.toString();
        if (input == 'day') {
            (value != 0 && value.length == 1) && (value = '0' + value);
            (value.length >= 3 && value[0] === '0') && (value = value.slice(1));
            if (value == '' || (Number(value) >= 0 && Number(value) <= 31)) {
                setDate(prev => ({ ...prev, [input]: value }));
                if (!editMode) {
                    refInvoice[`dayInput${i}`].current.value = value;
                    refInvoice[`daySelect${i}`].current.value = value;
                }
            } else {
                e.target.value = date.day;
            }
            valDate = date.year + '-' + date.month + '-' + value;
            if (!editMode) {
                setInput(perv => {
                    let newInvoice;
                    newInvoice = [...perv.invoice];
                    newInvoice[i] = { ...newInvoice[i], date: valDate };
                    return { ...perv, invoice: newInvoice };
                });
            } else {
                setInputEdit(perv => ({ ...perv, date: valDate }));
            }

        } else if (input == 'month') {
            (value != 0 && value.length == 1) && (value = '0' + value);
            (value.length >= 3 && value[0] === '0') && (value = value.slice(1));
            if (value == '' || (Number(value) >= 0 && Number(value) <= 12)) {
                setDate(prev => ({ ...prev, [input]: value }));
                if (!editMode) {
                    refInvoice[`monthInput${i}`].current.value = value;
                    refInvoice[`monthSelect${i}`].current.value = value;
                }
            }
            else {
                e.target.value = date.month;
            }
            valDate = date.year + '-' + value + '-' + date.day;
            if (!editMode) {
                setInput(perv => {
                    let newInvoice;
                    newInvoice = [...perv.invoice];
                    newInvoice[i] = { ...newInvoice[i], date: valDate };
                    return { ...perv, invoice: newInvoice };
                });
            } else {
                setInputEdit(perv => ({ ...perv, date: valDate }));
            }
        } else if (input = 'year') {
            if (value == '' || (Number(value) >= 1 && Number(value) <= 1500)) {
                setDate(prev => ({ ...prev, [input]: value }));
                if (!editMode) {
                    refInvoice[`yearInput${i}`].current.value = value;
                    refInvoice[`yearSelect${i}`].current.value = value;
                }
            } else {
                e.target.value = date.year;
            }
            valDate = value + '-' + date.month + '-' + date.day;
            if (!editMode) {
                setInput(perv => {
                    let newInvoice;
                    newInvoice = [...perv.invoice];
                    newInvoice[i] = { ...newInvoice[i], date: valDate };
                    return { ...perv, invoice: newInvoice };
                });
            } else {
                setInputEdit(perv => ({ ...perv, date: valDate }));
            }
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
                if (!editMode) {
                    refInvoice[`secondSelect${i}`].current.value = value;
                    refInvoice[`secondInput${i}`].current.value = value;
                }

            } else {

                e.target.value = time.second;
            }
            valTime = time.hour + ':' + time.minute + ':' + value;
            if (!editMode) {
                setInput(perv => {
                    let newInvoice;
                    newInvoice = [...perv.invoice];
                    newInvoice[i] = { ...newInvoice[i], time: valTime };
                    return { ...perv, invoice: newInvoice };
                });
            } else {
                setInputEdit(perv => ({ ...perv, time: valTime }));
            }

        } else if (input == 'minute') {
            (value != 0 && value.length == 1) && (value = '0' + value);
            (value.length >= 3 && value[0] === '0') && (value = value.slice(1));

            if (value == '' || (Number(value) >= 0 && Number(value) <= 60)) {
                setTime(prev => ({ ...prev, [input]: value }));
                if (!editMode) {
                    refInvoice[`minuteSelect${i}`].current.value = value;
                    refInvoice[`minuteInput${i}`].current.value = value;
                }

            } else {
                e.target.value = time.minute;
            }

            valTime = time.hour + ':' + value + ':' + time.second;
            if (!editMode) {
                setInput(perv => {
                    let newInvoice;
                    newInvoice = [...perv.invoice];
                    newInvoice[i] = { ...newInvoice[i], time: valTime };
                    return { ...perv, invoice: newInvoice };
                });
            } else {
                setInputEdit(perv => ({ ...perv, time: valTime }));
            }
        } else if (input = 'hour') {
            (value != 0 && value.length == 1) && (value = '0' + value);
            (value.length >= 3 && value[0] === '0') && (value = value.slice(1));

            if (value == '' || (Number(value) >= 0 && Number(value) <= 24)) {
                setTime(prev => ({ ...prev, [input]: value }));
                if (!editMode) {
                    refInvoice[`hourSelect${i}`].current.value = value;
                    refInvoice[`hourInput${i}`].current.value = value;
                }

            } else {
                e.target.value = time.hour;
            }

            valTime = value + ':' + time.minute + ':' + time.second;
            if (!editMode) {
                setInput(perv => {
                    let newInvoice;
                    newInvoice = [...perv.invoice];
                    newInvoice[i] = { ...newInvoice[i], time: valTime };
                    return { ...perv, invoice: newInvoice };
                });
            } else {
                setInputEdit(perv => ({ ...perv, time: valTime }));
            }
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
    const { inputCustomerSearch, optionsCustomersSearched, customerSearchWarning, elementCustomerSearchWarning, handleClearAllSearch } = SearchCustomersSelect({ dataCustomers });

    const { inputMixerSearch, optionsMixersSearched, mixerSearchWarning, elementMixerSearchWarning, handleClearAllSearchMixer } = SearchMixersSelect({ dataMixers });
    const { inputDriverSearch, optionsDriversSearched, driverSearchWarning, elementDriverSearchWarning, handleClearAllSearchDriver } = SearchDriversSelect({ dataDrivers });


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
            setInput(perv => {
                let newInvoice;
                newInvoice = [...perv.invoice];
                newInvoice[i] = { ...newInvoice[i], cubicMeters };
                return { ...perv, invoice: newInvoice };
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
                    setInput(perv => {
                        let newInvoice;
                        newInvoice = [...perv.invoice];
                        newInvoice[i] = { ...newInvoice[i], totalPrice };
                        return { ...perv, invoice: newInvoice };
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
                    setInput(perv => {
                        let newInvoice;
                        newInvoice = [...perv.invoice];
                        newInvoice[i] = { ...newInvoice[i], totalPrice };
                        return { ...perv, invoice: newInvoice };
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

    const { concreteBuyers, mixers } = RouteService({ token, setLoading });

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

                        {!editMode && (invoice.map((inv, i) => {
                            return <div key={i}>
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
                                                        options={drivers}
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
                        <AddCocreteSalesInvoiceSearch
                            getConcreteSalesInvoices={getConcreteSalesInvoices}
                            handelSetDataSearch={handelSetDataSearch}
                            concretes={concretes}
                            totalRecords={totalRecords}
                        />

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
                        <Pagination
                            className="pagination-bar"
                            currentPage={currentPage}
                            totalPage={totalPage}
                            siblingCount={3}
                            onPageChange={page => { setCurrentPage(page); getConcreteSalesInvoices(page) }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddConcreteSalesInvoice;