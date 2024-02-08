import Title from "./hooks/Title";
import { DatePicker, InputDatePicker } from "jalaali-react-date-picker";
import "../../css/formBeton.css";
import "../../css/addCustomer.css";
import DataZabi from "./hooks/DateZabi";
import { useEffect } from "react";
const AddCustomer = () => {
    const {year, month, days, nameDays}= DataZabi();
    
    useEffect(()=>{
        
    })
    return (
        <>
            <Title title="تعریف مشتری" />
            <div>
                <form action="" className="formBeton">
                    <div className="sectionFormACus">
                        <div className="divInputTextACus">
                            <label>نام مشتری</label>
                            <input type="text" className="inputTextACus" autoFocus/>
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
                            
                                <input type="date" name="" id="" translate="fa" />
                                <select name="" id="">
                                    <option value="">روز</option>
                                    {/* {optionDays} */}
                                </select>
                                <select name="" id="">
                                    <option value="">ماه</option>
                                </select>
                                <select name="" id="">
                                    <option value="">سال</option>
                                </select>
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
                </form>
            </div>
        </>
    );
};

export default AddCustomer;
