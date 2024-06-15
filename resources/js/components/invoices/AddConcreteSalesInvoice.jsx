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
        optionYears,
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
    const typesDiv = useRef(null);
    const date = useRef(null);
    const daySelect = useRef(null);
    const monthSelect = useRef(null);
    const yearSelect = useRef(null);

    const unitPriceRef = useRef(null);
    const unitPriceErrorRef = useRef(null);

    const hasCalledGetConcreteBuyers = useRef(false);
    const hasCalledGetConcretes = useRef(false);
    const hasCalledGetMixers = useRef(false);
    const hasCalledGetDrivers = useRef(false);


    const nameErrorRef = useRef(null);
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

    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const [second, setSecond] = useState('');

    const [refInvoice, setRefInvoice] = useState({});
    const [refDate, setRefDate] = useState({});
    const [refWeight, setRefWeight] = useState({});
    const [refCubicMeters, setRefCubicMeters] = useState({});
    const [refConcrete_id, setRefConcrete_id] = useState({});
    const [refTruck_id, setRefTruck_id] = useState({});
    const [refDrive_id, setRefDrive_id] = useState({});
    const [refUnitPrice, setRefUnitPrice] = useState({});
    const [refTotalPrice, setRefTotalPrice] = useState({});
    const [refFare, setRefFare] = useState({});
    const [refMaskanMeli, setRefMaskanMeli] = useState({});
    const [refVahed, setRefVahed] = useState({});
    const [refAddress, setRefAddress] = useState({});
    const [refConcretingPosition, setRefConcretingPosition] = useState({});

    const [refErrorDate, setRefErrorDate] = useState({});
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
    const [concreteSalesInvoices, setConcreteSalesInvoices] = useState(null);
    const [ticketNumber, setTicketNumber] = useState(1);

    /**
     * اندیس فاکتوری که کاربر در حال تکمیل آن است را ذخیره می‌کند
     * برای ذخیره مقادیر سلکت‌ها در کلیدهای خودشان
     */
    const [invoiceIndexForConcrete, setInvoiceIndexForConcrete] = useState('');
    const [invoiceIndexForMixer, setInvoiceIndexForMixer] = useState('');
    const [invoiceIndexForDriver, setInvoiceIndexForDriver] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [concreteId, setConcreteId] = useState('');
    const [truckId, setTruckId] = useState('');
    const [driverId, setDriverId] = useState('');

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
     * id to edit the model
    */
    const [id, setId] = useState(null);
    const sampleInvoice = 'invoice';
    const [invoice, setInvoice] = useState([sampleInvoice]);

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
        getConcreteSalesInvoices();
    }, []);

    useEffect(() => {
        if (invoice) {
            // const newRefs = customerTypes.reduce((acc, value) => {
            //     acc[value.code] = createRef();
            //     return acc;
            // }, {});
            // setRefs(newRefs);
        }
    }, [invoice]);

    /**
    * برای تخصیص رف به هر لیست نوع مشتری که هنگام نمایش مشتریان حاوی 
    * نوع مشتری هر رکورد است
    */
    useEffect(() => {
        if (invoice) {
            const refDate = invoice.reduce((acc, value, i) => {
                acc['date' + (i + 1)] = createRef();
                return acc;
            }, {});
            const refWeight = invoice.reduce((acc, value, i) => {
                acc['weight' + (i + 1)] = createRef();
                return acc;
            }, {});
            let refs = invoice.reduce((acc, cur, i) => {
                acc[`date${i}`] = createRef();
                acc[`weight${i}`] = createRef();
                acc[`cubicMeters${i}`] = createRef();
                acc[`concrete_id${i}`] = createRef();
                acc[`truck_id${i}`] = createRef();
                acc[`driver_id${i}`] = createRef();
                acc[`unitPrice${i}`] = createRef();
                acc[`totalPrice${i}`] = createRef();
                acc[`fare${i}`] = createRef();
                acc[`maskanMeli${i}`] = createRef();
                acc[`vahed${i}`] = createRef();
                acc[`address${i}`] = createRef();
                acc[`concretingPosition${i}`] = createRef();
                return acc;
            }, {});
            setRefInvoice(refs);
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
            invoices[invoiceIndexForMixer] = { ...invoices[invoiceIndexForMixer], truck_id: truckId };
            return { ...prevInput, invoice: invoices };
        });
    }, [truckId, invoiceIndexForMixer]);
    console.log(input.invoice);

    useEffect(() => {
        driverId && setInput(prevInput => {
            let invoices = [...prevInput.invoice];
            invoices[invoiceIndexForDriver] = { ...invoices[invoiceIndexForDriver], driver_id: driverId };
            return { ...prevInput, invoice: invoices };
        });
    }, [driverId, invoiceIndexForDriver]);

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
                    let arr = data.numberplate.split('-')
                    setMixers(perv => ([...perv, {

                        value: data.id,
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

            return <div className="rowListShowGe" key={i}>
                <span className="rowNumShowGe">{numberRow - i}</span>
                <span className="nameShowGE">{concreteSalesInvoice['name']}</span>
                <span className="lastNameShowGE">{concreteSalesInvoice['lastName']}</span>
                <div className="typeShowGe">
                    <div className="typeTitleShowGe" onClick={() => showListTypes(concreteSalesInvoice.id)}>
                        <span className="typeTitleSpanShowGe">
                            {concreteSalesInvoice['customer_type'].map((customerType, iType) => {
                                return (iType > 0 ? '، ' + customerType['type'] + ' ' + (customerType['subtype'] || '') : customerType['type'] + ' ' + (customerType['subtype'] || ''))
                            })}
                        </span>
                        <i
                            className="icofont-rounded-down"
                            key={'down' + concreteSalesInvoice.id}
                            ref={refDownIcons['down' + concreteSalesInvoice.id]}
                        />
                        <i
                            className="icofont-rounded-up  --displayNone"
                            key={'up' + concreteSalesInvoice.id}
                            ref={refUpIcons['up' + concreteSalesInvoice.id]}
                        />
                    </div>
                    <div
                        className="TypeBodyShowGe --displayNone"
                        key={'list' + concreteSalesInvoice.id}
                        ref={refListTypes['list' + concreteSalesInvoice.id]}
                    >
                        {concreteSalesInvoice['customer_type'].map((customerType, iType) => {
                            return <div
                                className="TypeBodyItemShowGe"
                                key={iType}
                            >
                                {customerType['type']} {customerType['subtype']}
                            </div>
                        })}
                    </div>

                </div>

                <div className="divEditGe">
                    <button className="--styleLessBtn btnEditGe" title=" ویرایش "
                        onClick={() => showEditForm(concreteSalesInvoice.id)}
                    >
                        <i className="icofont-pencil iEditGe" />
                    </button>
                </div>

                <div className="divDelGe">

                    <button className="--styleLessBtn btnDelGe" title=" حذف ">
                        <i className="icofont-trash iDelGe" />
                    </button>
                </div>

            </div>

        })

        return value;
    }

    const showListTypes = (id) => {
        refDownIcons['down' + id].current.classList.toggle('--displayNone');
        refUpIcons['up' + id].current.classList.toggle('--displayNone');
        refListTypes['list' + id].current.classList.toggle('--displayNone');
    }

    async function getConcreteSalesInvoices() {
        await axios.get("/api/v1/getConcreteSalesInvoices").then((response) => {
            setConcreteSalesInvoices(response.data.concreteSalesInvoices);
        });
    }

    /**
     * نمایش تگ بازشو برای انتخاب نوع مشتری
     */
    const showDivCustomerType = () => {
        divItemCustomerType.current.classList.toggle('--hidden');
    }

    /**
     * فرآیند انتخاب نوع مشتری
     * @param {*} e 
     * @param {*} code 
     * @param {*} type 
     * @param {*} subtype 
     */
    const AddCustomerType = (e, code, type, subtype) => {
        e.preventDefault();
        let ref = refs[code]
        let val = ref.current.classList.toggle('IcheckedItemCustomerTypeFB');
        if (val) {
            setInput(prevState => ({
                ...prevState,
                types: [...prevState.types, { code, type, subtype }]
            }));

            errorRCTYitem.current.classList.add('--hidden');
        } else {


            setInput(prevState => ({
                ...prevState,
                types: prevState.types.filter(type => type.code !== code)
            }));
            const typesString = updated.map((item) => `${item.type} ${item.subtype || ''}`).join(' , ');


        }
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

        // پاک کردن رنگ خط قرمز کادر سلکت از دریافت خطا
        daySelect.current.classList.remove('borderRedFB');
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
        // پاک کردن رنگ خط قرمز کادر سلکت از دریافت خطا
        monthSelect.current.classList.remove('borderRedFB');
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
        // پاک کردن رنگ خط قرمز کادر سلکت از دریافت خطا
        yearSelect.current.classList.remove('borderRedFB');

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

        daySelect.current.classList.remove('borderRedFB');
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
        // پاک کردن رنگ خط قرمز کادر سلکت از دریافت خطا
        monthSelect.current.classList.remove('borderRedFB');
    }

    const changeSecond = (e, i) => {
        let { value } = e.target;
        console.log(`value ${value}`);
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
        // پاک کردن رنگ خط قرمز کادر سلکت از دریافت خطا
        yearSelect.current.classList.remove('borderRedFB');

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
        renameKey(rest, 'customer_type', 'types');
        renameKey(rest, 'bank_info', 'bankInfo');

        /**
         * چنانچه یک رکورد حاوی تعداد زیادی اطلاعات بانکی است
         * این اطلاعات را نشان می دهد
         */
        rest.bankInfo.map((_, i) => {
            switch (i) {
                case 1:
                    sectionBank2.current.classList.remove('--displayNone');
                    moreBank1.current.classList.add('--displayNone');
                    break;
                case 2:
                    sectionBank3.current.classList.remove('--displayNone');
                    moreBank2.current.classList.add('--displayNone');
                    break;
                case 3:
                    sectionBank4.current.classList.remove('--displayNone');
                    moreBank3.current.classList.add('--displayNone');
                    break;
                case 4:
                    sectionBank5.current.classList.remove('--displayNone');
                    moreBank4.current.classList.add('--displayNone');
                    break;
            }
        })

        // کپی از شی برای انجام تغییرات
        let datas = { ...rest };

        /**
         * هنگام فراخوانی رکورد از دیتابیس اطلاعات اضافی رکورد نیز برگردانده می‌شود
         * که مورد نیاز نیست، برای حذف ستونهای اضافی از کد زیر استفاده می‌شود
         * در واقع کد زیر ستونهای مورد نیاز را برمیگرداند 
         */
        datas['types'] = datas['types'].map(function (item) {
            let code = item.code;
            let type = item.type;
            let subtype = item.subtype;
            return ({ code, type, subtype });
        });

        /**
         * به کامنت کد بالا مراجعه کنید
         */
        if (datas['bankInfo'].length > 0) {
            datas['bankInfo'] = datas['bankInfo'].map(function (item) {
                let bank = item.bank,
                    account = item.account,
                    card = item.card,
                    shaba = item.shaba;
                return ({ bank, account, card, shaba });
            });
        } else {
            datas['bankInfo'] = [{ bank: '', account: '', card: '', shaba: '' }]
        }

        setInput(datas);


        if (rest.date) {
            let parts = rest.date.split("-");
            setYear(parts[0]);
            setMonth(parts[1]);
            setDay(parts[2]);
        }


        // updatedCustomerTypes.map((type, i) => {

        //     lableCustomerType.current.textContent += i == 0 ? type.type + ' ' + (type.subtype || '') : '، ' + type.type + ' ' + (type.subtype || '');

        //     let ref = refs[type.code];
        //     ref.current.classList.toggle('IcheckedItemCustomerTypeFB');
        // });

    }

    const resetForm = (apply = true) => {
        setInput({
            customer_id: '',
            invoice: [{
                date: '',
                time: '',
                weight: '',
                cubicMeters: "",
                concrete_id: '',
                truck_id: '',
                driver_id: '',
                unitPrice: '',
                totalPrice: '',
                fare: '',
                maskanMeli: '',
                vahed: '',
                address: '',
                concretingPosition: ''
            }],
        });


        setDay('');
        setMonth('');
        setYear('');

        sectionBank2.current.classList.add('--displayNone');
        sectionBank3.current.classList.add('--displayNone');
        sectionBank4.current.classList.add('--displayNone');
        sectionBank5.current.classList.add('--displayNone');
        moreBank1.current.classList.remove('--displayNone');
        moreBank2.current.classList.remove('--displayNone');
        moreBank3.current.classList.remove('--displayNone');
        moreBank4.current.classList.remove('--displayNone');

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
                        driver_id: '',
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
    const clearInputError = (e, refErr, types = false, date = false) => {
        e.target.classList.remove('borderRedFB');
        refErr.current && (refErr.current.innerHTML = '')
        date && date.current.classList.remove('borderRedFB');
        types && typesDiv.current.classList.remove('borderRedFB');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        await axios.post(
            '/api/v1/addCustomer',
            { ...input },
            {
                headers:
                {
                    'X-CSRF-TOKEN': token,
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }
        ).then((response) => {
            setCustomers(prev => [...prev, response.data.concreteSalesInvoice]);
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
                        id.includes('type') && (id = 'types');

                        const element = document.getElementById(id);
                        let scrollPosition = window.scrollY || window.pageYOffset;

                        const top = element.getBoundingClientRect().top + scrollPosition - 20;
                        window.scrollTo({
                            top: top,
                            behavior: 'smooth'
                        });

                        Object.entries(error.response.data.errors).map(([key, val]) => {
                            key.includes('type') && (key = 'types');
                            document.getElementById(key).classList.add('borderRedFB');

                            document.getElementById(key + 'Error').innerHTML = val;
                            if (key == 'date') {
                                day || daySelect.current.classList.add('borderRedFB');
                                month || monthSelect.current.classList.add('borderRedFB');
                                year || yearSelect.current.classList.add('borderRedFB');
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
                        id.includes('types') && (id = 'types');

                        const element = document.getElementById(id);
                        let scrollPosition = window.scrollY || window.pageYOffset;

                        const top = element.getBoundingClientRect().top + scrollPosition - 20;
                        window.scrollTo({
                            top: top,
                            behavior: 'smooth'
                        });

                        Object.entries(error.response.data.errors).map(([key, val]) => {
                            key.includes('type') && (key = 'types');
                            document.getElementById(key).classList.add('borderRedFB');

                            document.getElementById(key + 'Error').innerHTML = val;
                            if (key == 'date') {
                                day || daySelect.current.classList.add('borderRedFB');
                                month || monthSelect.current.classList.add('borderRedFB');
                                year || yearSelect.current.classList.add('borderRedFB');
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
    const formatNub = (ref) => {
        let val,
            checkDthot,
            resalt = ref.current.value.replace(/[\s,]/g, "");

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
            ref.current.value = val;
        }
    }

    const handleAddInvoice = (e) => {
        e.preventDefault();
        setInvoice([...invoice, sampleInvoice])
        setInput(prevInput => {
            let newInvoice = [...prevInput.invoice, { date: '', time: '', weight: '', cubicMeters: "", concrete_id: '', truck_id: '', driver_id: '', unitPrice: '', totalPrice: '', fare: '', maskanMeli: '', vahed: '', address: '', concretingPosition: '' }];

            return { ...prevInput, invoice: newInvoice };
        });
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
                                    <label htmlFor="customer_id"> مشتری </label>
                                    <div
                                        id="customer_id"
                                        onClick={e => clearInputError(e, customer_idErrorRef)}
                                    >
                                        <SelectZabi
                                            primaryLabel='انتخاب'
                                            options={concreteBuyers}
                                            saveOption={setCustomerId}
                                        // ref={customerSelectChild}
                                        />
                                    </div>
                                    <i className="icofont-ui-rating starFB" />
                                </div>
                                {/* <div className="errorContainerFB elementError" id="customer_idError" ref={customer_idErrorRef}> </div> */}
                                <div className="errorContainerFB elementError" id="customer_idError" > </div>
                            </div>

                        </div>

                        {invoice.map((inv, i) => {
                            return <div key={i}>
                                <div className="containerCSI_FB">
                                    <div className="sectionFB">
                                        <div className="containerInputFB">
                                            <div className="divInputFB">
                                                <label htmlFor="nationalCode">شماره قبض </label>
                                                <div className="mainTicketNumberACSI_FB">
                                                    <div className="ticketNumberACSI_FB">
                                                        {ticketNumber + i}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="errorContainerFB elementError" id="nationalCodeError" ref={nationalCodeErrorRef}> </div>
                                        </div>
                                    </div>
                                    <div className="sectionFB">

                                        <div className="containerInputFB">
                                            <div className="divInputFB ">
                                                <label htmlFor="day"> ساعت </label>
                                                <div className="divDateBirth">
                                                    <div className="divUpDateAcus element" id="hour"
                                                        ref={refDate['hour' + (i)]}
                                                    >
                                                        <input
                                                            type="text"
                                                            className="inputTextDateACus inputDayTDACus element"
                                                            placeholder="00"
                                                            id="hour"
                                                            value={second || ''}
                                                            onInput={(e) => changeSecond(e, i)}
                                                            onFocus={(e) => clearInputError(e, dateErrorRef, false, true)}

                                                        />
                                                        <span>:</span>
                                                        <input
                                                            type="text"
                                                            className="inputTextDateACus inputMonthTDACus element"
                                                            placeholder="00"
                                                            value={minute || ''}
                                                            onInput={(e) => changeMinute(e, i)}
                                                            onFocus={(e) => clearInputError(e, dateErrorRef, false, true)}

                                                        />
                                                        <span>:</span>
                                                        <input
                                                            type="text"
                                                            className="inputTextDateACus inputYearTDACus element"
                                                            placeholder="00"
                                                            value={hour || ''}
                                                            onInput={(e) => { changeHour(e, i) }}
                                                            onFocus={(e) => clearInputError(e, dateErrorRef, false, true)}

                                                        />
                                                        <i className="icofont-ui-rating starFB" />
                                                    </div>

                                                    <div className="divDownDateAcus" >
                                                        <select
                                                            className="element"
                                                            value={second}
                                                            ref={daySelect}
                                                            onChange={(e) => changeSecond(e, i)}
                                                        // onClick={(e) => clearInputError(e, dateErrorRef, false, true)}

                                                        >
                                                            <option value=""> ثانیه </option>
                                                            {optionSeconds}
                                                        </select>
                                                        <select
                                                            className="element"
                                                            value={minute}
                                                            ref={monthSelect}
                                                            onChange={(e) => changeMinute(e, i)}
                                                            onClick={(e) => clearInputError(e, dateErrorRef, false, true)}

                                                        >
                                                            <option value=""> دقیقه </option>
                                                            {optionMinutes}
                                                        </select>
                                                        <select
                                                            className="element"
                                                            value={hour}
                                                            ref={yearSelect}
                                                            onChange={(e) => { changeHour(e, i) }}
                                                            onClick={(e) => clearInputError(e, dateErrorRef, false, true)}

                                                        >
                                                            <option value=""> ساعت </option>
                                                            {optionHours}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="errorContainerFB elementError" id="dateError" ref={dateErrorRef}> </div>
                                        </div>

                                        <div className="containerInputFB">
                                            <div className="divInputFB ">
                                                <label htmlFor="day">تاریخ  </label>
                                                <div className="divDateBirth">
                                                    <div className="divUpDateAcus element" id="date"
                                                        ref={refDate['date' + (i)]}
                                                    >
                                                        <input
                                                            type="text"
                                                            className="inputTextDateACus inputDayTDACus element"
                                                            placeholder="1"
                                                            id="day"
                                                            value={day || ''}
                                                            onInput={(e) => changeDay(e, i)}
                                                            onFocus={(e) => clearInputError(e, dateErrorRef, false, true)}

                                                        />
                                                        <span>/</span>
                                                        <input
                                                            type="text"
                                                            className="inputTextDateACus inputMonthTDACus element"
                                                            placeholder="1"
                                                            value={month || ''}
                                                            onInput={(e) => changeMonth(e, i)}
                                                            onFocus={(e) => clearInputError(e, dateErrorRef, false, true)}

                                                        />
                                                        <span>/</span>
                                                        <input
                                                            type="text"
                                                            className="inputTextDateACus inputYearTDACus element"
                                                            placeholder="1300"
                                                            value={year || ''}
                                                            onInput={(e) => { changeYear(e, i) }}
                                                            onFocus={(e) => clearInputError(e, dateErrorRef, false, true)}

                                                        />
                                                        <i className="icofont-ui-rating starFB" />
                                                    </div>

                                                    <div className="divDownDateAcus" >
                                                        <select
                                                            className="element"
                                                            value={day}
                                                            ref={daySelect}
                                                            onChange={(e) => changeDay(e, i)}
                                                            onClick={(e) => clearInputError(e, dateErrorRef, false, true)}

                                                        >
                                                            <option value="">روز</option>
                                                            {optionDays}
                                                        </select>
                                                        <select
                                                            className="element"
                                                            value={month}
                                                            ref={monthSelect}
                                                            onChange={(e) => changeMonth(e, i)}
                                                            onClick={(e) => clearInputError(e, dateErrorRef, false, true)}

                                                        >
                                                            <option value="">ماه</option>
                                                            {optionMonth}
                                                        </select>
                                                        <select
                                                            className="element"
                                                            value={year}
                                                            ref={yearSelect}
                                                            onChange={(e) => { changeYear(e, i) }}
                                                            onClick={(e) => clearInputError(e, dateErrorRef, false, true)}

                                                        >
                                                            <option value="">سال</option>
                                                            {optionYears}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="errorContainerFB elementError" id="dateError" ref={dateErrorRef}> </div>
                                        </div>
                                    </div>
                                    <div className="sectionFB">
                                        <div className="containerInputFB">
                                            <div className="divInputFB">
                                                <label htmlFor="customer_id"> عیار بتن </label>
                                                <div
                                                    id="concrete_id"
                                                    onClick={e => { setInvoiceIndexForConcrete(i); clearInputError(e, concrete_idErrorRef) }}
                                                >
                                                    <SelectZabi
                                                        primaryLabel='انتخاب'
                                                        options={concretes}
                                                        saveOption={setConcreteId}
                                                    // ref={customerSelectChild}
                                                    />
                                                </div>
                                                <i className="icofont-ui-rating starFB" />
                                            </div>
                                            {/* <div className="errorContainerFB elementError" id="customer_idError" ref={customer_idErrorRef}> </div> */}
                                            <div className="errorContainerFB elementError" id="concrete_idError" > </div>
                                        </div>

                                        <div className="containerInputFB">
                                            <div className="divInputFB">
                                                <label htmlFor='unitPrice'> قیمت واحد بتن (مترمکعب) </label>
                                                <input
                                                    type="text"
                                                    id="unitPrice"
                                                    className="inputTextUnitFB ltrFB element"
                                                    defaultValue={input.unitPrice}
                                                    ref={unitPriceRef}
                                                    onInput={e => {
                                                        handleSaveValInput(e, 'unitPrice', i);
                                                        formatNub(unitPriceRef);
                                                    }
                                                    }
                                                    onFocus={e => clearInputError(e, unitPriceErrorRef)}
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
                                                id="concreteNameCodeError"
                                                ref={unitPriceErrorRef}
                                            >
                                            </div>
                                        </div>

                                        <div className="containerInputFB">
                                            <div className="divInputFB">
                                                <label htmlFor='unitPrice'> وزن بار </label>
                                                <input
                                                    type="text"
                                                    id="unitPrice"
                                                    className="inputTextUnitFB ltrFB element"
                                                    defaultValue={input.unitPrice}
                                                    ref={refWeight['weight' + (i + 1)]}
                                                    onInput={e => {
                                                        handleSaveValInput(e, 'weight', i);
                                                        formatNub(unitPriceRef);
                                                    }
                                                    }
                                                    onFocus={e => clearInputError(e, unitPriceErrorRef)}
                                                />
                                                <span
                                                    className="unitFB"
                                                    onClick={() => htmlFor('unitPrice')}
                                                >
                                                    کیلو گرم
                                                </span>
                                                <i className="icofont-ui-rating starFB" />
                                            </div>
                                            <div
                                                className="errorContainerFB elementError"
                                                id="concreteNameCodeError"
                                                ref={unitPriceErrorRef}
                                            >
                                            </div>
                                        </div>
                                        <div className="containerInputFB">
                                            <div className="divInputFB">
                                                <label htmlFor='cubicMeters'> حجم بار </label>
                                                <input
                                                    type="text"
                                                    id="cubicMeters"
                                                    className="inputTextUnitFB ltrFB element"
                                                    defaultValue={input.cubicMeters}
                                                    ref={unitPriceRef}
                                                    onInput={e => {
                                                        handleSaveValInput(e, 'cubicMeters', i);
                                                        formatNub(unitPriceRef);
                                                    }
                                                    }
                                                    onFocus={e => clearInputError(e, unitPriceErrorRef)}
                                                />
                                                <span
                                                    className="unitFB"
                                                    onClick={() => htmlFor('unitPrice')}
                                                >
                                                    مترمکعب
                                                </span>
                                                <i className="icofont-ui-rating starFB" />
                                            </div>
                                            <div
                                                className="errorContainerFB elementError"
                                                id="concreteNameCodeError"
                                                ref={unitPriceErrorRef}
                                            >
                                            </div>
                                        </div>

                                        <div className="containerInputFB">

                                        </div>

                                        <div className="containerInputFB">
                                            <div className="divInputFB">
                                                <label htmlFor='totalPrice'> قیمت کل </label>
                                                <input
                                                    type="text"
                                                    id="totalPrice"
                                                    className="inputTextUnitFB ltrFB element"
                                                    defaultValue={input.totalPrice}
                                                    ref={unitPriceRef}
                                                    onInput={e => {
                                                        handleSaveValInput(e, 'totalPrice', i);
                                                        formatNub(unitPriceRef);
                                                    }
                                                    }
                                                    onFocus={e => clearInputError(e, unitPriceErrorRef)}
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
                                                id="concreteNameCodeError"
                                                ref={unitPriceErrorRef}
                                            >
                                            </div>
                                        </div>
                                    </div>

                                    <div className="sectionFB">

                                        <div className="containerInputFB">
                                            <div className="divInputFB">
                                                <label htmlFor="customer_id"> میکسر </label>
                                                <div
                                                    id="customer_id"
                                                    onClick={e => { setInvoiceIndexForMixer(i) }}
                                                >
                                                    <SelectZabi
                                                        primaryLabel='انتخاب'
                                                        options={mixers}
                                                        saveOption={setTruckId}
                                                    // ref={customerSelectChild}
                                                    />
                                                </div>
                                                <i className="icofont-ui-rating starFB" />
                                            </div>
                                            {/* <div className="errorContainerFB elementError" id="customer_idError" ref={customer_idErrorRef}> </div> */}
                                            <div className="errorContainerFB elementError" id="customer_idError" > </div>
                                        </div>

                                        <div className="containerInputFB">
                                            <div className="divInputFB">
                                                <label htmlFor="customer_id"> راننده </label>
                                                <div
                                                    id="customer_id"
                                                    onClick={e => { setInvoiceIndexForDriver(i); clearInputError(e, customer_idErrorRef); }}
                                                >
                                                    <SelectZabi
                                                        primaryLabel='انتخاب'
                                                        options={drivers}
                                                        saveOption={setDriverId}
                                                    // ref={customerSelectChild}
                                                    />
                                                </div>
                                                <i className="icofont-ui-rating starFB" />
                                            </div>
                                            {/* <div className="errorContainerFB elementError" id="customer_idError" ref={customer_idErrorRef}> </div> */}
                                            <div className="errorContainerFB elementError" id="customer_idError" > </div>
                                        </div>

                                        <div className="containerInputFB">
                                            <div className="divInputFB">
                                                <label htmlFor='fare'> کرایه میکسر </label>
                                                <input
                                                    type="text"
                                                    id="fare"
                                                    className="inputTextUnitFB ltrFB element"
                                                    defaultValue={input.fare}
                                                    ref={unitPriceRef}
                                                    onInput={e => {
                                                        handleSaveValInput(e, 'fare', i);
                                                        formatNub(unitPriceRef);
                                                    }
                                                    }
                                                    onFocus={e => clearInputError(e, unitPriceErrorRef)}
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
                                                id="concreteNameCodeError"
                                                ref={unitPriceErrorRef}
                                            >
                                            </div>
                                        </div>

                                    </div>

                                    <div className="sectionFB">
                                        <div className="containerInputFB">
                                            <div className="divInputCheckboxFB">

                                                <input
                                                    type="checkbox"
                                                    id="nationalCode"
                                                    className="inputCheckboxFB  element"
                                                    defaultValue={input.nationalCode}
                                                    onInput={e => handleSaveValInput(e, 'nationalCode')}
                                                    onFocus={(e) => clearInputError(e, nationalCodeErrorRef)}
                                                />
                                                <label htmlFor="nationalCode" className='labelCheckboxFB inactiveLabelCSI_FB'>مسکن ملی (شهرک امام خمینی) </label>
                                            </div>
                                            <div className="errorContainerFB elementError" id="nationalCodeError" ref={nationalCodeErrorRef}> </div>
                                        </div>
                                        <div className="containerInputFB">
                                            <div className="divInputFB">
                                                <label htmlFor="vahed" className='inactiveLabelCSI_FB'>شماره واحد </label>
                                                <input
                                                    type="text"
                                                    id="vahed"
                                                    className="inputTextFB ltrFB element"
                                                    disabled
                                                    defaultValue={input.vahed}
                                                    onInput={e => handleSaveValInput(e, 'vahed', i)}
                                                    onFocus={(e) => clearInputError(e, nationalCodeErrorRef)}
                                                />
                                            </div>
                                            <div className="errorContainerFB elementError" id="nationalCodeError" ref={nationalCodeErrorRef}> </div>
                                        </div>

                                        <div className="containerInputFB">
                                            <div className="divInputCheckboxFB">

                                                <input
                                                    type="checkbox"
                                                    id="nationalCode"
                                                    className="inputCheckboxFB  element"
                                                    defaultValue={input.nationalCode}
                                                    onInput={e => handleSaveValInput(e, 'nationalCode', i)}
                                                    onFocus={(e) => clearInputError(e, nationalCodeErrorRef)}
                                                />
                                                <label htmlFor="nationalCode" className='labelCheckboxFB inactiveLabelCSI_FB'>مسکن ملی (شهرک شهید رئیسی) </label>
                                            </div>
                                            <div className="errorContainerFB elementError" id="nationalCodeError" ref={nationalCodeErrorRef}> </div>
                                        </div>

                                        <div className="containerInputFB">
                                            <div className="divInputFB">
                                                <label htmlFor="nationalCode" className='inactiveLabelCSI_FB'>شماره واحد </label>
                                                <input
                                                    type="text"
                                                    id="nationalCode"
                                                    className="inputTextFB ltrFB element"
                                                    disabled
                                                    defaultValue={input.nationalCode}
                                                    onInput={e => handleSaveValInput(e, 'nationalCode')}
                                                    onFocus={(e) => clearInputError(e, nationalCodeErrorRef)}
                                                />
                                            </div>
                                            <div className="errorContainerFB elementError" id="nationalCodeError" ref={nationalCodeErrorRef}> </div>
                                        </div>

                                        <div className="containerInputFB">
                                            <div className="divInputFB">
                                                <label htmlFor="address">آدرس</label>
                                                <textarea
                                                    id="address"
                                                    className="textareaAddressCSI_FB"
                                                    defaultValue={input.address}
                                                    onInput={e => handleSaveValInput(e, 'address', i)}
                                                    onFocus={(e) => clearInputError(e, addressErrorRef)}

                                                />
                                            </div>
                                            <div className="errorContainerFB elementError" id="addressError" ref={addressErrorRef}> </div>
                                        </div>

                                        <div className="containerInputFB">
                                            <div className="divInputFB">
                                                <label htmlFor="concretingPosition" >موقعیت بتن‌ریزی </label>
                                                <textarea
                                                    id="concretingPosition"
                                                    className="textareaAddressCSI_FB"
                                                    defaultValue={input.concretingPosition}
                                                    onInput={e => handleSaveValInput(e, 'concretingPosition', i)}
                                                    onFocus={(e) => clearInputError(e, addressErrorRef)}

                                                />
                                            </div>
                                            <div className="errorContainerFB elementError" id="nationalCodeError" ref={nationalCodeErrorRef}> </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        })}
                        <div className="divBtnAddInmoiceCSI_FB">
                            <button onClick={e => { handleAddInvoice(e) }}>
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

                        <div className="rowListShowGe headRowListShowGe">
                            <span className="rowNumShowGe ">ردیف</span>
                            <span className="nameShowGE ">نام مشتری</span>
                            <span className="lastNameShowGE">نام خانوادگی</span>

                            <span className="typeShowGe headTypeShowGe">نوع مشتری</span>

                            <span className="headEditShowGe"> ویرایش  </span>
                            <span className="headDelShowGe"> حذف </span>

                        </div>

                        {concreteSalesInvoices ? returnCreatedCustomerRecords() : <Skeleton height={40} count={12} />}

                    </div>
                </div>

            </div>
        </div>
    )
}
export default AddConcreteSalesInvoice;