import Button from 'react-bootstrap/Button';

import Title from "./hooks/Title";
import "../../css/formBeton.css";
import "../../css/addCustomerType.css";


const AddCustomerType =()=>{
    return (
        <>
         <Title title="تعریف نوع مشتری" />
        
        <div className="containerACuT">

            <div className="divRightACuT">
            <form action="" className="formBeton">
                    <div className="sectionFB">
                        <div className="divInputFB divInputFB2">
                            <label>نوع مشتری</label>
                            <input
                                type="text"
                                className="inputTextFB"
                                autoFocus
                            />
                        </div>

                        
                    </div>

                    <div className="sectionFB divBtnsFB">
                        <Button variant="success" className="btnSaveFB"> ثبت </Button>
                        <Button type="reset" variant="warning"> پاک کن </Button>
                    </div>

                </form>
            </div>

            <div className="divLeftACuT">
                <div className='divListACut'>
                        <h4> نوع مشتری تعریف شده </h4>
                        <div className='listACuT'>
                            <span> خریدار بتن </span>
                            <span> خریدار ضایعات </span>
                            <span> فروشنده شن و ماسه </span>
                            <span> فروشنده سیمان </span>
                            <span> فروشنده آب </span>
                            <span> فروشنده پودرسنگ </span>
                            <span> پرسنل </span>
                            <span> مالک خودرو </span>
                            <span> راننده میکسر </span>
                            <span> راننده لودر </span>
                            <span> راننده پمپ </span>
                            <span> اپراتور پمپ </span>
                        </div>
                </div>
            </div>

        </div>
        </>
    )
}

export default AddCustomerType;