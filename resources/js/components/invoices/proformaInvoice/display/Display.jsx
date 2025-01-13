import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import HeadPage from '../HeadPage';
import Skeleton from 'react-loading-skeleton';
import Swal from 'sweetalert2';
import '../../../../../css/proforma.css';

import Standard from '../../../../../assets/images/standard.png'
import withReactContent from 'sweetalert2-react-content';
import { useReactToPrint } from 'react-to-print';

const Display
 = () => {
    const { proformaInvoiceId } = useParams();

    const MySwal = withReactContent(Swal);
    const [loading, setLoading] = useState(false);
    const hasCalledgetProforamInvoices = useRef(false);
    const componentRef  = useRef(null);
    const [proformaInvoices, setProformaInvoices] = useState(null);
    const handlePrint = useReactToPrint({
        
        contentRef: componentRef,
        pageStyle: "@page { size: A5 }"
      });
    

    return (
        <div className=''>
             {/* <ReactToPrint trigger={() =>
                            <button>چاپ</button>}
                            // content={() => printRefCurrent}
                            pageStyle="@page { size: A5 }"
                        /> */}
                        
            <HeadPage
                loading={loading}
                title='نمایش پیش فاکتور'
                displayBtnAdd={true}
                displayBtnShow={true}
                displayBtnPrint={true}
               
            />
            <div  className='containerShowGe containerShowCustomer' >
                <div ref={componentRef} className="mainProForma_PFo">
                    <div className="containerProForma_PFo">
                        <section className="hade1_PFo">
                            <div className="divStandard_PFo">
                                <img src={Standard} className='logoStandard_PFo' alt="علامت استاندارد ایران" />
                            </div>
                            <div className="divTitle_PFo">
                                <span className='title_PFo'>پیش فاکتور فروش</span>
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
                                    <span className="sHade2_PFo">محل‌ تخلیه :</span>
                                    <span className="vHade2_FPo">ارسنجان خیابان طالقانی نرسیده به سه راه فرهنگ نبش کوچه مولوی پلاک 442</span>
                                </div>
                                <div className="divCol2_PFo">
                                    <span className="sHade2_PFo">تلفن :</span>
                                    <span className="vHade2_FPo">09178023733</span>
                                </div>
                            </div>
                        </section>
                        <section className="body_PFo">
                            <div className="hadeBody_PFo">
                                <div className="hDivBody_PFo hDivCount_PFo">
                                    <i className="icofont-star-alt-2" />
                                </div>
                                <div className="hDivBody_PFo hDivProduct_PFo">
                                    <span className="s1HadeB_PFo s1Product_PFo"> محصول </span>
                                    <span className="s2HadeB_PFo s2Product_PFo"> (خدمات) </span>
                                </div>
                                <div className="hDivBody_PFo hDivType_PFo">
                                        <span className="s1HadeB_PFo s1Type_PFo"> نوع‌محصول </span>
                                        <span className="s2HadeB_PFo  s2Type_PFo"> (عیار) </span>
                                </div>
                                <div className="hDivBody_PFo hDivAmount_PFo">
                                  <span className="s1HadeB_PFo"> مقدار </span>
                                  <span className="s2HadeB_PFo s2Anount_PFo"> s </span>
                                </div>
                                <div className="hDivBody_PFo hDivUnit_PFo">
                                  <span className="s1HadeB_PFo"> واحد  </span>
                                  <span className="s2HadeB_PFo"> اندازه‌گیری </span>
                                </div>
                                <div className="hDivBody_PFo hDivUnitPrice_PFo">
                                  <span className="s1HadeB_PFo s1UnitPrice_PFo"> قیمت واحد </span>
                                  <span className="s2HadeB_PFo   s2UnitPrice_PFo"> (تومان) </span>
                                </div>
                                <div className="hDivBody_PFo hDivTotalPrice_PFo">
                                  <span className="s1HadeB_PFo s1TotalPrice_PFo"> قیمت کل </span>
                                  <span className="s2HadeB_PFo   s2TotalPrice_PFo"> (تومان) </span>
                                </div>
                            </div>
                            <div className="containerBody_PFo">
                                <div className="divBody_PFo divCount_PFo">
                                  1
                                </div>
                                <div className="divBody_PFo divProduct_PFo">
                                    <span className="vProduct_PFo"> بتن 450 afsdf</span>
                                </div>
                                <div className="divBody_PFo divType_PFo">
                                        <span className="vType_PFo"> 450 </span>
                                </div>
                                <div className="divBody_PFo divAmount_PFo">
                                  <span className="vAmount_PFo"> 25000 </span>
                                </div>
                                <div className="divBody_PFo divUnit_PFo">
                                  <span className="vUnit_PFo"> متر مکعب </span>
                                </div>
                                <div className="divBody_PFo divUnitPrice_PFo">
                                  <span className=" vUnitPrice_PFo"> 1950000 </span>
                                </div>
                                <div className="divBody_PFo divTotalPrice_PFo">
                                  <span className=" vTotalPrice_PFo"> 48750000000 </span>
                                </div>
                            </div>
                            <div className="divSum_PFo">
                                <div className="divSSum_PFo">
                                    <span className="sSum_PFo"> جمع </span>
                                </div>
                                <div className="divVSum_PFo">
                                    <span className="vSum_PFo">98560000000</span>
                                </div>
                            </div>

                            <div className="divSum_PFo">
                                <div className="divSSum_PFo">
                                    <span className="sSum_PFo"> 9% ارزش افزوده </span>
                                </div>
                                <div className="divVSum_PFo">
                                    <span className="vSum_PFo">0</span>
                                </div>
                            </div>

                            <div className="divSum_PFo">
                                <div className="divSSum_PFo">
                                    <span className="sSum_PFo sTotal_PFo"> قیمت کل </span>
                                </div>
                                <div className="divVSum_PFo">
                                    <span className="vSum_PFo vTotal_PFo">98560000000</span>
                                </div>
                            </div>
                        </section>
                        <section className="description_PFo">
                            لطفا به حساب خانم زهرا نظری با مشخصات زیر واریز نمایید. 
                            <br/>
                            شماره کارت  4897-5698-5213-5689
                            <br></br>
                            شماره شبا IR-170235000000568956421487
                        </section>
                        <section className="footer_PFo">
                            <div className="divRow1Footer_PFo">
                                <span className="signSaler_PFo">
                                    مهر و امضای فروشنده
                                </span>
                                <span className="signBuyer_PFo">
                                    امضای خریدار
                                </span>
                            </div>
                            <div className="divRow2Footer_PFo">
                                <div>
                                    <span className="sFooter_PFo sAddressFooter_PFo"> آدرس : </span>
                                    <span className="vFooter_PFo vAddressFooter_PFo">
                                        ارسنجان، کیلومتر 3 جاده سعادتشهر، روبروی آهن آلات ولیعصر(ع)
                                     </span>
                                </div>
                                <div className="divR2R2Footer_PFo">
                                    <div className="divCodepostFooter_PFo">
                                        <span className="sFooter_PFo sCodepostFooter_PFo"> کدپستی : </span>
                                        <span className="vFooter_PFo vCodepostFooter_PFo"> 73761-94572 </span>
                                    </div>
                                    <div className="divTelFooter_PFo">
                                        <span className="sFooter_PFo sTelFooter_PFo"> تلفن : </span>
                                        <span className="vFooter_PFo vTelFooter_PFo"> 09175850042 </span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
           
            <button onClick={()=>handlePrint()}>Print article</button>
        </div>
    )
}
export default Display
;