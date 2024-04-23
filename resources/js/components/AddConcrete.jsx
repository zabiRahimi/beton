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

const AddConcrete = () => {
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const MySwal = withReactContent(Swal);
    const container = useRef(null);
    const form = useRef(null);
    const formCurrent = form.current;
    const divFormulaBetonRef = useRef(null);

    const amountCementRef = useRef(null);
    const amountWaterRef = useRef(null);
    const amountSandRef = useRef(null);//ماسه
    const amountGravelRef = useRef(null);//شن

    const spanShowTotalRef = useRef(null);

    const unitPriceRef = useRef(null);

    const btnAddGeRef = useRef(null);
    const btnGetGeRef = useRef(null);

    // const containerShowGeRef = useRef(null);

    const concreteNameErrorRef = useRef(null);
    const amountCementErrorRef = useRef(null);
    const amountGravelErrorRef = useRef(null);
    const amountSandErrorRef = useRef(null);
    const amountWaterErrorRef = useRef(null);
    const unitErrorRef = useRef(null);
    const unitPriceErrorRef = useRef(null);

    const [loading, setLoading] = useState(false);

    // const [disabledBtnAddGe, setDisabledBtnAddGe] = useState(true);
    // const [disabledBtnShowRecords, setDisabledBtnShowRecords] = useState(false);

    // const [hideGetGAS, setHideGetGAS] = useState(true);
    // const [flexDirection, setFlexDirection] = useState('columnGe');

    /** ست کردن موارد لازم هنگامی که کاربر ویرایش کامیون را انتخاب می‌کند */
    // const [editMode, setEditMode] = useState(false);
    const [concretes, setConcretes] = useState([]);
    console.log(concretes);
    const [input, setInput] = useState({
        concreteName: '',
        amountCement: '',
        amountSand: '',
        amountGravel: '',
        amountWater: '',
        unit: '',
        unitPrice: '',
    });

    useEffect(() => {

        getConcretes();
    }, []);

    async function getConcretes() {
        await axios.get("/api/v1/getConcretes").then((response) => {
            setConcretes(response.data.Concretes);
        });
    }

    /**
    * رکوردهای بتن‌های ایجاد شده را با فرمت‌دهی مناسب جهت نمایش بر می گرداند
    * @returns 
    */
    const returnCreatedConcreteRecords = () => {
        let numberRow = concretes.length;
        const reversedConcretes = concretes.slice().reverse(); // کپی آرایه اولیه و معکوس کردن آن
        let value = reversedConcretes.map((concrete, i) => {

            return <div className="rowListShowGe" key={i}>

                <span className="rowNumShowGe">{numberRow - i}</span>
                <span className="GASNameShowGe"> {concrete['concreteName']} </span>


                <div className="divEditGe">
                    <button className="--styleLessBtn btnEditGe" title=" ویرایش "
                        onClick={showEditConcreteForm}
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

        })

        return value;
    }

    // console.log(input);
    const resetForm = (apply = true) => {
        setInput({
            concreteName: '',
            amountCement: '',
            amountSand: '',
            amountGravel: '',
            amountWater: '',
            unit: '',
            unitPrice: '',
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
            // const element = form.current;
            // let scrollPosition = window.scrollY || window.pageYOffset;
            // const top = element.getBoundingClientRect().top + scrollPosition - 50;
            window.scrollTo({ top: 0 });
        }

        spanShowTotalRef.current.innerHTML = 0;


    }

    const { showAddForm, showCreatedRecord, flexDirection, editMode, disabledBtnShowForm, disabledBtnShowRecords, hideCreatedRecord, containerShowGeRef } = useChangeForm({ formCurrent, resetForm });
    /**
         * دریافت و ذخیره پهنای کامپوننت برای نمایش بهتر لودر
         */
    const [widthComponent, setWidthComponent] = useState(0);
    useEffect(() => {
        let widths = container.current.offsetWidth;
        setWidthComponent(widths)
    }, []);

    /**
     * مجموع واحدهای فرمول بتن را محاسبه می کند
     */
    const totalBtonDetails = () => {
        let cement = amountCementRef.current.value.replace(/[\s,]/g, ""),
            sand = amountSandRef.current.value.replace(/[\s,]/g, ""),
            gravel = amountGravelRef.current.value.replace(/[\s,]/g, ""),
            water = amountWaterRef.current.value.replace(/[\s,]/g, ""),
            total;
        cement = cement ? parseFloat(cement) : 0;
        sand = sand ? parseFloat(sand) : 0;
        gravel = gravel ? parseFloat(gravel) : 0;
        water = water ? parseFloat(water) : 0;
        total = cement + sand + gravel + water;
        spanShowTotalRef.current.textContent = total.toLocaleString();
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
     * نمایش فرم ویرایش بتن
     *  @param {number} id 
     */
    const showEditConcreteForm = (id) => {
        setDisabledBtnShowRecords(false);
        setDisabledBtnShowForm(false);
        setFlexDirection('columnGe');
        setEditMode(true);
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
        refErr.current && (refErr.current.innerHTML = '');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        await axios.post(
            '/api/v1/addConcrete',
            { ...input },
            {
                headers:
                {
                    'X-CSRF-TOKEN': token,
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }
        ).then((response) => {
            setConcretes(prev => [...prev, response.data.concrete]);

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

    const handleSubmitEdit = () => {

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
            <Title title="تعریف نوع بتن" />

            <div className="headPageGe">

                <button
                    className={`--styleLessBtn btnAddGe ${disabledBtnShowForm ? 'disabledBtnGe' : 'enabledBtnGe'}`}
                    ref={btnAddGeRef} onClick={showAddForm}
                    disabled={disabledBtnShowForm}
                >
                    تعریف نوع بتن
                </button>

                <button
                    className={`--styleLessBtn btnGetGe ${disabledBtnShowRecords ? 'disabledBtnGe' : 'enabledBtnGe'} `}
                    ref={btnGetGeRef}
                    onClick={showCreatedRecord}
                    disabled={disabledBtnShowRecords}
                >
                    مشاهده انواع بتن‌های تعریف شده
                </button>

            </div>

            <div className={`containerMainAS_Ge ${flexDirection}`}>

                <div className="continerAddGe ">
                    <form action="" className="formBeton" ref={form}>

                        <h5 className={`titleFormFB ${editMode ? '' : 'hideGe'}`}>ویرایش نوع بتن </h5>

                        <div className="sectionFB">
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="concreteName">
                                        نام بتن
                                    </label>
                                    <input
                                        type="text"
                                        id="concreteName"
                                        className="inputTextFB element"
                                        defaultValue={input.concreteName}
                                        onInput={e => handleSaveValInput(e, 'concreteName')}
                                        onFocus={e => clearInputError(e, concreteNameErrorRef)}
                                        autoFocus
                                    />
                                    <i className="icofont-ui-rating starFB" />
                                </div>
                                <div
                                    className="errorContainerFB elementError"
                                    id="concreteNameError"
                                    ref={concreteNameErrorRef}
                                >
                                </div>
                            </div>
                        </div>

                        <div className="sectionFB " ref={divFormulaBetonRef}>
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="amountCement">
                                        مقدار سیمان
                                    </label>
                                    <input
                                        type="text"
                                        id="amountCement"
                                        className=" inputTextUnitFB ltrFB element"
                                        defaultValue={input.amountCement}
                                        ref={amountCementRef}
                                        onInput={e => {
                                            handleSaveValInput(e, 'amountCement'); totalBtonDetails();
                                            formatNub(amountCementRef);
                                        }
                                        }
                                        onFocus={e => clearInputError(e, amountCementErrorRef)}
                                    />
                                    <i className="icofont-ui-rating starFB" />
                                    <span
                                        className="unitFB"
                                        onClick={() => htmlFor('amountCement')}
                                    >
                                        کیلو گرم
                                    </span>
                                </div>
                                <div
                                    className="errorContainerFB elementError"
                                    id="amountCementError"
                                    ref={amountCementErrorRef}
                                >
                                </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="amountSand"> مقدار ماسه </label>
                                    <input
                                        type="text"
                                        id="amountSand"
                                        className="inputTextUnitFB ltrFB element"
                                        defaultValue={input.amountSand}
                                        ref={amountSandRef}
                                        onInput={e => {
                                            handleSaveValInput(e, 'amountSand'); totalBtonDetails();
                                            formatNub(amountSandRef);
                                        }
                                        }
                                        onFocus={e => clearInputError(e, amountSandErrorRef)}
                                    />
                                    <i className="icofont-ui-rating starFB" />
                                    <span
                                        className="unitFB"
                                        onClick={() => htmlFor('amountSand')}
                                    >
                                        کیلو گرم
                                    </span>
                                </div>
                                <div
                                    className="errorContainerFB elementError" id="amountSandError"
                                    ref={amountSandErrorRef}> </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="amountGravel">
                                        مقدار شن
                                    </label>
                                    <input
                                        type="text"
                                        id="amountGravel"
                                        className="inputTextUnitFB ltrFB element"
                                        defaultValue={input.amountGravel}
                                        ref={amountGravelRef}
                                        onInput={e => {
                                            handleSaveValInput(e, 'amountGravel'); totalBtonDetails();
                                            formatNub(amountGravelRef);
                                        }
                                        }
                                        onFocus={e => clearInputError(e, amountGravelErrorRef)}
                                    />
                                    <i className="icofont-ui-rating starFB" />
                                    <span
                                        className="unitFB"
                                        onClick={() => htmlFor('amountGravel')}
                                    >
                                        کیلو گرم
                                    </span>
                                </div>
                                <div
                                    className="errorContainerFB elementError"
                                    id="amountGravelError"
                                    ref={amountGravelErrorRef}
                                >
                                </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="amountWater">
                                        مقدار آب
                                    </label>
                                    <input
                                        type="text"
                                        id="amountWater"
                                        className="inputTextUnitFB ltrFB element"
                                        defaultValue={input.amountWater}
                                        ref={amountWaterRef}
                                        onInput={e => {
                                            handleSaveValInput(e, 'amountWater'); totalBtonDetails();
                                            formatNub(amountWaterRef);
                                        }
                                        }
                                        onFocus={e => clearInputError(e, amountWaterErrorRef)}
                                    />
                                    <i className="icofont-ui-rating starFB" />
                                    <span
                                        className="unitFB"
                                        onClick={() => htmlFor('amountWater')}
                                    >
                                        کیلو گرم
                                    </span>
                                </div>
                                <div
                                    className="errorContainerFB elementError"
                                    id="amountWaterError"
                                    ref={amountWaterErrorRef}
                                >
                                </div>
                            </div>

                            <div className="showTotalUnitsFB">
                                <span className="span1STUFB">جمع کل:</span>
                                <span className="span2STUFB" ref={spanShowTotalRef}> 0 </span>
                                <span className="span3STUFB" >کیلو گرم</span>
                            </div>

                        </div>

                        <div className="sectionFB " >
                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label> واحد </label>
                                    <select
                                        name=""
                                        id="unit"
                                        className="selectFB element inputTextFB"
                                        value={input.unit || ''}
                                        onChange={e => { handleSaveValInput(e, 'unit') }}
                                        onClick={(e) => clearInputError(e, unitErrorRef)}
                                    >
                                        <option value="">انتخاب</option>
                                        <option value="متر مکعب">متر مکعب</option>
                                        <option value="کیلو گرم">کیلو گرم</option>
                                        <option value="تن"> تن </option>
                                    </select>
                                    <i className="icofont-ui-rating starFB" />
                                </div>
                                <div
                                    className="errorContainerFB elementError"
                                    id="unitError"
                                    ref={unitErrorRef}
                                >
                                </div>
                            </div>

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor='unitPrice'> قیمت واحد </label>
                                    <input
                                        type="text"
                                        id="unitPrice"
                                        className="inputTextUnitFB ltrFB element"
                                        defaultValue={input.unitPrice}
                                        ref={unitPriceRef}
                                        onInput={e => {
                                            handleSaveValInput(e, 'unitPrice');
                                            formatNub(unitPriceRef);
                                        }
                                        }
                                        onFocus={e => clearInputError(e, unitPriceErrorRef)}
                                    />
                                    <span
                                        className="unitFB"
                                        onClick={() => htmlFor('unitPrice')}
                                    >
                                        تومان
                                    </span>
                                </div>
                                <div
                                    className="errorContainerFB elementError"
                                    id="concreteNameCodeError"
                                    ref={unitPriceErrorRef}
                                >
                                </div>
                            </div>

                        </div>


                        {/* <div className="sectionFB divBtnsFB">
                            <Button variant="success" className="btnSaveFB">
                                {editMode ? 'ویرایش' : 'ثبت'}
                            </Button>
                            <Button type="reset" variant="warning"
                                className={editMode ? 'hideGe' : ''}
                                onClick={resetAll}>
                                پاک کن
                            </Button>
                        </div> */}

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
                            // onClick={resetAll}
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

                    <h4 className="titleShowGe"> انواع بتن‌های تعریف شده</h4>

                    <div className="divListShowGe">

                        <div className="rowListShowGe headRowListShowGe">
                            <span className="rowNumShowGe ">ردیف</span>
                            <span className="GASNameShowGe"> نوع بتن </span>
                            <span className="headEditShowGe"> ویرایش  </span>
                            <span className="headDelShowGe"> حذف </span>
                        </div>

                        {concretes ? returnCreatedConcreteRecords() : <Skeleton height={40} count={12} />}

                    </div>

                </div>

            </div>

        </div>
    )
}
export default AddConcrete;