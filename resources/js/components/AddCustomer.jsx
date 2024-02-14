import Title from "./hooks/Title";
import { DatePicker, InputDatePicker } from "jalaali-react-date-picker";
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

    useEffect(() => {});
    return (
        <>
            <Title title="تعریف مشتری" />
            <div>
                <form action="" className="formBeton">
                    <div className="sectionFormACus">
                        <div className="divInputTextACus">
                            <label>نام مشتری</label>
                            <input
                                type="text"
                                className="inputTextACus"
                                autoFocus
                            />
                        </div>

                        <div className="divInputTextACus">
                            <label>نوع مشتری </label>
                            <input type="text" className="inputTextACus" />
                        </div>
                    </div>

                    <div className="sectionFormACus">
                        <div className="divInputTextACus">
                            <label>کد ملی </label>
                            <input type="text" className="inputTextACus" />
                        </div>

                        <div className="divInputTextACus">
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

                    <div className="sectionFormACus">
                        <div className="divRightSFACus">
                            <div className="divInputTextACus">
                                <label>موبایل</label>
                                <input type="text" className="inputTextACus" />
                            </div>

                            <div className="divInputTextACus">
                                <label>تلفن </label>
                                <input type="text" className="inputTextACus" />
                            </div>

                            <div className="divInputTextACus">
                                <label>کد پستی</label>
                                <input type="text" className="inputTextACus" />
                            </div>

                            <div className="divInputTextACus">
                                <label>ایمیل</label>
                                <input type="text" className="inputTextACus" />
                            </div>
                        </div>

                        <div className="divLeftSFACus">
                            <div className="divInputTextACus">
                                <label>آدرس</label>
                                <textarea className="inputTextACus" />
                            </div>
                        </div>
                    </div>

                    <div className="sectionFormACus">
                        <div className="divInputTextACus">
                            <label>شماره حساب</label>
                            <input type="text" className="inputTextACus" />
                        </div>

                        <div className="divInputTextACus">
                            <label>شماره کارت</label>
                            <input type="text" className="inputTextACus" />
                        </div>
                    </div>
                    <div className="sectionFormACus">
                        {/* <input type="button" >ثبت</input> */}
                        <button> ثبت </button>
                        <input type="reset" value={'پاک کردن'} />
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddCustomer;
