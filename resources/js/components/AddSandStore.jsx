import Title from './hooks/Title';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import "../../css/general.css";
import "../../css/formBeton.css";
import "../../css/addCustomer.css";
import { useEffect, useRef, useState } from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ScaleLoader from 'react-spinners/ScaleLoader';
import useChangeForm from './hooks/useChangeForm';
import SelectZabi from './hooks/SelectZabi';

const AddSandStore = () => {

    const MySwal = withReactContent(Swal);
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    const container = useRef(null);
    const btnAddGeRef = useRef(null);
    const btnGetGeRef = useRef(null);


    const form = useRef(null);
    const formCurrent = form.current;

    const typeRef = useRef(null);
    const amountRef = useRef(null);

    const siloErrorRef = useRef(null);
    const typeErrorRef = useRef(null);
    const amountErrorRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [sandStores, setSandStores] = useState(null);

    const [id, setId] = useState(null);
    const typeOptions = [
        {
            value: 1,
            html: <div className="concreteAptionSelectFB">
                <span className="concreteLabelSelectFB">ماسه
                </span>
                <span className="concreteSelectFB">
                    شسته
                </span>
            </div>
        },
        {
            value: 2,
            html: <div className="concreteAptionSelectFB">
                <span className="concreteLabelSelectFB">شن
                </span>
                <span className="concreteSelectFB">
                    بادامی
                </span>
            </div>
        }
    ]
    const [type, setType] = useState('');
    const [input, setInput] = useState({
        silo: '',
        type: '',
        amount: '',
    });

    console.log(input);

    /**
     * دریافت و ذخیره پهنای کامپوننت برای نمایش بهتر لودر
     */
    const [widthComponent, setWidthComponent] = useState(0);
    useEffect(() => {
        let widths = container.current.offsetWidth;
        setWidthComponent(widths)
    }, []);

    useEffect(() => {
        if (type) {
            setInput(perv => ({ ...perv, type }));
        }
    }, [type]);

    useEffect(() => {
        getSandStores();
    }, []);

    async function getSandStores() {
        await axios.get("/api/v1/getSandStores").then((response) => {
            setSandStores(response.data.sandStores);
        });
    }

    /**
     * فرمت‌دهی به اعداد هنگامی که کاربر اقدام به ویرایش یک رکورد می‌کند
     */
    useEffect(() => {
        if (editMode) {
            input.amount && (amountRef.current.value = parseFloat(input.amount).toLocaleString());
        }
    }, [input]);

    /**
    * رکوردهای بتن‌های ایجاد شده را با فرمت‌دهی مناسب جهت نمایش بر می گرداند
    * @returns 
    */
    const returnCreatedSandStoreRecords = () => {
        let numberRow = sandStores.length;
        const reversedConcretes = sandStores.slice().reverse(); // کپی آرایه اولیه و معکوس کردن آن
        let value = reversedConcretes.map((sandStore, i) => {
            return <div className="rowListShowGe" key={i}>
                <span className="rowNumShowGe">{numberRow - i}</span>
                <span className="GASNameShowGe"> {sandStore['silo']}   </span>
                <span className="GASNameShowGe"> {parseInt(sandStore['amount']).toLocaleString()}   </span>
                <div className="divEditGe">
                    <button className="--styleLessBtn btnEditGe" title=" ویرایش "
                        onClick={() => showEditForm(sandStore['id'])}
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
       * هنگامی که کاربر مبادرت به دیدن و یا ویرایش کردن یک رکورد میکند
       * این متد اطلاعات هر فیلد را برای نمایش تنظیم می کند
       * @param {آدی رکورد} id0 
       */
    const pasteDataForEditing = (id0) => {
        let sandStore = sandStores.find(sandStore => sandStore.id === id0);
        sandStore && setId(id0);
        const { id, created_at, updated_at, ...rest } = sandStore;//نادیده گرفتن کلید های مشخص شده
        setInput(rest);
    }

    const resetForm = (apply = true) => {
        setInput({
            silo: '',
            type: '',
            amoutn: ''
        });
        setType('');
        typeRef.current.updateData('انتخاب');
        handleRemoveAllError();

        // در برخی مواقع لازم نیست کدهای داخل شرط استفاده شود
        if (apply) {
            window.scrollTo({ top: 0 });
        }
    }

    const { showAddForm, showCreatedRecord, showEditForm, flexDirection, editMode, disabledBtnShowForm, disabledBtnShowRecords, hideCreatedRecord, containerShowGeRef, hideShowForm } = useChangeForm({ formCurrent, resetForm, pasteDataForEditing });

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

    /**
     * اگر دقت شود در این‌پوت‌های دریافت وزن‌ها و قیمت بتن، واحدها به صورت
     * کیلوگرم و تومان اضافه شدن که درواقع جزیی از این پوت نیستن برای اینکه
     * اگر احتمالا کاربر برروی این واحدها کلید کرد فوکوس در این‌پوت مربوطه
     * ایجاد شود از این متد استفاده می‌شود، برای تجربه کاربری بهتر
     * @param {number} id 
     */
    const htmlFor = (id) => {
        document.getElementById(id).focus()
    }

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
        refErr.current && (refErr.current.innerHTML = '');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        await axios.post(
            '/api/v1/addSandStore',
            { ...input },
            {
                headers:
                {
                    'X-CSRF-TOKEN': token,
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }
        ).then((response) => {
            setSandStores(prev => [...prev, response.data.sandStore]);

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
        setSandStores(sandStores.map((object) => {
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
            `/api/v1/editSandStore/${id}`,
            { ...input },
            {
                headers:
                {
                    'X-CSRF-TOKEN': token,
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }
        ).then((response) => {
            replaceObject(id, response.data.sandStore);

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

            <Title title='تعریف و نمایش انبار شن‌وماسه' />
            <div className="headPageGe">
                <button
                    className={`--styleLessBtn btnAddGe ${disabledBtnShowForm ? 'disabledBtnGe' : 'enabledBtnGe'}`}
                    ref={btnAddGeRef} onClick={() => showAddForm(false)}
                    disabled={disabledBtnShowForm}
                >
                    تعریف انبار
                </button>

                <button
                    className={`--styleLessBtn btnGetGe ${disabledBtnShowRecords ? 'disabledBtnGe' : 'enabledBtnGe'} `}
                    ref={btnGetGeRef}
                    onClick={() => { showCreatedRecord(false); handleRemoveAllError() }}
                    disabled={disabledBtnShowRecords}
                >
                    مشاهده انبارها
                </button>
            </div>

            <div className={`containerMainAS_Ge ${flexDirection}`}>

                <div className="continerAddGe ">
                    <form action="" className={`formBeton ${hideShowForm ? 'hideGe' : ''}`} ref={form}>

                        <h5 className={`titleFormFB ${editMode ? '' : 'hideGe'}`}>ویرایش سیلو </h5>

                        <div className="sectionFB">
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="silo">
                                        نام سیلو
                                    </label>
                                    <input
                                        type="text"
                                        id="silo"
                                        className="inputTextFB element"
                                        defaultValue={input.silo}
                                        onInput={e => handleSaveValInput(e, 'silo')}
                                        onFocus={e => clearInputError(e, siloErrorRef)}
                                        autoFocus
                                    />
                                    <i className="icofont-ui-rating starFB" />
                                </div>
                                <div
                                    className="errorContainerFB elementError"
                                    id="siloError"
                                    ref={siloErrorRef}
                                >
                                </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor='type'> نوع شن‌وماسه </label>
                                    <div
                                        id='type'
                                        className="element"
                                        onClick={e => { clearInputError(e, typeErrorRef) }}
                                    >
                                        <SelectZabi
                                            primaryLabel='انتخاب'
                                            options={typeOptions}
                                            saveOption={setType}
                                            ref={typeRef}
                                        />
                                    </div>
                                    <i className="icofont-ui-rating starFB" />
                                </div>
                                <div
                                    className="errorContainerFB elementError"
                                    id="typeError"
                                    ref={typeErrorRef}
                                >
                                </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="amount">
                                        مقدار
                                    </label>
                                    <input
                                        type="text"
                                        id="amount"
                                        className=" inputTextUnitFB ltrFB element"
                                        defaultValue={input.amount}
                                        ref={amountRef}
                                        onInput={e => {
                                            handleSaveValInput(e, 'amount');
                                            formatNub(amountRef);
                                        }
                                        }
                                        onFocus={e => clearInputError(e, amountErrorRef)}
                                    />
                                    <i className="icofont-ui-rating starFB" />
                                    <span
                                        className="unitFB"
                                        onClick={() => htmlFor('amount')}
                                    >
                                        کیلو گرم
                                    </span>
                                </div>
                                <div
                                    className="errorContainerFB elementError"
                                    id="amountError"
                                    ref={amountErrorRef}
                                >
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
                    <h4 className="titleShowGe"> سیلو‌های تعریف شده</h4>
                    <div className="divListShowGe">
                        <div className="rowListShowGe headRowListShowGe">
                            <span className="rowNumShowGe ">ردیف</span>
                            <span className="GASNameShowGe"> نام سیلو </span>
                            <span className="GASNameShowGe"> مقدار </span>
                            <span className="headEditShowGe"> ویرایش  </span>
                            <span className="headDelShowGe"> حذف </span>
                        </div>
                        {sandStores ? returnCreatedSandStoreRecords() : <Skeleton height={40} count={2} />}
                    </div>
                </div>

            </div>
        </div>
    )
}
export default AddSandStore;