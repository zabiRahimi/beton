import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Title from "./hooks/Title";
import "../../css/formBeton.css";
import iran from "../../assets/images/iran.png";
import useChangeForm from './hooks/useChangeForm';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ScaleLoader from 'react-spinners/ScaleLoader';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const AddTruck = () => {

    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const MySwal = withReactContent(Swal);

    const container = useRef(null);
    const form = useRef(null);
    const formCurrent = form.current;

    const btnAddGeRef = useRef(null);
    const btnGetGeRef = useRef(null);

    const truckNameErrorRef = useRef(null);
    const truckTypeErrorRef = useRef(null);
    const numberplateErrorRef = useRef(null);
    const ownerNameErrorRef = useRef(null);
    const ownerLastNameErrorRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [trucks, setTrucks] = useState([]);

    const [id, setId] = useState(null);
    const [input, setInput] = useState({
        truckName: '',
        truckType: '',
        numberplate: '',
        ownerName: '',
        ownerLastName: '',
    });

    /**
     * چهار استیت زیر مربوط به پلاک خودرو می‌باشند
     */

    /**
     * ذخیره دو رقم سمت چپ
     */
    const [digitsLeftSide, setDigitsLeftSide] = useState(null);

    /**
     * ذخیره حرف الفبا
     */
    const [alphabet, setAlphabet] = useState(null);

    /**
     * ذخیره سه رقم میانی
     */
    const [digitsMiddle, setDigitsMiddle] = useState(null);

    /**
     * ذخیره دو رقم سمت راست
     */
    const [digitsRightSide, setDigitsRightSide] = useState(null);


    useEffect(() => {
        getTrucks();
    }, []);

    async function getTrucks() {
        await axios.get("/api/v1/getTrucks").then((response) => {
            setTrucks(response.data.trucks);
        });
    }



    /**
     * دریافت و ذخیره پهنای کامپوننت برای نمایش بهتر لودر
     */
    const [widthComponent, setWidthComponent] = useState(0);
    useEffect(() => {
        let widths = container.current.offsetWidth;
        setWidthComponent(widths)
    }, []);

    /**
     * این متد دو رقم سمت چپ پلاک را دریافت می‌کند
     * در استیت ذخیره می کند
     * و چنانچه رقم‌ها و حرف الفبا وارد شده باشد آنها را گرفته و با هم ادغام می‌کند
     * و در نهایت در استیت اصلی در کلید پلاک ذخیره می‌کند
     * @param {*} e 
     */
    const getDigitLeftSide = (e) => {
        let { value } = e.target;
        value = value.toString();

        if (value.length == 2) {
            setDigitsLeftSide(value);
            let val = value + '-' + alphabet + '-' + digitsMiddle + '-' + digitsRightSide;
            setInput(prev => ({ ...prev, numberplate: val }));
        }
    }

    /**
    * این متد دو حرف الفبای پلاک را دریافت می‌کند
    * در استیت ذخیره می کند
    * و چنانچه رقم‌ها وارد شده باشد آنها را گرفته و با هم ادغام می‌کند
    * و در نهایت در استیت اصلی در کلید پلاک ذخیره می‌کند
    * @param {*} e 
    */
    const getAlphabet = (e) => {
        let { value } = e.target;

        if (value != '') {
            setAlphabet(value);
            let val = digitsLeftSide + '-' + value + '-' + digitsMiddle + '-' + digitsRightSide;
            setInput(prev => ({ ...prev, numberplate: val }));
        }

    }

    /**
     * به توضیحات متد بالا مراجعه کنید
     * @param {*} e 
     */
    const getDigitMiddle = (e) => {
        let { value } = e.target;
        value = value.toString();

        if (value.length == 3) {
            setDigitsMiddle(value);
            let val = digitsLeftSide + '-' + alphabet + '-' + value + '-' + digitsRightSide;
            setInput(prev => ({ ...prev, numberplate: val }));
        }
    }

    /**
     * به توضیحات متد بالا مراجعه کنید
     * @param {} e 
     */
    const getDigitRightSide = (e) => {
        let { value } = e.target;
        value = value.toString();

        if (value.length == 2) {
            setDigitsRightSide(value);
            let val = digitsLeftSide + '-' + alphabet + '-' + digitsMiddle + '-' + value;
            setInput(prev => ({ ...prev, numberplate: val }));
        }
    }

    console.log(input);

    const resetForm = (apply = true) => {
        setInput({
            truckName: '',
            truckType: '',
            numberplate: '',
            ownerName: '',
            ownerLastName: '',
        });

        var elements = document.getElementsByClassName('element');
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.remove('borderRedFB');
        }

        var elements = document.getElementsByClassName('elementError');
        for (var i = 0; i < elements.length; i++) {
            elements[i].innerHTML = '';
        }

        // در برخی مواقع لازم نیست کدهای داخل شرط استفاده شود
        if (apply) {
            window.scrollTo({ top: 0 });
        }
    }

    /**
* هنگامی که کاربر مبادرت به دیدن و یا ویرایش کردن یک رکورد میکند
* این متد اطلاعات هر فیلد را برای نمایش تنظیم می کند
* @param {شناسه رکورد} recordId 
*/
    const pasteDataForEditing = (recordId) => {

        let truck = trucks.find(truck => truck.id === recordId);
        truck && setId(recordId);

        const { id, created_at, updated_at, ...rest } = truck;//نادیده گرفتن کلید های مشخص شده

        setInput(rest);
    }

    const { showAddForm, showCreatedRecord, showEditForm, flexDirection, editMode, disabledBtnShowForm, disabledBtnShowRecords, hideCreatedRecord, containerShowGeRef } = useChangeForm({ formCurrent, resetForm, pasteDataForEditing });

    /**
       * ذخیره مقادیر ورودی‌های کاربر در استیت
       * @param {*} e 
       * @param {*} input 
       */
    const handleSaveValInput = (e, input) => {
        let { value } = e.target;
        setInput(prev => ({ ...prev, [input]: result }));
    }

    /**
    * برای پاک کردن پیام خطا و برداشتن رنگ قرمز دور کادر
    * @param {*} e 
    * @param {رف مربوط به تگ نمایش خطا} refErr 
    */
    const clearInputError = (e, refErr, types = false, date = false) => {
        e.target.classList.remove('borderRedFB');
        refErr.current && (refErr.current.innerHTML = '');
    }

    const handleSubmit = () => {

    }
    const handleSubmitEdit = () => {

    }


    return (
        <div ref={container}>

            <ScaleLoader color="#fff" height={90} width={8} radius={16} loading={loading} cssOverride={{
                backgroundColor: '#6d6b6b',
                position: 'fixed',
                top: 0,
                width: widthComponent + 'px',
                height: '100vh',
                zIndex: 100,
                opacity: 0.2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }} />

            <Title title="تعریف کامیون" />

            <div className="headPageGe">

                <button
                    className={`--styleLessBtn btnAddGe ${disabledBtnShowForm ? 'disabledBtnGe' : 'enabledBtnGe'}`}
                    ref={btnAddGeRef} onClick={showAddForm}
                    disabled={disabledBtnShowForm}
                >
                    تعریف کامیون
                </button>

                <button
                    className={`--styleLessBtn btnGetGe ${disabledBtnShowRecords ? 'disabledBtnGe' : 'enabledBtnGe'} `}
                    ref={btnGetGeRef}
                    onClick={showCreatedRecord}
                    disabled={disabledBtnShowRecords}
                >
                    مشاهده کامیون‌های تعریف شده
                </button>

            </div>

            <div className={`containerMainAS_Ge ${flexDirection}`}>
                <div className="continerAddGe ">
                    <form action="" className="formBeton">
                        <h5 className={`titleFormFB ${editMode ? '' : 'hideGe'}`}>ویرایش کامیون</h5>
                        <div className="sectionFB">
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label>نام خودرو</label>
                                    <select
                                        name=""
                                        id="truckName"
                                        className="selectFB element inputTextFB"
                                        onChange={e => handleSaveValInput(e)}
                                        onClick={(e) => clearInputError(e, truckNameErrorRef)}
                                    >
                                        <option value="">انتخاب</option>
                                        <option value="بنز">بنز</option>
                                        <option value="اویکو">اویکو</option>
                                        <option value="داف">داف</option>
                                        <option value="آمیکو">آمیکو</option>
                                        <option value="دانگ فانگ">دانگ فانگ</option>
                                        <option value="ولو">ولو</option>
                                        <option value="سایر">سایر</option>
                                    </select>
                                    <i className="icofont-ui-rating starFB" />
                                </div>
                                <div className="errorContainerFB elementError" id="truckNameErrorRef" ref={truckNameErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label>نوع خودرو </label>
                                    <select
                                        name=""
                                        id="truckType"
                                        className="selectFB element inputTextFB"
                                        onChange={e => handleSaveValInput(e)}
                                        onClick={(e) => clearInputError(e, truckTypeErrorRef)}
                                    >
                                        <option value="">انتخاب</option>
                                        <option value="میکسر">میکسر</option>
                                        <option value="پمپ هوایی دکل">
                                            پمپ هوایی دکل
                                        </option>
                                        <option value="پمپ زمینی">پمپ زمینی</option>
                                        <option value="کمپرسی">کمپرسی</option>
                                        <option value="تریلر بونکر">تریلر بونکر</option>
                                        <option value="تریلر" >تریلر</option>
                                        <option value="لودر">لودر</option>
                                        <option value="جرثقیل">جرثقیل</option>
                                        <option value="سایر" >سایر</option>
                                    </select>
                                    <i className="icofont-ui-rating starFB" />
                                </div>
                                <div className="errorContainerFB elementError" id="truckTypeError" ref={truckTypeErrorRef}> </div>
                            </div>                            
                        </div>

                        <div className="sectionFB">
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label> پلاک </label>
                                    <div className="divNumberplate">
                                        <div className="divExampleNumberplate">
                                            <div className="divIranNumberplate">
                                                <div className="iranNumberplateDivImg">
                                                    <img
                                                        className="imgNSP"
                                                        src={iran}
                                                    />
                                                </div>
                                                <div className="iranNumberplateDivSpans">
                                                    <span>I.R.</span>
                                                    <span>IRAN</span>
                                                </div>
                                            </div>

                                            <div className="divNumberplate">
                                                <input
                                                    type="text"
                                                    name=""
                                                    id=""
                                                    className="text2Numberplate"
                                                    placeholder="00"
                                                    maxLength="2"
                                                    onInput={e => getDigitLeftSide(e)}
                                                />

                                                <select
                                                    name=""
                                                    id=""
                                                    className="selectChNumberplate"
                                                    onChange={e => getAlphabet(e)}
                                                >
                                                    <option value="الف"> الف </option>
                                                    <option value="ب"> ب </option>
                                                    <option value="پ"> پ </option>
                                                    <option value="ت"> ت </option>
                                                    <option value="ث"> ث </option>
                                                    <option value="ج"> ج </option>
                                                    <option value="چ"> چ </option>
                                                    <option value="ح"> ح </option>
                                                    <option value="خ"> خ </option>
                                                    <option value="د"> د </option>
                                                    <option value="ذ"> ذ </option>
                                                    <option value="ر"> ر </option>
                                                    <option value="ز"> ز </option>
                                                    <option value="ژ"> ژ </option>
                                                    <option value="س"> س </option>
                                                    <option value="ش"> ش </option>
                                                    <option value="ص"> ص </option>
                                                    <option value="ض"> ض </option>
                                                    <option value="ط"> ط </option>
                                                    <option value="ظ"> ظ </option>
                                                    <option value="ع"> ع </option>
                                                    <option value="غ"> غ </option>
                                                    <option value="ف"> ف </option>
                                                    <option value="ق"> ق </option>
                                                    <option value="ک"> ک </option>
                                                    <option value="گ"> گ </option>
                                                    <option value="ل"> ل </option>
                                                    <option value="م"> م </option>
                                                    <option value="ن"> ن </option>
                                                    <option value="و"> و </option>
                                                    <option value="ه"> ه </option>
                                                    <option value="ی"> ی </option>
                                                </select>

                                                <input
                                                    type="text"
                                                    name=""
                                                    id=""
                                                    className="text3Numberplate"
                                                    placeholder="000"
                                                    maxLength="3"
                                                    onInput={e => getDigitMiddle(e)}
                                                />

                                            </div>

                                            <div className="divSerialNumberplate">
                                                <span>ایران</span>
                                                <input
                                                    type="text"
                                                    className="textSerialNumberplate"
                                                    placeholder="00"
                                                    maxLength="2"
                                                    onInput={e => getDigitRightSide(e)}
                                                />

                                            </div>

                                        </div>

                                    </div>
                                    <i className="icofont-ui-rating starFB" />
                                </div>
                                <div className="errorContainerFB elementError" id="numberplateError" ref={numberplateErrorRef}> </div>
                            </div>
                            

                        </div>

                        <div className="sectionFB">
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="ownerName"> نام مالک </label>
                                    <input
                                        type="text"
                                        id="ownerName"
                                        className="inputTextFB"
                                        onInput={e => handleSaveValInput(e)}
                                        onFocus={(e) => clearInputError(e, ownerNameErrorRef)}
                                    />
                                    <i className="icofont-ui-rating starFB" />
                                </div>
                               <div className="errorContainerFB elementError" id="ownerNameError" ref={ownerNameErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="ownerLastName"> نام خانوادگی </label>
                                    <input
                                        type="text"
                                        id="ownerLastName"
                                        className="inputTextFB"
                                        onInput={e => handleSaveValInput(e)}
                                        onFocus={(e) => clearInputError(e, ownerLastNameErrorRef)}
                                    />
                                    <i className="icofont-ui-rating starFB" />
                                </div>
                                <div className="errorContainerFB elementError" id="ownerLastNameError" ref={ownerLastNameErrorRef}> </div>
                            </div>

                        </div>

                        <div className={`sectionFB divBtnsFB ${!editMode ? '' : 'hideGe'}`}>
                            <Button
                                variant="success"
                                className="btnSaveFB"
                                onClick={handleSubmit}
                            >
                                ثبت
                            </Button>

                            <Button
                                type="reset"
                                variant="warning"
                                className="btnDelFB"
                                onClick={resetForm}
                            >
                                پاک کن
                            </Button>


                        </div>

                        <div className={`sectionFB divBtnsFB ${!editMode ? 'hideGe' : ''}`}>


                            <Button
                                variant="info"
                                className="btnSaveFB"
                                onClick={handleSubmitEdit}
                            >
                                ویرایش
                            </Button>
                        </div>
                    </form>
                </div>

                <div
                    className={`containerShowGe containerShowCustomer  ${hideCreatedRecord ? 'hideGe' : ''}`}
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
                                    onClick={showEditForm}
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
                                    onClick={showEditForm}>
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

        </div>
    );
};

export default AddTruck;
