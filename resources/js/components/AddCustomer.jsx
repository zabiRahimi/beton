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

    const btnAddGeRef = useRef(null);
    const btnGetGeRef = useRef(null);

    const containerShowGeRef = useRef(null);

    const nameErrorRef = useRef(null);
    const typeErrorRef = useRef(null);
    const nationalCodeErrorRef = useRef(null);
    const mobileErrorRef = useRef(null);
    const telephoneErrorRef = useRef(null);
    const dateOfBirthErrorRef = useRef(null);
    const emailErrorRef = useRef(null);
    const postalCodeErrorRef = useRef(null);
    const addressErrorRef = useRef(null);
    const accountNumberErrorRef = useRef(null);
    const cardNumberErrorRef = useRef(null);
    const itemCustomerType = useRef([]);
    // console.log(itemCustomerType);

    const [disabledBtnAddGe, setDisabledBtnAddGe] = useState(true);
    const [disabledBtnGetGe, setDisabledBtnGetGe] = useState(false);

    const [hideGetCustomer, setHideGetCustomer] = useState(true);
    const [flexDirection, setFlexDirection] = useState('columnGe');

    const [customerTypes, setCustomerTypes] = useState(null);
    const [customerTypeSelected, setCustomerTypeSelected] = useState([])

    // console.log(customerTypeSelected);

    customerTypes && (itemCustomerType.current = customerTypes.map(
        (customerType) => itemCustomerType.current[customerType['id']] ?? createRef()
    ));


    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');


    /** ست کردن موارد لازم هنگامی که کاربر ویرایش مشتری را انتخاب می‌کند */
    const [editCustomer, setEditCustomer] = useState(false);


    const [day, setDay] = useState();
    const [month, setMonth] = useState();
    const [year, setYear] = useState();

    useEffect(() => {
        getCustomerType()
    }, [])

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
        let customerTData;

        // await localforage.getItem("products").then((value) => {
        //     customerTData = value.filter((item) => item.id == params.id);
        // });

        let val = await axios.get("/api/v1/getAllCustomerType").then((response) => {
            customerTData = response.data.CustomerTypes;
        });
        // customerTData=[[id=>1, name=>'eee']]

        setCustomerTypes(customerTData)
    }

    const showCustomerTypes = () => {
        let value = customerTypes.map((customerType, i) => {

            return <div className="itemCustomerTypeFB" onClick={() => AddCustomerType(customerType['id'], customerType['type'])}

                key={i}>
                <div className="checkedItemCustomerTypeFB" ref={itemCustomerType.current[customerType['id']]}>
                    <i className="icofont-check-alt " />
                </div>
                <span className="nameItemcustomerTypeFB"> {customerType['type']} </span>

            </div>

        })

        return value;
    }

    const showCustomerTypeSelected = () => {
        let value = customerTypeSelected.map((customerType, i) => {
            // return <span key={i}>{customerType['type']}<i>{customerType['id']}</i></span>
            return <div className="customerTypeSelectedFB" key={i}>
                {/* <div className="checkedItemCustomerTypeFB" ref={itemCustomerType.current[i]}>
                    <i className="icofont-check-alt " />
                </div> */}
                <span className="nameItemcustomerTypeFB"> {customerType['type']} </span>
                <i className="icofont-trash delItemCustomerTypeFB" onClick={() => delCustomerTypeSelected(customerType['id'])} />

            </div>

        })

        return value;
    }

    const AddCustomerType = (id, type) => {
        // console.log(ref);
        let ref = itemCustomerType.current[id];
        let val = ref.current.classList.toggle('IcheckedItemCustomerTypeFB');
        if (val) {
            setCustomerTypeSelected(old => [...old, { id, type }])
        } else {
            const updated = customerTypeSelected.filter(item => item.id !== id);
            setCustomerTypeSelected(updated);
        }
    }

    const delCustomerTypeSelected = (id) => {
        const updated = customerTypeSelected.filter(item => item.id !== id);
        setCustomerTypeSelected(updated);
        let ref = itemCustomerType.current[id];
        ref.current.classList.toggle('IcheckedItemCustomerTypeFB');
    }


    const changeDay = (e) => {
        let day = e.target.value;
        //  switch (day) {
        //     case value:
        //         day=1;
        //         break;
        //         case value:
        //             day=2;
        //         break;
        //         case value:
        //             day=3;
        //         break;
        //         case value:
        //             day=;
        //         break;
        //         case value:
        //             day=;
        //         break;
        //         case value:
        //             day=;
        //         break;
        //         case value:
        //             day=;
        //         break;
        //         case value:
        //             day=;
        //         break;
        //         case value:
        //             day=;
        //         break;


        //  }
        setDay(day);
    }

    const changeMonth = (e) => {
        let month = e.target.value;
        console.log(month);
        setMonth(month);
    }

    const changeYear = (e) => {
        let year = e.target.value;
        console.log(year);
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


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(
            '/api/v1/addCustomer',
            // { ...input },
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

            console.log(id);

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
                                        autoFocus
                                    />
                                    <i className="icofont-ui-rating starFB" />
                                </div>
                                <div className="errorContainerFB" ref={nameErrorRef}></div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="type" >نوع مشتری </label>
                                    <div className="selectFB containerCustomerTypeFB">
                                        <span> انتخاب </span>
                                        <i className="icofont-caret-down " />
                                    </div>
                                    <div className="divItemCustomerTypeFB">
                                        <div className="rigthCustomerTypeFB">
                                            <div className="RCTYitemsFB">
                                                {customerTypeSelected && showCustomerTypeSelected()}
                                            </div>
                                            <div className="errorRCTYitemFB">

                                            </div>
                                        <button className="btnRCTYitemsFB"
                                        onClick={handleSubmit}> ثبت </button>


                                        </div>
                                        <div className="leftCustomerTypeFB">
                                            {customerTypes ? showCustomerTypes() : <Skeleton height={35} count={8} />}
                                        </div>
                                    </div>
                                    {/* <select id="type" className="selectFB">
                                        <option value=""> انتخاب </option>
                                        {customerTypes ? showCustomerTypes() : <Skeleton  count={8} />}

                                        
                                    </select> */}
                                    <i className="icofont-ui-rating starFB" />

                                </div>
                                <div className="errorContainerFB" ref={typeErrorRef}></div>
                            </div>
                        </div>

                        <div className="sectionFB">
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="nationalCode">کد ملی </label>
                                    <input type="text" id="nationalCode" className="inputTextFB ltrFB" />
                                </div>
                                <div className="errorContainerFB" ref={nationalCodeErrorRef}></div>
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
                                <div className="errorContainerFB" ref={dateOfBirthErrorRef}></div>
                            </div>
                        </div>

                        <div className="sectionFB">
                            <div className="divRightFB">
                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label htmlFor="mobile">موبایل</label>
                                        <input type="text" id="mobile" className="inputTextFB ltrFB" />
                                    </div>
                                    <div className="errorContainerFB" ref={mobileErrorRef}></div>

                                </div>

                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label htmlFor="tel">تلفن </label>
                                        <input type="text" id="tel" className="inputTextFB ltrFB" />
                                    </div>
                                    <div className="errorContainerFB" ref={telephoneErrorRef}></div>
                                </div>

                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label htmlFor="postalCode">کد پستی</label>
                                        <input type="text"
                                            id="postalCode" className="inputTextFB ltrFB" />
                                    </div>
                                    <div className="errorContainerFB" ref={postalCodeErrorRef}></div>
                                </div>
                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label htmlFor="email">ایمیل</label>
                                        <input type="text" id="email" className="inputTextFB ltrFB" />
                                    </div>
                                    <div className="errorContainerFB" ref={emailErrorRef}></div>
                                </div>
                            </div>

                            <div className="divLeftFB">
                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label htmlFor="address">آدرس</label>
                                        <textarea id="address" className="textareaAddressACu" />
                                    </div>
                                    <div className="errorContainerFB" ref={addressErrorRef}></div>
                                </div>
                            </div>
                        </div>

                        <div className="sectionFB">
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="accountNumber">شماره حساب</label>
                                    <input type="text" id="accountNumber"
                                        className="inputTextFB ltrFB" />
                                </div>
                                <div className="errorContainerFB" ref={accountNumberErrorRef}></div>
                            </div>
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="cardNumber">شماره کارت</label>
                                    <input type="text" id="cardNumber" className="inputTextFB ltrFB" />
                                </div>
                                <div className="errorContainerFB" ref={cardNumberErrorRef}></div>
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
