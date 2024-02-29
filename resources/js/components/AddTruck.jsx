import Button from "react-bootstrap/Button";
import Title from "./hooks/Title";
import "../../css/formBeton.css";

import iran from "../../assets/images/iran.png";

const AddTruck = () => {
    return (
        <>
            <Title title="تعریف کامیون" />
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
                                <option value="پمپ هوایی دکل">
                                    پمپ هوایی دکل
                                </option>
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
                            <div className="divPlak">
                                <div className="divExamplePlak">
                                    <div className="divIranPlak">
                                        <div className="iranPlakDivImg">
                                            <img
                                                className="imgNSP"
                                                src={iran}
                                            />
                                        </div>
                                        <div className="iranPlakDivSpans">
                                            <span>I.R.</span>
                                            <span>IRAN</span>
                                        </div>
                                    </div>
                                    <div className="divNamberPlak">
                                        <input
                                            type="text"
                                            name=""
                                            id=""
                                            className="text2numberPlaK"
                                            placeholder="00"
                                        />
                                        <select name="" id="" className="selectChPlak">
                                            <option value=""> الف </option>
                                            <option value=""> ب </option>
                                            <option value=""> پ </option>
                                            <option value=""> ت </option>
                                            <option value=""> ث </option>
                                            <option value=""> ج </option>
                                            <option value=""> چ </option>
                                            <option value=""> ح </option>
                                            <option value=""> خ </option>
                                            <option value=""> د </option>
                                            <option value=""> ذ </option>
                                            <option value=""> ر </option>
                                            <option value=""> ز </option>
                                            <option value=""> ژ </option>
                                            <option value=""> س </option>
                                            <option value=""> ش </option>
                                            <option value=""> ص </option>
                                            <option value=""> ض </option>
                                            <option value=""> ط </option>
                                            <option value=""> ظ </option>
                                            <option value=""> ع </option>
                                            <option value=""> غ </option>
                                            <option value=""> ف </option>
                                            <option value=""> ق </option>
                                            <option value=""> ک </option>
                                            <option value=""> گ </option>
                                            <option value=""> ل </option>
                                            <option value=""> م </option>
                                            <option value=""> ن </option>
                                            <option value=""> و </option>
                                            <option value=""> ه </option>
                                            <option value=""> ی </option>
                                        </select>
                                        <input
                                            type="text"
                                            name=""
                                            id=""
                                            className="text3numberPlaK"
                                            placeholder="000"
                                        />
                                    </div>
                                    <div className="divSerialPlak">
                                        <span>ایران</span>
                                        <input
                                            type="text"
                                            className="textSerialPlaK"
                                            placeholder="00"
                                        />
                                    </div>
                                </div>

                                {/* <input type="text" className="" />
                                <select name="" id="">
                                    <option value=""> الف </option>
                                    <option value=""> ب </option>
                                    <option value=""> پ </option>
                                    <option value=""> ت </option>
                                    <option value=""> ث </option>
                                    <option value=""> ج </option>
                                    <option value=""> چ </option>
                                    <option value=""> ح </option>
                                    <option value=""> خ </option>
                                    <option value=""> د </option>
                                    <option value=""> ذ </option>
                                    <option value=""> ر </option>
                                    <option value=""> ز </option>
                                    <option value=""> ژ </option>
                                    <option value=""> س </option>
                                    <option value=""> ش </option>
                                    <option value=""> ص </option>
                                    <option value=""> ض </option>
                                    <option value=""> ط </option>
                                    <option value=""> ظ </option>
                                    <option value=""> ع </option>
                                    <option value=""> غ </option>
                                    <option value=""> ف </option>
                                    <option value=""> ق </option>
                                    <option value=""> ک </option>
                                    <option value=""> گ </option>
                                    <option value=""> ل </option>
                                    <option value=""> م </option>
                                    <option value=""> ن </option>
                                    <option value=""> و </option>
                                    <option value=""> ه </option>
                                    <option value=""> ی </option>
                                </select> */}
                            </div>
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
                        <Button variant="success" className="btnSaveFB">
                            {" "}
                            ثبت{" "}
                        </Button>
                        <Button type="reset" variant="warning">
                            {" "}
                            پاک کن{" "}
                        </Button>
                        {/* <input type="reset" value={'پاک کردن'} /> */}
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddTruck;
