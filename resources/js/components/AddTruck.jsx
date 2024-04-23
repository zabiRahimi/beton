import Button from "react-bootstrap/Button";
import Title from "./hooks/Title";
import "../../css/formBeton.css";
import iran from "../../assets/images/iran.png";
import { useRef, useState } from "react";

const AddTruck = () => {

    const btnAddGeRef = useRef(null);
    const btnGetGeRef = useRef(null);

    const containerShowGeRef = useRef(null);

    const [disabledBtnShowForm, setDisabledBtnShowForm] = useState(true);
    const [disabledBtnShowRecords, setDisabledBtnShowRecords] = useState(false);

    const [hideGetTruck, setHideGetTruck] = useState(true);
    const [flexDirection, setFlexDirection] = useState('columnGe');

    /** ست کردن موارد لازم هنگامی که کاربر ویرایش کامیون را انتخاب می‌کند */
    const [editTruck, setEditTruck] = useState(false);

    const addTruck = () => {

        setDisabledBtnShowRecords(false);
        setDisabledBtnShowForm(true);

        setFlexDirection('columnGe');

        setEditTruck(false)

    }

    const getTruck = () => {

        setDisabledBtnShowForm(false);
        setDisabledBtnShowRecords(true);

        setFlexDirection('columnReverseGe');

        setHideGetTruck(false);

    }

    const showFormEditTruck = () => {

        setDisabledBtnShowRecords(false);
        setDisabledBtnShowForm(false);

        setFlexDirection('columnGe');

        setEditTruck(true);

    }


    return (
        <>
            <Title title="تعریف کامیون" />

            <div className="headPageGe">

                <button
                    className={`--styleLessBtn btnAddGe ${disabledBtnShowForm ? 'disabledBtnGe' : 'enabledBtnGe'}`}
                    ref={btnAddGeRef} onClick={addTruck}
                    disabled={disabledBtnShowForm}
                >
                    تعریف کامیون
                </button>

                <button
                    className={`--styleLessBtn btnGetGe ${disabledBtnShowRecords ? 'disabledBtnGe' : 'enabledBtnGe'} `}
                    ref={btnGetGeRef}
                    onClick={getTruck}
                    disabled={disabledBtnShowRecords}
                >
                    مشاهده کامیون‌ها
                </button>

            </div>

            <div className={`containerMainAS_Ge ${flexDirection}`}>

                <div className="continerAddGe ">

                    <form action="" className="formBeton">

                        <h5 className={`titleFormFB ${editTruck ? '' : 'hideGe'}`}>ویرایش کامیون</h5>

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

                            <Button variant="success" className="btnSaveFB">
                                {editTruck ? 'ویرایش' : 'ثبت'}
                            </Button>

                            <Button type="reset" variant="warning" className={editTruck ? 'hideGe' : ''}>
                                {" "}
                                پاک کن{" "}
                            </Button>

                        </div>
                    </form>
                </div>

                <div
                    className={`containerShowGe containerShowCustomer  ${hideGetTruck ? 'hideGe' : ''}`}
                    ref={containerShowGeRef}
                >

                    <h4 className="titleShowGe"> کامیون‌های تعریف شده</h4>

                    <div className="divListShowGe">

                        <div className="rowListShowGe headRowListShowGe">

                            <span className="rowNumShowGe ">ردیف</span>
                            <span className="licensePlateShowGe headLicensePlateShowGe "> پلاک خودرو </span>
                            <span className="TrackTypeShowGe ">نوع خودرو</span>
                            <span className="truckOwnerShowGe ">مالک خودرو</span>

                            <span className="headEditShowGe"> ویرایش  </span>
                            <span className="headDelShowGe"> حذف </span>

                        </div>

                        <div className="rowListShowGe">

                            <span className="rowNumShowGe">1</span>
                            <span className="licensePlateShowGe">63 895 ب 56</span>
                            <span className="TrackTypeShowGe">پمپ دکل</span>
                            <span className="truckOwnerShowGe"> بازوافکن </span>

                            <div className="divEditGe">
                                <button className="--styleLessBtn btnEditGe" title=" ویرایش "
                                    onClick={showFormEditTruck}
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
                            <span className="licensePlateShowGe">83 329 ص 84</span>
                            <span className="TrackTypeShowGe"> کمپرسی </span>
                            <span className="truckOwnerShowGe"> صالحی </span>

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
                            <span className="licensePlateShowGe ">  99 453 الف 89</span>
                            <span className="TrackTypeShowGe">میکسر</span>
                            <span className="truckOwnerShowGe">زارع</span>
                            <div className="divEditGe">
                                <button className="--styleLessBtn btnEditGe" title=" ویرایش "
                                    onClick={showFormEditTruck}>
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

export default AddTruck;
