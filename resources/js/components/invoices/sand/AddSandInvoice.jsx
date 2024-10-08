import { useRef, useState } from 'react';
import HeadPage from './HeadPage';
const AddSandInvoice = () => {
    const [loading, setLoading] = useState(false);
    return (
        <div>
            <HeadPage loading={loading} title='ایجاد فاکتور'/>
        </div>
    );
}
export default AddSandInvoice;