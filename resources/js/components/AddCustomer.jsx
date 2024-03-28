import Title from "./hooks/Title";
// import { DatePicker, InputDatePicker } from "jalaali-react-date-picker";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import "../../css/general.css";
import "../../css/formBeton.css";
import "../../css/addCustomer.css";
import DataZabi from "./hooks/DateZabi";
import { createRef, useEffect, useRef, useState } from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const AddCustomer = () => {
    const {
        years,
        months,
        days,
        nameDays,
        optionDays,
        optionMonth,
        optionYears,
    } = DataZabi();

    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    const btnAddGeRef = useRef(null);
    const btnGetGeRef = useRef(null);

    const containerShowGeRef = useRef(null);

    const nameErrorRef = useRef(null);
    const lastNameErrorRef = useRef(null);
    const fatherErrorRef = useRef(null);
    const typeErrorRef = useRef(null);
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


    const [disabledBtnAddGe, setDisabledBtnAddGe] = useState(true);
    const [disabledBtnGetGe, setDisabledBtnGetGe] = useState(false);

    const [hideGetCustomer, setHideGetCustomer] = useState(true);
    const [flexDirection, setFlexDirection] = useState('columnGe');

    const [customerTypes, setCustomerTypes] = useState(null);
    const [customerTypeSelected, setCustomerTypeSelected] = useState([]);


    /** ست کردن موارد لازم هنگامی که کاربر ویرایش مشتری را انتخاب می‌کند */
    const [editCustomer, setEditCustomer] = useState(false);

    const [day, setDay] = useState();
    const [month, setMonth] = useState();
    const [year, setYear] = useState();

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
                shaba:''
            }
        ]
    });

    console.log(input.bankInfo);

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
        let day = e.target.value;
        setDay(day);
    }

    const changeMonth = (e) => {
        let month = e.target.value;
        setMonth(month);
    }

    const changeYear = (e) => {
        let year = e.target.value;
        setYear(year);
    }

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
        if(state){
            setInput(prevInput => {
                let newBankInfo = [...prevInput.bankInfo]; 
                // newBankInfo.splice(index, 0, {bank: '', account: '', card: '', shaba:''}); 
                newBankInfo[index] = {bank: '', account: '', card: '', shaba:''};
                return {...prevInput, bankInfo: newBankInfo};
              });
              
        }else{
            setInput(prevInput => {
                let newBankInfo = [...prevInput.bankInfo]; 
                newBankInfo[index] = {}; // یا newBankInfo[index] = {};
                return {...prevInput, bankInfo: newBankInfo}; 
                // let newBankInfo = prevInput.bankInfo.filter((item, i) => i !== index); 
                // return {...prevInput, bankInfo: newBankInfo}; 
              });
              
        }
    }

    const handleSaveValInput = (e, input) => {
        let { value } = e.target;
        setInput(prev => ({ ...prev, [input]: value }));
    }

    const handleSaveBalInputBank =(e, index, input)=>{
        let { value } = e.target;
        setInput(prevInput => {
            let newBankInfo = [...prevInput.bankInfo]; 
            if (newBankInfo[index]) { // اگر آبجکت با ایندکس 3 وجود دارد
              newBankInfo[index] = {...newBankInfo[index], [input]: value}; // مقداردهی کلید account
            }
            return {...prevInput, bankInfo: newBankInfo}; 
          });
    }

    // const delMoreBank =(ref, refBtn)=>{
    //     ref.current.classList.toggle('--hidden');
    //     refBtn.current.classList.toggle('--hidden');
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(
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
            console.log(response);

            // form.current.reset();

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
                    console.log('naiiiii');
                    console.log(error.response.data);
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
            )
    }


    return (
        <>
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
                    <form action="" className="formBeton">
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
                                        autoFocus
                                    />
                                    <i className="icofont-ui-rating starFB" />
                                </div>
                                <div className="errorContainerFB" ref={nameErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="lastName">نام خانوادگی</label>
                                    <input
                                        type="text"
                                        className="inputTextFB"
                                        id="lastName"
                                        onChange={e => handleSaveValInput(e, 'lastName')}
                                    />
                                    <i className="icofont-ui-rating starFB" />
                                </div>
                                <div className="errorContainerFB" ref={lastNameErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="father">نام پدر</label>
                                    <input
                                        type="text"
                                        className="inputTextFB"
                                        id="father"
                                        onChange={e => handleSaveValInput(e, 'father')}
                                    />

                                </div>
                                <div className="errorContainerFB" ref={fatherErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="type" >نوع مشتری </label>
                                    <div className="selectFB containerCustomerTypeFB"
                                        onClick={showDivCustomerType}
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
                                <div className="errorContainerFB" ref={typeErrorRef}> </div>
                            </div>
                        </div>

                        <div className="sectionFB">
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="nationalCode">کد ملی </label>
                                    <input type="text" id="nationalCode" className="inputTextFB ltrFB"
                                        onChange={e => handleSaveValInput(e, 'nationalCode')}
                                    />
                                </div>
                                <div className="errorContainerFB" ref={nationalCodeErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="day">تاریخ تولد </label>
                                    <div className="divDateBirth">
                                        <div className="divUpDateAcus">
                                            <input
                                                type="text"
                                                className="inputTextDateACus inputDayTDACus"
                                                placeholder="1"
                                                id="day"
                                                value={day}
                                                onInput={(e) => changeDay(e)}
                                            />
                                            <span>/</span>
                                            <input
                                                type="text"
                                                className="inputTextDateACus inputMonthTDACus"
                                                placeholder="1"
                                                value={month}
                                                onInput={(e) => changeMonth(e)}
                                            />
                                            <span>/</span>
                                            <input
                                                type="text"
                                                className="inputTextDateACus inputYearTDACus"
                                                placeholder="1300"
                                                value={year}
                                                onInput={(e) => { changeYear(e) }}
                                            />
                                        </div>

                                        <div className="divDownDateAcus">
                                            <select name="" id="" value={day} onChange={(e) => changeDay(e)}>
                                                <option value="">روز</option>
                                                {optionDays}
                                            </select>
                                            <select name="" id="" value={month} onChange={(e) => changeMonth(e)}>
                                                <option value="">ماه</option>
                                                {optionMonth}
                                            </select>
                                            <select name="" id="" value={year} onChange={(e) => { changeYear(e) }}>
                                                <option value="">سال</option>
                                                {optionYears}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="errorContainerFB" ref={dateOfBirthErrorRef}> </div>
                            </div>
                        </div>

                        <div className="sectionFB">
                            <div className="divRightFB">
                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label htmlFor="mobile">موبایل</label>
                                        <input type="text" id="mobile" className="inputTextFB ltrFB"
                                            onChange={e => handleSaveValInput(e, 'mobile')} />
                                    </div>
                                    <div className="errorContainerFB" ref={mobileErrorRef}> </div>

                                </div>

                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label htmlFor="telephone">تلفن </label>
                                        <input type="text" id="telephone" className="inputTextFB ltrFB"
                                            onChange={e => handleSaveValInput(e, 'telephone')} />
                                    </div>
                                    <div className="errorContainerFB" ref={telephoneErrorRef}> </div>
                                </div>

                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label htmlFor="postalCode">کد پستی</label>
                                        <input type="text"
                                            id="postalCode" className="inputTextFB ltrFB"
                                            onChange={e => handleSaveValInput(e, 'postalCode')} />
                                    </div>
                                    <div className="errorContainerFB" ref={postalCodeErrorRef}> </div>
                                </div>
                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label htmlFor="email">ایمیل</label>
                                        <input type="text" id="email" className="inputTextFB ltrFB"
                                            onChange={e => handleSaveValInput(e, 'email')} />
                                    </div>
                                    <div className="errorContainerFB" ref={emailErrorRef}> </div>
                                </div>
                            </div>

                            <div className="divLeftFB">
                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label htmlFor="address">آدرس</label>
                                        <textarea id="address" className="textareaAddressACu"
                                            onChange={e => handleSaveValInput(e, 'address')} />
                                    </div>
                                    <div className="errorContainerFB" ref={addressErrorRef}> </div>
                                </div>
                            </div>
                        </div>

                        <div className="sectionFB">
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="account1">شماره حساب</label>
                                    <input type="text" id="account1"
                                        className="inputTextFB ltrFB"
                                        onChange={e=>{handleSaveBalInputBank(e, 0, 'account')}} />
                                </div>
                                <div className="errorContainerFB" ref={account1ErrorRef}> </div>
                            </div>
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="card1">شماره کارت</label>
                                    <input type="text" id="card1" className="inputTextFB ltrFB"
                                    onChange={e=>{handleSaveBalInputBank(e, 0, 'card')}}
                                     />
                                </div>
                                <div className="errorContainerFB" ref={card1ErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="shaba1">شماره شبا</label>
                                    <input type="text" id="shaba1" className="inputShabaFB ltrFB"
                                    onChange={e=>{handleSaveBalInputBank(e, 0, 'shaba')}} />
                                    <span className="unitShabaFB"> IR </span>
                                </div>
                                <div className="errorContainerFB" ref={shaba1ErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="bank1">نام بانک </label>
                                    <select name="" id="bank1" className="selectFB inputTextFB"
                                    onChange={e=>{handleSaveBalInputBank(e, 0, 'bank')}}>
                                        <option value=""> انتخاب </option>
                                        <option value="ملی">ملی</option>
                                        <option value="ملت">ملت</option>
                                        <option value="سپه">سپه</option>
                                        <option value="کشاورزی">کشاورزی</option>
                                        <option value="">صادرات</option>
                                        <option value="">توسعه صادرات</option>
                                        <option value="">رفاه</option>
                                        <option value="">مسکن</option>
                                        <option value="">تجارت</option>
                                        <option value="">توسعه تعاون</option>
                                        <option value="">پست بانک</option>
                                        <option value="">صنعت و معدن</option>
                                        <option value="">اقتصاد نوین</option>
                                        <option value="">پارسیان</option>
                                        <option value="">کارآفرین</option>
                                        <option value="">سامان</option>
                                        <option value="">سینا</option>
                                        <option value="">خاورمیانه</option>
                                        <option value="">شهر</option>
                                        <option value="">دی</option>
                                        <option value="">گردشگری</option>
                                        <option value="">ایران زمین</option>
                                        <option value="">سرمایه</option>
                                        <option value="">پاسارگاد</option>

                                    </select>
                                </div>
                                <div className="errorContainerFB" ref={bank1ErrorRef}> </div>
                            </div>

                            <div className="moreBank" ref={moreBank1}
                                onClick={() => showSectionBank(sectionBank2, moreBank1, true, 1)}> اضافه کردن اطلاعات بانکی بیشتر </div>
                        </div>

                        <div className="sectionFB --displayNone" ref={sectionBank2}>
                            <div className="delMoreBank"> <span onClick={() => showSectionBank(sectionBank2, moreBank1, false, 1)}>حذف</span>  <b>2</b> </div>
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="account2">شماره حساب</label>
                                    <input type="text" id="account2"
                                        className="inputTextFB ltrFB" />
                                </div>
                                <div className="errorContainerFB" ref={account2ErrorRef}> </div>
                            </div>
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="card2">شماره کارت</label>
                                    <input type="text" id="card2" className="inputTextFB ltrFB" />
                                </div>
                                <div className="errorContainerFB" ref={card2ErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="shaba2">شماره شبا</label>
                                    <input type="text" id="shaba2" className="inputShabaFB ltrFB" />
                                    <span className="unitShabaFB"> IR </span>
                                </div>
                                <div className="errorContainerFB" ref={shaba2ErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="bank2">نام بانک </label>
                                    <select name="" id="bank2" className="selectFB inputTextFB">
                                        <option value=""> انتخاب </option>
                                        <option value="">ملی</option>
                                        <option value="">ملت</option>
                                        <option value="">سپه</option>
                                        <option value="">کشاورزی</option>
                                        <option value="">صادرات</option>
                                        <option value="">توسعه صادرات</option>
                                        <option value="">رفاه</option>
                                        <option value="">مسکن</option>
                                        <option value="">تجارت</option>
                                        <option value="">توسعه تعاون</option>
                                        <option value="">پست بانک</option>
                                        <option value="">صنعت و معدن</option>
                                        <option value="">اقتصاد نوین</option>
                                        <option value="">پارسیان</option>
                                        <option value="">کارآفرین</option>
                                        <option value="">سامان</option>
                                        <option value="">سینا</option>
                                        <option value="">خاورمیانه</option>
                                        <option value="">شهر</option>
                                        <option value="">دی</option>
                                        <option value="">گردشگری</option>
                                        <option value="">ایران زمین</option>
                                        <option value="">سرمایه</option>
                                        <option value="">پاسارگاد</option>

                                    </select>
                                </div>
                                <div className="errorContainerFB" ref={bank2ErrorRef}> </div>
                            </div>
                            <div className="moreBank" ref={moreBank2} onClick={() => showSectionBank(sectionBank3, moreBank2, true, 2)}> اضافه کردن اطلاعات بانکی بیشتر </div>
                        </div>

                        <div className="sectionFB --displayNone" ref={sectionBank3}>
                            <div className="delMoreBank"> <span onClick={() => showSectionBank(sectionBank3, moreBank2, false, 2)}>حذف</span> <i>3</i> </div>
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="account3">شماره حساب</label>
                                    <input type="text" id="account3"
                                        className="inputTextFB ltrFB" />
                                </div>
                                <div className="errorContainerFB" ref={account3ErrorRef}> </div>
                            </div>
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="card3">شماره کارت</label>
                                    <input type="text" id="card3" className="inputTextFB ltrFB" />
                                </div>
                                <div className="errorContainerFB" ref={card3ErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="shaba3">شماره شبا</label>
                                    <input type="text" id="shaba3" className="inputShabaFB ltrFB" />
                                    <span className="unitShabaFB"> IR </span>
                                </div>
                                <div className="errorContainerFB" ref={shaba3ErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="bank3">نام بانک </label>
                                    <select name="" id="bank3" className="selectFB inputTextFB">
                                        <option value=""> انتخاب </option>
                                        <option value="">ملی</option>
                                        <option value="">ملت</option>
                                        <option value="">سپه</option>
                                        <option value="">کشاورزی</option>
                                        <option value="">صادرات</option>
                                        <option value="">توسعه صادرات</option>
                                        <option value="">رفاه</option>
                                        <option value="">مسکن</option>
                                        <option value="">تجارت</option>
                                        <option value="">توسعه تعاون</option>
                                        <option value="">پست بانک</option>
                                        <option value="">صنعت و معدن</option>
                                        <option value="">اقتصاد نوین</option>
                                        <option value="">پارسیان</option>
                                        <option value="">کارآفرین</option>
                                        <option value="">سامان</option>
                                        <option value="">سینا</option>
                                        <option value="">خاورمیانه</option>
                                        <option value="">شهر</option>
                                        <option value="">دی</option>
                                        <option value="">گردشگری</option>
                                        <option value="">ایران زمین</option>
                                        <option value="">سرمایه</option>
                                        <option value="">پاسارگاد</option>

                                    </select>
                                </div>
                                <div className="errorContainerFB" ref={bank3ErrorRef}> </div>
                            </div>
                            <div className="moreBank" ref={moreBank3} onClick={() => showSectionBank(sectionBank4, moreBank3, true, 3)}> اضافه کردن اطلاعات بانکی بیشتر </div>
                        </div>

                        <div className="sectionFB --displayNone" ref={sectionBank4}>
                            <div className="delMoreBank"> <span onClick={() => showSectionBank(sectionBank4, moreBank3, false, 3)}>حذف</span> <b>4</b>  </div>
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="account4">شماره حساب</label>
                                    <input type="text" id="account4"
                                        className="inputTextFB ltrFB" />
                                </div>
                                <div className="errorContainerFB" ref={account4ErrorRef}> </div>
                            </div>
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="card4">شماره کارت</label>
                                    <input type="text" id="card4" className="inputTextFB ltrFB" />
                                </div>
                                <div className="errorContainerFB" ref={card4ErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="shaba4">شماره شبا</label>
                                    <input type="text" id="shaba4" className="inputShabaFB ltrFB" />
                                    <span className="unitShabaFB"> IR </span>
                                </div>
                                <div className="errorContainerFB" ref={shaba4ErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="bank4">نام بانک </label>
                                    <select name="" id="bank4" className="selectFB inputTextFB">
                                        <option value=""> انتخاب </option>
                                        <option value="">ملی</option>
                                        <option value="">ملت</option>
                                        <option value="">سپه</option>
                                        <option value="">کشاورزی</option>
                                        <option value="">صادرات</option>
                                        <option value="">توسعه صادرات</option>
                                        <option value="">رفاه</option>
                                        <option value="">مسکن</option>
                                        <option value="">تجارت</option>
                                        <option value="">توسعه تعاون</option>
                                        <option value="">پست بانک</option>
                                        <option value="">صنعت و معدن</option>
                                        <option value="">اقتصاد نوین</option>
                                        <option value="">پارسیان</option>
                                        <option value="">کارآفرین</option>
                                        <option value="">سامان</option>
                                        <option value="">سینا</option>
                                        <option value="">خاورمیانه</option>
                                        <option value="">شهر</option>
                                        <option value="">دی</option>
                                        <option value="">گردشگری</option>
                                        <option value="">ایران زمین</option>
                                        <option value="">سرمایه</option>
                                        <option value="">پاسارگاد</option>

                                    </select>
                                </div>
                                <div className="errorContainerFB" ref={bank4ErrorRef}> </div>
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
                                    <label htmlFor="account5">شماره حساب</label>
                                    <input type="text" id="account5"
                                        className="inputTextFB ltrFB" />
                                </div>
                                <div className="errorContainerFB" ref={account5ErrorRef}> </div>
                            </div>
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="card5">شماره کارت</label>
                                    <input type="text" id="card5" className="inputTextFB ltrFB" />
                                </div>
                                <div className="errorContainerFB" ref={card5ErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="shaba5">شماره شبا</label>
                                    <input type="text" id="shaba5" className="inputShabaFB ltrFB" />
                                    <span className="unitShabaFB"> IR </span>
                                </div>
                                <div className="errorContainerFB" ref={shaba5ErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="bank5">نام بانک </label>
                                    <select name="" id="bank5" className="selectFB inputTextFB">
                                        <option value=""> انتخاب </option>
                                        <option value="">ملی</option>
                                        <option value="">ملت</option>
                                        <option value="">سپه</option>
                                        <option value="">کشاورزی</option>
                                        <option value="">صادرات</option>
                                        <option value="">توسعه صادرات</option>
                                        <option value="">رفاه</option>
                                        <option value="">مسکن</option>
                                        <option value="">تجارت</option>
                                        <option value="">توسعه تعاون</option>
                                        <option value="">پست بانک</option>
                                        <option value="">صنعت و معدن</option>
                                        <option value="">اقتصاد نوین</option>
                                        <option value="">پارسیان</option>
                                        <option value="">کارآفرین</option>
                                        <option value="">سامان</option>
                                        <option value="">سینا</option>
                                        <option value="">خاورمیانه</option>
                                        <option value="">شهر</option>
                                        <option value="">دی</option>
                                        <option value="">گردشگری</option>
                                        <option value="">ایران زمین</option>
                                        <option value="">سرمایه</option>
                                        <option value="">پاسارگاد</option>

                                    </select>
                                </div>
                                <div className="errorContainerFB" ref={bank5ErrorRef}> </div>
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
        </>
    );
};

export default AddCustomer;
