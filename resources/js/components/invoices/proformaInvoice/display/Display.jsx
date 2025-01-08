import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import HeadPage from '../HeadPage';
import Skeleton from 'react-loading-skeleton';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const Show = () => {
    const { proformaInvoiceId } = useParams();

    const MySwal = withReactContent(Swal);
    const [loading, setLoading] = useState(false);
    const hasCalledgetProforamInvoices = useRef(false);
    const [proformaInvoices, setProformaInvoices] = useState(null);

  

   

   

  

    return (
        <div className=''>
            <HeadPage
                loading={loading}
                title='نمایش پیش فاکتور'
                displayBtnAdd={true}
                displayBtnShow={true}
            />
            <div className='containerShowGe containerShowCustomer' >
              
            </div>
        </div>
    )
}
export default Show;