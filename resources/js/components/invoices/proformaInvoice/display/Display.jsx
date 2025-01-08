import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import HeadPage from '../HeadPage';
import Skeleton from 'react-loading-skeleton';
import Swal from 'sweetalert2';
import '../../../../../css/proforma.css';

import Standard from '../../../../../assets/images/standard.png'
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
                <div className="mainProForma_PFo">
                    <div className="containerProForma_PFo">
                        <section className="hade1_PFo">
                                <div className="standard_PFo">
                                    <img src={Standard} className='logoStandard_PFo' alt="علامت استاندارد ایران" />
                                </div>
                                <div className="title_PFo">
                                    <span>پیش فاکتور فروش</span>
                                </div>
                            <div className="divLogoBetonDate_PFo">
                                <div className="logoDateId_PFo">
                                    <i className="icofont-concrete-mixer  logoBeton_PFo"></i>
                                    <span className="nameBeton_PFo">بتن بنای ارسنجان</span>
                                </div>
                                <div className="dateId_PFo">
                                    <div className="date_PFo">
                                        <span>تاریخ</span>
                                        <span> 1403 / 03 / 01</span>
                                    </div>
                                    <div className="id_PFo">
                                        <span>شماره</span>
                                        <span>1000</span>
                                    </div>
                                </div>
                            </div>


                        </section>
                        <section className="hade2_PFo"></section>
                        <section className="body_PFo"></section>
                        <section className="description_PFo"></section>
                        <section className="footer_PFo"></section>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Show;