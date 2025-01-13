import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import HeadPage from '../HeadPage';
import Skeleton from 'react-loading-skeleton';
import Swal from 'sweetalert2';
import '../../../../../css/proforma.css';
import Standard from '../../../../../assets/images/standard.png'
import withReactContent from 'sweetalert2-react-content';

const Display
 = () => {
    const { proformaInvoiceId } = useParams();
    const MySwal = withReactContent(Swal);
    const [loading, setLoading] = useState(false);
    const hasCalledgetProforamInvoices = useRef(false);
    const printRef  = useRef(null);
    const [proformaInvoices, setProformaInvoices] = useState('');
    
    useEffect(() => {
        if (!hasCalledgetProforamInvoices.current) {
          fetchData();
          hasCalledgetProforamInvoices.current = true;
        }
      }, []);

      const fetchData = async () => {
        try {
            const response = await axios.get(`/api/v1/proformaInvoices/${proformaInvoiceId}/show`, {
                headers: {
                    'Accept': 'application/json'
                }
            });
            setProformaInvoices(response); // استفاده از response.data برای دسترسی به داده‌ها
        } catch (error) {
            console.error("Error fetching data for proformaInvoice:", error);
        } finally {
            setLoading(false);
        }
    };
    
      console.log(proformaInvoices);

    return (
        <div>
                        
            <HeadPage
                loading={loading}
                title='نمایش پیش فاکتور'
                displayBtnAdd={true}
                displayBtnShow={true}
                displayBtnPrint={true}
                pRef={printRef}
            />
            <div  className='containerShowGe containerShowCustomer' >
                <div ref={printRef} className="mainProForma_PFo">
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
                                <div>
                                    <span className='label'>تاریخ</span>
                                    <span className='value'> 1403/03/01</span>
                                </div>
                                <div>
                                    <span className='label'>شماره</span>
                                    <span className='value'>1000</span>
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
                                    <span className="labelHB"> محصول </span>
                                    <span className="subLabelHB"> (خدمات) </span>
                                </div>
                                <div className="hDivBody_PFo hDivType_PFo">
                                        <span className="labelHB"> نوع‌محصول </span>
                                        <span className="subLabelHB"> (عیار) </span>
                                </div>
                                <div className="hDivBody_PFo hDivAmount_PFo">
                                  <span className="labelHB"> مقدار </span>
                                  <span className="subLabelHB"> - </span>
                                </div>
                                <div className="hDivBody_PFo hDivUnit_PFo">
                                  <span className="labelHB"> واحد  </span>
                                  <span className="subLabelHB"> اندازه‌گیری </span>
                                </div>
                                <div className="hDivBody_PFo hDivUnitPrice_PFo">
                                  <span className="labelHB"> قیمت واحد </span>
                                  <span className="subLabelHB"> (تومان) </span>
                                </div>
                                <div className="hDivBody_PFo hDivTotalPrice_PFo">
                                  <span className="labelHB"> قیمت کل </span>
                                  <span className="subLabelHB"> (تومان) </span>
                                </div>
                            </div>
                            <div className="containerBody_PFo">
                                <div className="divBody_PFo divCount_PFo">
                                  1
                                </div>
                                <div className="divBody_PFo divProduct_PFo">
                                    
                                </div>
                                <div className="divBody_PFo divType_PFo">
                                    
                                </div>
                                <div className="divBody_PFo divAmount_PFo">
                                  
                                </div>
                                <div className="divBody_PFo divUnit_PFo">
                                  
                                </div>
                                <div className="divBody_PFo divUnitPrice_PFo">
                                  
                                </div>
                                <div className="divBody_PFo divTotalPrice_PFo">
                                  
                                </div>
                            </div>
                            <div className="divSum_PFo">
                                <div className="divLabelS_PFo">
                                    جمع
                                </div>
                                <div className="divValueS_PFo">
                                    0
                                </div>
                            </div>

                            <div className="divSum_PFo">
                                <div className="divLabelS_PFo">
                                    9% ارزش افزوده
                                </div>
                                <div className="divValueS_PFo">
                                    0
                                </div>
                            </div>

                            <div className="divSum_PFo">
                                <div className="divLabelS_PFo fW600">
                                    قیمت کل
                                </div>
                                <div className="divValueS_PFo fW600">
                                   0
                                </div>
                            </div>
                        </section>
                        <section className="description_PFo">
                            
                        </section>
                        <section className="footer_PFo">
                            <div className="divRow1Footer_PFo">
                                <span className="sign">
                                    مهر و امضای فروشنده
                                </span>
                                <span className="sign">
                                    امضای خریدار
                                </span>
                            </div>
                            <div className="divRow2Footer_PFo">
                                <div>
                                    <span className="labelF"> آدرس : </span>
                                    <span className="valueF">
                                        ارسنجان، کیلومتر 3 جاده سعادتشهر، روبروی آهن آلات ولیعصر(ع)
                                     </span>
                                </div>
                                <div className="divR2R2Footer_PFo">
                                    <div className="divCodepostFooter_PFo">
                                        <span className="labelF"> کدپستی : </span>
                                        <span className="valueF"> 73761-94572 </span>
                                    </div>
                                    <div className="divTelFooter_PFo">
                                        <span className="labelF"> تلفن : </span>
                                        <span className="valueF"> 09175850042 </span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
           
        </div>
    )
}
export default Display
;