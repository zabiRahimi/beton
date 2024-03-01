import Title from "./hooks/Title";
// import { DatePicker, InputDatePicker } from "jalaali-react-date-picker";
import Button from 'react-bootstrap/Button';
import "../../css/general.css";
import "../../css/formBeton.css";
import "../../css/addCustomer.css";
import DataZabi from "./hooks/DateZabi";
import { useEffect, useRef, useState } from "react";
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

    const [disabledBtnAddGe, setDisabledBtnAddGe] = useState(true);
    const [disabledBtnGetGe, setDisabledBtnGetGe] = useState(false);

    const [day, setDay] = useState();
    const [month, setMonth] = useState();
    const [year, setYear] = useState();

    const addCustomer = () => {
        setDisabledBtnGetGe(false);
        setDisabledBtnAddGe(true);
        console.log('addCustomer');

    }

    const getCustomer = () => {
        setDisabledBtnAddGe(false);
        setDisabledBtnGetGe(true);
        console.log('getCustomer');

    }

    // const changeStyleBtnAddGe =()=>{

    // }



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
            <div className="containerMainAS_Ge flexColumnGe">

                <div className="continerAddGe containerAddCustomer">
                    <form action="" className="formBeton">
                        <div className="sectionFB">
                            <div className="divInputFB">
                                <label>نام مشتری</label>
                                <input
                                    type="text"
                                    className="inputTextFB"
                                    autoFocus
                                />
                            </div>

                            <div className="divInputFB">
                                <label>نوع مشتری </label>
                                <select name="" id="" className="selectFB">
                                    <option value="خریدار">خریدار</option>
                                    <option value="فروشنده">فروشنده</option>
                                    <option value="فروشنده-خریدار">فروشنده-خریدار</option>
                                </select>
                            </div>
                        </div>

                        <div className="sectionFB">
                            <div className="divInputFB">
                                <label>کد ملی </label>
                                <input type="text" className="inputTextFB" />
                            </div>

                            <div className="divInputFB">
                                <label>تاریخ تولد </label>
                                <div className="divDateBirth">
                                    <div className="divUpDateAcus">
                                        <input
                                            type="text"
                                            className="inputTextDateACus inputDayTDACus"
                                            placeholder="1"
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
                        </div>

                        <div className="sectionFB">
                            <div className="divRightFB">
                                <div className="divInputFB">
                                    <label>موبایل</label>
                                    <input type="text" className="inputTextFB" />
                                </div>

                                <div className="divInputFB">
                                    <label>تلفن </label>
                                    <input type="text" className="inputTextFB" />
                                </div>

                                <div className="divInputFB">
                                    <label>کد پستی</label>
                                    <input type="text" className="inputTextFB" />
                                </div>

                                <div className="divInputFB">
                                    <label>ایمیل</label>
                                    <input type="text" className="inputTextFB" />
                                </div>
                            </div>

                            <div className="divLeftFB">
                                <div className="divInputFB">
                                    <label>آدرس</label>
                                    <textarea className="textareaAddressACu" />
                                </div>
                            </div>
                        </div>

                        <div className="sectionFB">
                            <div className="divInputFB">
                                <label>شماره حساب</label>
                                <input type="text" className="inputTextFB" />
                            </div>

                            <div className="divInputFB">
                                <label>شماره کارت</label>
                                <input type="text" className="inputTextFB" />
                            </div>
                        </div>
                        <div className="sectionFB divBtnsFB">
                            <Button variant="success" className="btnSaveFB"> ثبت </Button>
                            <Button type="reset" variant="warning" onClick={deleteDate}> پاک کن </Button>
                        </div>
                    </form>
                </div>

                <div className="containerShowGe containerShowCustomer">
                    <h4 className="titleShowGe"> مشتری‌های تعریف شده</h4>
                    <div className="divListShowGe">

                    <div className="rowListShowGe">
                            <span className="rowNumShowGe">ردیف</span>
                            <span className="nameShowGE">نام مشتری</span>
                            <span className="typeShowrGe">نوع مشتری</span>
                            
                            <span> ویرایش  </span>
                            <span> حذف </span>

                        </div>

                        <div className="rowListShowGe">
                            <span className="rowNumShowGe">1</span>
                            <span className="nameShowGE">رحیمی</span>
                            <span className="typeShowrGe">خریدار</span>
                            
                            <button className="--styleLessBtn btnEditGe"  title=" ویرایش ">
                                <i className="icofont-pencil iEditGe" />
                            </button>
                            <button className="--styleLessBtn btnDelGe" title=" حذف ">
                                <i className="icofont-trash iDelGe" />
                            </button>

                        </div>

                        <div className="rowListShowGe">
                            <span className="rowNumShowGe">2</span>
                            <span className="nameShowGE">ابراهیمی</span>
                            <span className="typeShowrGe">فروشنده شن و ماسه</span>
                            
                            <button className="--styleLessBtn btnEditGe"  title=" ویرایش ">
                                <i className="icofont-pencil iEditGe" />
                            </button>
                            <button className="--styleLessBtn btnDelGe" title=" حذف ">
                                <i className="icofont-trash iDelGe" />
                            </button>

                        </div>

                        <div className="rowListShowGe">
                            <span className="rowNumShowGe">3</span>
                            <span className="nameShowGE">اسکندری</span>
                            <span className="typeShowrGe">خریدار</span>
                            
                            <button className="--styleLessBtn btnEditGe"  title=" ویرایش ">
                                <i className="icofont-pencil iEditGe" />
                            </button>
                            <button className="--styleLessBtn btnDelGe" title=" حذف ">
                                <i className="icofont-trash iDelGe" />
                            </button>

                        </div>

                        <div className="rowListShowGe">
                            <span className="rowNumShowGe">4</span>
                            <span className="nameShowGE">نعمت الهی</span>
                            <span className="typeShowrGe">فروشنده سیمان</span>
                            
                            <button className="--styleLessBtn btnEditGe"  title=" ویرایش ">
                                <i className="icofont-pencil iEditGe" />
                            </button>
                            <button className="--styleLessBtn btnDelGe" title=" حذف ">
                                <i className="icofont-trash iDelGe" />
                            </button>

                        </div>

                        <div className="rowListShowGe">
                            <span className="rowNumShowGe">5</span>
                            <span className="nameShowGE">مشکین فام</span>
                            <span className="typeShowrGe">فروشنده</span>
                            
                            <button className="--styleLessBtn btnEditGe"  title=" ویرایش ">
                                <i className="icofont-pencil iEditGe" />
                            </button>
                            <button className="--styleLessBtn btnDelGe" title=" حذف ">
                                <i className="icofont-trash iDelGe" />
                            </button>

                        </div>

                        <div className="rowListShowGe">
                            <span className="rowNumShowGe">6</span>
                            <span className="nameShowGE">مهرآور</span>
                            <span className="typeShowrGe">راننده</span>
                            
                            <button className="--styleLessBtn btnEditGe"  title=" ویرایش ">
                                <i className="icofont-pencil iEditGe" />
                            </button>
                            <button className="--styleLessBtn btnDelGe" title=" حذف ">
                                <i className="icofont-trash iDelGe" />
                            </button>

                        </div>

                        <div className="rowListShowGe">
                            <span className="rowNumShowGe">7</span>
                            <span className="nameShowGE">جاویدی</span>
                            <span className="typeShowrGe">پرسنل</span>
                            
                            <button className="--styleLessBtn btnEditGe"  title=" ویرایش ">
                                <i className="icofont-pencil iEditGe" />
                            </button>
                            <button className="--styleLessBtn btnDelGe" title=" حذف ">
                                <i className="icofont-trash iDelGe" />
                            </button>

                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default AddCustomer;
