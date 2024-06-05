import Title from '../hooks/Title';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import "../../../css/general.css";
import "../../../css/formBeton.css";
import "../../../css/addCustomer.css";
import DataZabi from "../hooks/DateZabi";
import { createRef, useEffect, useRef, useState } from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ScaleLoader from 'react-spinners/ScaleLoader';
import useChangeForm from '../hooks/useChangeForm';
const AddConcreteSalesInvoice = () => {

    const MySwal = withReactContent(Swal);
    const {
        optionDays,
        optionMonth,
        optionYears,
    } = DataZabi();

    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    const container = useRef(null);
    const btnAddGeRef = useRef(null);
    const btnGetGeRef = useRef(null);

    const form = useRef(null);
    const formCurrent = form.current;
    const typesDiv = useRef(null);
    const dateOfBirth = useRef(null);
    const daySelect = useRef(null);
    const monthSelect = useRef(null);
    const yearSelect = useRef(null);

    const nameErrorRef = useRef(null);
    const lastNameErrorRef = useRef(null);
    const fatherErrorRef = useRef(null);
    const typesErrorRef = useRef(null);
    const nationalCodeErrorRef = useRef(null);
    const mobileErrorRef = useRef(null);
    const telephoneErrorRef = useRef(null);
    const dateOfBirthErrorRef = useRef(null);
    const emailErrorRef = useRef(null);
    const postalCodeErrorRef = useRef(null);
    const addressErrorRef = useRef(null);

    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const [loading, setLoading] = useState(false);

    const [concreteSalesInvoices, setConcreteSalesInvoices] = useState(null);

    const [input, setInput] = useState({
        customer_id: '',
        date: '',
        weight: '',
        cubicMeters: "",
        concrete_id: '',
        truck_id: '',
        drive_id: '',
        unitPrice: '',
        totalPrice: '',
        fare: '',
        maskanMeli: '',
        vahed: '',
        address: '',
        concretingPosition: '',
    });


    /**
     * id to edit the model
     */
    const [id, setId] = useState(null);

    useEffect(() => {
        getConcreteSalesInvoices();
    }, []);



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





    const changeDay = (e) => {
        let { value } = e.target;
        value = value.toString();
        (value != 0 && value.length == 1) && (value = '0' + value);
        (value.length >= 3 && value[0] === '0') && (value = value.slice(1));

        if (value == '' || (Number(value) >= 0 && Number(value) <= 31)) {
            setDay(value);
        }
        let valDate = year + '-' + month + '-' + value;
        setInput(prev => ({ ...prev, dateOfBirth: valDate }));

        // پاک کردن رنگ خط قرمز کادر سلکت از دریافت خطا
        daySelect.current.classList.remove('borderRedFB');
    }

    const changeMonth = (e) => {
        let { value } = e.target;
        value = value.toString();
        (value != 0 && value.length == 1) && (value = '0' + value);
        (value.length >= 3 && value[0] === '0') && (value = value.slice(1));

        if (value == '' || (Number(value) >= 0 && Number(value) <= 12)) {
            setMonth(value);
        }
        let valDate = year + '-' + value + '-' + day;
        setInput(prev => ({ ...prev, dateOfBirth: valDate }));
        // پاک کردن رنگ خط قرمز کادر سلکت از دریافت خطا
        monthSelect.current.classList.remove('borderRedFB');
    }

    const changeYear = (e) => {
        let { value } = e.target;

        if (value == '' || (Number(value) >= 1 && Number(value) <= 1500)) {
            setYear(value);
        }
        let valDate = value + '-' + month + '-' + day;
        setInput(prev => ({ ...prev, dateOfBirth: valDate }));
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


        if (rest.dateOfBirth) {
            let parts = rest.dateOfBirth.split("-");
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
            name: '',
            lastName: '',
            father: '',
            nationalCode: '',
            dateOfBirth: '',
            mobile: '',
            telephone: '',
            email: '',
            postalCode: '',
            address: '',
            types: [],
            bankInfo: [
                {
                    bank: '',
                    account: '',
                    card: '',
                    shaba: ''
                }
            ]
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
     * چنانچه کاربر بخواهد چندین شماره حساب یا شماره کارت وارد کند
     * با استفاده از این متد فیلدهای لازم برای کاربر نمایش داده می شود
     * @param {*} ref 
     * @param {*} refBtn 
     * @param {*} state 
     * @param {*} index 
     */
    const showSectionBank = (ref, refBtn, state, index) => {
        ref.current.classList.toggle('--displayNone');
        refBtn.current.classList.toggle('--displayNone');
        if (state) {
            setInput(prevInput => {
                let newBankInfo = [...prevInput.bankInfo];
                newBankInfo[index] = { bank: '', account: '', card: '', shaba: '' };
                return { ...prevInput, bankInfo: newBankInfo };
            });

        } else {
            setInput(prevInput => {
                let newBankInfo = [...prevInput.bankInfo];
                newBankInfo[index] = {};
                return { ...prevInput, bankInfo: newBankInfo };
            });
        }
    }

    /**
     * ذخیره مقادیر ورودی‌های کاربر در استیت
     * @param {*} e 
     * @param {*} input 
     */
    const handleSaveValInput = (e, input) => {
        let { value } = e.target;
        setInput(prev => ({ ...prev, [input]: value }));
    }

    /**
     * برای ذخیره شماره حسابها و یا شماره کارت های متعدد
     * @param {*} e 
     * @param {*} index 
     * @param {*} input 
     */
    const handleSaveValBankInput = (e, index, input) => {
        let { value } = e.target;

        setInput(prevInput => {
            let newBankInfo;
            if (Array.isArray(prevInput.bankInfo)) {
                newBankInfo = [...prevInput.bankInfo];
                newBankInfo[index] = { ...newBankInfo[index], [input]: value };
            } else {
                newBankInfo[index] = { bank: '', account: '', card: '', shaba: '' }
                newBankInfo[index] = { ...newBankInfo[index], [input]: value };
            }

            return { ...prevInput, bankInfo: newBankInfo };
        });
    }

    /**
     * برای پاک کردن پیام خطا و برداشتن رنگ قرمز دور کادر
     * @param {*} e 
     * @param {رف مربوط به تگ نمایش خطا} refErr 
     */
    const clearInputError = (e, refErr, types = false, date = false) => {
        e.target.classList.remove('borderRedFB');
        refErr.current && (refErr.current.innerHTML = '')
        date && dateOfBirth.current.classList.remove('borderRedFB');
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
                            if (key == 'dateOfBirth') {
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

    const addZeroFirstStr = (element) => {
        let value = input[element];
        if (value && value != '0') {
            isFirstDigitZero(value) || (value = 0 + value);
        } else {
            value = '';
        }
        setInput(prev => ({ ...prev, [element]: value }));
    }

    /**
     * چکت می کند که آیا اول رشته صفر است یا خیر
     * @param {یک رشته عددی} str 
     * @returns 
     */
    function isFirstDigitZero(str) {
        // اگر اولین کاراکتر رشته صفر باشد، تابع true برمی‌گرداند
        return str.charAt(0) === '0';
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
                            if (key == 'dateOfBirth') {
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
                                    <label htmlFor="name">انتخاب مشتری</label>
                                    <input
                                        type="text"
                                        className="inputTextFB element"
                                        id="name"
                                        defaultValue={input.name}
                                        onInput={e => handleSaveValInput(e, 'name')}
                                        onFocus={e => clearInputError(e, nameErrorRef)}
                                        autoFocus
                                    />
                                    <i className="icofont-ui-rating starFB" />
                                </div>
                                <div className="errorContainerFB elementError" id="nameError" ref={nameErrorRef}> </div>
                            </div>

                        </div>

                        <div className="containerCSI_FB">
                            <div className="sectionFB">
                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label htmlFor="nationalCode">شماره قبض </label>
                                        <input
                                            type="text"
                                            id="nationalCode"
                                            className="inputTextFB ltrFB element"
                                            defaultValue={input.nationalCode}
                                            onInput={e => handleSaveValInput(e, 'nationalCode')}
                                            onFocus={(e) => clearInputError(e, nationalCodeErrorRef)}
                                        />
                                    </div>
                                    <div className="errorContainerFB elementError" id="nationalCodeError" ref={nationalCodeErrorRef}> </div>
                                </div>

                                <div className="containerInputFB">
                                    <div className="divInputFB ">
                                        <label htmlFor="day">تاریخ و ساعت  </label>
                                        <div className="divDateBirth">
                                            <div className="divUpDateAcus element" id="dateOfBirth"
                                                ref={dateOfBirth}
                                            >
                                                <input
                                                    type="text"
                                                    className="inputTextDateACus inputDayTDACus element"
                                                    placeholder="1"
                                                    id="day"
                                                    value={day || ''}
                                                    onInput={(e) => changeDay(e)}
                                                    onFocus={(e) => clearInputError(e, dateOfBirthErrorRef, false, true)}

                                                />
                                                <span>/</span>
                                                <input
                                                    type="text"
                                                    className="inputTextDateACus inputMonthTDACus element"
                                                    placeholder="1"
                                                    value={month || ''}
                                                    onInput={(e) => changeMonth(e)}
                                                    onFocus={(e) => clearInputError(e, dateOfBirthErrorRef, false, true)}

                                                />
                                                <span>/</span>
                                                <input
                                                    type="text"
                                                    className="inputTextDateACus inputYearTDACus element"
                                                    placeholder="1300"
                                                    value={year || ''}
                                                    onInput={(e) => { changeYear(e) }}
                                                    onFocus={(e) => clearInputError(e, dateOfBirthErrorRef, false, true)}

                                                />
                                            </div>

                                            <div className="divDownDateAcus" >
                                                <select
                                                    className="element"
                                                    value={day}
                                                    ref={daySelect}
                                                    onChange={(e) => changeDay(e)}
                                                    onClick={(e) => clearInputError(e, dateOfBirthErrorRef, false, true)}

                                                >
                                                    <option value="">روز</option>
                                                    {optionDays}
                                                </select>
                                                <select
                                                    className="element"
                                                    value={month}
                                                    ref={monthSelect}
                                                    onChange={(e) => changeMonth(e)}
                                                    onClick={(e) => clearInputError(e, dateOfBirthErrorRef, false, true)}

                                                >
                                                    <option value="">ماه</option>
                                                    {optionMonth}
                                                </select>
                                                <select
                                                    className="element"
                                                    value={year}
                                                    ref={yearSelect}
                                                    onChange={(e) => { changeYear(e) }}
                                                    onClick={(e) => clearInputError(e, dateOfBirthErrorRef, false, true)}

                                                >
                                                    <option value="">سال</option>
                                                    {optionYears}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="errorContainerFB elementError" id="dateOfBirthError" ref={dateOfBirthErrorRef}> </div>
                                </div>
                            </div>
                            <div className="sectionFB">
                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label htmlFor="nationalCode">شماره قبض </label>
                                        <input
                                            type="text"
                                            id="nationalCode"
                                            className="inputTextFB ltrFB element"
                                            defaultValue={input.nationalCode}
                                            onInput={e => handleSaveValInput(e, 'nationalCode')}
                                            onFocus={(e) => clearInputError(e, nationalCodeErrorRef)}
                                        />
                                    </div>
                                    <div className="errorContainerFB elementError" id="nationalCodeError" ref={nationalCodeErrorRef}> </div>
                                </div>

                                <div className="containerInputFB">
                                    <div className="divInputFB ">
                                        <label htmlFor="day">تاریخ و ساعت  </label>
                                        <div className="divDateBirth">
                                            <div className="divUpDateAcus element" id="dateOfBirth"
                                                ref={dateOfBirth}
                                            >
                                                <input
                                                    type="text"
                                                    className="inputTextDateACus inputDayTDACus element"
                                                    placeholder="1"
                                                    id="day"
                                                    value={day || ''}
                                                    onInput={(e) => changeDay(e)}
                                                    onFocus={(e) => clearInputError(e, dateOfBirthErrorRef, false, true)}

                                                />
                                                <span>/</span>
                                                <input
                                                    type="text"
                                                    className="inputTextDateACus inputMonthTDACus element"
                                                    placeholder="1"
                                                    value={month || ''}
                                                    onInput={(e) => changeMonth(e)}
                                                    onFocus={(e) => clearInputError(e, dateOfBirthErrorRef, false, true)}

                                                />
                                                <span>/</span>
                                                <input
                                                    type="text"
                                                    className="inputTextDateACus inputYearTDACus element"
                                                    placeholder="1300"
                                                    value={year || ''}
                                                    onInput={(e) => { changeYear(e) }}
                                                    onFocus={(e) => clearInputError(e, dateOfBirthErrorRef, false, true)}

                                                />
                                            </div>

                                            <div className="divDownDateAcus" >
                                                <select
                                                    className="element"
                                                    value={day}
                                                    ref={daySelect}
                                                    onChange={(e) => changeDay(e)}
                                                    onClick={(e) => clearInputError(e, dateOfBirthErrorRef, false, true)}

                                                >
                                                    <option value="">روز</option>
                                                    {optionDays}
                                                </select>
                                                <select
                                                    className="element"
                                                    value={month}
                                                    ref={monthSelect}
                                                    onChange={(e) => changeMonth(e)}
                                                    onClick={(e) => clearInputError(e, dateOfBirthErrorRef, false, true)}

                                                >
                                                    <option value="">ماه</option>
                                                    {optionMonth}
                                                </select>
                                                <select
                                                    className="element"
                                                    value={year}
                                                    ref={yearSelect}
                                                    onChange={(e) => { changeYear(e) }}
                                                    onClick={(e) => clearInputError(e, dateOfBirthErrorRef, false, true)}

                                                >
                                                    <option value="">سال</option>
                                                    {optionYears}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="errorContainerFB elementError" id="dateOfBirthError" ref={dateOfBirthErrorRef}> </div>
                                </div>
                            </div>
                            <div className="sectionFB">
                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label htmlFor="nationalCode">شماره قبض </label>
                                        <input
                                            type="text"
                                            id="nationalCode"
                                            className="inputTextFB ltrFB element"
                                            defaultValue={input.nationalCode}
                                            onInput={e => handleSaveValInput(e, 'nationalCode')}
                                            onFocus={(e) => clearInputError(e, nationalCodeErrorRef)}
                                        />
                                    </div>
                                    <div className="errorContainerFB elementError" id="nationalCodeError" ref={nationalCodeErrorRef}> </div>
                                </div>

                                <div className="containerInputFB">
                                    <div className="divInputFB ">
                                        <label htmlFor="day">تاریخ و ساعت  </label>
                                        <div className="divDateBirth">
                                            <div className="divUpDateAcus element" id="dateOfBirth"
                                                ref={dateOfBirth}
                                            >
                                                <input
                                                    type="text"
                                                    className="inputTextDateACus inputDayTDACus element"
                                                    placeholder="1"
                                                    id="day"
                                                    value={day || ''}
                                                    onInput={(e) => changeDay(e)}
                                                    onFocus={(e) => clearInputError(e, dateOfBirthErrorRef, false, true)}

                                                />
                                                <span>/</span>
                                                <input
                                                    type="text"
                                                    className="inputTextDateACus inputMonthTDACus element"
                                                    placeholder="1"
                                                    value={month || ''}
                                                    onInput={(e) => changeMonth(e)}
                                                    onFocus={(e) => clearInputError(e, dateOfBirthErrorRef, false, true)}

                                                />
                                                <span>/</span>
                                                <input
                                                    type="text"
                                                    className="inputTextDateACus inputYearTDACus element"
                                                    placeholder="1300"
                                                    value={year || ''}
                                                    onInput={(e) => { changeYear(e) }}
                                                    onFocus={(e) => clearInputError(e, dateOfBirthErrorRef, false, true)}

                                                />
                                            </div>

                                            <div className="divDownDateAcus" >
                                                <select
                                                    className="element"
                                                    value={day}
                                                    ref={daySelect}
                                                    onChange={(e) => changeDay(e)}
                                                    onClick={(e) => clearInputError(e, dateOfBirthErrorRef, false, true)}

                                                >
                                                    <option value="">روز</option>
                                                    {optionDays}
                                                </select>
                                                <select
                                                    className="element"
                                                    value={month}
                                                    ref={monthSelect}
                                                    onChange={(e) => changeMonth(e)}
                                                    onClick={(e) => clearInputError(e, dateOfBirthErrorRef, false, true)}

                                                >
                                                    <option value="">ماه</option>
                                                    {optionMonth}
                                                </select>
                                                <select
                                                    className="element"
                                                    value={year}
                                                    ref={yearSelect}
                                                    onChange={(e) => { changeYear(e) }}
                                                    onClick={(e) => clearInputError(e, dateOfBirthErrorRef, false, true)}

                                                >
                                                    <option value="">سال</option>
                                                    {optionYears}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="errorContainerFB elementError" id="dateOfBirthError" ref={dateOfBirthErrorRef}> </div>
                                </div>
                            </div>
                            <div className="sectionFB">
                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label htmlFor="nationalCode">شماره قبض </label>
                                        <input
                                            type="text"
                                            id="nationalCode"
                                            className="inputTextFB ltrFB element"
                                            defaultValue={input.nationalCode}
                                            onInput={e => handleSaveValInput(e, 'nationalCode')}
                                            onFocus={(e) => clearInputError(e, nationalCodeErrorRef)}
                                        />
                                    </div>
                                    <div className="errorContainerFB elementError" id="nationalCodeError" ref={nationalCodeErrorRef}> </div>
                                </div>

                                <div className="containerInputFB">
                                    <div className="divInputFB ">
                                        <label htmlFor="day">تاریخ و ساعت  </label>
                                        <div className="divDateBirth">
                                            <div className="divUpDateAcus element" id="dateOfBirth"
                                                ref={dateOfBirth}
                                            >
                                                <input
                                                    type="text"
                                                    className="inputTextDateACus inputDayTDACus element"
                                                    placeholder="1"
                                                    id="day"
                                                    value={day || ''}
                                                    onInput={(e) => changeDay(e)}
                                                    onFocus={(e) => clearInputError(e, dateOfBirthErrorRef, false, true)}

                                                />
                                                <span>/</span>
                                                <input
                                                    type="text"
                                                    className="inputTextDateACus inputMonthTDACus element"
                                                    placeholder="1"
                                                    value={month || ''}
                                                    onInput={(e) => changeMonth(e)}
                                                    onFocus={(e) => clearInputError(e, dateOfBirthErrorRef, false, true)}

                                                />
                                                <span>/</span>
                                                <input
                                                    type="text"
                                                    className="inputTextDateACus inputYearTDACus element"
                                                    placeholder="1300"
                                                    value={year || ''}
                                                    onInput={(e) => { changeYear(e) }}
                                                    onFocus={(e) => clearInputError(e, dateOfBirthErrorRef, false, true)}

                                                />
                                            </div>

                                            <div className="divDownDateAcus" >
                                                <select
                                                    className="element"
                                                    value={day}
                                                    ref={daySelect}
                                                    onChange={(e) => changeDay(e)}
                                                    onClick={(e) => clearInputError(e, dateOfBirthErrorRef, false, true)}

                                                >
                                                    <option value="">روز</option>
                                                    {optionDays}
                                                </select>
                                                <select
                                                    className="element"
                                                    value={month}
                                                    ref={monthSelect}
                                                    onChange={(e) => changeMonth(e)}
                                                    onClick={(e) => clearInputError(e, dateOfBirthErrorRef, false, true)}

                                                >
                                                    <option value="">ماه</option>
                                                    {optionMonth}
                                                </select>
                                                <select
                                                    className="element"
                                                    value={year}
                                                    ref={yearSelect}
                                                    onChange={(e) => { changeYear(e) }}
                                                    onClick={(e) => clearInputError(e, dateOfBirthErrorRef, false, true)}

                                                >
                                                    <option value="">سال</option>
                                                    {optionYears}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="errorContainerFB elementError" id="dateOfBirthError" ref={dateOfBirthErrorRef}> </div>
                                </div>
                            </div>
                            <div className="sectionFB">
                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label htmlFor="nationalCode">شماره قبض </label>
                                        <input
                                            type="text"
                                            id="nationalCode"
                                            className="inputTextFB ltrFB element"
                                            defaultValue={input.nationalCode}
                                            onInput={e => handleSaveValInput(e, 'nationalCode')}
                                            onFocus={(e) => clearInputError(e, nationalCodeErrorRef)}
                                        />
                                    </div>
                                    <div className="errorContainerFB elementError" id="nationalCodeError" ref={nationalCodeErrorRef}> </div>
                                </div>

                                <div className="containerInputFB">
                                    <div className="divInputFB ">
                                        <label htmlFor="day">تاریخ و ساعت  </label>
                                        <div className="divDateBirth">
                                            <div className="divUpDateAcus element" id="dateOfBirth"
                                                ref={dateOfBirth}
                                            >
                                                <input
                                                    type="text"
                                                    className="inputTextDateACus inputDayTDACus element"
                                                    placeholder="1"
                                                    id="day"
                                                    value={day || ''}
                                                    onInput={(e) => changeDay(e)}
                                                    onFocus={(e) => clearInputError(e, dateOfBirthErrorRef, false, true)}

                                                />
                                                <span>/</span>
                                                <input
                                                    type="text"
                                                    className="inputTextDateACus inputMonthTDACus element"
                                                    placeholder="1"
                                                    value={month || ''}
                                                    onInput={(e) => changeMonth(e)}
                                                    onFocus={(e) => clearInputError(e, dateOfBirthErrorRef, false, true)}

                                                />
                                                <span>/</span>
                                                <input
                                                    type="text"
                                                    className="inputTextDateACus inputYearTDACus element"
                                                    placeholder="1300"
                                                    value={year || ''}
                                                    onInput={(e) => { changeYear(e) }}
                                                    onFocus={(e) => clearInputError(e, dateOfBirthErrorRef, false, true)}

                                                />
                                            </div>

                                            <div className="divDownDateAcus" >
                                                <select
                                                    className="element"
                                                    value={day}
                                                    ref={daySelect}
                                                    onChange={(e) => changeDay(e)}
                                                    onClick={(e) => clearInputError(e, dateOfBirthErrorRef, false, true)}

                                                >
                                                    <option value="">روز</option>
                                                    {optionDays}
                                                </select>
                                                <select
                                                    className="element"
                                                    value={month}
                                                    ref={monthSelect}
                                                    onChange={(e) => changeMonth(e)}
                                                    onClick={(e) => clearInputError(e, dateOfBirthErrorRef, false, true)}

                                                >
                                                    <option value="">ماه</option>
                                                    {optionMonth}
                                                </select>
                                                <select
                                                    className="element"
                                                    value={year}
                                                    ref={yearSelect}
                                                    onChange={(e) => { changeYear(e) }}
                                                    onClick={(e) => clearInputError(e, dateOfBirthErrorRef, false, true)}

                                                >
                                                    <option value="">سال</option>
                                                    {optionYears}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="errorContainerFB elementError" id="dateOfBirthError" ref={dateOfBirthErrorRef}> </div>
                                </div>
                            </div>
                        </div>



                        <div className="sectionFB">
                            <div className="divRightFB">
                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label htmlFor="mobile">موبایل</label>
                                        <input type="text" id="mobile" className="inputTextFB ltrFB element"
                                            value={input['mobile'] || ''}
                                            onInput={e => handleSaveValInput(e, 'mobile')}
                                            onBlur={() => addZeroFirstStr('mobile')}
                                            onFocus={(e) => clearInputError(e, mobileErrorRef)}

                                        />
                                    </div>
                                    <div className="errorContainerFB elementError" id="mobileError" ref={mobileErrorRef}> </div>

                                </div>

                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label htmlFor="telephone">تلفن </label>
                                        <input type="text" id="telephone" className="inputTextFB ltrFB element"
                                            value={input['telephone'] || ''}
                                            onInput={e => handleSaveValInput(e, 'telephone')}
                                            onBlur={() => addZeroFirstStr('telephone')}
                                            onFocus={(e) => clearInputError(e, telephoneErrorRef)}

                                        />
                                    </div>
                                    <div className="errorContainerFB elementError" id="telephoneError" ref={telephoneErrorRef}> </div>
                                </div>

                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label htmlFor="postalCode">کد پستی</label>
                                        <input
                                            type="text"
                                            className="inputTextFB ltrFB element"
                                            id="postalCode"
                                            defaultValue={input.postalCode}
                                            onInput={e => handleSaveValInput(e, 'postalCode')}
                                            onFocus={(e) => clearInputError(e, postalCodeErrorRef)}

                                        />
                                    </div>
                                    <div className="errorContainerFB elementError" id="postalCodeError" ref={postalCodeErrorRef}> </div>
                                </div>
                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label htmlFor="email">ایمیل</label>
                                        <input
                                            type="text"
                                            id="email"
                                            className="inputTextFB ltrFB element"
                                            defaultValue={input.email}
                                            onInput={e => handleSaveValInput(e, 'email')}
                                            onFocus={(e) => clearInputError(e, emailErrorRef)}

                                        />
                                    </div>
                                    <div className="errorContainerFB elementError" id="emailError" ref={emailErrorRef}> </div>
                                </div>
                            </div>

                            <div className="divLeftFB">
                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label htmlFor="address">آدرس</label>
                                        <textarea
                                            id="address"
                                            className="textareaAddressACu"
                                            defaultValue={input.address}
                                            onInput={e => handleSaveValInput(e, 'address')}
                                            onFocus={(e) => clearInputError(e, addressErrorRef)}

                                        />
                                    </div>
                                    <div className="errorContainerFB elementError" id="addressError" ref={addressErrorRef}> </div>
                                </div>
                            </div>
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