import { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ScaleLoader from 'react-spinners/ScaleLoader';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Title from "./hooks/Title";
import Button from 'react-bootstrap/Button';
import "../../css/formBeton.css";
import "../../css/addPersonnelSlip.css";
import useChangeForm from './hooks/useChangeForm';
import DataZabi from "./hooks/DateZabi";
import SelectZabi from "./hooks/SelectZabi";

const musicGenres = [
    { value: "blues", label: "Blues" },
    { value: "rock", label: "Rock" },
    { value: "jazz", label: "Jazz" },
    { value: "orchestra", label: "Orchestra" },
];


const AddPersonnelSlip = () => {
    let navigate = useNavigate();
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const MySwal = withReactContent(Swal);

    const {
        optionDays,
        optionMonth,
        optionYears,
    } = DataZabi();

    const container = useRef(null);
    const form = useRef(null);
    const formCurrent = form.current;
    const dateOfBirth = useRef(null);
    const daySelect = useRef(null);
    const monthSelect = useRef(null);
    const yearSelect = useRef(null);

    const nameRef = useRef(null);
    const contractStart = useRef(null);
    const contractPeriod = useRef(null);
    const salary = useRef(null);
    const overtime = useRef(null);
    const workFriday = useRef(null);
    const insurance = useRef(null);
    const absencePenalty = useRef(null);

    const btnAddGeRef = useRef(null);
    const btnGetGeRef = useRef(null);

    const customer_idErrorRef = useRef(null);
    const contractStartErrorRef = useRef(null);
    const contractPeriodErrorRef = useRef(null);
    const wageCalculationErrorRef = useRef(null);
    const salaryErrorRef = useRef(null);
    const workFridayErrorRef = useRef(null);
    const workHolidayErrorRef = useRef(null);
    const overtimeErrorRef = useRef(null);
    const insuranceErrorRef = useRef(null);
    const absencePenaltyErrorRef = useRef(null);

    const customerSelectChild = useRef();
    const wageCalculationSelectChild = useRef();

    const [loading, setLoading] = useState(false);
    const [personnels, setPersonnels] = useState([]);
    const [personnels2, setPersonnels2] = useState([]);
    const [personnelSlips, setPersonnelSlips] = useState([]);

    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [input, setInput] = useState({
        customer_id: '',
        contractStart: '',
        contractPeriod: '',
        wageCalculation: '',
        salary: '',
        workFriday: '',
        overtime: '',
        insurance: '',
        absencePenalty: '',
    });
    const [customerId, setCustomerId] = useState('');
    const [wageCalculation, setWageCalculation] = useState('');
    const [id, setId] = useState(null);
    const hasCalledGetPersonnels = useRef(false);

    const [selectedOption, setSelectedOption] = useState('');

    const changeDay = (e) => {
        let { value } = e.target;
        value = value.toString();
        (value != 0 && value.length == 1) && (value = '0' + value);
        (value.length >= 3 && value[0] === '0') && (value = value.slice(1));

        if (value == '' || (Number(value) >= 0 && Number(value) <= 31)) {
            setDay(value);
        }
        let valDate = year + '-' + month + '-' + value;
        setInput(prev => ({ ...prev, contractStart: valDate }));

        // پاک کردن رنگ خط قرمز کادر سلکت از دریافت خطا
        daySelect.current.classList.remove('borderRedFB');

    }

    const changeMonth = (e) => {
        let { value } = e.target;
        value = value.toString();
        (value != 0 && value.length == 1) && (value = '0' + value);
        (value.length >= 3 && value[0] === '0') && (value = value.slice(1));

        if (value == '' || (Number(value) >= 0 && Number(value) <= 12)) {
            setMonth(value);
        }
        let valDate = year + '-' + value + '-' + day;
        setInput(prev => ({ ...prev, contractStart: valDate }));
        // پاک کردن رنگ خط قرمز کادر سلکت از دریافت خطا
        monthSelect.current.classList.remove('borderRedFB');
    }

    const changeYear = (e) => {
        let { value } = e.target;

        if (value == '' || (Number(value) >= 1 && Number(value) <= 1500)) {
            setYear(value);
        }
        let valDate = value + '-' + month + '-' + day;
        setInput(prev => ({ ...prev, contractStart: valDate }));
        // پاک کردن رنگ خط قرمز کادر سلکت از دریافت خطا
        yearSelect.current.classList.remove('borderRedFB');

    }

    /**
    * دریافت و ذخیره پهنای کامپوننت برای نمایش بهتر لودر
    */
    const [widthComponent, setWidthComponent] = useState(0);
    useEffect(() => {
        let widths = container.current.offsetWidth;
        setWidthComponent(widths)
    }, []);

    useEffect(() => {
        // این شرط اطمینان می‌دهد که متد فقط یک بار اجرا شود
        if (!hasCalledGetPersonnels.current) {
            getPersonnels();
            hasCalledGetPersonnels.current = true;
        }
    }, []);

    useEffect(() => {
        customerId && setInput(prev => ({ ...prev, customer_id: customerId }));
    }, [customerId]);

    useEffect(() => {
        wageCalculation && setInput(prev => ({ ...prev, wageCalculation }));
    }, [wageCalculation]);

    useEffect(() => {
        getPersonnelSlips();
    }, [wageCalculation]);

    async function getPersonnels() {
        await axios.get("/api/v1/getPersonnels").then((response) => {
            let datas = response.data.personnels;
            if (datas.length == 0) {
                MySwal.fire({
                    icon: "warning",
                    title: "هشدار",
                    text: `هنوز هیچ مشتری‌ای به عنوان پرسنل ثبت نشده است. لازم است ابتدا پرسنل را به عنوان مشتری ثبت کنید.`,
                    confirmButtonText: "  ثبت مشتری   ",
                    showCancelButton: true,
                    cancelButtonText: "کنسل",
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    preConfirm: () => {

                        navigate("/addCustomer");
                    }

                });
            } else {
                setPersonnels2(datas);
                datas.map((data, i) => {
                    setPersonnels(perv => ([...perv, {
                        value: data.id,
                        html: <div className="personnelAption_addPerS">
                            <span className="name_addPers">{data.name}
                                {' '}
                                {data.lastName}</span>

                            <span className="fther_addPers">
                                {data.father || ''}
                            </span>

                        </div>
                    }]))
                })

            }
        });
    }

    async function getPersonnelSlips() {
        await axios.get("/api/v1/getPersonnelSlips").then((response) => {
            let datas = response.data.personnelSlips;
            setPersonnelSlips(datas);

        });
    }
    const wageCalculationOptions = [
        {
            value: 'ساعتی',
            html: <div className="personnelAption_addPerS">
                <span className="name_addPers"> ساعتی </span>
            </div>
        },
        {
            value: 'روزانه',
            html: <div className="personnelAption_addPerS">
                <span className="name_addPers"> روزانه </span>
            </div>
        },
        {
            value: 'ماهانه',
            html: <div className="personnelAption_addPerS">
                <span className="name_addPers"> ماهانه </span>
            </div>
        },
    ];

    /**
     * 
     * اطلاعات پرسنل را برمی‌گرداند
     * جهت نمایش در رکوردهای فیش های ثبت شده
     * @param {*} id 
     * @returns 
     */
    const retrunPersonnel = (id) => {
        let val = personnels2.filter(personnel => personnel.id == id)
        return val[0];
    }

    /**
    * رکوردهای فیش‌های ایجاد شده را با فرمت‌دهی مناسب جهت نمایش بر می گرداند
    * @returns 
    */
    const returnCreatedPersonnelSlipRecords = () => {
        let numberRow = personnelSlips.length;
        const reversedConcretes = personnelSlips.slice().reverse(); // کپی آرایه اولیه و معکوس کردن آن
        let value = reversedConcretes.map((personnelSlip, i) => {
            console.log(retrunPersonnel(personnelSlip['customer_id']).name);
            return <div className="rowListShowGe" key={i}>
                <span className="rowNumShowGe">{numberRow - i}</span>
                <span className="APSNameShowGe"> {retrunPersonnel(personnelSlip['customer_id']).name} </span>
                <span className="APSNameShowGe"> {retrunPersonnel(personnelSlip['customer_id']).lastName}  </span>
                <span className="APSfatherNameShowGe"> {retrunPersonnel(personnelSlip['customer_id']).father && retrunPersonnel(personnelSlip['customer_id']).father}  </span>
                <div className="divEditGe">
                    <button className="--styleLessBtn btnEditGe" title=" ویرایش "
                        onClick={() => showEditForm(personnelSlip['id'])}
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

    const resetForm = (apply = true) => {
        setInput({
            customer_id: '',
            contractStart: '',
            contractPeriod: '',
            wageCalculation: '',
            salary: '',
            workFriday: '',
            workHoliday: '',
            overtime: '',
            insurance: '',
            absencePenalty: '',
        });
        setCustomerId('');
        setWageCalculation('');
        customerSelectChild.current && customerSelectChild.current.updateData('انتخاب');
        wageCalculationSelectChild.current && wageCalculationSelectChild.current.updateData('انتخاب');

        setDay('');
        setMonth('');
        setYear('');

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

        let personnelSlip = personnelSlips.find(personnelSlip => personnelSlip.id === recordId);
        personnelSlip && setId(recordId);

        const { id, created_at, updated_at, ...rest } = personnelSlip;//نادیده گرفتن کلید های مشخص شده

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
        if (input == 'salary' || input == 'absencePenalty') {
            // حذف کاما از اعداد
            value = value.replace(/,/g, '');
        }
        if (input == 'insurance' && value == 'true') {
            setInput(prev => ({ ...prev, [input]: true }));
        } else if (input == 'insurance' && value == 'false') {
            setInput(prev => ({ ...prev, [input]: false }));
        } else {
            setInput(prev => ({ ...prev, [input]: value }));
        }

        if (input == 'customer_id') {
            setSelectedOption(value);
        }

    }

    /**
    * برای پاک کردن پیام خطا و برداشتن رنگ قرمز دور کادر
    * @param {*} e 
    * @param {رف مربوط به تگ نمایش خطا} refErr 
    */
    const clearInputError = (e, refErr, types = false, date = false) => {
        e.target.classList.remove('borderRedFB');

        /**
         * دو خط کد زیر برای زمانی است‌ که کلاس مورد
         *  نظر بر روی پدر تگهااعمال شده‌است
         * ابتدا پدری که حاوی کلاس است را پیدا می‌کند
         *  و سپس کلاس را از تگ پدر حذف 
         * می‌‌کند، این کدها معمولا برای کامپوننتی
         *  که سلکت سفارشی را ارائه می‌دهد کاربرد دارد
        */
        const parentWithClass = e.target.closest('.borderRedFB');
        parentWithClass && parentWithClass.classList.remove('borderRedFB');
        date && contractStart.current.classList.remove('borderRedFB');
        refErr.current && (refErr.current.innerHTML = '');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        await axios.post(
            '/api/v1/addPersonnelSlip',
            { ...input },
            {
                headers:
                {
                    'X-CSRF-TOKEN': token,
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }
        ).then((response) => {
            setPersonnelSlips(prev => [...prev, response.data.personnelSlip]);

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
                    if (error.response.status == 422) {

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
        setPersonnelSlips(personnelSlips.map((object) => {
            if (object.id == id) {
                return newObject;
            } else {
                return object;
            }
        }));
    };

    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        setLoading(true)

        await axios.patch(
            `/api/v1/editDriver/${id}`,
            { ...input },
            {
                headers:
                {
                    'X-CSRF-TOKEN': token,
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }
        ).then((response) => {
            replaceObject(id, response.data.personnelSlip);

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
     * اگر دقت شود در این‌پوت‌ کلمه ماه
     * اضافه شده که درواقع جزیی از این پوت نیستن برای اینکه
     * اگر احتمالا کاربر برروی این واحدها کلید کرد فوکوس در این‌پوت مربوطه
     * ایجاد شود از این متد استفاده می‌شود، برای تجربه کاربری بهتر
     * @param {number} id 
     */
    const htmlFor = (id) => {
        document.getElementById(id).focus()
    }

    /**
     * برای خوانایی بهتر قیمت و وزن‌ها اعداد را فرمت دهی می‌کند
     * به صورت دهگان،صدگان و ...
     * @param {ref} ref 
     */
    const formatNub = (ref) => {
        let val,
            checkDthot,
            resalt = ref.current.value.replace(/[\s,]/g, "");

        // چک می کند که آیا آخرین کارکتر وارد شده علامت "." است؟
        if (resalt.slice(-1) == '.') {
            checkDthot = true;
        } else {
            checkDthot = false;
        }
        // چک می کند فقط رشته عددی باشد
        if (parseFloat(resalt)) {
            val = parseFloat(resalt);
            /**
             * طبق شرط بالا چنانچه آخرین کارکتر "." دوباره این
             * علامت را به آخر رشته اضافه می کند
             */
            val = checkDthot ? val.toLocaleString() + '.' : val.toLocaleString();
            ref.current.value = val;
        }
    }

    return (
        <div className='' ref={container}>

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
            <Title title="ایجاد و ثبت فیش حقوقی پرسنل" />

            <div className="headPageGe">

                <button
                    className={`--styleLessBtn btnAddGe ${disabledBtnShowForm ? 'disabledBtnGe' : 'enabledBtnGe'}`}
                    ref={btnAddGeRef} onClick={showAddForm}
                    disabled={disabledBtnShowForm}
                >
                    تعریف فیش حقوقی
                </button>

                <button
                    className={`--styleLessBtn btnGetGe ${disabledBtnShowRecords ? 'disabledBtnGe' : 'enabledBtnGe'} `}
                    ref={btnGetGeRef}
                    onClick={showCreatedRecord}
                    disabled={disabledBtnShowRecords}
                >
                    مشاهده فیش‌های تعریف شده
                </button>

            </div>

            <div className={`containerMainAS_Ge ${flexDirection}`}>

                <div className="continerAddGe ">
                    <form action="" className="formBeton" ref={form}>

                        <h5 className={`titleFormFB ${editMode ? '' : 'hideGe'}`}>ویرایش فیش </h5>

                        <div className="sectionFB">
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="customer_id"> پرسنل </label>
                                    <div
                                        id="customer_id"
                                        onClick={e => clearInputError(e, customer_idErrorRef)}
                                    >
                                        <SelectZabi
                                            primaryLabel='انتخاب'
                                            options={personnels}
                                            saveOption={setCustomerId}
                                            ref={customerSelectChild}
                                        />
                                    </div>
                                    <i className="icofont-ui-rating starFB" />
                                </div>
                                <div className="errorContainerFB elementError" id="customer_idError" ref={customer_idErrorRef}> </div>
                            </div>

                        </div>

                        <div className="sectionFB">
                            <div className="containerInputFB">
                                <div className="divInputFB ">
                                    <label htmlFor="day">تاریخ شروع قرارداد </label>
                                    <div className="divDateBirth">
                                        <div className="divUpDateAcus element" id="contractStart"
                                            ref={contractStart}
                                        >
                                            <input
                                                type="text"
                                                className="inputTextDateACus inputDayTDACus element"
                                                placeholder="1"
                                                id="day"
                                                value={day || ''}
                                                onInput={(e) => changeDay(e)}
                                                onFocus={(e) => clearInputError(e, contractStartErrorRef, false, true)}

                                            />
                                            <span>/</span>
                                            <input
                                                type="text"
                                                className="inputTextDateACus inputMonthTDACus element"
                                                placeholder="1"
                                                value={month || ''}
                                                onInput={(e) => changeMonth(e)}
                                                onFocus={(e) => clearInputError(e, contractStartErrorRef, false, true)}

                                            />
                                            <span>/</span>
                                            <input
                                                type="text"
                                                className="inputTextDateACus inputYearTDACus element"
                                                placeholder="1300"
                                                value={year || ''}
                                                onInput={(e) => { changeYear(e) }}
                                                onFocus={(e) => clearInputError(e, contractStartErrorRef, false, true)}

                                            />
                                        </div>

                                        <div className="divDownDateAcus" >
                                            <select
                                                className="element"
                                                value={day}
                                                ref={daySelect}
                                                onChange={(e) => changeDay(e)}
                                                onClick={(e) => clearInputError(e, contractStartErrorRef, false, true)}

                                            >
                                                <option value="">روز</option>
                                                {optionDays}
                                            </select>
                                            <select
                                                className="element"
                                                value={month}
                                                ref={monthSelect}
                                                onChange={(e) => changeMonth(e)}
                                                onClick={(e) => clearInputError(e, contractStartErrorRef, false, true)}

                                            >
                                                <option value="">ماه</option>
                                                {optionMonth}
                                            </select>
                                            <select
                                                className="element"
                                                value={year}
                                                ref={yearSelect}
                                                onChange={(e) => { changeYear(e) }}
                                                onClick={(e) => clearInputError(e, contractStartErrorRef, false, true)}

                                            >
                                                <option value="">سال</option>
                                                {optionYears}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="errorContainerFB elementError" id="contractStartError" ref={contractStartErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="contractPeriod">
                                        مدت قرارداد
                                    </label>
                                    <input
                                        type="text"
                                        id="contractPeriod"
                                        className=" inputTextUnitFB ltrFB element"
                                        defaultValue={input.contractPeriod}
                                        ref={contractPeriod}
                                        onInput={e => {
                                            handleSaveValInput(e, 'contractPeriod');
                                        }
                                        }
                                        onFocus={e => clearInputError(e, contractPeriodErrorRef)}
                                    />

                                    <span
                                        className="unitFB"
                                        onClick={() => htmlFor('contractPeriod')}
                                    >
                                        ماه
                                    </span>
                                </div>
                                <div
                                    className="errorContainerFB elementError"
                                    id="contractPeriodError"
                                    ref={contractPeriodErrorRef}
                                >
                                </div>
                            </div>
                        </div>

                        <div className="sectionFB">
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="wageCalculation">نوع دستمزد</label>
                                    <div
                                        id="wageCalculation"
                                        onClick={e => clearInputError(e, wageCalculationErrorRef)}
                                    >
                                        <SelectZabi
                                            primaryLabel='انتخاب'
                                            options={wageCalculationOptions}
                                            saveOption={setWageCalculation}
                                            ref={wageCalculationSelectChild}
                                        />
                                    </div>
                                    <i className="icofont-ui-rating starFB" />
                                </div>
                                <div className="errorContainerFB elementError" id="wageCalculationError" ref={wageCalculationErrorRef}> </div>

                            </div>


                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="salary">میزان حقوق </label>
                                    <input
                                        type="text"
                                        id="salary"
                                        className=" inputTextUnitFB ltrFB element"
                                        defaultValue={input.salary}
                                        ref={salary}
                                        onInput={e => {
                                            handleSaveValInput(e, 'salary');
                                            formatNub(salary);
                                        }
                                        }
                                        onFocus={e => clearInputError(e, salaryErrorRef)}
                                    />

                                    <span
                                        className="unitFB"
                                        onClick={() => htmlFor('salary')}
                                    >
                                        تومان
                                    </span>
                                    <i className="icofont-ui-rating starFB" />
                                </div>
                                <div className="errorContainerFB elementError" id="salaryError" ref={salaryErrorRef}> </div>
                            </div>

                        </div>

                        <div className="sectionFB">

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="overtime">درصد اضافه کاری</label>
                                    <input
                                        type="text"
                                        id="overtime"
                                        className=" inputTextUnitFB ltrFB element"
                                        defaultValue={input.overtime}
                                        ref={overtime}
                                        onInput={e => {
                                            handleSaveValInput(e, 'overtime');
                                            formatNub(overtime);
                                        }
                                        }
                                        onFocus={e => clearInputError(e, overtimeErrorRef)}
                                    />
                                    <span
                                        className="unitFB"
                                        onClick={() => htmlFor('overtimeErrorRef')}
                                    >
                                        درصد
                                    </span>

                                </div>
                                <div className="errorContainerFB elementError" id="overtimeError" ref={overtimeErrorRef}> </div>

                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="workFriday">درصد جمعه کاری</label>
                                    <input
                                        type="text"
                                        id="workFriday"
                                        className=" inputTextUnitFB ltrFB element"
                                        defaultValue={input.workFriday}
                                        ref={workFriday}
                                        onInput={e => {
                                            handleSaveValInput(e, 'workFriday');
                                            formatNub(workFriday);
                                        }
                                        }
                                        onFocus={e => clearInputError(e, workFridayErrorRef)}
                                    />

                                    <span
                                        className="unitFB"
                                        onClick={() => htmlFor('workFriday')}
                                    >
                                        درصد
                                    </span>
                                </div>
                                <div className="errorContainerFB elementError" id="workFridayError" ref={workFridayErrorRef}> </div>
                            </div>
                        </div>

                        <div className="sectionFB">
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="absencePenalty"> جریمه غیبت</label>
                                    <input
                                        type="text"
                                        id="absencePenalty"
                                        className=" inputTextUnitFB ltrFB element"
                                        defaultValue={input.absencePenalty}
                                        ref={absencePenalty}
                                        onInput={e => {
                                            handleSaveValInput(e, 'absencePenalty');
                                            formatNub(absencePenalty);
                                        }
                                        }
                                        onFocus={e => clearInputError(e, absencePenaltyErrorRef)}
                                    />
                                    <span
                                        className="unitFB"
                                        onClick={() => htmlFor('absencePenalty')}
                                    >
                                        تومان
                                    </span>

                                </div>
                                <div className="errorContainerFB elementError" id="absencePenaltyError" ref={absencePenaltyErrorRef}> </div>

                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label > بیمه </label>
                                    <div className="divRadioFB element" id="insurance">
                                        <label htmlFor="hasInsurance" className="labelInsuranceAPS_FB">
                                            <input
                                                type="radio"
                                                value={true}
                                                name="insurance"
                                                id="hasInsurance"
                                                onInput={e => {
                                                    handleSaveValInput(e, 'insurance');
                                                }
                                                }
                                                onFocus={e => clearInputError(e, insuranceErrorRef)}
                                            />
                                            <span className="hasRadioInsuAPS_FB">دارد</span>
                                        </label>
                                        <label htmlFor="notHasInsurance" className="labelInsuranceAPS_FB">
                                            <input
                                                type="radio"
                                                value={false}
                                                name="insurance"
                                                id="notHasInsurance"
                                                onInput={e => {
                                                    handleSaveValInput(e, 'insurance');
                                                }
                                                }
                                                onFocus={e => clearInputError(e, insuranceErrorRef)}
                                            />
                                            <span className="notHasRadioInsuAPS_FB">ندارد</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="errorContainerFB elementError" id="insuranceError" ref={insuranceErrorRef}> </div>
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

                    <h4 className="titleShowGe"> فیش‌های تعریف شده</h4>

                    <div className="divListShowGe">

                        <div className="rowListShowGe headRowListShowGe">
                            <span className="rowNumShowGe ">ردیف</span>
                            <span className="APSNameShowGe"> نام پرسنل </span>
                            <span className="APSNameShowGe"> نام خانوادگی </span>
                            <span className="APSfatherNameHeadShowGe"> نام پدر </span>
                            <span className="headEditShowGe"> ویرایش  </span>
                            <span className="headDelShowGe"> حذف </span>
                        </div>

                        {personnelSlips.length > 0 ? returnCreatedPersonnelSlipRecords() : <Skeleton height={40} count={12} />}

                    </div>

                </div>

            </div>

        </div>
    )
}
export default AddPersonnelSlip;
