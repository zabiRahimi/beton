import Title from "./hooks/Title";
// import { DatePicker, InputDatePicker } from "jalaali-react-date-picker";
import Button from 'react-bootstrap/Button';
import "../../css/formBeton.css";
import "../../css/addCustomer.css";
import DataZabi from "./hooks/DateZabi";
import { useEffect, useState } from "react";
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

    const[day, setDay]=useState();
    const[month, setMonth]=useState();
    const[year, setYear]=useState();


    const changeDay=(e)=>{
        let day= e.target.value;
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

    const changeMonth=(e)=>{
        let month= e.target.value;
        console.log(month);
        setMonth(month);
    }

    const changeYear=(e)=>{
        let year= e.target.value;
        console.log(year);
        setYear(year);
    }

   const deleteDate=()=>{
    setDay();
    setMonth();
    setYear();

   }


    return (
        <>
            <Title title="تعریف مشتری" />
            <div>
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
                                        onInput={(e)=>changeDay(e)}
                                    />
                                    <span>/</span>
                                    <input
                                        type="text"
                                        className="inputTextDateACus inputMonthTDACus"
                                        placeholder="1"
                                        value={month}
                                        onInput={(e)=>changeMonth(e)}
                                    />
                                    <span>/</span>
                                    <input
                                        type="text"
                                        className="inputTextDateACus inputYearTDACus"
                                        placeholder="1300"
                                        value={year}
                                        onInput={(e)=>{changeYear(e)}}
                                    />
                                </div>

                                <div className="divDownDateAcus">
                                    <select name="" id="" value={day} onChange={(e)=>changeDay(e)}>
                                        <option value="">روز</option>
                                        {optionDays}
                                    </select>
                                    <select name="" id="" value={month} onChange={(e)=>changeMonth(e)}>
                                        <option value="">ماه</option>
                                        {optionMonth}
                                    </select>
                                    <select name="" id="" value={year} onChange={(e)=>{changeYear(e)}}>
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
                        {/* <input type="button" >ثبت</input> */}
                        <Button variant="success" className="btnSaveFB"> ثبت </Button>
                        <Button type="reset" variant="warning" onClick={deleteDate}> پاک کن </Button>
                        {/* <input type="reset" value={'پاک کردن'} /> */}
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddCustomer;
