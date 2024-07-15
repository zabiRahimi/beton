import { createRef, useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Title from '../hooks/Title';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import "../../../css/general.css";
import "../../../css/formBeton.css";
import "../../../css/addCustomer.css";
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

    const refCustomer_id = useRef(null);
    const refCustomer_idError = useRef(null);

    const refTimeErrorEdit = useRef(null);
    const refDateErrorEdit = useRef(null);
    const refConcrete_idEdit = createRef();
    const refConcrete_idErrorEdit = useRef(null);
    const refUnitPriceEdit = useRef(null);
    const refUnitPriceErrorEdit = useRef(null);
    const refWeightEdit = useRef(null);
    const refWeightErrorEdit = useRef(null);
    const refCubicMetersEdit = useRef(null);
    const refCementStore_idEdit = useRef(null);
    const refCementStore_idErrorEdit = useRef(null);
    const refTotalPriceEdit = useRef(null);
    const refTruck_idEdit = useRef(null);
    const refTruck_idErrorEdit = useRef(null);
    const refDriver_idEdit = useRef(null);
    const refDriver_idErrorEdit = useRef(null);
    const refFareEdit = useRef(null);
    const refFareErrorEdit = useRef(null);
    const refMaskanMeliErrorEdit = useRef(null);
    const refCheckBaxEmamEdit = useRef(null);
    const refCheckBaxShahidEdit = useRef(null);
    const refVahedErrorEdit = useRef(null);
    const refAddressErrorEdit = useRef(null);
    const refConcretingPositionErrorEdit = useRef(null);

    const unitPriceRef = useRef(null);
    const unitPriceErrorRef = useRef(null);

    const lastNameErrorRef = useRef(null);
    const fatherErrorRef = useRef(null);
    const typesErrorRef = useRef(null);
    const nationalCodeErrorRef = useRef(null);
    const mobileErrorRef = useRef(null);
    const telephoneErrorRef = useRef(null);
    const dateErrorRef = useRef(null);
    const emailErrorRef = useRef(null);
    const postalCodeErrorRef = useRef(null);
    const addressErrorRef = useRef(null);

    const hasCalledGetConcreteSalesInvoices = useRef(false);
    const hasCalledGetConcreteBuyers = useRef(false);
    const hasCalledGetConcretes = useRef(false);
    const hasCalledGetMixers = useRef(false);
    const hasCalledGetDrivers = useRef(false);
    const hasCalledGetCementStores = useRef(false);

    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const [second, setSecond] = useState('');

    const [refInvoice, setRefInvoice] = useState({});

    // const [refTimeEdit, setRefTimeEdit] = useState({});
    // const [refDateEdit, setRefDateEdit] = useState({});
    // const [refWeightEdit, setRefWeightEdit] = useState({});
    // const [refCubicMetersEdit, setRefCubicMetersEdit] = useState({});
    // const [refConcrete_idEdit, setRefConcrete_idEdit] = useState({});
    // const [refTruck_idEdit, setRefTruck_idEdit] = useState({});
    // const [refDrive_idEdit, setRefDrive_idEdit] = useState({});
    // const [refUnitPriceEdit, setRefUnitPriceEdit] = useState({});
    // const [refTotalPriceEdit, setRefTotalPriceEdit] = useState({});
    // const [refFareEdit, setRefFareEdit] = useState({});
    // const [refMaskanMeliEdit, setRefMaskanMeliEdit] = useState({});
    // const [refVahedEdit, setRefVahedEdit] = useState({});
    // const [refAddressEdit, setRefAddressEdit] = useState({});
    // const [refConcretingPositionEdit, setRefConcretingPositionEdit] = useState({});

    // const [refTimeErrorEdit, setRefTimeErrorEdit] = useState({});
    // const [refDateErrorEdit, setRefDateErrorEdit] = useState({});
    const [refErrorWeight, setRefErrorWeight] = useState({});
    const [refErrorCubicMeters, setRefErrorCubicMeters] = useState({});
    const [refErrorConcrete_id, setRefErrorConcrete_id] = useState({});
    const [refErrorTruck_id, setRefErrorTruck_id] = useState({});
    const [refErrorDrive_id, setRefErrorDrive_id] = useState({});
    const [refErrorUnitPrice, setRefErrorUnitPrice] = useState({});
    const [refErrorTotalPrice, setRefErrorTotalPrice] = useState({});
    const [refErrorFare, setRefErrorFare] = useState({});
    const [refErrorMaskanMeli, setRefErrorMaskanMeli] = useState({});
    const [refErrorVahed, setRefErrorVahed] = useState({});
    const [refErrorAddress, setRefErrorAddress] = useState({});
    const [refErrorConcretingPosition, setRefErrorConcretingPosition] = useState({});

    const [loading, setLoading] = useState(false);
    const [concreteBuyers, setConcreteBuyers] = useState([]);
    const [concretes, setConcretes] = useState([]);
    const [mixers, setMixers] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [cementStores, setCementStores] = useState([]);
    const [concreteSalesInvoices, setConcreteSalesInvoices] = useState(null);
    const [ticketNumber, setTicketNumber] = useState('');
    const [isRef, setIsRef] = useState(false);

    // console.error(concreteSalesInvoices);
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
    const [maskanMeli, setMaskanMeli] = useState('');
    const [checkedMaskanMeli, setCheckedMaskanMeli] = useState();


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

    // useEffect(() => {
    //     getConcreteSalesInvoices();
    // }, []);


    /**
    * برای تخصیص رف به هر لیست نوع مشتری که هنگام نمایش مشتریان حاوی 
    * نوع مشتری هر رکورد است
    */
    useEffect(() => {
        if (invoice) {
            // const refDate = invoice.reduce((acc, value, i) => {
            //     acc['date' + (i + 1)] = createRef();
            //     return acc;
            // }, {});
            // const refWeight = invoice.reduce((acc, value, i) => {
            //     acc['weight' + (i + 1)] = createRef();
            //     return acc;
            // }, {});
            let refs = invoice.reduce((acc, cur, i) => {
                acc[`time${i}`] = createRef();
                acc[`timeError${i}`] = createRef();
                acc[`date${i}`] = createRef();
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
            setIsRef(true)

            // setRefDate(refDate);
            // setRefWeight(refWeight);
            // setRefCubicMeters();
            // setRefConcrete_id();
            // setRefTruck_id(refs);
            // setRefDrive_id();
            // setRefUnitPrice();
            // setRefTotalPrice();
            // setRefFare();
            // setRefMaskanMeli();
            // setRefVahed();
            // setRefAddress();
            // setRefConcretingPosition();
            // setRefErrorDate();
            // setRefErrorWeight();
            // setRefErrorCubicMeters();
            // setRefErrorConcrete_id();
            // setRefErrorTruck_id();
            // setRefErrorDrive_id();
            // setRefErrorUnitPrice();
            // setRefErrorTotalPrice();
            // setRefErrorFare();
            // setRefErrorMaskanMeli();
            // setRefErrorVahed();
            // setRefErrorAddress();
            // setRefErrorConcretingPosition();

        }
    }, [invoice]);
    /**
     * برای تخصیص رف به هر لیست نوع مشتری که هنگام نمایش مشتریان حاوی 
     * نوع مشتری هر رکورد است
     */
    // useEffect(() => {
    //     if (customers) {
    //         const upIcons = customers.reduce((acc, value) => {
    //             acc['up' + value.id] = createRef();
    //             return acc;
    //         }, {});

    //         const downIcons = customers.reduce((acc, value) => {
    //             acc['down' + value.id] = createRef();
    //             return acc;
    //         }, {});

    //         const listTypes = customers.reduce((acc, value) => {
    //             acc['list' + value.id] = createRef();
    //             return acc;
    //         }, {});
    //         setRefUpIcons(upIcons);
    //         setRefDownIcons(downIcons);
    //         setRefListTypes(listTypes);
    //     }
    // }, [customers]);

    /**
     * دریافت و ذخیره پهنای کامپوننت برای نمایش بهتر لودر
     */
    const [widthComponent, setWidthComponent] = useState(0);
    useEffect(() => {
        let widths = container.current.offsetWidth;
        setWidthComponent(widths)
    }, []);

    useEffect(() => {
        customerId && setInput(prev => ({ ...prev, customer_id: customerId }));
    }, [customerId]);

    useEffect(() => {
        concreteId && setInput(prevInput => {
            let invoices = [...prevInput.invoice];
            invoices[invoiceIndexForConcrete] = { ...invoices[invoiceIndexForConcrete], concrete_id: concreteId };
            return { ...prevInput, invoice: invoices };
        });
    }, [concreteId, invoiceIndexForConcrete]);

    useEffect(() => {
        truckId && setInput(prevInput => {
            let invoices = [...prevInput.invoice];
            invoices[invoiceIndexForMixer] = { ...invoices[invoiceIndexForMixer], truck_id: truckId, ownerId };
            return { ...prevInput, invoice: invoices };
        });
    }, [truckId, invoiceIndexForMixer]);

    useEffect(() => {
        driverId && setInput(prevInput => {
            let invoices = [...prevInput.invoice];
            invoices[invoiceIndexForDriver] = { ...invoices[invoiceIndexForDriver], driver_id: driverId };
            return { ...prevInput, invoice: invoices };
        });
    }, [driverId, invoiceIndexForDriver]);

    useEffect(() => {
        cementStoreId && setInput(prevInput => {
            let invoices = [...prevInput.invoice];
            invoices[invoiceIndexForCementStore] = { ...invoices[invoiceIndexForCementStore], cementStore_id: cementStoreId };
            return { ...prevInput, invoice: invoices };
        });
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

                // setPersonnels2(datas);
                datas.map((data, i) => {
                    setConcreteBuyers(perv => ([...perv, {
                        value: data.id,
                        html: <div className="personnelAption_addPerS">
                            <span className="name_addPers">{data.name}
                                {' '}
                                {data.lastName}</span>

                            <span className="fther_addPers">
                                {data.father || ''}
                            </span>

                        </div>
                    }]))
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

                // setPersonnels2(datas);
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
                    }]))
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
                // setPersonnels2(datas);
                datas.map((data, i) => {
                    setCementStores(perv => ([...perv, {

                        value: data.id,
                        cementStoreName: data.silo,
                        html: <div className="mixerAptionSelectFB">
                            <span className="mixerOwnerSelectFB">
                                {data.silo}
                            </span>
                        </div>
                    }]))
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
                    }]))
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
                // setPersonnels2(datas);
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
                    }]))
                })

            }
        });
    }

    /**
     * رکوردهای مشتریان ایجاد شده را با فرمت‌دهی مناسب جهت نمایش بر می گرداند
     * @returns 
     */
    const returnCreatedCustomerRecords = () => {
        let numberRow = concreteSalesInvoices.length;
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
                        onClick={() => showEditForm(concreteSalesInvoice.id)}
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
        }
        let date = year + '-' + month + '-' + value;
        setInput(prevInput => {
            let newInvoice;
            newInvoice = [...prevInput.invoice];
            newInvoice[i] = { ...newInvoice[i], date };
            return { ...prevInput, invoice: newInvoice };
        });


    }

    const changeMonth = (e, i) => {
        let { value } = e.target;
        value = value.toString();
        (value != 0 && value.length == 1) && (value = '0' + value);
        (value.length >= 3 && value[0] === '0') && (value = value.slice(1));

        if (value == '' || (Number(value) >= 0 && Number(value) <= 12)) {
            setMonth(value);
        }
        let date = year + '-' + value + '-' + day;
        setInput(prevInput => {
            let newInvoice;
            newInvoice = [...prevInput.invoice];
            newInvoice[i] = { ...newInvoice[i], date };
            return { ...prevInput, invoice: newInvoice };
        });
    }

    const changeYear = (e, i) => {
        let { value } = e.target;

        if (value == '' || (Number(value) >= 1 && Number(value) <= 1500)) {
            setYear(value);
        }
        let date = value + '-' + month + '-' + day;
        setInput(prevInput => {
            let newInvoice;
            newInvoice = [...prevInput.invoice];
            newInvoice[i] = { ...newInvoice[i], date };
            return { ...prevInput, invoice: newInvoice };
        });


    }

    const changeHour = (e, i) => {
        let { value } = e.target;
        value = value.toString();
        (value != 0 && value.length == 1) && (value = '0' + value);
        (value.length >= 3 && value[0] === '0') && (value = value.slice(1));

        if (value == '' || (Number(value) >= 0 && Number(value) <= 24)) {
            setHour(value);
        }
        let time = value + ':' + minute + ':' + second;
        setInput(prevInput => {
            let newInvoice;
            newInvoice = [...prevInput.invoice];
            newInvoice[i] = { ...newInvoice[i], time };
            return { ...prevInput, invoice: newInvoice };
        });

    }

    const changeMinute = (e, i) => {
        let { value } = e.target;
        value = value.toString();
        (value != 0 && value.length == 1) && (value = '0' + value);
        (value.length >= 3 && value[0] === '0') && (value = value.slice(1));

        if (value == '' || (Number(value) >= 0 && Number(value) <= 60)) {
            setMinute(value);
        }
        let time = hour + ':' + value + ':' + second;
        setInput(prevInput => {
            let newInvoice;
            newInvoice = [...prevInput.invoice];
            newInvoice[i] = { ...newInvoice[i], time };
            return { ...prevInput, invoice: newInvoice };
        });

    }

    const changeSecond = (e, i) => {
        let { value } = e.target;
        value = value.toString();
        (value != 0 && value.length == 1) && (value = '0' + value);
        (value.length >= 3 && value[0] === '0') && (value = value.slice(1));

        if (value == '' || (Number(value) >= 0 && Number(value) <= 60)) {
            setSecond(value);
        }
        let time = hour + ':' + minute + ':' + value;
        setInput(prevInput => {
            let newInvoice;
            newInvoice = [...prevInput.invoice];
            newInvoice[i] = { ...newInvoice[i], time };
            return { ...prevInput, invoice: newInvoice };
        });


    }

    /**
     * هنگامی که کاربر مبادرت به دیدن و یا ویرایش کردن یک رکورد میکند
     * این متد اطلاعات هر فیلد را برای نمایش تنظیم می کند
     * @param {آدی رکورد} id0 
     */
    const pasteDataForEditing = (id0) => {
        let concreteSalesInvoice = concreteSalesInvoices.find(concreteSalesInvoice => concreteSalesInvoice.id === id0);
        concreteSalesInvoice && setId(id0);
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

refCementStore_idEdit.current && refCementStore_idEdit.current.updateData(datas.cementStore.silo);




        if (rest.date) {
            let parts = rest.date.split("-");
            setYear(parts[0]);
            setMonth(parts[1]);
            setDay(parts[2]);
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

        // sectionBank2.current.classList.add('--displayNone');

        var elements = document.getElementsByClassName('element');
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.remove('borderRedFB');
        }

        var elements = document.getElementsByClassName('elementError');
        for (var i = 0; i < elements.length; i++) {
            elements[i].innerHTML = '';
        }

        // در برخی مواقع لازم نیست کدهای داخل شرط استفاده شود
        if (apply) {
            window.scrollTo({ top: 0 });
        }
    }

    const { showAddForm, showCreatedRecord, showEditForm, flexDirection, editMode, disabledBtnShowForm, disabledBtnShowRecords, hideCreatedRecord, containerShowGeRef } = useChangeForm({ formCurrent, resetForm, pasteDataForEditing });

    /**
     * این متد نام کلید یک آرایه یا یک آبجکت را تغییر می دهد
     * @param {نام آبجکت یا آرایه} obj 
     * @param {نام کلید فعلی} oldKey 
     * @param {نام کلید جدید} newKey 
     */
    function renameKey(obj, oldKey, newKey) {
        if (oldKey !== newKey) {
            Object.defineProperty(obj, newKey,
                Object.getOwnPropertyDescriptor(obj, oldKey));
            delete obj[oldKey];
        }
    }

    /**
     * ذخیره مقادیر ورودی‌های کاربر در استیت
     * @param {*} e 
     * @param {*} input 
     */
    const handleSaveValInput = (e, input, i, customer = false) => {
        let { value } = e.target;
        // input == 'unitPrice' && setUnitPrice(value);
        // input == 'fare' && setFare(value);
        // input == 'address' && setAddress(value);
        // input == 'concretingPosition' && setConcretingPosition(value);
        // input == 'vahed' && setVahed(value);

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
    }

    /**
     * برای پاک کردن پیام خطا و برداشتن رنگ قرمز دور کادر
     * @param {*} e 
     * @param {رف مربوط به تگ نمایش خطا} refErr 
     */
    const clearInputError = (e, refErr, dateAndTime = false, idDivDateAndTime = '', i = null) => {
        if (i !== null && Number(i) >= 0) {
            const addressElemnt = document.getElementById(`invoice.${i}.address`);
            const vahedElemnt = document.getElementById(`invoice.${i}.vahed`);

            addressElemnt.classList.remove('borderRedFB');
            refInvoice[`addressError${i}`].current.innerHTML = '';

            vahedElemnt.classList.remove('borderRedFB');
            refInvoice[`vahedError${i}`].current.innerHTML = '';
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
        // date && date.current.classList.remove('borderRedFB');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setLoading(true)
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
                        // id.includes('type') && (id = 'types');
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
                            // key.includes('type') && (key = 'types');
                            if (!key.includes('cubicMeters') && !key.includes('totalPrice') && !key.includes('ownerId')) {
                                document.getElementById(key).classList.add('borderRedFB');

                                document.getElementById(key + 'Error').innerHTML = val;
                            }
                            // document.getElementById(key).classList.add('borderRedFB');

                            // document.getElementById(key + 'Error').innerHTML = val;

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
            `/api/v1/editCustomer/${id}`,
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

                        let id = Object.keys(error.response.data.errors)[0];

                        // id.includes('types') && (id = 'types');

                        // const element = document.getElementById(id);
                        // let scrollPosition = window.scrollY || window.pageYOffset;

                        // const top = element.getBoundingClientRect().top + scrollPosition - 20;
                        // window.scrollTo({
                        //     top: top,
                        //     behavior: 'smooth'
                        // });

                        // Object.entries(error.response.data.errors).map(([key, val]) => {
                        //     key.includes('type') && (key = 'types');
                        //     document.getElementById(key).classList.add('borderRedFB');

                        //     document.getElementById(key + 'Error').innerHTML = val;

                        // });

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
        setCustomers(concreteSalesInvoices.map((object) => {
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

    const handleCubicMetersCalculation = (e, i) => {
        let { value } = e.target;
        value = value.replace(/,/g, '');
        let cubicMeters = value / 2300;
        cubicMeters = Number(cubicMeters);
        if (!Number.isInteger(cubicMeters)) {
            cubicMeters = cubicMeters.toFixed(2);
        }
        refInvoice[`cubicMeters${i}`].current.innerHTML = cubicMeters;
        setInput(prevInput => {
            let newInvoice;
            newInvoice = [...prevInput.invoice];
            newInvoice[i] = { ...newInvoice[i], cubicMeters };
            return { ...prevInput, invoice: newInvoice };
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
                setInput(prevInput => {
                    let newInvoice;
                    newInvoice = [...prevInput.invoice];
                    newInvoice[i] = { ...newInvoice[i], totalPrice };
                    return { ...prevInput, invoice: newInvoice };
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
                setInput(prevInput => {
                    let newInvoice;
                    newInvoice = [...prevInput.invoice];
                    newInvoice[i] = { ...newInvoice[i], totalPrice };
                    return { ...prevInput, invoice: newInvoice };
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
        // handleSetUnitPriceForNewInvoice();
        setInput(prevInput => {
            let newInvoice = [...prevInput.invoice, { date, time: '', weight: '', cubicMeters: "", concrete_id, truck_id: '', driver_id: '', cementStore_id, unitPrice, totalPrice: '', fare, maskanMeli, vahed, address, concretingPosition }];

            return { ...prevInput, invoice: newInvoice };
        });
        // handleSetConcreteForNewInvoice();

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

    // const handleSetUnitPriceForNewInvoice =()=>{
    //     const unitPrice=input.invoice[invoice.length - 1].unitPrice;
    // }

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
                    ref={btnAddGeRef} onClick={showAddForm}
                    disabled={disabledBtnShowForm}
                >
                    ایجاد فاکتور
                </button>

                <button
                    className={`--styleLessBtn btnGetGe ${disabledBtnShowRecords ? 'disabledBtnGe' : 'enabledBtnGe'} `}
                    ref={btnGetGeRef}
                    onClick={showCreatedRecord}
                    disabled={disabledBtnShowRecords}
                >
                    مشاهده فاکتورها
                </button>
            </div>

            <div className={`containerMainAS_Ge ${flexDirection}`}>

                <div className="continerAddGe containerAddCustomer">
                    <form action="" className="formBeton" ref={form}>
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
                                            options={concreteBuyers}
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
                                                            value={second || ''}
                                                            onInput={(e) => changeSecond(e, i)}
                                                            onFocus={(e) => clearInputError(e, refInvoice[`timeError${i}`], true, `invoice.${i}.time`)}

                                                        />
                                                        <span>:</span>
                                                        <input
                                                            type="text"
                                                            className="inputTextDateACus inputMonthTDACus element"
                                                            placeholder="00"
                                                            value={minute || ''}
                                                            onInput={(e) => changeMinute(e, i)}
                                                            onFocus={(e) => clearInputError(e, refInvoice[`timeError${i}`], true, `invoice.${i}.time`)}

                                                        />
                                                        <span>:</span>
                                                        <input
                                                            type="text"
                                                            className="inputTextDateACus inputYearTDACus element"
                                                            placeholder="00"
                                                            value={hour || ''}
                                                            onInput={(e) => { changeHour(e, i) }}
                                                            onFocus={(e) => clearInputError(e, refInvoice[`timeError${i}`], true, `invoice.${i}.time`)}

                                                        />
                                                        <i className="icofont-ui-rating starFB" />
                                                    </div>

                                                    <div className="divDownDateAcus" >
                                                        <select
                                                            className="element"
                                                            value={second}
                                                            onChange={(e) => changeSecond(e, i)}
                                                            onClick={(e) => clearInputError(e, refInvoice[`timeError${i}`], true, `invoice.${i}.time`)}

                                                        >
                                                            <option value=""> ثانیه </option>
                                                            {optionSeconds}
                                                        </select>
                                                        <select
                                                            className="element"
                                                            value={minute}
                                                            onChange={(e) => changeMinute(e, i)}
                                                            onClick={(e) => clearInputError(e, refInvoice[`timeError${i}`], true, `invoice.${i}.time`)}

                                                        >
                                                            <option value=""> دقیقه </option>
                                                            {optionMinutes}
                                                        </select>
                                                        <select
                                                            className="element"
                                                            value={hour}
                                                            onChange={(e) => { changeHour(e, i) }}
                                                            onClick={(e) => clearInputError(e, refInvoice[`timeError${i}`], true, `invoice.${i}.time`)}

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
                                                    // ref={refDate['date' + (i)]}
                                                    >
                                                        <input
                                                            type="text"
                                                            className="inputTextDateACus inputDayTDACus element"
                                                            placeholder="1"
                                                            id="day"
                                                            value={day || ''}
                                                            onInput={(e) => changeDay(e, i)}
                                                            onFocus={(e) => clearInputError(e, refInvoice[`dateError${i}`], true, `invoice.${i}.date`)}

                                                        />
                                                        <span>/</span>
                                                        <input
                                                            type="text"
                                                            className="inputTextDateACus inputMonthTDACus element"
                                                            placeholder="1"
                                                            value={month || ''}
                                                            onInput={(e) => changeMonth(e, i)}
                                                            onFocus={(e) => clearInputError(e, refInvoice[`dateError${i}`], true, `invoice.${i}.date`)}

                                                        />
                                                        <span>/</span>
                                                        <input
                                                            type="text"
                                                            className="inputTextDateACus inputYearTDACus element"
                                                            placeholder="1300"
                                                            value={year || ''}
                                                            onInput={(e) => { changeYear(e, i) }}
                                                            onFocus={(e) => clearInputError(e, refInvoice[`dateError${i}`], true, `invoice.${i}.date`)}

                                                        />
                                                        <i className="icofont-ui-rating starFB" />
                                                    </div>

                                                    <div className="divDownDateAcus" >
                                                        <select
                                                            className="element"
                                                            value={day}
                                                            onChange={(e) => changeDay(e, i)}
                                                            onClick={(e) => clearInputError(e, refInvoice[`dateError${i}`], true, `invoice.${i}.date`)}

                                                        >
                                                            <option value="">روز</option>
                                                            {optionDays}
                                                        </select>
                                                        <select
                                                            className="element"
                                                            value={month}
                                                            onChange={(e) => changeMonth(e, i)}
                                                            onClick={(e) => clearInputError(e, refInvoice[`dateError${i}`], true, `invoice.${i}.date`)}

                                                        >
                                                            <option value="">ماه</option>
                                                            {optionMonth}
                                                        </select>
                                                        <select
                                                            className="element"
                                                            value={year}
                                                            onChange={(e) => { changeYear(e, i) }}
                                                            onClick={(e) => clearInputError(e, refInvoice[`dateError${i}`], true, `invoice.${i}.date`)}

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
                                                        onFocus={(e) => clearInputError(e, refTimeErrorEdit, true, 'timeEdit')}

                                                    />
                                                    <span>:</span>
                                                    <input
                                                        type="text"
                                                        className="inputTextDateACus inputMonthTDACus element"
                                                        placeholder="00"
                                                        value={minute || ''}
                                                        onInput={(e) => changeMinute(e, 0)}
                                                        onFocus={(e) => clearInputError(e, refTimeErrorEdit, true, 'timeEdit')}

                                                    />
                                                    <span>:</span>
                                                    <input
                                                        type="text"
                                                        className="inputTextDateACus inputYearTDACus element"
                                                        placeholder="00"
                                                        value={hour || ''}
                                                        onInput={(e) => { changeHour(e, 0) }}
                                                        onFocus={(e) => clearInputError(e, refTimeErrorEdit, true, 'timeEdit')}

                                                    />
                                                    <i className="icofont-ui-rating starFB" />
                                                </div>

                                                <div className="divDownDateAcus" >
                                                    <select
                                                        className="element"
                                                        value={second}
                                                        onChange={(e) => changeSecond(e, 0)}
                                                        onClick={(e) => clearInputError(e, refTimeErrorEdit, true, 'timeEdit')}

                                                    >
                                                        <option value=""> ثانیه </option>
                                                        {optionSeconds}
                                                    </select>
                                                    <select
                                                        className="element"
                                                        value={minute}
                                                        onChange={(e) => changeMinute(e, 0)}
                                                        onClick={(e) => clearInputError(e, refTimeErrorEdit, true, 'timeEdit')}

                                                    >
                                                        <option value=""> دقیقه </option>
                                                        {optionMinutes}
                                                    </select>
                                                    <select
                                                        className="element"
                                                        value={hour}
                                                        onChange={(e) => { changeHour(e, 0) }}
                                                        onClick={(e) => clearInputError(e, refTimeErrorEdit, true, 'timeEdit')}

                                                    >
                                                        <option value=""> ساعت </option>
                                                        {optionHours}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="errorContainerFB elementError" id='timeErrorEdit' ref={refTimeErrorEdit}> </div>
                                    </div>

                                    <div className="containerInputFB">
                                        <div className="divInputFB ">
                                            <label htmlFor="day">تاریخ  </label>
                                            <div className="divDateBirth">
                                                <div className="divUpDateAcus element" id="dateEdit"
                                                // ref={refDate['date' + (i)]}
                                                >
                                                    <input
                                                        type="text"
                                                        className="inputTextDateACus inputDayTDACus element"
                                                        placeholder="1"
                                                        id="day"
                                                        value={day || ''}
                                                        onInput={(e) => changeDay(e, 0)}
                                                        onFocus={(e) => clearInputError(e, refDateErrorEdit, true, 'dateEdit')}

                                                    />
                                                    <span>/</span>
                                                    <input
                                                        type="text"
                                                        className="inputTextDateACus inputMonthTDACus element"
                                                        placeholder="1"
                                                        value={month || ''}
                                                        onInput={(e) => changeMonth(e, 0)}
                                                        onFocus={(e) => clearInputError(e, refDateErrorEdit, true, 'dateError')}

                                                    />
                                                    <span>/</span>
                                                    <input
                                                        type="text"
                                                        className="inputTextDateACus inputYearTDACus element"
                                                        placeholder="1300"
                                                        value={year || ''}
                                                        onInput={(e) => { changeYear(e, 0) }}
                                                        onFocus={(e) => clearInputError(e, refDateErrorEdit, true, 'dateEdit')}

                                                    />
                                                    <i className="icofont-ui-rating starFB" />
                                                </div>

                                                <div className="divDownDateAcus" >
                                                    <select
                                                        className="element"
                                                        value={day}
                                                        onChange={(e) => changeDay(e, 0)}
                                                        onClick={(e) => clearInputError(e, refDateErrorEdit, true, 'dateEdit')}

                                                    >
                                                        <option value="">روز</option>
                                                        {optionDays}
                                                    </select>
                                                    <select
                                                        className="element"
                                                        value={month}
                                                        onChange={(e) => changeMonth(e, 0)}
                                                        onClick={(e) => clearInputError(e, refDateErrorEdit, true, 'dateEdit')}

                                                    >
                                                        <option value="">ماه</option>
                                                        {optionMonth}
                                                    </select>
                                                    <select
                                                        className="element"
                                                        value={year}
                                                        onChange={(e) => { changeYear(e, 0) }}
                                                        onClick={(e) => clearInputError(e, refDateErrorEdit, true, 'dateEdit')}

                                                    >
                                                        <option value="">سال</option>
                                                        {optionShortYears}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="errorContainerFB elementError" id='dateErrorEdit' ref={refDateErrorEdit}> </div>
                                    </div>
                                </div>
                                <div className="sectionFB">
                                    <div className="containerInputFB">
                                        <div className="divInputFB">
                                            <label htmlFor='concrete_idEdit'> عیار بتن </label>
                                            <div
                                                id='concrete_idEdit'
                                                className="element"
                                                onClick={e => { setInvoiceIndexForConcrete(0); clearInputError(e, refConcrete_idErrorEdit) }}
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
                                        <div className="errorContainerFB elementError" id='concrete_idErrorEdit' ref={refConcrete_idErrorEdit}> </div>
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
                                                    formatNub('unitPrice', 0);
                                                    handleTotalPriceCalculation(e, 0, 'unitPrice');
                                                }
                                                }
                                                onFocus={e => clearInputError(e, refUnitPriceErrorEdit)}
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
                                            id='unitPriceErrorEdit'
                                            ref={refUnitPriceErrorEdit}
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
                                                    formatNub('weight', 0);
                                                    handleCubicMetersCalculation(e, 0);
                                                    handleTotalPriceCalculation(e, 0, 'weight');
                                                }
                                                }
                                                onFocus={e => clearInputError(e, refWeightErrorEdit)}
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
                                            id='weightErrorEdit'
                                            ref={refWeightErrorEdit}
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
                                                onClick={e => { clearInputError(e, refCementStore_idErrorEdit); setInvoiceIndexForCementStore(i) }}
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
                                            id='cementStore_idErrorEdit'
                                            ref={refCementStore_idErrorEdit}
                                        > </div>
                                    </div>

                                    <div className="containerInputFB">
                                        <div className="divInputFB">
                                            <label> قیمت کل </label>
                                            <div className="mainTotalPriceACSL_FB">
                                                <div className="totalPriceACSL_FB"
                                                    ref={refTotalPriceEdit}
                                                >{inputEdit.totalPrice}</div>
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
                                                onClick={e => { clearInputError(e, refTruck_idErrorEdit); setInvoiceIndexForMixer(0) }}
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
                                            id='refTruck_idErrorEdit'
                                            ref={refTruck_idErrorEdit}
                                        > </div>
                                    </div>

                                    <div className="containerInputFB">
                                        <div className="divInputFB">
                                            <label htmlFor='driver_idEdit'> راننده </label>
                                            <div
                                                id='driver_idEdit'
                                                className="element"
                                                onClick={e => { setInvoiceIndexForDriver(0); clearInputError(e, refDriver_idErrorEdit); }}
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
                                            id='driver_idErrorEdit'
                                            ref={refDriver_idErrorEdit}
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
                                                    formatNub('fare', 0);
                                                }
                                                }
                                                onFocus={e => clearInputError(e, refFareErrorEdit)}
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
                                            id='fareErrorEdit'
                                            ref={refFareErrorEdit}
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
                                                // value={refInvoice[`checkedMaskanEmam${i}`] && refInvoice[`checkedMaskanEmam${i}`].current ? 'مسکن ملی شهرک امام خمینی' : ''}

                                                onChange={e => {
                                                    handleSaveValInput(e, 'maskanMeli', 0,); handleCheckedMaskanMeli(e, `emam${0}`, 0);
                                                    clearInputError(e, '', false, '', 0);
                                                }}



                                                checked={checkedMaskanMeli == `emam${0}` || maskan[0] == 'مسکن ملی شهرک امام خمینی'}

                                                ref={refCheckBaxEmamEdit}
                                            />
                                            <label htmlFor='emamEdit'
                                                className={`labelCheckboxFB pointerFB  ${maskan[0] != 'مسکن ملی شهرک امام خمینی' && 'inactiveLabelCSI_FB'}`}
                                                id={`labelEmam${0}`}>مسکن ملی (شهرک امام خمینی) </label>
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

                                                // value={refCheckedMaskanShahidEdit && refInvoice[`checkedMaskanShahid${i}`].current ? 'مسکن ملی شهرک شهید رییسی' : ''}

                                                onChange={e => {
                                                    handleSaveValInput(e, 'maskanMeli', 0,); handleCheckedMaskanMeli(e, `shahid${0}`, 0);
                                                    clearInputError(e, '', false, '', 0);
                                                }}


                                                checked={checkedMaskanMeli == `shahid${0}` || maskan[0] == 'مسکن ملی شهرک شهید رییسی'}

                                                ref={refCheckBaxShahidEdit}

                                            />
                                            <label htmlFor='shahidEdit'
                                                className={`labelCheckboxFB pointerFB ${maskan[0] != 'مسکن ملی شهرک شهید رییسی' && 'inactiveLabelCSI_FB'}`}
                                            >مسکن ملی (شهرک شهید رئیسی) </label>
                                        </div>
                                        <div className="errorContainerFB elementError" > </div>
                                    </div>

                                    <div className="containerInputFB">
                                        <div className="divInputFB">
                                            <label htmlFor='vahedEdit' className={`${(maskan[0] != 'مسکن ملی شهرک شهید رییسی' && maskan[0] != 'مسکن ملی شهرک امام خمینی') && 'inactiveLabelCSI_FB'}`}>شماره واحد </label>
                                            <input
                                                type="text"
                                                id='vahedEdit'
                                                className="inputTextFB ltrFB element"

                                                defaultValue={inputEdit.vahed}
                                                onInput={e => handleSaveValInput(e, 'vahed', 0)}
                                                onFocus={(e) => clearInputError(e, refVahedErrorEdit)}
                                                disabled={maskan[0] != 'مسکن ملی شهرک شهید رییسی' && maskan[0] != 'مسکن ملی شهرک امام خمینی'}
                                            />
                                        </div>
                                        <div className="errorContainerFB elementError" id='vahedErrorEdit' ref={refVahedErrorEdit}> </div>
                                    </div>

                                    <div className="containerInputFB">
                                        <div className="divInputFB">
                                            <label htmlFor='addressEdit'>آدرس</label>
                                            <textarea
                                                id='addressEdit'
                                                className="textareaAddressCSI_FB element"
                                                defaultValue={inputEdit.address}
                                                onInput={e => handleSaveValInput(e, 'address', 0)}
                                                onFocus={(e) => clearInputError(e, refAddressErrorEdit)}

                                            />
                                        </div>
                                        <div
                                            className="errorContainerFB elementError"
                                            id='addressErrorEdit'
                                            ref={refAddressErrorEdit}
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
                                                onFocus={(e) => clearInputError(e, refConcretingPositionErrorEdit)}

                                            />
                                        </div>
                                        <div
                                            className="errorContainerFB elementError"
                                            id='concretingPositionErrorEdit'
                                            ref={refConcretingPositionErrorEdit}
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
                    <h4 className="titleShowGe"> مشتری‌های تعریف شده</h4>
                    <div className="divListShowGe">

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