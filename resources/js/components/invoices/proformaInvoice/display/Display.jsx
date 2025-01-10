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
                            <div className="divStandard_PFo">
                                <img src={Standard} className='logoStandard_PFo' alt="علامت استاندارد ایران" />
                            </div>
                            <div className="divTitle_PFo">
                                <span className='title_PFo'>پیش فاکتور فروش</span>
                                {/* <i className="icofont-concrete-mixer  logoBeton_PFo"></i> */}
                                <span className="nameBeton_PFo">بتن بنای ارسنجان</span>
                            </div>
                            <div className="divDateId_PFo">
                                <div className="divDate_PFo">
                                    <span className='sDate_PFo'>تاریخ</span>
                                    <span className='vDate_PFo'> 1403/03/01</span>
                                </div>
                                <div className="divId_PFo">
                                    <span className='sId_PFo'>شماره</span>
                                    <span className='vId_PFo'>1000</span>
                                </div>
                            </div>
                        </section>
                        <section className="hade2_PFo">
                            <div className="divRow_PFo">
                                <div className="divCol1_PFo">
                                    <span className="sHade2_PFo">نام خریدار :</span>
                                    <span className="vHade2_FPo">ابوذر نعمتی ارسنجانی اصل</span>
                                </div>
                                <div className="divCol2_PFo">
                                    <span className="sHade2_PFo">کد ملی :</span>
                                    <span className="vHade2_FPo">1234567899</span>
                                </div>
                            </div>
                            <div className="divRow_PFo">
                                <div className="divCol1_PFo">
                                    <span className="sHade2_PFo">آدرس :</span>
                                    <span className="vHade2_FPo">ارسنجان خیابان طالقانی نرسیده به سه راه فرهنگ نبش کوچه مولوی پلاک 442</span>
                                </div>
                                <div className="divCol2_PFo">
                                    <span className="sHade2_PFo">شماره تماس :</span>
                                    <span className="vHade2_FPo">09178023733</span>
                                </div>
                            </div>
                        </section>
                        <section className="body_PFo">
                            <div className="hadeBody_PFo">
                                <div className="hDivCount_PFo">
                                    <i className="icofont-star-alt-2" />
                                </div>
                                <div className="hDivProduct_PFo">
                                    <span className="sHadeB_PFo s1Product_PFo"> محصول </span>
                                    <span className="s2Product_PFo"> (خدمات) </span>
                                </div>
                                <div className="hDivType_PFo">
                                        <span className="sHadeB_PFo s1Type_PFo"> نوع‌محصول </span>
                                        <span className="s2Type_PFo"> (عیار) </span>
                                </div>
                                <div className="hDivAmount_PFo">
                                  <span className="sHadeB_PFo"> مقدار </span>
                                </div>
                                <div className="hDivUnit_PFo">
                                  <span className="sHadeB_PFo"> واحد اندازه‌گیری </span>
                                </div>
                                <div className="hDivUnitPrice_PFo">
                                  <span className="sHadeB_PFo s1UnitPrice_PFo"> قیمت واحد </span>
                                  <span className=" s2UnitPrice_PFo"> (تومان) </span>
                                </div>
                                <div className="hDivTotalPrice_PFo">
                                  <span className="sHadeB_PFo s1TotalPrice_PFo"> قیمت کل </span>
                                  <span className=" s2TotalPrice_PFo"> (تومان) </span>
                                </div>
                            </div>
                        </section>
                        <section className="description_PFo"></section>
                        <section className="footer_PFo"></section>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Show;