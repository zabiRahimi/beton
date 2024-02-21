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
                                <option value="">انتخاب</option>
                                <option value="بنز">بنز</option>
                                <option value="بنز">بنز</option>
                                <option value="اویکو">اویکو</option>
                                <option value="داف">داف</option>
                                <option value="آمیکو">آمیکو</option>
                                <option value="دانگ فانگ">دانگ فانگ</option>
                                <option value="ولو">ولو</option>
                            </select>
                        </div>

                        <div className="divInputFB">
                            <label>نوع خودرو </label>
                            <select name="" id="" className="selectFB">
                                <option value="">انتخاب</option>
                                <option value="میکسر">میکسر</option>
                                <option value="پمپ هوایی دکل">پمپ هوایی دکل</option>
                                <option value="پمپ زمینی">پمپ زمینی</option>
                                <option value="کمپرسی">کمپرسی</option>
                                <option value="تریلر بونکر">تریلر بونکر</option>
                                <option value="لودر">لودر</option>
                                <option value="جرثقیل">جرثقیل</option>

                            </select>
                        </div>
                    </div>

                    <div className="sectionFB">
                        <div className="divInputFB">
                            <label> پلاک </label>
                            <input type="text" className="" />
                            <select name="" id="">
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                        </div>

                        
                    </div>

                    <div className="sectionFB">
                        <div className="divInputFB">
                            <label> مالک خودرو </label>
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