import { useEffect, useRef, useState } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ScaleLoader from 'react-spinners/ScaleLoader';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Title from "./hooks/Title";
import Button from 'react-bootstrap/Button';
import "../../css/formBeton.css";
import useChangeForm from './hooks/useChangeForm';
import DataZabi from "./hooks/DateZabi";
import Pagination from "./hooks/Pagination";
import AddDriverSearch from "./search/AddDriverSearch";


const AddDriver = () => {
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

    const btnAddGeRef = useRef(null);
    const btnGetGeRef = useRef(null);

    const nameErrorRef = useRef(null);
    const lastNameErrorRef = useRef(null);
    const fatherErrorRef = useRef(null);
    const nationalCodeErrorRef = useRef(null);
    const dateOfBirthErrorRef = useRef(null);
    const mobileErrorRef = useRef(null);
    const addressErrorRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [drivers, setDrivers] = useState([]);

    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [input, setInput] = useState({
        name: '',
        lastName: '',
        father:'',
        nationalCode: '',
        dateOfBirth: '',
        mobile: '',
        address: '',
    });
    const [id, setId] = useState(null);

    const [search, setSearch] = useState({
        id: '',
        name: '',
        lastName: '',
    });
     /**
    * ############### states for paginate
    */
     const [totalPage, setTotalPage] = useState(0);
     const [currentPage, setCurrentPage] = useState(1);

    const changeDay = (e) => {
        let { value } = e.target;
        value = value.toString();
        (value != 0 && value.length == 1) && (value = '0' + value);
        (value.length >= 3 && value[0] === '0') && (value = value.slice(1));

        if (value == '' || (Number(value) >= 0 && Number(value) <= 31)) {
            setDay(value);
        }
        let valDate = year + '-' + month + '-' + value;
        setInput(prev => ({ ...prev, dateOfBirth: valDate }));

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
        setInput(prev => ({ ...prev, dateOfBirth: valDate }));
        // پاک کردن رنگ خط قرمز کادر سلکت از دریافت خطا
        monthSelect.current.classList.remove('borderRedFB');
    }

    const changeYear = (e) => {
        let { value } = e.target;

        if (value == '' || (Number(value) >= 1 && Number(value) <= 1500)) {
            setYear(value);
        }
        let valDate = value + '-' + month + '-' + day;
        setInput(prev => ({ ...prev, dateOfBirth: valDate }));
        // پاک کردن رنگ خط قرمز کادر سلکت از دریافت خطا
        yearSelect.current.classList.remove('borderRedFB');

    }

    useEffect(() => {
        getDrivers();
    }, []);

    async function getDrivers(page=1, id=search.id, name=search.name, lastName=search.lastName) {
        setLoading(true);
        await axios.get(`/api/v1/getDrivers?page=${page}`,{
            params: {
                id,
                name,
                lastName,
            }
        }).then((response) => {
            setTotalPage(response.data.drivers.last_page);
            setDrivers(response.data.drivers.data);
            window.scrollTo({
                top: top,
                behavior: 'smooth'
            });
        }).catch(
            error => {
                if (error.response && error.response.status == 422) {
                    const objErrors = error.response.data.errors;
                    // دریافت اولین کلید آبجکت و سپس مقدار آن
                    const firstKey = Object.keys(objErrors)[0];
                    const firstValue = objErrors[firstKey];
                    MySwal.fire({
                        icon: "warning",
                        title: "هشدار",
                        html: `<div style="color: red;">${firstValue[0]}</div>`,

                        confirmButtonText: "متوجه شدم!",
                        confirmButtonColor: "#d33",
                    });

                }
            }
        );
        setTimeout(() => {
            setLoading(false);
        }, 300);
    }

    /**
     * از طریق کامپوننت فرزند این متد فراخوانی و مقدار دهی می‌شود
     * from AddCustomerSearch.jsx
     * @param {} data 
     */
    const handelSetDataSearch = (data) => {
        setSearch(data);
    }

    /**
    * رکوردهای بتن‌های ایجاد شده را با فرمت‌دهی مناسب جهت نمایش بر می گرداند
    * @returns 
    */
    const returnCreatedDriverRecords = () => {
        let numberRow = drivers.length;
        if (numberRow == 0) {
            return <div className="notResultSearch_Se"> هیچ نتیجه‌ای یافت نشد!! </div>
        }
        const reversedConcretes = drivers.slice().reverse(); // کپی آرایه اولیه و معکوس کردن آن
        let value = drivers.map((driver, i) => {
            return <div className="rowListShowGe" key={i}>
                <span className="rowNumShowGe">{numberRow - i}</span>
                <span className="rowIdDriverGe">{driver['id']}</span>
                <span className="GASNameShowGe"> {driver['name']} {driver['lastName']}  </span>
                <span className="GASNameShowGe"> {driver['father']}   </span>
                <div className="divEditGe">
                    <button className="--styleLessBtn btnEditGe" title=" ویرایش "
                        onClick={() => showEditForm(driver['id'])}
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
            name: '',
            lastName: '',
            father:'',
            nationalCode: '',
            dateOfBirth: '',
            mobile: '',
            address: '',
        });

        setDay('');
        setMonth('');
        setYear('');

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

        let driver = drivers.find(driver => driver.id === recordId);
        driver && setId(recordId);

        const { id, created_at, updated_at, ...rest } = driver;//نادیده گرفتن کلید های مشخص شده

        setInput(rest);
        if (rest.dateOfBirth) {
            let parts = rest.dateOfBirth.split("-");
            setYear(parts[0]);
            setMonth(parts[1]);
            setDay(parts[2]);
        }
    }

    const { showAddForm, showCreatedRecord, showEditForm, flexDirection, editMode, disabledBtnShowForm, disabledBtnShowRecords, hideCreatedRecord, containerShowGeRef, hideShowForm  } = useChangeForm({ formCurrent, resetForm, pasteDataForEditing });

    /**
     * دریافت و ذخیره پهنای کامپوننت برای نمایش بهتر لودر
     */
    const [widthComponent, setWidthComponent] = useState(0);
    useEffect(() => {
        let widths = container.current.offsetWidth;
        setWidthComponent(widths)
    }, []);

    /**
        * ذخیره مقادیر ورودی‌های کاربر در استیت
        * @param {*} e 
        * @param {*} input 
        */
    const handleSaveValInput = (e, input) => {
        let { value } = e.target;
        // حذف کاما از اعداد
        let result = value.replace(/,/g, '');
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

    const addZeroFirstStr = (element) => {
        let value = input[element];
        if (value && value != '0') {
            isFirstDigitZero(value) || (value = 0 + value);
        } else {
            value = '';
        }
        setInput(prev => ({ ...prev, [element]: value }));
    }

    /**
    * چکت می کند که آیا اول رشته صفر است یا خیر
    * @param {یک رشته عددی} str 
    * @returns 
    */
    function isFirstDigitZero(str) {
        // اگر اولین کاراکتر رشته صفر باشد، تابع true برمی‌گرداند
        return str.charAt(0) === '0';
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        await axios.post(
            '/api/v1/addDriver',
            { ...input },
            {
                headers:
                {
                    'X-CSRF-TOKEN': token,
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }
        ).then((response) => {
            setDrivers(prev => [...prev, response.data.driver]);

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
        setDrivers(drivers.map((object) => {
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
            replaceObject(id, response.data.driver);

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
            <Title title="تعریف راننده" />

            <div className="headPageGe">

                <button
                    className={`--styleLessBtn btnAddGe ${disabledBtnShowForm ? 'disabledBtnGe' : 'enabledBtnGe'}`}
                    ref={btnAddGeRef} onClick={() => showAddForm(false)}
                    disabled={disabledBtnShowForm}
                >
                    تعریف راننده
                </button>

                <button
                    className={`--styleLessBtn btnGetGe ${disabledBtnShowRecords ? 'disabledBtnGe' : 'enabledBtnGe'} `}
                    ref={btnGetGeRef}
                    onClick={() => { showCreatedRecord(false); handleRemoveAllError() }}
                    disabled={disabledBtnShowRecords}
                >
                    مشاهده راننده‌های تعریف شده
                </button>

            </div>

            <div className={`containerMainAS_Ge ${flexDirection}`}>

                <div className="continerAddGe ">
                    <form action="" className={`formBeton ${hideShowForm ? 'hideGe' : ''}`}  ref={form}>

                        <h5 className={`titleFormFB ${editMode ? '' : 'hideGe'}`}>ویرایش راننده </h5>

                        <div className="sectionFB">
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="name">
                                        نام
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="inputTextFB element"
                                        defaultValue={input.name}
                                        onInput={e => handleSaveValInput(e, 'name')}
                                        onFocus={e => clearInputError(e, nameErrorRef)}
                                        autoFocus
                                    />
                                    <i className="icofont-ui-rating starFB" />
                                </div>
                                <div
                                    className="errorContainerFB elementError"
                                    id="nameError"
                                    ref={nameErrorRef}
                                >
                                </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="lastName">
                                        نام خانوادگی
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        className="inputTextFB element"
                                        defaultValue={input.lastName}
                                        onInput={e => handleSaveValInput(e, 'lastName')}
                                        onFocus={e => clearInputError(e, lastNameErrorRef)}
                                        
                                    />
                                    <i className="icofont-ui-rating starFB" />
                                </div>
                                <div
                                    className="errorContainerFB elementError"
                                    id="lastNameError"
                                    ref={lastNameErrorRef}
                                >
                                </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="name">
                                        نام پدر
                                    </label>
                                    <input
                                        type="text"
                                        id="father"
                                        className="inputTextFB element"
                                        defaultValue={input.father}
                                        onInput={e => handleSaveValInput(e, 'father')}
                                        onFocus={e => clearInputError(e, fatherErrorRef)}
                                    />
                                </div>
                                <div
                                    className="errorContainerFB elementError"
                                    id="fatherError"
                                    ref={fatherErrorRef}
                                >
                                </div>
                            </div>
                        </div>

                        <div className="sectionFB">
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="nationalCode">کد ملی </label>
                                    <input
                                        type="text"
                                        id="nationalCode"
                                        className="inputTextFB ltrFB element"
                                        defaultValue={input.nationalCode}
                                        onInput={e => handleSaveValInput(e, 'nationalCode')}
                                        onFocus={(e) => clearInputError(e, nationalCodeErrorRef)}
                                    />
                                </div>
                                <div className="errorContainerFB elementError" id="nationalCodeError" ref={nationalCodeErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB ">
                                    <label htmlFor="day">تاریخ تولد </label>
                                    <div className="divDateBirth">
                                        <div className="divUpDateAcus element" id="dateOfBirth"
                                            ref={dateOfBirth}
                                        >
                                            <input
                                                type="text"
                                                className="inputTextDateACus inputDayTDACus element"
                                                placeholder="1"
                                                id="day"
                                                value={day || ''}
                                                onInput={(e) => changeDay(e)}
                                                onFocus={(e) => clearInputError(e, dateOfBirthErrorRef, false, true)}

                                            />
                                            <span>/</span>
                                            <input
                                                type="text"
                                                className="inputTextDateACus inputMonthTDACus element"
                                                placeholder="1"
                                                value={month || ''}
                                                onInput={(e) => changeMonth(e)}
                                                onFocus={(e) => clearInputError(e, dateOfBirthErrorRef, false, true)}

                                            />
                                            <span>/</span>
                                            <input
                                                type="text"
                                                className="inputTextDateACus inputYearTDACus element"
                                                placeholder="1300"
                                                value={year || ''}
                                                onInput={(e) => { changeYear(e) }}
                                                onFocus={(e) => clearInputError(e, dateOfBirthErrorRef, false, true)}

                                            />
                                        </div>

                                        <div className="divDownDateAcus" >
                                            <select
                                                className="element"
                                                value={day}
                                                ref={daySelect}
                                                onChange={(e) => changeDay(e)}
                                                onClick={(e) => clearInputError(e, dateOfBirthErrorRef, false, true)}

                                            >
                                                <option value="">روز</option>
                                                {optionDays}
                                            </select>
                                            <select
                                                className="element"
                                                value={month}
                                                ref={monthSelect}
                                                onChange={(e) => changeMonth(e)}
                                                onClick={(e) => clearInputError(e, dateOfBirthErrorRef, false, true)}

                                            >
                                                <option value="">ماه</option>
                                                {optionMonth}
                                            </select>
                                            <select
                                                className="element"
                                                value={year}
                                                ref={yearSelect}
                                                onChange={(e) => { changeYear(e) }}
                                                onClick={(e) => clearInputError(e, dateOfBirthErrorRef, false, true)}

                                            >
                                                <option value="">سال</option>
                                                {optionYears}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="errorContainerFB elementError" id="dateOfBirthError" ref={dateOfBirthErrorRef}> </div>
                            </div>
                        </div>

                        <div className="sectionFB">
                            <div className="divRightFB">
                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label htmlFor="mobile">موبایل</label>
                                        <input type="text" id="mobile" className="inputTextFB ltrFB element"
                                            value={input['mobile'] || ''}
                                            onInput={e => handleSaveValInput(e, 'mobile')}
                                            onBlur={() => addZeroFirstStr('mobile')}
                                            onFocus={(e) => clearInputError(e, mobileErrorRef)}

                                        />
                                    </div>
                                    <div className="errorContainerFB elementError" id="mobileError" ref={mobileErrorRef}> </div>

                                </div>

                            </div>

                            <div className="divLeftFB">
                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label htmlFor="address">آدرس</label>
                                        <textarea
                                            id="address"
                                            className="textareaAddressACu"
                                            defaultValue={input.address}
                                            onInput={e => handleSaveValInput(e, 'address')}
                                            onFocus={(e) => clearInputError(e, addressErrorRef)}

                                        />
                                    </div>
                                    <div className="errorContainerFB elementError" id="addressError" ref={addressErrorRef}> </div>
                                </div>
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

                    <h4 className="titleShowGe"> راننده‌های تعریف شده</h4>

                    <div className="divListShowGe">

                    <AddDriverSearch
                            getDrivers={getDrivers}
                            handelSetDataSearch={handelSetDataSearch}
                        />

                        <div className="rowListShowGe headRowListShowGe">
                            <span className="rowNumShowGe ">ردیف</span>
                            <span className="rowIdDriverGe ">شناسه</span>
                            <span className="GASNameShowGe"> راننده </span>
                            <span className="GASNameShowGe"> نام پدر </span>
                            <span className="headEditShowGe"> ویرایش  </span>
                            <span className="headDelShowGe"> حذف </span>
                        </div>

                        {drivers ? returnCreatedDriverRecords() : <Skeleton height={40} count={12} />}

                        <Pagination
                            className="pagination-bar"
                            currentPage={currentPage}
                            totalPage={totalPage}
                            siblingCount={3}
                            onPageChange={page => { setCurrentPage(page); getDrivers(page) }}
                        />

                    </div>

                </div>

            </div>

        </div>
    )
}
export default AddDriver;
