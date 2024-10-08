import { useState } from 'react';
import HeadPage from './HeadPage';
const ShowSandInvoices = () => {
    const [loading, setLoading] = useState(false);
    return (
        <div className=''>
            <HeadPage loading={loading} title='مشاهده فاکتورها' />
        </div>
    )
}
export default ShowSandInvoices;