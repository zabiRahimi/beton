import { useEffect, useRef, useState } from "react";
import Title from "./hooks/Title";

import Button from 'react-bootstrap/Button';
import "../../css/formBeton.css";

const AddGoodsAndServices = () => {
    const divFormulaBetonRef = useRef(null);
    const divUnitPriceAASRef = useRef(null);

    const cementRef = useRef(null);
    const waterRef = useRef(null);
    const sandRef = useRef(null);//ماسه
    const gravelRef = useRef(null);//شن

    const spanShowTotalRef = useRef(null);

    const unitPriceAASRef = useRef(null);

    const btnAddGeRef = useRef(null);
    const btnGetGeRef = useRef(null);

    const containerShowGeRef = useRef(null);

    const [disabledBtnAddGe, setDisabledBtnAddGe] = useState(true);
    const [disabledBtnGetGe, setDisabledBtnGetGe] = useState(false);

    const [hideGetGAS, setHideGetGAS] = useState(true);
    const [flexDirection, setFlexDirection] = useState('columnGe');

    /** ست کردن موارد لازم هنگامی که کاربر ویرایش کامیون را انتخاب می‌کند */
    const [editGAS, setEditGAS] = useState(false);



    const moreBetonDetails = () => {

        divFormulaBetonRef.current.classList.remove('hideFB');
        divUnitPriceAASRef.current.classList.remove('hideFB');

    }

    // هنگام انتخاب نوع کالا چنانچه قبلا نوع کالایی انتخاب شده باشد جزئیات
    // آن کالا را می بندد
    const hide = () => {

        divFormulaBetonRef.current.classList.add('hideFB');
        divUnitPriceAASRef.current.classList.add('hideFB');

    }

    // مجموع واحدهای فرمول بتن را محاسبه می کند
    const totalBtonDetails = () => {

        let cement = cementRef.current.value.replace(/[\s,]/g, ""),
            sand = sandRef.current.value.replace(/[\s,]/g, ""),
            gravel = gravelRef.current.value.replace(/[\s,]/g, ""),
            water = waterRef.current.value.replace(/[\s,]/g, "");


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

    const addGAS = () => {

        setDisabledBtnGetGe(false);
        setDisabledBtnAddGe(true);

        setFlexDirection('columnGe');

        setEditGAS(false)

    }

    const getGAS = () => {

        setDisabledBtnAddGe(false);
        setDisabledBtnGetGe(true);

        setFlexDirection('columnReverseGe');

        setHideGetGAS(false);

    }

    const showFormEditGAS = () => {

        setDisabledBtnGetGe(false);
        setDisabledBtnAddGe(false);

        setFlexDirection('columnGe');

        setEditGAS(true);

    }

    return (
        <>
            <Title title="تعریف کالا و خدمات" />

            <div className="headPageGe">

                <button
                    className={`--styleLessBtn btnAddGe ${disabledBtnAddGe ? 'disabledBtnGe' : 'enabledBtnGe'}`}
                    ref={btnAddGeRef} onClick={addGAS}
                    disabled={disabledBtnAddGe}
                >
                    تعریف کالا و خدمات
                </button>

                <button
                    className={`--styleLessBtn btnGetGe ${disabledBtnGetGe ? 'disabledBtnGe' : 'enabledBtnGe'} `}
                    ref={btnGetGeRef}
                    onClick={getGAS}
                    disabled={disabledBtnGetGe}
                >
                    مشاهده کالا و خدمات
                </button>

            </div>

            <div className={`containerMainAS_Ge ${flexDirection}`}>

                <div className="continerAddGe ">
                    <form action="" className="formBeton">

                        <h5 className={`titleFormFB ${editGAS ? '' : 'hideGe'}`}>ویرایش کالا و خدمات </h5>

                        <div className="sectionFB">
                            <div className="divInputFB">
                                <label>نام کالا</label>
                                <input
                                    type="text"
                                    className="inputTextFB"
                                    autoFocus
                                />
                            </div>

                            <div className="divInputFB">
                                <label>نوع کالا </label>
                                <select name="" id="" className="selectFB" onChange={hide}>
                                    <option value=""> انتخاب </option>
                                    <option value="بتن" onClick={moreBetonDetails}>بتن</option>
                                    <option value="شن و ماسه">شن و ماسه</option>
                                    <option value="سیمان"> سیمان </option>
                                    <option value="آب"> آب </option>
                                    <option value="خدمات"> خدمات </option>
                                    <option value="سایر"> سایر </option>
                                </select>
                            </div>
                        </div>

                        <div className="sectionFB hideFB" ref={divFormulaBetonRef}>
                            <div className="divInputFB">
                                <label htmlFor="cementAAS"> مقدار سیمان </label>
                                <input type="text" id="cementAAS" className=" inputTextUnitFB ltrFB" ref={cementRef} onInput={() => { totalBtonDetails(); formatNub(cementRef) }} />
                                <span className="unitFB" onClick={() => htmlFor('cementAAS')}> کیلو گرم </span>
                            </div>
                            <div className="divInputFB">
                                <label htmlFor="sandAAS"> مقدار ماسه </label>
                                <input type="text" id="sandAAS" className="inputTextUnitFB ltrFB" ref={sandRef} onInput={() => { totalBtonDetails(); formatNub(sandRef) }} />
                                <span className="unitFB" onClick={() => htmlFor('sandAAS')}> کیلو گرم </span>

                            </div>
                            <div className="divInputFB">
                                <label htmlFor="gravelAAS"> مقدار شن </label>
                                <input type="text" id="gravelAAS" className="inputTextUnitFB ltrFB" ref={gravelRef} onInput={() => { totalBtonDetails(); formatNub(gravelRef) }} />
                                <span className="unitFB" onClick={() => htmlFor('gravelAAS')}> کیلو گرم </span>

                            </div>
                            <div className="divInputFB">
                                <label htmlFor="waterAAS"> مقدار آب </label>
                                <input type="text" id="waterAAS" className="inputTextUnitFB ltrFB" ref={waterRef} onInput={() => { totalBtonDetails(); formatNub(waterRef) }} />
                                <span className="unitFB" onClick={() => htmlFor('waterAAS')}> کیلو گرم </span>

                            </div>


                            <div className="showTotalUnitsFB">
                                <span className="span1STUFB">جمع کل:</span>
                                <span className="span2STUFB" ref={spanShowTotalRef}> 0 </span>
                                <span className="span3STUFB" >کیلو گرم</span>

                            </div>

                        </div>

                        <div className="sectionFB hideFB" ref={divUnitPriceAASRef}>

                            <div className="divInputFB">

                                <label> واحد </label>
                                <select name="" id="" className="selectFB">
                                    <option value="">انتخاب</option>
                                    <option value="متر مکعب">متر مکعب</option>
                                    <option value="کیلو گرم">کیلو گرم</option>
                                    <option value="تن"> تن </option>
                                </select>
                            </div>

                            <div className="divInputFB">
                                <label htmlFor='unitPriceAAS'> قیمت واحد </label>
                                <input type="text" id="unitPriceAAS" ref={unitPriceAASRef} className="inputTextUnitFB ltrFB"
                                    onInput={() => { formatNub(unitPriceAASRef) }} />
                                <span className="unitFB" onClick={() => htmlFor('unitPriceAAS')}> تومان </span>

                            </div>


                        </div>


                        <div className="sectionFB divBtnsFB">
                            <Button variant="success" className="btnSaveFB">
                                {editGAS ? 'ویرایش' : 'ثبت'}
                            </Button>
                            <Button type="reset" variant="warning"
                                className={editGAS ? 'hideGe' : ''}
                                onClick={resetAll}>
                                پاک کن
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
                                    onClick={showFormEditGAS}
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
                                    onClick={showFormEditGAS}>
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

}
export default AddGoodsAndServices;
