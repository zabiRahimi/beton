import { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
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
import AddTruckSearch from "./search/AddTruckSearch";


const AddTruck = () => {

    let navigate = useNavigate();
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
    const customer_idErrorRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [trucks, setTrucks] = useState([]);
    const [truckOwners, setTruckOwners] = useState([]);
    const [owners, setOwners] = useState();

    const [id, setId] = useState(null);
    const [input, setInput] = useState({
        truckName: '',
        truckType: '',
        numberplate: '',
        customer_id: '',
    });

    const truckTypes = ['میکسر', 'کمپرسی', 'پمپ دکل', 'پمپ زمینی'];

    const truckName = ['بنز', 'ولو', 'داف', 'اویکو', 'ماک', 'اف', 'اسکانیا', 'آمیکو', 'دانگ‌‌‌‌‌‌‌ فانگ', 'کاویان', 'سایر'];

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
    const [alphabet, setAlphabet] = useState('');

    /**
     * ذخیره سه رقم میانی
     */
    const [digitsMiddle, setDigitsMiddle] = useState(null);

    /**
     * ذخیره دو رقم سمت راست
     */
    const [digitsRightSide, setDigitsRightSide] = useState(null);

    const [selectedOption, setSelectedOption] = useState('');

    useEffect(() => {

        async function fetchData() {
            setLoading(true)
            await getTrucks();
            await getTruckOwners();
            setLoading(false)
        }
        fetchData();
    }, []);

    async function getTrucks() {
        await axios.get("/api/v1/getTrucks").then((response) => {
            setTrucks(response.data.trucks);
        });
    }

    /**
     * دریافت مالکان تراک ها
     */
    async function getTruckOwners() {
        await axios.get("/api/v1/getTruckOwners").then((response) => {
            setTruckOwners(response.data.truckOwners);
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
            let val = value + '-' + digitsMiddle + '-' + digitsRightSide + '-' + alphabet;
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
            let val = digitsLeftSide + '-' + digitsMiddle + '-' + digitsRightSide + '-' + value;
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
            let val = digitsLeftSide + '-' + value + '-' + digitsRightSide + '-' + alphabet;
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
            let val = digitsLeftSide + '-' + digitsMiddle + '-' + value + '-' + alphabet;
            setInput(prev => ({ ...prev, numberplate: val }));
        }
    }

    /**
    * رکوردهای کامیون‌های ایجاد شده را با فرمت‌دهی مناسب جهت نمایش بر می گرداند
    * @returns 
    */
    const returnCreatedDriverRecords = () => {
        let numberRow = trucks.length;
        if (numberRow == 0) {
            return <div className="notResultSearch_Se"> هیچ نتیجه‌ای یافت نشد!! </div>
        }
        const reversedConcretes = trucks.slice().reverse(); // کپی آرایه اولیه و معکوس کردن آن
        let value = reversedConcretes.map((truck, i) => {
            return <div className="rowListShowGe" key={i}>
                <span className="rowNumShowGe">{numberRow - i}</span>
                <span className="TrackTypeShowGe"> {truck['truckType']}   </span>
                <span className="licensePlateShowGe"> {returnNumberplate(truck['numberplate'])} </span>
                <span className="truckOwnerShowGe"> {returnNameOwners(truck['customer_id'])}   </span>
                <div className="divEditGe">
                    <button className="--styleLessBtn btnEditGe" title=" ویرایش "
                        onClick={() => showEditForm(truck['id'])}
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
        });

        return value;
    }

    /**
     * هنگامی که قرار است لیست کامیون‌های ایجاد شده نمایش داده شود
     * این متد نام مالک هر رکورد را برمی‌گرداند
     * @param {*} id 
     * @returns 
     */
    const returnNameOwners = (id) => {
        let getOwners = truckOwners.filter(owner => owner.id == id);

        if (getOwners.length > 0) {
            return <div className="truckOwnerShowGeDiv">
                <span>{getOwners[0]['name']}  {getOwners[0]['lastName']}</span>
                <span className="truckOwnerShowGeDivFather"> {getOwners[0]['father']}</span>
            </div>;
        }
    }

    /**
     * هنگامی که قرار است لیست کامیون‌های ایجاد شده نمایش داده شود
     * این متد پلاک هر رکورد را برمی‌گرداند
     * @param {*} id 
     * @returns 
     */
    const returnNumberplate = (numberplate) => {
        if (numberplate) {
            let arr = numberplate.split('-');
            // return `${arr[2]} - ${arr[1]} ${arr[3]}  ${arr[0]}`;
            return <div className="numberplateDiv">
                <span className="numberplateDivS1">{arr[0]}</span>
                <span className="numberplateDivS2">{arr[3] == 'ا' ? 'الف' : arr[3]}</span>
                <span className="numberplateDivS3">{arr[1]}</span>
                <span className="numberplateDivS4">{arr[2]}</span>
            </div>
        }
    }

    const resetForm = (apply = true) => {
        setInput({
            truckName: '',
            truckType: '',
            numberplate: '',
            customer_id: '',
        });
        setSelectedOption('');
        setDigitsLeftSide('');
        setAlphabet('');
        setDigitsMiddle('');
        setDigitsRightSide('');

        // var elements = document.getElementsByClassName('element');
        // for (var i = 0; i < elements.length; i++) {
        //     elements[i].classList.remove('borderRedFB');
        // }

        // var elements = document.getElementsByClassName('elementError');
        // for (var i = 0; i < elements.length; i++) {
        //     elements[i].innerHTML = '';
        // }
        handleRemoveAllError();
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
        let numberplateArr = truck.numberplate.split('-');
        setDigitsLeftSide(numberplateArr[0]);
        setDigitsMiddle(numberplateArr[1]);
        setDigitsRightSide(numberplateArr[2]);
        setAlphabet(numberplateArr[3]);
        returnTruckOwners(truck.truckType);
        setSelectedOption(truck.customer_id);
    }

    const { showAddForm, showCreatedRecord, showEditForm, flexDirection, editMode, disabledBtnShowForm, disabledBtnShowRecords, hideCreatedRecord, containerShowGeRef, hideShowForm } = useChangeForm({ formCurrent, resetForm, pasteDataForEditing });

    /**
       * ذخیره مقادیر ورودی‌های کاربر در استیت
       * @param {*} e 
       * @param {*} input 
       */
    const handleSaveValInput = (e, input) => {
        let { value } = e.target;
        input == 'truckType' && returnTruckOwners(value);
        setInput(prev => ({ ...prev, [input]: value }));
        if (input == 'customer_id') {
            setSelectedOption(value);
        }
        if (input == 'truckType') {
            setSelectedOption('');
        }
    }

    /**
     * هنگامی که کاربر نوع کامیون را مشخص می‌کند این متد مشتریانی 
     * که مالک این نوع کامیونها هستند را برمی‌گرداند تا برای نمایش در 
     * کادر بازشو انتخاب مالک خودرو آماده شود
     * @param {string} truck 
     */
    const returnTruckOwners = (truck) => {
        console.log(truck);
        if (truck != '') {
            let getOwners = truckOwners.filter(owner => owner.customer_type.some(type => type.subtype === truck));
            if (getOwners.length > 0) {
                setOwners(getOwners);
            } else {
                setOwners('');
                MySwal.fire({
                    icon: "warning",
                    title: "هشدار",
                    text: `هنوز هیچ مشتری که صاحب ${truck} باشد، ثبت نشده است، ابتدا مشتری را ثبت  کنید.`,
                    confirmButtonText: "  ثبت مشتری   ",
                    showCancelButton: true,
                    cancelButtonText: "کنسل",
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    preConfirm: () => {

                        navigate("/addCustomer");
                    }

                });
            }
        } else {
            setOwners('');

        }


    }

    const showTruckOwners = () => {
        let val = owners.map((owner, i) => {
            return (
                <option key={i} value={owner['id']}>{owner['name']} {owner['lastName']} {owner['father'] && `(${owner['father']})`}</option>
            )
        })
        return val;
    }

    /**
    * برای پاک کردن پیام خطا و برداشتن رنگ قرمز دور کادر
    * @param {*} e 
    * @param {رف مربوط به تگ نمایش خطا} refErr 
    */
    const clearInputError = (e, refErr, numberplate = false) => {
        e.target.classList.remove('borderRedFB');
        refErr.current && (refErr.current.innerHTML = '');
        if (numberplate) {
            const element = document.getElementById('numberplate');
            element.classList.remove('borderRedFB');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        await axios.post(
            '/api/v1/addTruck',
            { ...input },
            {
                headers:
                {
                    'X-CSRF-TOKEN': token,
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }
        ).then((response) => {
            setTrucks(prev => [...prev, response.data.truck]);

            form.current.reset();

            MySwal.fire({
                icon: "success",
                title: "با موفقیت ثبت شد",
                confirmButtonText: "  متوجه شدم  ",
                timer: 3000,
                timerProgressBar: true,
                customClass: {
                    timerProgressBar: '--progressBarColorBlue',
                },
                didClose: () => resetForm(),
            });

        })
            .catch(
                error => {
                    if (error.response && error.response.status == 422) {

                        let id = Object.keys(error.response.data.errors)[0];

                        const element = document.getElementById(id);
                        let scrollPosition = window.scrollY || window.pageYOffset;

                        const top = element.getBoundingClientRect().top + scrollPosition - 20;
                        window.scrollTo({
                            top: top,
                            behavior: 'smooth'
                        });

                        Object.entries(error.response.data.errors).map(([key, val]) => {
                            document.getElementById(key).classList.add('borderRedFB');

                            document.getElementById(key + 'Error').innerHTML = val;

                        });

                    }
                }
            )

        setLoading(false)
    }

    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        setLoading(true)

        await axios.patch(
            `/api/v1/editTruck/${id}`,
            { ...input },
            {
                headers:
                {
                    'X-CSRF-TOKEN': token,
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }
        ).then((response) => {
            replaceObject(id, response.data.truck);

            MySwal.fire({
                icon: "success",
                title: "با موفقیت ویرایش شد",
                confirmButtonText: "  متوجه شدم  ",
                timer: 3000,
                timerProgressBar: true,
                customClass: {
                    timerProgressBar: '--progressBarColorBlue',
                },
                didClose: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
            });

        })
            .catch(
                error => {
                    if (error.response && error.response.status == 422) {

                        let id = Object.keys(error.response.data.errors)[0];

                        const element = document.getElementById(id);
                        let scrollPosition = window.scrollY || window.pageYOffset;

                        const top = element.getBoundingClientRect().top + scrollPosition - 20;
                        window.scrollTo({
                            top: top,
                            behavior: 'smooth'
                        });

                        Object.entries(error.response.data.errors).map(([key, val]) => {
                            document.getElementById(key).classList.add('borderRedFB');

                            document.getElementById(key + 'Error').innerHTML = val;

                        });

                    }
                }
            )

        setLoading(false)
    }

    /**
     * هنگامی که کاربر اطلاعات یک مشتری را ویرایش می‌کند
     * اطلاعات جدید در استیت جایگزین اطلاعات قبلی می‌شود
     * @param {number} id 
     * @param {object} newObject 
     */
    const replaceObject = (id, newObject) => {
        setTrucks(trucks.map((object) => {
            if (object.id == id) {
                return newObject;
            } else {
                return object;
            }
        }));
    };

    const handleRemoveAllError = () => {
        var elements = document.getElementsByClassName('element');
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.remove('borderRedFB');
        }

        var elements = document.getElementsByClassName('elementError');
        for (var i = 0; i < elements.length; i++) {
            elements[i].innerHTML = '';
        }
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
                    ref={btnAddGeRef} onClick={() => showAddForm(false)}
                    disabled={disabledBtnShowForm}
                >
                    تعریف کامیون
                </button>

                <button
                    className={`--styleLessBtn btnGetGe ${disabledBtnShowRecords ? 'disabledBtnGe' : 'enabledBtnGe'} `}
                    ref={btnGetGeRef}
                    onClick={() => { showCreatedRecord(false); handleRemoveAllError() }}
                    disabled={disabledBtnShowRecords}
                >
                    مشاهده کامیون‌های تعریف شده
                </button>

            </div>

            <div className={`containerMainAS_Ge ${flexDirection}`}>
                <div className="continerAddGe ">
                    <form action="" className={`formBeton ${hideShowForm ? 'hideGe' : ''}`} ref={form}>
                        <h5 className={`titleFormFB ${editMode ? '' : 'hideGe'}`}>ویرایش کامیون</h5>
                        <div className="sectionFB">
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label >نام خودرو</label>
                                    <select
                                        name=""
                                        id="truckName"
                                        className="selectFB element inputTextFB"
                                        value={input.truckName}
                                        onChange={e => handleSaveValInput(e, 'truckName')}
                                        onClick={(e) => clearInputError(e, truckNameErrorRef)}
                                        autoFocus
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
                                <div className="errorContainerFB elementError" id="truckNameError" ref={truckNameErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label>نوع خودرو </label>
                                    <select
                                        name=""
                                        id="truckType"
                                        className="selectFB element inputTextFB"
                                        value={input.truckType}
                                        onChange={e => handleSaveValInput(e, 'truckType')}
                                        onClick={(e) => clearInputError(e, truckTypeErrorRef)}
                                    >
                                        <option value="">انتخاب</option>
                                        {truckTypes.map((truckType, i) => (
                                            <option value={truckType} key={i}>{truckType}</option>
                                        ))}
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
                                    <div className="divNumberplate element" id="numberplate">
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
                                                    defaultValue={digitsLeftSide}
                                                    onInput={e => getDigitLeftSide(e)}
                                                    onClick={(e) => clearInputError(e, numberplateErrorRef, true)}
                                                />

                                                <select
                                                    name=""
                                                    id=""
                                                    className="selectChNumberplate"
                                                    value={alphabet}
                                                    onChange={e => getAlphabet(e)}
                                                    onClick={(e) => clearInputError(e, numberplateErrorRef, true)}
                                                >
                                                    <option value=""> حرف </option>
                                                    <option value="ا"> الف </option>
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
                                                    defaultValue={digitsMiddle}
                                                    onInput={e => getDigitMiddle(e)}
                                                    onClick={(e) => clearInputError(e, numberplateErrorRef, true)}
                                                />

                                            </div>

                                            <div className="divSerialNumberplate">
                                                <span>ایران</span>
                                                <input
                                                    type="text"
                                                    className="textSerialNumberplate"
                                                    placeholder="00"
                                                    maxLength="2"
                                                    defaultValue={digitsRightSide}
                                                    onInput={e => getDigitRightSide(e)}
                                                    onClick={(e) => clearInputError(e, numberplateErrorRef, true)}
                                                />

                                            </div>

                                        </div>

                                    </div>
                                    <i className="icofont-ui-rating starFB" />
                                </div>
                                <div className="errorContainerFB elementError" id="numberplateError" ref={numberplateErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="customer_id"> مالک خودرو </label>
                                    <select
                                        name=""
                                        id="customer_id"
                                        className="selectFB element inputTextFB"
                                        onChange={e => { handleSaveValInput(e, 'customer_id') }}
                                        value={selectedOption}
                                        onClick={(e) => clearInputError(e, customer_idErrorRef)}
                                    >
                                        <option value=""> انتخاب </option>
                                        {owners ? showTruckOwners() : <option style={{ color: 'red' }}> ابتدا نوع خودرو را انتخاب کنید </option>}

                                    </select>
                                    <i className="icofont-ui-rating starFB" />
                                </div>
                                <div className="errorContainerFB elementError" id="customer_idError" ref={customer_idErrorRef}> </div>
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

                        <AddTruckSearch
                            truckTypes={truckTypes}
                        // getCustomers={getCustomers}
                        // handelSetDataSearch={handelSetDataSearch}
                        />

                        <div className="rowListShowGe headRowListShowGe">

                            <span className="rowNumShowGe ">ردیف</span>
                            <span className="TrackTypeShowGe ">نوع خودرو</span>
                            <span className="licensePlateShowGe headLicensePlateShowGe "> پلاک خودرو </span>

                            <span className="truckOwnerShowGe ">مالک خودرو</span>

                            <span className="headEditShowGe"> ویرایش  </span>
                            <span className="headDelShowGe"> حذف </span>

                        </div>

                        {trucks ? returnCreatedDriverRecords() : <Skeleton height={40} count={12} />}

                    </div>

                </div>

            </div>

        </div>
    );
};

export default AddTruck;
