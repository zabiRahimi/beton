import { useEffect, useRef, useState } from "react";
import Title from "./hooks/Title";

import Button from 'react-bootstrap/Button';
import "../../css/formBeton.css";
const AddConcrete = () => {
    const divFormulaBetonRef = useRef(null);

    const amountCementRef = useRef(null);
    const amountWaterRef = useRef(null);
    const amountSandRef = useRef(null);//ماسه
    const amountGravelRef = useRef(null);//شن

    const spanShowTotalRef = useRef(null);

    const unitPriceRef = useRef(null);

    const btnAddGeRef = useRef(null);
    const btnGetGeRef = useRef(null);

    const containerShowGeRef = useRef(null);

    const concreteNameErrorRef = useRef(null);
    const amountCementErrorRef = useRef(null);
    const amountGravelErrorRef = useRef(null);
    const amountSandErrorRef = useRef(null);
    const amountWaterErrorRef = useRef(null);
    const unitErrorRef = useRef(null);
    const unitPriceErrorRef = useRef(null);


    const [disabledBtnAddGe, setDisabledBtnAddGe] = useState(true);
    const [disabledBtnGetGe, setDisabledBtnGetGe] = useState(false);

    const [hideGetGAS, setHideGetGAS] = useState(true);
    const [flexDirection, setFlexDirection] = useState('columnGe');

    /** ست کردن موارد لازم هنگامی که کاربر ویرایش کامیون را انتخاب می‌کند */
    const [editMode, setEditMode] = useState(false);

    const [input, setInput] = useState({
        concreteName: '',
        amountCement: '',
        amountSand: '',
        amountGravel: '',
        amountWater: '',
        unit: '',
        unitPrice: '',
    });

  

    // مجموع واحدهای فرمول بتن را محاسبه می کند
    const totalBtonDetails = () => {

        let cement = amountCementRef.current.value.replace(/[\s,]/g, ""),
            sand = amountSandRef.current.value.replace(/[\s,]/g, ""),
            gravel = amountGravelRef.current.value.replace(/[\s,]/g, ""),
            water = amountWaterRef.current.value.replace(/[\s,]/g, "");


        cement = cement ? parseFloat(cement) : 0;
        sand = sand ? parseFloat(sand) : 0;
        gravel = gravel ? parseFloat(gravel) : 0;
        water = water ? parseFloat(water) : 0;

        let total = cement + sand + gravel + water;

        spanShowTotalRef.current.textContent = total.toLocaleString();

    }

    const formatNub = (ref) => {

        // let resalt = ref.current.value.replace(/[\s,]/g, "");
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
     * تمام دادهای جانبی فرم را پاک می کند
     */
    const resetAll = () => {
        spanShowTotalRef.current.textContent = 0;
        hide();
    }

    const htmlFor = (id) => {
        document.getElementById(id).focus()
    }

    /**
     * نمایش فرم تعریف بتن
     */
    const showAddConcreteForm = () => {
        setDisabledBtnGetGe(false);
        setDisabledBtnAddGe(true);
        setFlexDirection('columnGe');
        setEditMode(false)
    }

    /**
     * نمایش لیست بتن‌های تعریف شده
     */
    const showCreatedConcretes = () => {
        setDisabledBtnAddGe(false);
        setDisabledBtnGetGe(true);
        setFlexDirection('columnReverseGe');
        setHideGetGAS(false);
    }

    /**
     * نمایش فرم ویرایش بتن
     *  @param {number} id 
     */
    const showEditConcreteForm = (id) => {

        setDisabledBtnGetGe(false);
        setDisabledBtnAddGe(false);

        setFlexDirection('columnGe');

        setEditMode(true);

    }

    const handleSubmit = () => {

    }

    const handleSubmitEdit = () => {

    }
    return (
        <div className=''>

            <Title title="تعریف نوع بتن" />

            <div className="headPageGe">

                <button
                    className={`--styleLessBtn btnAddGe ${disabledBtnAddGe ? 'disabledBtnGe' : 'enabledBtnGe'}`}
                    ref={btnAddGeRef} onClick={showAddConcreteForm}
                    disabled={disabledBtnAddGe}
                >
                    تعریف نوع بتن
                </button>

                <button
                    className={`--styleLessBtn btnGetGe ${disabledBtnGetGe ? 'disabledBtnGe' : 'enabledBtnGe'} `}
                    ref={btnGetGeRef}
                    onClick={showCreatedConcretes}
                    disabled={disabledBtnGetGe}
                >
                    مشاهده انواع بتن‌های ثبت شده
                </button>

            </div>

            <div className={`containerMainAS_Ge ${flexDirection}`}>

                <div className="continerAddGe ">
                    <form action="" className="formBeton">

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
                                        autoFocus
                                    />
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
                                        onInput={() => { totalBtonDetails(); formatNub(amountCementRef) }}
                                    />
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
                                        onInput={() => { totalBtonDetails(); formatNub(amountSandRef) }}
                                    />
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
                                        onInput={() => { totalBtonDetails(); formatNub(amountGravelRef) }}
                                    />
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
                                        onInput={() => { totalBtonDetails(); formatNub(amountWaterRef) }}
                                    />
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
                                        value={input.unit||''}
                                        >
                                        <option value="">انتخاب</option>
                                        <option value="متر مکعب">متر مکعب</option>
                                        <option value="کیلو گرم">کیلو گرم</option>
                                        <option value="تن"> تن </option>
                                    </select>
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
                                        onInput={() => { formatNub(unitPriceRef) }}
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
                                // onClick={resetForm}
                                onClick={resetAll}
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
                    className={`containerShowGe containerShowCustomer  ${hideGetGAS ? 'hideGe' : ''}`}
                    ref={containerShowGeRef}
                >

                    <h4 className="titleShowGe"> کالا و خدمات تعریف شده</h4>

                    <div className="divListShowGe">

                        <div className="rowListShowGe headRowListShowGe">

                            <span className="rowNumShowGe ">ردیف</span>

                            <span className="GASNameShowGe"> کالا</span>
                            <span className="GASTypeShowGe"> نوع کالا </span>

                            <span className="headEditShowGe"> ویرایش  </span>
                            <span className="headDelShowGe"> حذف </span>

                        </div>

                        <div className="rowListShowGe">

                            <span className="rowNumShowGe">1</span>
                            <span className="GASNameShowGe"> ماسه </span>
                            <span className="GASTypeShowGe"> شن و ماسه </span>

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

                        <div className="rowListShowGe">
                            <span className="rowNumShowGe">2</span>
                            <span className="GASNameShowGe"> سیمان </span>
                            <span className="GASTypeShowGe"> سیمان </span>

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

                            <span className="GASNameShowGe">بتن 350</span>
                            <span className="GASTypeShowGe">بتن</span>

                            <div className="divEditGe">
                                <button className="--styleLessBtn btnEditGe" title=" ویرایش "
                                    onClick={showEditConcreteForm}>
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
    )
}
export default AddConcrete;