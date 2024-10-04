import { useRef, useState } from 'react';
import HeadPage from './HeadPage';
const AddSandInvoice = () => {
    const [loading, setLoading] = useState(false);
    return (
        <div>
            <HeadPage loading={loading}/>
        </div>
    );
}
export default AddSandInvoice;