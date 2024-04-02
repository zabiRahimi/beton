import Title from "./hooks/Title";
// import { DatePicker, InputDatePicker } from "jalaali-react-date-picker";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import "../../css/general.css";
import "../../css/formBeton.css";
import "../../css/addCustomer.css";
import DataZabi from "./hooks/DateZabi";
import useBank from "./hooks/useBank";
import { createRef, useEffect, useRef, useState } from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import ScaleLoader from 'react-spinners/ScaleLoader';
import CircleLoader from 'react-spinners/CircleLoader';

const AddCustomer = () => {

    const MySwal = withReactContent(Swal);

    const {
        years,
        months,
        days,
        nameDays,
        optionDays,
        optionMonth,
        optionYears,
    } = DataZabi();

    const { optionBank } = useBank();

    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    const container = useRef(null)
    const btnAddGeRef = useRef(null);
    const btnGetGeRef = useRef(null);

    const containerShowGeRef = useRef(null);
    const form = useRef(null);
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


    const [loading, setLoading] = useState(false);
    const [disabledBtnAddGe, setDisabledBtnAddGe] = useState(true);
    const [disabledBtnGetGe, setDisabledBtnGetGe] = useState(false);

    const [hideGetCustomer, setHideGetCustomer] = useState(true);
    const [flexDirection, setFlexDirection] = useState('columnGe');

    const [customerTypes, setCustomerTypes] = useState(null);
    const [customerTypeSelected, setCustomerTypeSelected] = useState([]);


    /** ست کردن موارد لازم هنگامی که کاربر ویرایش مشتری را انتخاب می‌کند */
    const [editCustomer, setEditCustomer] = useState(false);

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




    useEffect(() => {
        getCustomerType()
    }, []);

    useEffect(() => {
        if (customerTypes) {
            const newRefs = customerTypes.reduce((acc, value) => {
                acc[value.id] = createRef();
                return acc;
            }, {});
            setRefs(newRefs);
        }

    }, [customerTypes]);

    const[widthComponent,setWidthComponent]=useState(0) ;
    useEffect(() => {
        
       let widths=container.current.offsetWidth;
        setWidthComponent(widths)
      }, []);

    const addCustomer = () => {

        setDisabledBtnGetGe(false);
        setDisabledBtnAddGe(true);

        setFlexDirection('columnGe');

        setEditCustomer(false)

    }

    const getCustomer = () => {

        setDisabledBtnAddGe(false);
        setDisabledBtnGetGe(true);

        setFlexDirection('columnReverseGe');

        setHideGetCustomer(false);

    }

    /**
     * دریافت نوع مشتری 
     */
    async function getCustomerType() {
        await axios.get("/api/v1/getAllCustomerType").then((response) => {
            setCustomerTypes(response.data.CustomerTypes);
        });
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

            return <div className="itemCustomerTypeFB" onClick={() => AddCustomerType(customerType['id'], customerType['type'])}
                key={i}>
                <div className="checkedItemCustomerTypeFB" key={customerType['id']} ref={refs[customerType.id]}>
                    <i className="icofont-check-alt " />
                </div>
                <span className="nameItemcustomerTypeFB"> {customerType['type']} </span>

            </div>

        })

        return value;
    }

    const showCustomerTypeSelected = () => {
        let value = customerTypeSelected.map((customerType, i) => {
            return <div className="customerTypeSelectedFB" key={i}>
                <span className="nameItemcustomerTypeFB"> {customerType['type']} </span>
                <i className="icofont-trash delItemCustomerTypeFB" onClick={() => delCustomerTypeSelected(customerType['id'])} />
            </div>
        })

        return value;
    }

    const AddCustomerType = (id, type) => {
        let ref = refs[id]
        let val = ref.current.classList.toggle('IcheckedItemCustomerTypeFB');
        if (val) {
            setCustomerTypeSelected(old => [...old, { id, type }]);
            setInput(prevState => ({
                ...prevState,
                types: [...prevState.types, id]
            }));
            const typesString = customerTypeSelected.map((item) => item.type).join(' , ');
            lableCustomerType.current.textContent = typesString ? typesString + ',' + type : type;

            errorRCTYitem.current.classList.add('--hidden');
        } else {
            const updated = customerTypeSelected.filter(item => item.id !== id);
            setCustomerTypeSelected(updated);
            setInput(prevState => ({
                ...prevState,
                types: prevState.types.filter(typeId => typeId !== id)
            }));
            const typesString = updated.map((item) => item.type).join(' , ');

            lableCustomerType.current.textContent = typesString ? typesString : 'انتخاب';
        }
    }

    const delCustomerTypeSelected = (id) => {
        const updated = customerTypeSelected.filter(item => item.id !== id);
        setCustomerTypeSelected(updated);
        setInput(prevState => ({
            ...prevState,
            types: prevState.types.filter(typeId => typeId !== id)
        }));
        let ref = refs[id]
        ref.current.classList.toggle('IcheckedItemCustomerTypeFB');

        const typesString = updated.map((item) => item.type).join(' , ');

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
        let valDate = year + '/' + month + '/' + value;
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
        let valDate = year + '/' + value + '/' + day;
        setInput(prev => ({ ...prev, dateOfBirth: valDate }));
        // پاک کردن رنگ خط قرمز کادر سلکت از دریافت خطا
        monthSelect.current.classList.remove('borderRedFB');
    }

    const changeYear = (e) => {
        let { value } = e.target;

        if (value == '' || (Number(value) >= 1 && Number(value) <= 1500)) {
            setYear(value);
        }
        let valDate = value + '/' + month + '/' + day;
        setInput(prev => ({ ...prev, dateOfBirth: valDate }));
        // پاک کردن رنگ خط قرمز کادر سلکت از دریافت خطا
        yearSelect.current.classList.remove('borderRedFB');

    }

    // function isValidDate(dateString) {
    //     // تعریف یک الگو برای تاریخ با فرمت yyyy/mm/dd
    //     const regex = /^(13|14)\d\d\/(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])$/;

    //     return regex.test(dateString);
    //     // // بررسی مطابقت رشته ورودی با الگو
    //     // if (regex.test(dateString)) {
    //     //     return true;
    //     // } else {
    //     //     return false;
    //     // }
    // }
    const deleteDate = () => {
        setDay();
        setMonth();
        setYear();

    }

    const showFormEditCustomer = () => {

        setDisabledBtnGetGe(false);
        setDisabledBtnAddGe(false);

        setFlexDirection('columnGe');

        setEditCustomer(true);

    }

    const showSectionBank = (ref, refBtn, state, index) => {
        ref.current.classList.toggle('--displayNone');
        refBtn.current.classList.toggle('--displayNone');
        if (state) {
            setInput(prevInput => {
                let newBankInfo = [...prevInput.bankInfo];
                // newBankInfo.splice(index, 0, {bank: '', account: '', card: '', shaba:''}); 
                newBankInfo[index] = { bank: '', account: '', card: '', shaba: '' };
                return { ...prevInput, bankInfo: newBankInfo };
            });

        } else {
            setInput(prevInput => {
                let newBankInfo = [...prevInput.bankInfo];
                newBankInfo[index] = {}; // یا newBankInfo[index] = {};
                return { ...prevInput, bankInfo: newBankInfo };
                // let newBankInfo = prevInput.bankInfo.filter((item, i) => i !== index); 
                // return {...prevInput, bankInfo: newBankInfo}; 
            });

        }
    }

    const handleSaveValInput = (e, input) => {
        let { value } = e.target;

        (input == 'mobile' || input == 'telephone') && (value = addZeroFirstStr(value))

        setInput(prev => ({ ...prev, [input]: value }));
    }

    const handleSaveBalInputBank = (e, index, input) => {
        let { value } = e.target;
        setInput(prevInput => {
            let newBankInfo = [...prevInput.bankInfo];
            if (newBankInfo[index]) {
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
    const delErr = (e, refErr, types = false, date = false) => {
        e.target.classList.remove('borderRedFB');
        refErr.current && (refErr.current.innerHTML = '')
        date && dateOfBirth.current.classList.remove('borderRedFB');
        types && typesDiv.current.classList.remove('borderRedFB');

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
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
            ).then(response => {

                // const id = response.data.zabi;
                const id = response;


                form.current.reset();

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
                    let ref = refs[types['id']]
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

                MySwal.fire({
                    icon: "success",
                    title: "با موفقیت ثبت شد",
                    confirmButtonText: "  متوجه شدم  ",
                    timer: 3000,
                    timerProgressBar: true,
                    customClass: {
                        timerProgressBar: '--progressBarColorBlue',
                    }
                })

                // setIndex(prev => ({ ...prev, book_id: id, book: input.book }));

                // setBook({ id, ...input });

                // //کتاب ایجاد شده را به آرایه کتابها اضافه می‌کند
                // valBooks.push({ id, ...input });

                // setValBooks(valBooks);

                // setInput({ book: '', link: '' });

                // Swal.fire({
                //     position: 'center',
                //     icon: 'success',
                //     title: 'ثبت کتاب با موفقیت انجام شد ',
                //     showConfirmButton: false,
                //     timer: 3000
                // })
            })
                .catch(
                    error => {
                        if (error.response.status == 422) {

                            let id = Object.keys(error.response.data.errors)[0];
                            console.log(id);
                            const element = document.getElementById(id);
                            let scrollPosition = window.scrollY || window.pageYOffset;

                            const top = element.getBoundingClientRect().top + scrollPosition - 20;
                            console.log(top);
                            window.scrollTo({
                                top: top,
                                behavior: 'smooth'
                            });


                            Object.entries(error.response.data.errors).map(([key, val]) => {
                                document.getElementById(key).classList.add('borderRedFB');

                                document.getElementById(key + 'Error').innerHTML = val;
                                if (key == 'dateOfBirth') {
                                    day || daySelect.current.classList.add('borderRedFB');
                                    month || monthSelect.current.classList.add('borderRedFB');
                                    year || yearSelect.current.classList.add('borderRedFB');
                                }
                            });

                        }

                        // error => {
                        //     notify.current.innerHTML = ''
                        //     if (error.response.status == 422) {
                        //         const elementError = Object.keys(error.response.data.errors)[0];
                        //         let divError;
                        //         switch (elementError) {
                        //             case 'book':
                        //                 divError = bookError.current
                        //                 break;
                        //             case 'link':
                        //                 divError = linkError.current
                        //         }
                        //         divError.innerHTML = `<div class="error">${error.response.data.errors[elementError][0]}</div>`
                        //         divError.scrollIntoViewIfNeeded({ behavior: "smooth" });
                        //     }
                        //     else {
                        //         notify.current.innerHTML = `<div class='error'>'خطایی رخ داده است، مطمعن شوید دیتابیس فعال است.'</div>`
                        //         notify.current.scrollIntoViewIfNeeded({ behavior: "smooth" });
                        //     }
                        // }
                    }
                )
        } catch (error) {
            // بررسی خطا
        }
        setLoading(false)
    }

    const addZeroFirstStr = (val) => {
        // let val = e.target.value;

        isFirstDigitZero(val) || (val = 0 + val);
        return val;

    }

    function isFirstDigitZero(str) {
        // اگر اولین کاراکتر رشته صفر باشد، تابع true برمی‌گرداند
        return str.charAt(0) === '0';
    }
    

     
    return (
        <div className="containerAddCustomer" ref={container}
        >

            {/* <ClipLoader color="#123abc" loading={true} size={150} /> */}
            <ScaleLoader loading={true} cssOverride={{
                backgroundColor: '#6d6b6b',
                position: 'fixed',
                top:0,
                width: widthComponent+'px',
                height: '100vh',
                zIndex: 100,
                opacity: 0.5,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'


            }} />
            {/* <CircleLoader color="#36d7b7" /> */}

            <Title title="تعریف مشتری" />
            <div className="headPageGe">
                <button
                    className={`--styleLessBtn btnAddGe ${disabledBtnAddGe ? 'disabledBtnGe' : 'enabledBtnGe'}`}
                    ref={btnAddGeRef} onClick={addCustomer}
                    disabled={disabledBtnAddGe}
                >
                    تعریف مشتری
                </button>

                <button
                    className={`--styleLessBtn btnGetGe ${disabledBtnGetGe ? 'disabledBtnGe' : 'enabledBtnGe'} `}
                    ref={btnGetGeRef}
                    onClick={getCustomer}
                    disabled={disabledBtnGetGe}
                >
                    مشاهده مشتری‌ها
                </button>
            </div>
            <div className={`containerMainAS_Ge ${flexDirection}`}>

                <div className="continerAddGe containerAddCustomer">
                    <form action="" className="formBeton" ref={form}>
                        <h5 className={`titleFormFB ${editCustomer ? '' : 'hideGe'}`}>ویرایش مشتری</h5>

                        <div className="sectionFB">

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="name">نام مشتری</label>
                                    <input
                                        type="text"
                                        className="inputTextFB"
                                        id="name"
                                        onChange={e => handleSaveValInput(e, 'name')}
                                        onFocus={e => delErr(e, nameErrorRef)}
                                        autoFocus
                                    />
                                    <i className="icofont-ui-rating starFB" />
                                </div>
                                <div className="errorContainerFB" id="nameError" ref={nameErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="lastName">نام خانوادگی</label>
                                    <input
                                        type="text"
                                        className="inputTextFB"
                                        id="lastName"
                                        onChange={e => handleSaveValInput(e, 'lastName')}
                                        onFocus={e => delErr(e, lastNameErrorRef)}
                                    />
                                    <i className="icofont-ui-rating starFB" />
                                </div>
                                <div className="errorContainerFB" id="lastNameError" ref={lastNameErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="father">نام پدر</label>
                                    <input
                                        type="text"
                                        className="inputTextFB"
                                        id="father"
                                        onChange={e => handleSaveValInput(e, 'father')}
                                        onFocus={e => delErr(e, fatherErrorRef)}
                                    />

                                </div>
                                <div className="errorContainerFB" id="fatherError" ref={fatherErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label  >نوع مشتری </label>
                                    <div className="selectFB containerCustomerTypeFB"
                                        id="types"
                                        ref={typesDiv}
                                        onClick={(e) => { showDivCustomerType(); delErr(e, typesErrorRef, true, false) }}
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
                                            {customerTypes ? showCustomerTypes() : <Skeleton height={35} count={8} />}
                                        </div>
                                    </div>
                                    <i className="icofont-ui-rating starFB" />

                                </div>
                                <div className="errorContainerFB" id="typesError" ref={typesErrorRef}> </div>
                            </div>
                        </div>

                        <div className="sectionFB">
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="nationalCode">کد ملی </label>
                                    <input type="text" id="nationalCode" className="inputTextFB ltrFB"
                                        onChange={e => handleSaveValInput(e, 'nationalCode')}
                                        onFocus={(e) => delErr(e, nationalCodeErrorRef)}
                                    />
                                </div>
                                <div className="errorContainerFB" id="nationalCodeError" ref={nationalCodeErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="day">تاریخ تولد </label>
                                    <div className="divDateBirth">
                                        <div className="divUpDateAcus" id="dateOfBirth"
                                            ref={dateOfBirth}
                                        >
                                            <input
                                                type="text"
                                                className="inputTextDateACus inputDayTDACus"
                                                placeholder="1"
                                                id="day"
                                                value={day || ''}
                                                onInput={(e) => changeDay(e)}
                                                onFocus={(e) => delErr(e, dateOfBirthErrorRef, false, true)}

                                            />
                                            <span>/</span>
                                            <input
                                                type="text"
                                                className="inputTextDateACus inputMonthTDACus"
                                                placeholder="1"
                                                value={month || ''}
                                                onInput={(e) => changeMonth(e)}
                                                onFocus={(e) => delErr(e, dateOfBirthErrorRef, false, true)}

                                            />
                                            <span>/</span>
                                            <input
                                                type="text"
                                                className="inputTextDateACus inputYearTDACus"
                                                placeholder="1300"
                                                value={year || ''}
                                                onInput={(e) => { changeYear(e) }}
                                                onFocus={(e) => delErr(e, dateOfBirthErrorRef, false, true)}

                                            />
                                        </div>

                                        <div className="divDownDateAcus" >
                                            <select
                                                value={day}
                                                ref={daySelect}
                                                onChange={(e) => changeDay(e)}
                                                onClick={(e) => delErr(e, dateOfBirthErrorRef, false, true)}

                                            >
                                                <option value="">روز</option>
                                                {optionDays}
                                            </select>
                                            <select
                                                value={month}
                                                ref={monthSelect}
                                                onChange={(e) => changeMonth(e)}
                                                onClick={(e) => delErr(e, dateOfBirthErrorRef, false, true)}

                                            >
                                                <option value="">ماه</option>
                                                {optionMonth}
                                            </select>
                                            <select
                                                value={year}
                                                ref={yearSelect}
                                                onChange={(e) => { changeYear(e) }}
                                                onClick={(e) => delErr(e, dateOfBirthErrorRef, false, true)}

                                            >
                                                <option value="">سال</option>
                                                {optionYears}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="errorContainerFB" id="dateOfBirthError" ref={dateOfBirthErrorRef}> </div>
                            </div>
                        </div>

                        <div className="sectionFB">
                            <div className="divRightFB">
                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label htmlFor="mobile">موبایل</label>
                                        <input type="text" id="mobile" className="inputTextFB ltrFB"
                                            onBlur={e => handleSaveValInput(e, 'mobile')}
                                            onFocus={(e) => delErr(e, mobileErrorRef)}

                                        />
                                    </div>
                                    <div className="errorContainerFB" id="mobileError" ref={mobileErrorRef}> </div>

                                </div>

                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label htmlFor="telephone">تلفن </label>
                                        <input type="text" id="telephone" className="inputTextFB ltrFB"
                                            onBlur={e => handleSaveValInput(e, 'telephone')}
                                            onFocus={(e) => delErr(e, telephoneErrorRef)}

                                        />
                                    </div>
                                    <div className="errorContainerFB" id="telephoneError" ref={telephoneErrorRef}> </div>
                                </div>

                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label htmlFor="postalCode">کد پستی</label>
                                        <input type="text"
                                            id="postalCode" className="inputTextFB ltrFB"
                                            onChange={e => handleSaveValInput(e, 'postalCode')}
                                            onFocus={(e) => delErr(e, postalCodeErrorRef)}

                                        />
                                    </div>
                                    <div className="errorContainerFB" id="postalCodeError" ref={postalCodeErrorRef}> </div>
                                </div>
                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label htmlFor="email">ایمیل</label>
                                        <input type="text" id="email" className="inputTextFB ltrFB"
                                            onChange={e => handleSaveValInput(e, 'email')}
                                            onFocus={(e) => delErr(e, emailErrorRef)}

                                        />
                                    </div>
                                    <div className="errorContainerFB" id="emailError" ref={emailErrorRef}> </div>
                                </div>
                            </div>

                            <div className="divLeftFB">
                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label htmlFor="address">آدرس</label>
                                        <textarea id="address" className="textareaAddressACu"
                                            onChange={e => handleSaveValInput(e, 'address')}
                                            onFocus={(e) => delErr(e, addressErrorRef)}

                                        />
                                    </div>
                                    <div className="errorContainerFB" id="addressError" ref={addressErrorRef}> </div>
                                </div>
                            </div>
                        </div>

                        <div className="sectionFB">
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="bankInfo.0.account">شماره حساب</label>
                                    <input type="text" id="bankInfo.0.account"
                                        className="inputTextFB ltrFB"
                                        onChange={e => { handleSaveBalInputBank(e, 0, 'account') }}
                                        onFocus={(e) => delErr(e, account1ErrorRef)}

                                    />
                                </div>
                                <div className="errorContainerFB" id="bankInfo.0.accountError" ref={account1ErrorRef}> </div>
                            </div>
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="bankInfo.0.card">شماره کارت</label>
                                    <input type="text" id="bankInfo.0.card" className="inputTextFB ltrFB"
                                        onChange={e => { handleSaveBalInputBank(e, 0, 'card') }}
                                        onFocus={(e) => delErr(e, card1ErrorRef)}

                                    />
                                </div>
                                <div className="errorContainerFB" id="bankInfo.0.cardError" ref={card1ErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="bankInfo.0.shaba">شماره شبا</label>
                                    <input type="text" id="bankInfo.0.shaba" className="inputShabaFB ltrFB"
                                        onChange={e => { handleSaveBalInputBank(e, 0, 'shaba') }}
                                        onFocus={(e) => delErr(e, shaba1ErrorRef)}
                                    />
                                    <span className="unitShabaFB"> IR </span>
                                </div>
                                <div className="errorContainerFB" id="bankInfo.0.shabaError" ref={shaba1ErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="bankInfo.0.bank">نام بانک </label>
                                    <select name="" id="bankInfo.0.bank" className="selectFB inputTextFB"
                                        onChange={e => { handleSaveBalInputBank(e, 0, 'bank') }}
                                        onClick={(e) => delErr(e, bank1ErrorRef)}
                                    >
                                        <option value=""> انتخاب </option>
                                        {optionBank}
                                    </select>
                                </div>
                                <div className="errorContainerFB" id="bankInfo.0.bankError" ref={bank1ErrorRef}> </div>
                            </div>

                            <div className="moreBank" ref={moreBank1}
                                onClick={() => showSectionBank(sectionBank2, moreBank1, true, 1)}> اضافه کردن اطلاعات بانکی بیشتر </div>
                        </div>

                        <div className="sectionFB --displayNone" ref={sectionBank2}>
                            <div className="delMoreBank"> <span onClick={() => showSectionBank(sectionBank2, moreBank1, false, 1)}>حذف</span>  <b>2</b> </div>
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="bankInfo.1.account">شماره حساب</label>
                                    <input type="text" id="bankInfo.1.account"
                                        className="inputTextFB ltrFB"
                                        onChange={e => { handleSaveBalInputBank(e, 1, 'account') }}
                                        onFocus={(e) => delErr(e, account2ErrorRef)}
                                    />
                                </div>
                                <div className="errorContainerFB" id="bankInfo.1.accountError" ref={account2ErrorRef}> </div>
                            </div>
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="bankInfo.1.card">شماره کارت</label>
                                    <input type="text" id="bankInfo.1.card" className="inputTextFB ltrFB"
                                        onChange={e => { handleSaveBalInputBank(e, 1, 'card') }}
                                        onFocus={(e) => delErr(e, card2ErrorRef)}
                                    />
                                </div>
                                <div className="errorContainerFB" id="bankInfo.1.cardError" ref={card2ErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="bankInfo.1.shaba">شماره شبا</label>
                                    <input type="text" id="bankInfo.1.shaba" className="inputShabaFB ltrFB"
                                        onChange={e => { handleSaveBalInputBank(e, 1, 'shaba') }}
                                        onFocus={(e) => delErr(e, shaba2ErrorRef)}
                                    />
                                    <span className="unitShabaFB"> IR </span>
                                </div>
                                <div className="errorContainerFB" id="bankInfo.1.shabaError" ref={shaba2ErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="bankInfo.1.bank">نام بانک </label>
                                    <select name="" id="bankInfo.1.bank" className="selectFB inputTextFB"
                                        onChange={e => { handleSaveBalInputBank(e, 1, 'bank') }}
                                        onClick={(e) => delErr(e, bank2ErrorRef)}
                                    >
                                        <option value=""> انتخاب </option>
                                        {optionBank}

                                    </select>
                                </div>
                                <div className="errorContainerFB" id="bankInfo.1.bankError" ref={bank2ErrorRef}> </div>
                            </div>
                            <div className="moreBank" ref={moreBank2} onClick={() => showSectionBank(sectionBank3, moreBank2, true, 2)}> اضافه کردن اطلاعات بانکی بیشتر </div>
                        </div>

                        <div className="sectionFB --displayNone" ref={sectionBank3}>
                            <div className="delMoreBank"> <span onClick={() => showSectionBank(sectionBank3, moreBank2, false, 2)}>حذف</span> <i>3</i> </div>
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="bankInfo.2.account">شماره حساب</label>
                                    <input type="text" id="bankInfo.2.account"
                                        className="inputTextFB ltrFB"
                                        onChange={e => { handleSaveBalInputBank(e, 2, 'account') }}
                                        onFocus={(e) => delErr(e, account3ErrorRef)}

                                    />
                                </div>
                                <div className="errorContainerFB" id="bankInfo.2.accountError" ref={account3ErrorRef}> </div>
                            </div>
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="bankInfo.2.card">شماره کارت</label>
                                    <input type="text" id="bankInfo.2.card" className="inputTextFB ltrFB"
                                        onChange={e => { handleSaveBalInputBank(e, 2, 'card') }}
                                        onFocus={(e) => delErr(e, card3ErrorRef)}

                                    />
                                </div>
                                <div className="errorContainerFB" id="bankInfo.2.cardError" ref={card3ErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="bankInfo.2.shaba">شماره شبا</label>
                                    <input type="text" id="bankInfo.2.shaba" className="inputShabaFB ltrFB"
                                        onChange={e => { handleSaveBalInputBank(e, 2, 'shaba') }}
                                        onFocus={(e) => delErr(e, shaba3ErrorRef)}

                                    />
                                    <span className="unitShabaFB"> IR </span>
                                </div>
                                <div className="errorContainerFB" id="bankInfo.2.shabaError" ref={shaba3ErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="bankInfo.2.bank">نام بانک </label>
                                    <select name="" id="bankInfo.2.bank" className="selectFB inputTextFB"
                                        onChange={e => { handleSaveBalInputBank(e, 2, 'bank') }}
                                        onClick={(e) => delErr(e, bank3ErrorRef)}

                                    >
                                        <option value=""> انتخاب </option>
                                        {optionBank}
                                    </select>
                                </div>
                                <div className="errorContainerFB" id="bankInfo.2.bankError" ref={bank3ErrorRef}> </div>
                            </div>
                            <div className="moreBank" ref={moreBank3} onClick={() => showSectionBank(sectionBank4, moreBank3, true, 3)}> اضافه کردن اطلاعات بانکی بیشتر </div>
                        </div>

                        <div className="sectionFB --displayNone" ref={sectionBank4}>
                            <div className="delMoreBank"> <span onClick={() => showSectionBank(sectionBank4, moreBank3, false, 3)}>حذف</span> <b>4</b>  </div>
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="bankInfo.3.account">شماره حساب</label>
                                    <input type="text" id="bankInfo.3.account"
                                        className="inputTextFB ltrFB"
                                        onChange={e => { handleSaveBalInputBank(e, 3, 'account') }}
                                        onFocus={(e) => delErr(e, account4ErrorRef)}

                                    />
                                </div>
                                <div className="errorContainerFB" id="bankInfo.3.accountError" ref={account4ErrorRef}> </div>
                            </div>
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="bankInfo.3.card">شماره کارت</label>
                                    <input type="text" id="bankInfo.3.card" className="inputTextFB ltrFB"
                                        onChange={e => { handleSaveBalInputBank(e, 3, 'card') }}
                                        onFocus={(e) => delErr(e, card4ErrorRef)}

                                    />
                                </div>
                                <div className="errorContainerFB" id="bankInfo.3.cardError" ref={card4ErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="bankInfo.3.shaba">شماره شبا</label>
                                    <input type="text" id="bankInfo.3.shaba" className="inputShabaFB ltrFB"
                                        onChange={e => { handleSaveBalInputBank(e, 3, 'shaba') }}
                                        onFocus={(e) => delErr(e, shaba4ErrorRef)}

                                    />
                                    <span className="unitShabaFB"> IR </span>
                                </div>
                                <div className="errorContainerFB" id="bankInfo.3.shabaError" ref={shaba4ErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="bankInfo.3.bank">نام بانک </label>
                                    <select name="" id="bankInfo.3.bank" className="selectFB inputTextFB"
                                        onChange={e => { handleSaveBalInputBank(e, 3, 'bank') }}
                                        onClick={(e) => delErr(e, moreBank4)}

                                    >
                                        <option value=""> انتخاب </option>
                                        {optionBank}
                                    </select>
                                </div>
                                <div className="errorContainerFB" id="bankInfo.3.bankError" ref={bank4ErrorRef}> </div>
                            </div>
                            <div className="moreBank" ref={moreBank4}
                                onClick={() => showSectionBank(sectionBank5, moreBank4, true, 4)}
                            > اضافه کردن اطلاعات بانکی بیشتر </div>
                        </div>

                        <div className="sectionFB --displayNone" ref={sectionBank5}>
                            <div className="delMoreBank">
                                <span onClick={() => showSectionBank(sectionBank5, moreBank4, false, 4)}>حذف</span>  <b>5</b>
                            </div>
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="bankInfo.4.account">شماره حساب</label>
                                    <input type="text" id="bankInfo.4.account"
                                        className="inputTextFB ltrFB"
                                        onChange={e => { handleSaveBalInputBank(e, 4, 'account') }}
                                        onFocus={(e) => delErr(e, account5ErrorRef)}

                                    />
                                </div>
                                <div className="errorContainerFB" id="bankInfo.4.accountError" ref={account5ErrorRef}> </div>
                            </div>
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="bankInfo.4.card">شماره کارت</label>
                                    <input type="text" id="bankInfo.4.card" className="inputTextFB ltrFB"
                                        onChange={e => { handleSaveBalInputBank(e, 4, 'card') }}
                                        onFocus={(e) => delErr(e, card5ErrorRef)}

                                    />
                                </div>
                                <div className="errorContainerFB" id="bankInfo.4.cardError" ref={card5ErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="bankInfo.4.shaba">شماره شبا</label>
                                    <input type="text" id="bankInfo.4.shaba" className="inputShabaFB ltrFB"
                                        onChange={e => { handleSaveBalInputBank(e, 4, 'shaba') }}
                                        onFocus={(e) => delErr(e, shaba5ErrorRef)}

                                    />
                                    <span className="unitShabaFB"> IR </span>
                                </div>
                                <div className="errorContainerFB" id="bankInfo.4.shabaError" ref={shaba5ErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="bankInfo.4.bank">نام بانک </label>
                                    <select name="" id="bankInfo.4.bank" className="selectFB inputTextFB"
                                        onChange={e => { handleSaveBalInputBank(e, 4, 'bank') }}
                                        onClick={(e) => delErr(e, bank5ErrorRef)}

                                    >
                                        <option value=""> انتخاب </option>
                                        {optionBank}
                                    </select>
                                </div>
                                <div className="errorContainerFB" id="bankInfo.4.bankError" ref={bank5ErrorRef}> </div>
                            </div>
                        </div>


                        <div className="sectionFB divBtnsFB">

                            <Button
                                variant="success"
                                className="btnSaveFB"
                                onClick={handleSubmit}
                            >
                                {editCustomer ? 'ویرایش' : 'ثبت'}
                            </Button>

                            <Button
                                type="reset"
                                variant="warning"
                                className="btnDelFB"
                                // className={editCustomer ? 'hideGe' : ''}
                                onClick={deleteDate}
                            >
                                پاک کن
                            </Button>

                        </div>
                    </form>
                </div>

                <div
                    className={`containerShowGe containerShowCustomer  ${hideGetCustomer ? 'hideGe' : ''}`}
                    ref={containerShowGeRef}
                >
                    <h4 className="titleShowGe"> مشتری‌های تعریف شده</h4>
                    <div className="divListShowGe">

                        <div className="rowListShowGe headRowListShowGe">
                            <span className="rowNumShowGe ">ردیف</span>
                            <span className="nameShowGE ">نام مشتری</span>
                            <span className="typeShowGe headTypeShowGe">نوع مشتری</span>

                            <span className="headEditShowGe"> ویرایش  </span>
                            <span className="headDelShowGe"> حذف </span>

                        </div>

                        <div className="rowListShowGe">
                            <span className="rowNumShowGe">1</span>
                            <span className="nameShowGE">رحیمی</span>
                            <span className="typeShowGe">خریدار</span>

                            <div className="divEditGe">
                                <button className="--styleLessBtn btnEditGe" title=" ویرایش "
                                    onClick={showFormEditCustomer}
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

                        <div className="rowListShowGe">
                            <span className="rowNumShowGe">2</span>
                            <span className="nameShowGE">ابراهیمی</span>
                            <span className="typeShowGe">فروشنده شن و ماسه</span>

                            <div className="divEditGe">
                                <button className="--styleLessBtn btnEditGe" title=" ویرایش ">
                                    <i className="icofont-pencil iEditGe" />
                                </button>
                            </div>

                            <div className="divDelGe">
                                <button className="--styleLessBtn btnDelGe" title=" حذف ">
                                    <i className="icofont-trash iDelGe" />
                                </button>
                            </div>

                        </div>

                        <div className="rowListShowGe">
                            <span className="rowNumShowGe">3</span>
                            <span className="nameShowGE">اسکندری</span>
                            <span className="typeShowGe">خریدار</span>
                            <div className="divEditGe">
                                <button className="--styleLessBtn btnEditGe" title=" ویرایش "
                                    onClick={showFormEditCustomer}>
                                    <i className="icofont-pencil iEditGe" />
                                </button>
                            </div>

                            <div className="divDelGe">
                                <button className="--styleLessBtn btnDelGe" title=" حذف ">
                                    <i className="icofont-trash iDelGe" />
                                </button>
                            </div>

                        </div>

                        <div className="rowListShowGe">
                            <span className="rowNumShowGe">4</span>
                            <span className="nameShowGE">نعمت الهی</span>
                            <span className="typeShowGe">فروشنده سیمان</span>
                            <div className="divEditGe">
                                <button
                                    className="--styleLessBtn btnEditGe"
                                    title=" ویرایش "
                                    onClick={showFormEditCustomer}
                                >
                                    <i className="icofont-pencil iEditGe" />
                                </button>
                            </div>

                            <div className="divDelGe">
                                <button className="--styleLessBtn btnDelGe" title=" حذف "
                                    onClick={showFormEditCustomer}
                                >
                                    <i className="icofont-trash iDelGe" />
                                </button>
                            </div>

                        </div>

                        <div className="rowListShowGe">
                            <span className="rowNumShowGe">5</span>
                            <span className="nameShowGE">مشکین فام</span>
                            <span className="typeShowGe">فروشنده</span>
                            <div className="divEditGe">
                                <button className="--styleLessBtn btnEditGe" title=" ویرایش "
                                    onClick={showFormEditCustomer}
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

                        <div className="rowListShowGe">
                            <span className="rowNumShowGe">6</span>
                            <span className="nameShowGE">مهرآور</span>
                            <span className="typeShowGe">راننده</span>
                            <div className="divEditGe">
                                <button className="--styleLessBtn btnEditGe" title=" ویرایش "
                                    onClick={showFormEditCustomer}
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

                        <div className="rowListShowGe">

                            <span className="rowNumShowGe">7</span>
                            <span className="nameShowGE">جاویدی</span>
                            <span className="typeShowGe">پرسنل</span>

                            <div className="divEditGe">
                                <button className="--styleLessBtn btnEditGe" title=" ویرایش "
                                    onClick={showFormEditCustomer}
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
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AddCustomer;
