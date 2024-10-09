import { useRef, useState } from 'react';
import HeadPage from './HeadPage';
const AddSandInvoice = () => {
    const form = useRef(null);
    const [loading, setLoading] = useState(false);
    return (
        <div>
            <HeadPage
                loading={loading}
                title='ایجاد فاکتور شن و ماسه'
                displayBtnAdd={false}
                displayBtnShow={true}
            />

            <div className="continerAddGe">
                <form className="formBeton" ref={form}>

                </form>
            </div>

        </div>
    );
}
export default AddSandInvoice;