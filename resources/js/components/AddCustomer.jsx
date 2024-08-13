import Title from "./hooks/Title";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import "../../css/general.css";
import "../../css/formBeton.css";
import "../../css/addCustomer.css";
import DataZabi from "./hooks/DateZabi";
import useBank from "./hooks/useBank";
import { createRef, useEffect, useMemo, useRef, useState } from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ScaleLoader from 'react-spinners/ScaleLoader';
import useChangeForm from './hooks/useChangeForm';
import PaginateZabi from "./hooks/PaginateZabi";
import Pagination from "./hooks/Pagination";
import { useRouteError } from "react-router-dom";
import AddCustomerSearch from "./search/AddCustomerSearch";
const AddCustomer = () => {
    let PageSize = 1;

    const [currentPage, setCurrentPage] = useState(1);
    const data = [{ "id": 1, "first_name": "Jessamyn", "last_name": "Espinazo", "email": "jespinazo0@chicagotribune.com", "phone": "162-166-0977" },
    { "id": 2, "first_name": "Isac", "last_name": "Tooher", "email": "itooher1@psu.edu", "phone": "655-567-3619" },
    { "id": 3, "first_name": "Tabbatha", "last_name": "Proschke", "email": "tproschke2@weibo.com", "phone": "327-612-4850" },
    { "id": 4, "first_name": "Ninetta", "last_name": "Mabb", "email": "nmabb3@canalblog.com", "phone": "971-296-0911" }]

    // const currentTableData = useMemo(() => {
    //     const firstPageIndex = (currentPage - 1) * PageSize;
    //     const lastPageIndex = firstPageIndex + PageSize;
    //     return data.slice(firstPageIndex, lastPageIndex);
    // }, [currentPage]);

    const MySwal = withReactContent(Swal);
    const {
        optionDays,
        optionMonth,
        optionYears,
    } = DataZabi();

    const { optionBank } = useBank();

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

    const account1ErrorRef = useRef(null);
    const card1ErrorRef = useRef(null);
    const shaba1ErrorRef = useRef(null);
    const bank1ErrorRef = useRef(null);

    const account2ErrorRef = useRef(null);
    const card2ErrorRef = useRef(null);
    const shaba2ErrorRef = useRef(null);
    const bank2ErrorRef = useRef(null);

    const account3ErrorRef = useRef(null);
    const card3ErrorRef = useRef(null);
    const shaba3ErrorRef = useRef(null);
    const bank3ErrorRef = useRef(null);

    const account4ErrorRef = useRef(null);
    const card4ErrorRef = useRef(null);
    const shaba4ErrorRef = useRef(null);
    const bank4ErrorRef = useRef(null);

    const account5ErrorRef = useRef(null);
    const card5ErrorRef = useRef(null);
    const shaba5ErrorRef = useRef(null);
    const bank5ErrorRef = useRef(null);

    const sectionBank2 = useRef(null);
    const sectionBank3 = useRef(null);
    const sectionBank4 = useRef(null);
    const sectionBank5 = useRef(null);

    const moreBank1 = useRef(null);
    const moreBank2 = useRef(null);
    const moreBank3 = useRef(null);
    const moreBank4 = useRef(null);

    const lableCustomerType = useRef(null);
    const divItemCustomerType = useRef(null);
    const errorRCTYitem = useRef(null);

    const [refs, setRefs] = useState({});
    const [refUpIcons, setRefUpIcons] = useState({});
    const [refDownIcons, setRefDownIcons] = useState({});
    const [refListTypes, setRefListTypes] = useState({});
    const [loading, setLoading] = useState(false);
    const [customers, setCustomers] = useState(null);


    const customerTypes = [
        { code: 1, type: 'خریدار', subtype: 'بتن' },
        { code: 2, type: 'فروشنده', subtype: 'شن و ماسه' },
        { code: 3, type: 'فروشنده', subtype: 'سیمان' },
        { code: 4, type: 'فروشنده', subtype: 'آب' },
        { code: 5, type: 'مالک', subtype: 'میکسر' },
        { code: 6, type: 'مالک', subtype: 'پمپ دکل' },
        { code: 7, type: 'مالک', subtype: 'پمپ زمینی' },
        { code: 8, type: 'مالک', subtype: 'کمپرسی' },
        { code: 9, type: 'پرسنل', subtype: '' },
    ];
    const [customerTypeSelected, setCustomerTypeSelected] = useState([]);

    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const [input, setInput] = useState({
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

    /**
     * ##########
     * ############### states for paginate
     * ##########
     */
    const [totalPage, setTotalPage] = useState(0);

    /**
     * id to edit the model
     */
    const [id, setId] = useState(null);

    useEffect(() => {
        getCustomers();
    }, []);

    useEffect(() => {
        if (customerTypes) {
            const newRefs = customerTypes.reduce((acc, value) => {
                acc[value.code] = createRef();
                return acc;
            }, {});
            setRefs(newRefs);
        }
    }, []);

    /**
     * برای تخصیص رف به هر لیست نوع مشتری که هنگام نمایش مشتریان حاوی 
     * نوع مشتری هر رکورد است
     */
    useEffect(() => {
        if (customers) {
            const upIcons = customers.reduce((acc, value) => {
                acc['up' + value.id] = createRef();
                return acc;
            }, {});

            const downIcons = customers.reduce((acc, value) => {
                acc['down' + value.id] = createRef();
                return acc;
            }, {});

            const listTypes = customers.reduce((acc, value) => {
                acc['list' + value.id] = createRef();
                return acc;
            }, {});
            setRefUpIcons(upIcons);
            setRefDownIcons(downIcons);
            setRefListTypes(listTypes);
        }
    }, [customers]);

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
        let numberRow = customers.length;
        // const reversedCustomers = customers.slice().reverse(); // کپی آرایه اولیه و معکوس کردن آن
        const reversedCustomers = customers.slice();

        let value = reversedCustomers.map((customer, i) => {

            return <div className="rowListShowGe" key={i}>
                <span className="rowNumShowGe">{numberRow - i}</span>
                <span className="rowNumShowGe">{customer['id']}</span>
                <span className="nameShowGE">{customer['name']}</span>
                <span className="lastNameShowGE">{customer['lastName']}</span>
                <div className="typeShowGe">
                    <div className="typeTitleShowGe" onClick={() => showListTypes(customer.id)}>
                        <span className="typeTitleSpanShowGe">
                            {customer['customer_type'].map((customerType, iType) => {
                                return (iType > 0 ? '، ' + customerType['type'] + ' ' + (customerType['subtype'] || '') : customerType['type'] + ' ' + (customerType['subtype'] || ''))
                            })}
                        </span>
                        <i
                            className="icofont-rounded-down"
                            key={'down' + customer.id}
                            ref={refDownIcons['down' + customer.id]}
                        />
                        <i
                            className="icofont-rounded-up  --displayNone"
                            key={'up' + customer.id}
                            ref={refUpIcons['up' + customer.id]}
                        />
                    </div>
                    <div
                        className="TypeBodyShowGe --displayNone"
                        key={'list' + customer.id}
                        ref={refListTypes['list' + customer.id]}
                    >
                        {customer['customer_type'].map((customerType, iType) => {
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
                        onClick={() => showEditForm(customer.id)}
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

    async function getCustomers(page = 1, startDate = null, endDate = null, id = null, types = null, name = null, lastName = null) {
        setLoading(true)
        await axios.get(`/api/v1/getCustomers?page=${page}`, {
            params: {
                startDate,
                endDate,
                id,
                types,
                name,
                lastName
            }
        }).then((response) => {
            setTotalPage(response.data.customers.last_page);
            setCustomers(response.data.customers.data);
            window.scrollTo({
                top: top,
                behavior: 'smooth'
            });

        }).catch(
            error => {
                if (error.response && error.response.status == 422) {
                    const objErrors=error.response.data.errors;
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

                // if (error.response && error.response.status == 422) {

                //     let id = Object.keys(error.response.data.errors)[0];
                //     id.includes('type') && (id = 'types');

                //     const element = document.getElementById(id);
                //     let scrollPosition = window.scrollY || window.pageYOffset;

                //     const top = element.getBoundingClientRect().top + scrollPosition - 20;
                //     window.scrollTo({
                //         top: top,
                //         behavior: 'smooth'
                //     });

                //     Object.entries(error.response.data.errors).map(([key, val]) => {
                //         key.includes('type') && (key = 'types');
                //         document.getElementById(key).classList.add('borderRedFB');

                //         document.getElementById(key + 'Error').innerHTML = val;
                //         if (key == 'dateOfBirth') {
                //             day || daySelect.current.classList.add('borderRedFB');
                //             month || monthSelect.current.classList.add('borderRedFB');
                //             year || yearSelect.current.classList.add('borderRedFB');
                //         }
                //     });

                // }
            }
        )
        setTimeout(() => {
            setLoading(false)
        }, 300);

    }

    /**
     * نمایش تگ بازشو برای انتخاب نوع مشتری
     */
    const showDivCustomerType = () => {
        divItemCustomerType.current.classList.toggle('--hidden');
    }

    /**
     * نمایش آیتم های نوع مشتری
     * @returns 
     */
    const showCustomerTypes = () => {
        let value = customerTypes.map((customerType, i) => {

            return <div className="itemCustomerTypeFB" onClick={(e) => AddCustomerType(e, customerType['code'], customerType['type'], customerType['subtype'])}
                key={i}>
                <div className="checkedItemCustomerTypeFB" key={customerType['code']} ref={refs[customerType.code]}>
                    <i className="icofont-check-alt " />
                </div>
                <span className="nameItemcustomerTypeFB"> {customerType['type']} {customerType['subtype']} </span>
            </div>
        })
        return value;
    }



    const showCustomerTypeSelected = () => {
        let value = customerTypeSelected.map((customerType, i) => {
            return <div className="customerTypeSelectedFB" key={i}>
                <span className="nameItemcustomerTypeFB"> {customerType['type']} {customerType['subtype'] && customerType['subtype']}</span>
                <i className="icofont-trash delItemCustomerTypeFB" onClick={() => delCustomerTypeSelected(customerType['code'], customerType['type'], customerType['subtype'])} />
            </div>
        })

        return value;
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
            setCustomerTypeSelected(old => [...old, { code, type, subtype }]);
            setInput(prevState => ({
                ...prevState,
                types: [...prevState.types, { code, type, subtype }]
            }));
            const typesString = customerTypeSelected.map((item) => `${item.type} ${item.subtype || ''}`).join(' , ');
            lableCustomerType.current.textContent = typesString ? typesString + ',' + type + ' ' + (subtype || '') : type + ' ' + (subtype || '');

            errorRCTYitem.current.classList.add('--hidden');
        } else {

            const updated = customerTypeSelected.filter(item => item.code !== code);
            setCustomerTypeSelected(updated);
            setInput(prevState => ({
                ...prevState,
                types: prevState.types.filter(type => type.code !== code)
            }));
            const typesString = updated.map((item) => `${item.type} ${item.subtype || ''}`).join(' , ');

            lableCustomerType.current.textContent = typesString ? typesString : 'انتخاب';
        }
    }



    const delCustomerTypeSelected = (code, type, subtype) => {
        const updated = customerTypeSelected.filter(item => item.code !== code);
        setCustomerTypeSelected(updated);
        setInput(prevState => ({
            ...prevState,
            types: prevState.types.filter(item => !(item.type.trim() === type && (item.subtype ? item.subtype.trim() === subtype : true)))
        }));
        let ref = refs[code]
        ref.current.classList.toggle('IcheckedItemCustomerTypeFB');
        const typesString = updated.map((item) => `${item.type} ${item.subtype}`).join(' , ');
        lableCustomerType.current.textContent = typesString ? typesString : 'انتخاب';
    }

    const endSelectCustomerType = (e) => {
        e.preventDefault();
        if (customerTypeSelected.length == 0) {
            errorRCTYitem.current.classList.remove('--hidden');
        } else {
            divItemCustomerType.current.classList.add('--hidden');
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
        let customer = customers.find(customer => customer.id === id0);
        customer && setId(id0);
        const { id, created_at, updated_at, ...rest } = customer;//نادیده گرفتن کلید های مشخص شده
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
        const updatedCustomerTypes = rest.types.map(obj => {
            const { pivot, ...rest } = obj;
            return rest;
        });
        setCustomerTypeSelected(updatedCustomerTypes);

        if (rest.dateOfBirth) {
            let parts = rest.dateOfBirth.split("-");
            setYear(parts[0]);
            setMonth(parts[1]);
            setDay(parts[2]);
        }

        lableCustomerType.current.textContent = ''//حذف کلمه انتخاب از لیبل لیست
        updatedCustomerTypes.map((type, i) => {

            lableCustomerType.current.textContent += i == 0 ? type.type + ' ' + (type.subtype || '') : '، ' + type.type + ' ' + (type.subtype || '');

            let ref = refs[type.code];
            ref.current.classList.toggle('IcheckedItemCustomerTypeFB');
        });

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

        customerTypeSelected.map((types) => {
            let ref = refs[types['code']]
            ref.current.classList.toggle('IcheckedItemCustomerTypeFB');
        })
        setCustomerTypeSelected([]);
        lableCustomerType.current.textContent = 'انتخاب';
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

    const { showAddForm, showCreatedRecord, showEditForm, flexDirection, editMode, disabledBtnShowForm, disabledBtnShowRecords, hideCreatedRecord, containerShowGeRef, hideShowForm } = useChangeForm({ formCurrent, resetForm, pasteDataForEditing });

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
            setCustomers(prev => [...prev, response.data.customer]);
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

            replaceObject(id, response.data.customer);

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
        setCustomers(customers.map((object) => {
            if (object.id == id) {
                return newObject;
            } else {
                return object;
            }
        }));
    };



    return (
        <div className="containerAddCustomer" ref={container}>

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

            <Title title="تعریف مشتری" />
            <div className="headPageGe">
                <button
                    className={`--styleLessBtn btnAddGe ${disabledBtnShowForm ? 'disabledBtnGe' : 'enabledBtnGe'}`}
                    ref={btnAddGeRef} onClick={() => showAddForm(false)}
                    disabled={disabledBtnShowForm}
                >
                    تعریف مشتری
                </button>

                <button
                    className={`--styleLessBtn btnGetGe ${disabledBtnShowRecords ? 'disabledBtnGe' : 'enabledBtnGe'} `}
                    ref={btnGetGeRef}
                    onClick={() => showCreatedRecord(false)}
                    disabled={disabledBtnShowRecords}
                >
                    مشاهده مشتری‌ها
                </button>
            </div>
            <div className={`containerMainAS_Ge ${flexDirection}`}>

                <div className="continerAddGe containerAddCustomer">
                    <form action="" className={`formBeton ${hideShowForm ? 'hideGe' : ''}`} ref={form}>
                        <h5 className={`titleFormFB ${editMode ? '' : 'hideGe'}`}>ویرایش مشتری</h5>

                        <div className="sectionFB">

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="name">نام مشتری</label>
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

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="lastName">نام خانوادگی</label>
                                    <input
                                        type="text"
                                        className="inputTextFB element"
                                        id="lastName"
                                        defaultValue={input.lastName}
                                        onInput={e => handleSaveValInput(e, 'lastName')}
                                        onFocus={e => clearInputError(e, lastNameErrorRef)}
                                    />
                                    <i className="icofont-ui-rating starFB" />
                                </div>
                                <div className="errorContainerFB elementError" id="lastNameError" ref={lastNameErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="father">نام پدر</label>
                                    <input
                                        type="text"
                                        className="inputTextFB element"
                                        id="father"
                                        defaultValue={input.father}
                                        onInput={e => handleSaveValInput(e, 'father')}
                                        onFocus={e => clearInputError(e, fatherErrorRef)}
                                    />

                                </div>
                                <div className="errorContainerFB elementError" id="fatherError" ref={fatherErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label  >نوع مشتری </label>
                                    <div className="selectFB element containerCustomerTypeFB"
                                        id="types"
                                        ref={typesDiv}
                                        onClick={(e) => { showDivCustomerType(); clearInputError(e, typesErrorRef, true, false) }}
                                    >
                                        <span className="lableCustomerTypeFB" ref={lableCustomerType}> انتخاب </span>
                                        <i className="icofont-caret-down " />
                                    </div>
                                    <div className="divItemCustomerTypeFB --hidden" ref={divItemCustomerType}>
                                        <div className="rigthCustomerTypeFB">
                                            <div className="RCTYitemsFB">
                                                {customerTypeSelected && showCustomerTypeSelected()}
                                            </div>
                                            <div className="errorRCTYitemFB --hidden" ref={errorRCTYitem}>
                                                هیچ گزینه ای انتخاب نشده است
                                            </div>
                                            <button className="btnRCTYitemsFB"
                                                onClick={endSelectCustomerType}> ثبت </button>

                                        </div>
                                        <div className="leftCustomerTypeFB">
                                            {showCustomerTypes()}
                                        </div>
                                    </div>
                                    <i className="icofont-ui-rating starFB" />

                                </div>
                                <div className="errorContainerFB elementError" id="typesError" ref={typesErrorRef}> </div>
                            </div>
                        </div>

                        <div className="sectionFB">
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="nationalCode">کد ملی </label>
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
                                    <label htmlFor="day">تاریخ تولد </label>
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

                        <div className="sectionFB">
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="bankInfo.0.account">شماره حساب</label>
                                    <input
                                        type="text"
                                        id="bankInfo.0.account"
                                        className="inputTextFB ltrFB element"
                                        defaultValue={input.bankInfo?.[0]?.account ?? ''}
                                        onInput={e => { handleSaveValBankInput(e, 0, 'account') }}
                                        onFocus={(e) => clearInputError(e, account1ErrorRef)}

                                    />
                                </div>
                                <div className="errorContainerFB elementError" id="bankInfo.0.accountError" ref={account1ErrorRef}> </div>
                            </div>
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="bankInfo.0.card">شماره کارت</label>
                                    <input
                                        type="text"
                                        id="bankInfo.0.card"
                                        className="inputTextFB ltrFB element"
                                        defaultValue={input.bankInfo?.[0]?.card ?? ''}
                                        onInput={e => { handleSaveValBankInput(e, 0, 'card') }}
                                        onFocus={(e) => clearInputError(e, card1ErrorRef)}

                                    />
                                </div>
                                <div className="errorContainerFB elementError" id="bankInfo.0.cardError" ref={card1ErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="bankInfo.0.shaba">شماره شبا</label>
                                    <input
                                        type="text"
                                        id="bankInfo.0.shaba"
                                        className="inputShabaFB element ltrFB"
                                        defaultValue={input.bankInfo?.[0]?.shaba ?? ''}
                                        onInput={e => { handleSaveValBankInput(e, 0, 'shaba') }}
                                        onFocus={(e) => clearInputError(e, shaba1ErrorRef)}
                                    />
                                    <span className="unitShabaFB"> IR </span>
                                </div>
                                <div className="errorContainerFB elementError" id="bankInfo.0.shabaError" ref={shaba1ErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="bankInfo.0.bank">نام بانک </label>
                                    <select
                                        name=""
                                        id="bankInfo.0.bank"
                                        className="selectFB element inputTextFB"
                                        value={input.bankInfo?.[0]?.bank ?? ''}
                                        onChange={e => { handleSaveValBankInput(e, 0, 'bank') }}
                                        onClick={(e) => clearInputError(e, bank1ErrorRef)}
                                    >
                                        <option value=""> انتخاب </option>
                                        {optionBank}
                                    </select>
                                </div>
                                <div className="errorContainerFB elementError" id="bankInfo.0.bankError" ref={bank1ErrorRef}> </div>
                            </div>

                            <div className="moreBank" ref={moreBank1}
                                onClick={() => showSectionBank(sectionBank2, moreBank1, true, 1)}> اضافه کردن اطلاعات بانکی بیشتر </div>
                        </div>

                        <div className="sectionFB --displayNone" ref={sectionBank2}>
                            <div className="delMoreBank"> <span onClick={() => showSectionBank(sectionBank2, moreBank1, false, 1)}>حذف</span>  <b>2</b> </div>
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="bankInfo.1.account">شماره حساب</label>
                                    <input type="text"
                                        id="bankInfo.1.account"
                                        className="inputTextFB ltrFB element"
                                        defaultValue={input.bankInfo?.['1']?.account ?? ''}
                                        onInput={e => { handleSaveValBankInput(e, 1, 'account') }}
                                        onFocus={(e) => clearInputError(e, account2ErrorRef)}
                                    />
                                </div>
                                <div className="errorContainerFB elementError" id="bankInfo.1.accountError" ref={account2ErrorRef}> </div>
                            </div>
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="bankInfo.1.card">شماره کارت</label>
                                    <input type="text" id="bankInfo.1.card" className="inputTextFB ltrFB element"
                                        defaultValue={input.bankInfo?.[1]?.card ?? ''}
                                        onInput={e => { handleSaveValBankInput(e, 1, 'card') }}
                                        onFocus={(e) => clearInputError(e, card2ErrorRef)}
                                    />
                                </div>
                                <div className="errorContainerFB elementError" id="bankInfo.1.cardError" ref={card2ErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="bankInfo.1.shaba">شماره شبا</label>
                                    <input type="text" id="bankInfo.1.shaba" className="inputShabaFB element ltrFB"
                                        defaultValue={input.bankInfo?.[1]?.shaba ?? ''}
                                        onInput={e => { handleSaveValBankInput(e, 1, 'shaba') }}
                                        onFocus={(e) => clearInputError(e, shaba2ErrorRef)}
                                    />
                                    <span className="unitShabaFB"> IR </span>
                                </div>
                                <div className="errorContainerFB elementError" id="bankInfo.1.shabaError" ref={shaba2ErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="bankInfo.1.bank">نام بانک </label>
                                    <select
                                        name=""
                                        id="bankInfo.1.bank"
                                        className="selectFB element inputTextFB"
                                        value={input.bankInfo?.[1]?.bank ?? ''}
                                        onChange={e => { handleSaveValBankInput(e, 1, 'bank') }}
                                        onClick={(e) => clearInputError(e, bank2ErrorRef)}
                                    >
                                        <option value=""> انتخاب </option>
                                        {optionBank}

                                    </select>
                                </div>
                                <div className="errorContainerFB elementError" id="bankInfo.1.bankError" ref={bank2ErrorRef}> </div>
                            </div>
                            <div className="moreBank" ref={moreBank2} onClick={() => showSectionBank(sectionBank3, moreBank2, true, 2)}> اضافه کردن اطلاعات بانکی بیشتر </div>
                        </div>

                        <div className="sectionFB --displayNone" ref={sectionBank3}>
                            <div className="delMoreBank"> <span onClick={() => showSectionBank(sectionBank3, moreBank2, false, 2)}>حذف</span> <b>3</b> </div>
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="bankInfo.2.account">شماره حساب</label>
                                    <input
                                        type="text"
                                        id="bankInfo.2.account"
                                        className="inputTextFB ltrFB element"
                                        defaultValue={input.bankInfo?.[2]?.account ?? ''}
                                        onInput={e => { handleSaveValBankInput(e, 2, 'account') }}
                                        onFocus={(e) => clearInputError(e, account3ErrorRef)}

                                    />
                                </div>
                                <div className="errorContainerFB elementError" id="bankInfo.2.accountError" ref={account3ErrorRef}> </div>
                            </div>
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="bankInfo.2.card">شماره کارت</label>
                                    <input type="text" id="bankInfo.2.card" className="inputTextFB ltrFB element"
                                        defaultValue={input.bankInfo?.[2]?.card ?? ''}
                                        onInput={e => { handleSaveValBankInput(e, 2, 'card') }}
                                        onFocus={(e) => clearInputError(e, card3ErrorRef)}

                                    />
                                </div>
                                <div className="errorContainerFB elementError" id="bankInfo.2.cardError" ref={card3ErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="bankInfo.2.shaba">شماره شبا</label>
                                    <input
                                        type="text"
                                        id="bankInfo.2.shaba" className="inputShabaFB element ltrFB"
                                        defaultValue={input.bankInfo?.[2]?.shaba ?? ''}
                                        onInput={e => { handleSaveValBankInput(e, 2, 'shaba') }}
                                        onFocus={(e) => clearInputError(e, shaba3ErrorRef)}

                                    />
                                    <span className="unitShabaFB"> IR </span>
                                </div>
                                <div className="errorContainerFB elementError" id="bankInfo.2.shabaError" ref={shaba3ErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="bankInfo.2.bank">نام بانک </label>
                                    <select
                                        name=""
                                        id="bankInfo.2.bank"
                                        className="selectFB element inputTextFB"
                                        value={input.bankInfo?.[2]?.bank ?? ''}
                                        onChange={e => { handleSaveValBankInput(e, 2, 'bank') }}
                                        onClick={(e) => clearInputError(e, bank3ErrorRef)}

                                    >
                                        <option value=""> انتخاب </option>
                                        {optionBank}
                                    </select>
                                </div>
                                <div className="errorContainerFB elementError" id="bankInfo.2.bankError" ref={bank3ErrorRef}> </div>
                            </div>
                            <div className="moreBank" ref={moreBank3} onClick={() => showSectionBank(sectionBank4, moreBank3, true, 3)}> اضافه کردن اطلاعات بانکی بیشتر </div>
                        </div>

                        <div className="sectionFB --displayNone" ref={sectionBank4}>
                            <div className="delMoreBank"> <span onClick={() => showSectionBank(sectionBank4, moreBank3, false, 3)}>حذف</span> <b>4</b>  </div>
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="bankInfo.3.account">شماره حساب</label>
                                    <input
                                        type="text"
                                        id="bankInfo.3.account"
                                        className="inputTextFB ltrFB element"
                                        defaultValue={input.bankInfo?.[3]?.account ?? ''}
                                        onInput={e => { handleSaveValBankInput(e, 3, 'account') }}
                                        onFocus={(e) => clearInputError(e, account4ErrorRef)}
                                    />
                                </div>
                                <div className="errorContainerFB elementError" id="bankInfo.3.accountError" ref={account4ErrorRef}> </div>
                            </div>
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="bankInfo.3.card">شماره کارت</label>
                                    <input type="text" id="bankInfo.3.card" className="inputTextFB ltrFB element"
                                        defaultValue={input.bankInfo?.[3]?.card ?? ''}
                                        onInput={e => { handleSaveValBankInput(e, 3, 'card') }}
                                        onFocus={(e) => clearInputError(e, card4ErrorRef)}

                                    />
                                </div>
                                <div className="errorContainerFB elementError" id="bankInfo.3.cardError" ref={card4ErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="bankInfo.3.shaba">شماره شبا</label>
                                    <input type="text" id="bankInfo.3.shaba" className="inputShabaFB element ltrFB"
                                        defaultValue={input.bankInfo?.[3]?.shaba ?? ''}
                                        onInput={e => { handleSaveValBankInput(e, 3, 'shaba') }}
                                        onFocus={(e) => clearInputError(e, shaba4ErrorRef)}

                                    />
                                    <span className="unitShabaFB"> IR </span>
                                </div>
                                <div className="errorContainerFB elementError" id="bankInfo.3.shabaError" ref={shaba4ErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="bankInfo.3.bank">نام بانک </label>
                                    <select
                                        name=""
                                        id="bankInfo.3.bank"
                                        className="selectFB element inputTextFB"
                                        value={input.bankInfo?.[3]?.bank ?? ''}
                                        onChange={e => { handleSaveValBankInput(e, 3, 'bank') }}
                                        onClick={(e) => clearInputError(e, bank4ErrorRef)}

                                    >
                                        <option value=""> انتخاب </option>
                                        {optionBank}
                                    </select>
                                </div>
                                <div className="errorContainerFB elementError" id="bankInfo.3.bankError" ref={bank4ErrorRef}> </div>
                            </div>
                            <div className="moreBank" ref={moreBank4}
                                onClick={() => showSectionBank(sectionBank5, moreBank4, true, 4)}
                            >
                                اضافه کردن اطلاعات بانکی بیشتر
                            </div>
                        </div>

                        <div className="sectionFB --displayNone" ref={sectionBank5}>
                            <div className="delMoreBank">
                                <span onClick={() => showSectionBank(sectionBank5, moreBank4, false, 4)}>حذف</span>  <b>5</b>
                            </div>
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="bankInfo.4.account">شماره حساب</label>
                                    <input
                                        type="text"
                                        id="bankInfo.4.account"
                                        className="inputTextFB ltrFB element"
                                        defaultValue={input.bankInfo?.[4]?.account ?? ''}
                                        onInput={e => { handleSaveValBankInput(e, 4, 'account') }}
                                        onFocus={(e) => clearInputError(e, account5ErrorRef)}

                                    />
                                </div>
                                <div className="errorContainerFB elementError" id="bankInfo.4.accountError" ref={account5ErrorRef}> </div>
                            </div>
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="bankInfo.4.card">شماره کارت</label>
                                    <input
                                        type="text"
                                        id="bankInfo.4.card"
                                        className="inputTextFB ltrFB element"
                                        defaultValue={input.bankInfo?.[4]?.card ?? ''}
                                        onInput={e => { handleSaveValBankInput(e, 4, 'card') }}
                                        onFocus={(e) => clearInputError(e, card5ErrorRef)}

                                    />
                                </div>
                                <div className="errorContainerFB elementError" id="bankInfo.4.cardError" ref={card5ErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="bankInfo.4.shaba">شماره شبا</label>
                                    <input
                                        type="text"
                                        id="bankInfo.4.shaba"
                                        className="inputShabaFB element ltrFB"
                                        defaultValue={input.bankInfo?.[4]?.shaba ?? ''}
                                        onInput={e => { handleSaveValBankInput(e, 4, 'shaba') }}
                                        onFocus={(e) => clearInputError(e, shaba5ErrorRef)}

                                    />
                                    <span className="unitShabaFB"> IR </span>
                                </div>
                                <div className="errorContainerFB elementError" id="bankInfo.4.shabaError" ref={shaba5ErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="bankInfo.4.bank">نام بانک </label>
                                    <select name="" id="bankInfo.4.bank" className="selectFB element inputTextFB"
                                        value={input.bankInfo?.[4]?.bank ?? ''}
                                        onChange={e => { handleSaveValBankInput(e, 4, 'bank') }}
                                        onClick={(e) => clearInputError(e, bank5ErrorRef)}

                                    >
                                        <option value=""> انتخاب </option>
                                        {optionBank}
                                    </select>
                                </div>
                                <div className="errorContainerFB elementError" id="bankInfo.4.bankError" ref={bank5ErrorRef}> </div>
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
                        <AddCustomerSearch
                            customerTypesSearch={customerTypes}
                            getCustomers={getCustomers}
                        />
                        {/* <div className="containerSearch_Se">
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

                            <div className="containerIdAType_Se">
                                <div className="id_Se">
                                    <sapn className="stringIdAType_Se"> شناسه </sapn>
                                    <input type="text" className="inputId_Se" />
                                   
                                </div>
                                <div className="type_Se"
                                    tabIndex="0"
                                    // onFocus={() => { }}
                                    onBlur={(e) => handleSetShowCustomerTypeSearch(e)}>
                                    <sapn className="stringIdAType_Se"> نوع مشتری </sapn>
                                    <div
                                        className="titleType_Se"
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
                                       
                                        className="showType_Se"
                                    

                                    >
                                        {showCustomerTypesSearch()}
                                    </div>}
                                </div>
                            </div>

                            <div className="containerName_Se">
                                <div className="name_Se">
                                    <sapn className="stringName_Se"> نام </sapn>
                                    <input type="text" className="inputName_Se" />
                                </div>
                                <div className="lastName_Se">
                                    <sapn className="stringName_Se"> نام‌خانوادگی </sapn>
                                    <input type="text" className="inputName_Se" />
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
                        </div> */}

                        <div className="rowListShowGe headRowListShowGe">
                            <span className="rowNumShowGe ">ردیف</span>
                            <span className="rowNumShowGe ">شناسه</span>
                            <span className="nameShowGE ">نام مشتری</span>
                            <span className="lastNameShowGE">نام خانوادگی</span>

                            <span className="typeShowGe headTypeShowGe">نوع مشتری</span>

                            <span className="headEditShowGe"> ویرایش  </span>
                            <span className="headDelShowGe"> حذف </span>

                        </div>

                        {customers ? returnCreatedCustomerRecords() : <Skeleton height={40} count={12} />}

                        {/* <PaginateZabi
                            totalPage={totalPage}
                            showCreatedRecord={disabledBtnShowRecords}
                        /> */}
                        <Pagination
                            className="pagination-bar"
                            currentPage={currentPage}
                            totalCount={data.length}
                            pageSize={PageSize}
                            totalPage={totalPage}
                            siblingCount={3}
                            onPageChange={page => { setCurrentPage(page); getCustomers(page) }}
                        />


                    </div>
                </div>

            </div>
        </div>
    );
};

export default AddCustomer;