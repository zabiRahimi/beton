import { useEffect, useRef } from "react";
import Title from "./hooks/Title";
import Button from 'react-bootstrap/Button';


const AddGoodsAndServices = () => {
    const FormulaBetonRef = useRef(null);
    const unitPriceAASRef = useRef(null);

    const cementRef = useRef(null);
    const waterRef = useRef(null);
    const sandRef = useRef(null);//ماسه
    const gravelRef = useRef(null);//شن

    const spanShowTotalRef = useRef(null);
    useEffect(() => {
        // console.log(unitPriceAASRef.current);
        // unitPriceAASRef.current.classList.add('hideFB')
    })

    const moreBetonDetails = () => {

        FormulaBetonRef.current.classList.remove('hideFB');
        unitPriceAASRef.current.classList.remove('hideFB');

    }

    // هنگام انتخاب نوع کالا چنانچه قبلا نوع کالایی انتخاب شده باشد جزئیات
    // آن کالا را می بندد
    const hide = () => {

        FormulaBetonRef.current.classList.add('hideFB');
        unitPriceAASRef.current.classList.add('hideFB');

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
        spanShowTotalRef.current.textContent = 0
    }

    const htmlFor=(id)=>{
        document.getElementById(id).focus()
    }

    return (
        <>
            <Title title="تعریف کالا و خدمات" />
            <div>
                <form action="" className="formBeton">
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

                    <div className="sectionFB hideFB" ref={FormulaBetonRef}>
                        <div className="divInputFB">
                            <label htmlFor="cementAAS"> مقدار سیمان </label>
                            <input type="text" id="cementAAS" className=" inputTextUnitFB ltrFB" ref={cementRef} onInput={() => { totalBtonDetails(); formatNub(cementRef) }} />
                            <span className="unitFB" onClick={()=>htmlFor('cementAAS')}> کیلو گرم </span>
                        </div>
                        <div className="divInputFB">
                            <label htmlFor="sandAAS"> مقدار ماسه </label>
                            <input type="text" id="sandAAS" className="inputTextUnitFB ltrFB" ref={sandRef} onInput={() => { totalBtonDetails(); formatNub(sandRef) }} />
                            <span className="unitFB" onClick={()=>htmlFor('sandAAS')}> کیلو گرم </span>

                        </div>
                        <div className="divInputFB">
                            <label htmlFor="gravelAAS"> مقدار شن </label>
                            <input type="text" id="gravelAAS" className="inputTextUnitFB ltrFB" ref={gravelRef} onInput={() => { totalBtonDetails(); formatNub(gravelRef) }} />
                            <span className="unitFB" onClick={()=>htmlFor('gravelAAS')}> کیلو گرم </span>

                        </div>
                        <div className="divInputFB">
                            <label htmlFor="waterAAS"> مقدار آب </label>
                            <input type="text" id="waterAAS" className="inputTextUnitFB ltrFB" ref={waterRef} onInput={() => { totalBtonDetails(); formatNub(waterRef) }} />
                            <span className="unitFB" onClick={()=>htmlFor('waterAAS')}> کیلو گرم </span>

                        </div>


                        <div className="showTotalUnitsFB">
                            <span className="span1STUFB">جمع کل:</span>
                            <span className="span2STUFB" ref={spanShowTotalRef}> 0 </span>
                            <span className="span3STUFB" >کیلو گرم</span>

                        </div>

                    </div>

                    <div className="sectionFB hideFB" ref={unitPriceAASRef}>

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
                            <label htmlFor='unintPriceAAS'> قیمت واحد </label>
                            <input type="text" id="unintPriceAAS" className="inputTextUnitFB ltrFB" />
                            <span className="unitFB" onClick={()=>htmlFor('unintPriceAAS')}> تومان </span>

                        </div>


                    </div>


                    <div className="sectionFB divBtnsFB">
                        <Button variant="success" className="btnSaveFB"> ثبت </Button>
                        <Button type="reset" variant="warning" onClick={resetAll}> پاک کن </Button>
                    </div>
                </form>
            </div>
        </>
    );

}
export default AddGoodsAndServices;
