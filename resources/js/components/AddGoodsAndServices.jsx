import Title from "./hooks/Title";
import Button from 'react-bootstrap/Button';


const AddGoodsAndServices = () => {
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
                            <select name="" id="" className="selectFB">
                                <option value=""> انتخاب </option>
                                <option value="بتن">بتن</option>
                                <option value="شن و ماسه">شن و ماسه</option>
                                <option value="سیمان"> سیمان </option>
                                <option value="آب"> آب </option>
                                <option value="خدمات"> خدمات </option>
                                <option value="سایر"> سایر </option>
                            </select>
                        </div>
                    </div>

                    <div className="sectionFB">
                        <div className="divInputFB">
                            <label> مقدار سیمان </label>
                            <input type="text" className="inputTextFB" />
                        </div>
                        <div className="divInputFB">
                            <label> مقدار ماسه </label>
                            <input type="text" className="inputTextFB" />
                        </div>
                        <div className="divInputFB">
                            <label> مقدار شن </label>
                            <input type="text" className="inputTextFB" />
                        </div>
                        <div className="divInputFB">
                            <label> مقدار آب </label>
                            <input type="text" className="inputTextFB" />
                        </div>


                    </div>

                    <div className="sectionFB">

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
                            <label> قیمت واحد </label>
                            <input type="text" className="inputTextFB" />
                        </div>


                    </div>


                    <div className="sectionFB divBtnsFB">
                        <Button variant="success" className="btnSaveFB"> ثبت </Button>
                        <Button type="reset" variant="warning" > پاک کن </Button>
                    </div>
                </form>
            </div>
        </>
    );

}
export default AddGoodsAndServices;
