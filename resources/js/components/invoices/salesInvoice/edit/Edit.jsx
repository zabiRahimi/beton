import { useState } from 'react';
import HeadPage from '../HeadPage';
const Edit = () => {
    const [loading, setLoading] = useState(false);
    return (
        <div className=''>
            <HeadPage
                loading={loading}
                title='ویرایش فاکتور شن و ماسه'
                displayBtnAdd={true}
                displayBtnShow={true}
            />
        </div>
    )
}
export default Edit;