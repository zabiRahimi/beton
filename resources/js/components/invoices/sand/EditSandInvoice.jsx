import { useState } from 'react';
import HeadPage from './HeadPage';
const EditSandInvoice = () => {
    const [loading, setLoading] = useState(false);
    return (
        <div className=''>
            <HeadPage loading={loading} title='ویرایش فاکتور' />
        </div>
    )
}
export default EditSandInvoice;