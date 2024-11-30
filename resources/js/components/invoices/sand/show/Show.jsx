import { useState } from 'react';
import HeadPage from '../HeadPage';
const Show = () => {
    const [loading, setLoading] = useState(false);
    return (
        <div className=''>
            <HeadPage
                loading={loading}
                title='مشاهده فاکتورهای شن و ماسه'
                displayBtnAdd={true}
                displayBtnShow={false}
            />
        </div>
    )
}
export default Show;