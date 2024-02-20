import Button from 'react-bootstrap/Button';

import Title from "./hooks/Title";
import "../../css/formBeton.css";

const AddTruck=()=>{
    return(
        <>
        <Title title='تعریف کامیون' />
        <div>
                <form action="" className="formBeton">
                    <div className="sectionFB">
                        <div className="divInputFB">
                            <label>نام خودرو</label>
                            <select name="" id="" className="selectFB">
                                <option value="خریدار">خریدار</option>
                                <option value="فروشنده">فروشنده</option>
                                <option value="فروشنده-خریدار">فروشنده-خریدار</option>
                            </select>
                        </div>

                        <div className="divInputFB">
                            <label>نوع خودرو </label>
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
                        <Button type="reset" variant="warning" > پاک کن </Button>
                        {/* <input type="reset" value={'پاک کردن'} /> */}
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddTruck;