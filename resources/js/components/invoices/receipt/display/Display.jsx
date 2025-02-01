import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import HeadPage from '../HeadPage';
import '../../../../../css/receipt.css';
import Standard from '../../../../../assets/images/standard.png'

const Display
    = () => {
        const { receiptId } = useParams();
        const [loading, setLoading] = useState(false);
        const hasCalledgetReceipt = useRef(false);
        const printRef = useRef(null);
        const [receipt, setReceipt] = useState('');

        useEffect(() => {
            if (!hasCalledgetReceipt.current) {
                fetchData();
                hasCalledgetReceipt.current = true;
            }
        }, []);

        useEffect(() => {
            if (receipt) {
                // handleSetData();
            }
        }, [receipt]);

        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/v1/receipt/show/${receiptId}`, {
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                setReceipt(response.data.receipt); // استفاده از response.data برای دسترسی به داده‌ها
            } catch (error) {
                console.error("Error fetching data for proformaInvoice:", error);
            } finally {
                setLoading(false);
            }
        };

        // console.log(receipt);

        const handleSetDate = () => {
            const date = receipt.date;
            return date.replace(/-/g, ' / ');
        }

      

     

      


      



        return (
            <div>

                <HeadPage
                    loading={loading}
                    title='نمایش رسید دریافت'
                    displayBtnAdd={true}
                    displayBtnShow={true}
                    displayBtnPrint={true}
                    pRef={printRef}
                />
                <div className='containerShowGe containerShowCustomer' >
                    <div ref={printRef} className="main_Rec">
                        <div className="containerProForma_PFo">
                            <section className="hade1_PFo">
                                <div className="divLogo_Rec">
                                    <i className="icofont-concrete-mixer iLogo_Rec"></i>
                                </div>
                                <div className="divTitle_PFo">
                                    <span className='title_PFo'>رسید دریافت وجه</span>
                                    <span className="nameBeton_PFo">بتن بنای ارسنجان</span>
                                </div>
                                <div className="divId_Rec">
                                   
                                    <div>
                                        <span className='label'>شماره</span>
                                        <span className='value'>{receipt.id}</span>
                                    </div>
                                </div>
                            </section>
                            <section className="hade2_PFo">
                                <div className="divRow_PFo">
                                    <div className="divCol1_PFo">
                                        <span className="sHade2_PFo">مبلغ :</span>
                                        <span className="vHade2_FPo">{receipt.buyer}</span>
                                    </div>
                                    <div className="divCol2_PFo">
                                        <span className="sHade2_PFo">در تاریخ :</span>
                                        <span className="vHade2_FPo">{receipt.nationalCode}</span>
                                    </div>
                                    <div className="divCol2_PFo">
                                        <span className="sHade2_PFo">بابت :</span>
                                        <span className="vHade2_FPo">{receipt.nationalCode}</span>
                                    </div>
                                </div>
                                <div className="divRow_PFo">
                                    <div className="divCol1_PFo">
                                        <span className="sHade2_PFo">پرداخت کننده :</span>
                                        <span className="vHade2_FPo">{receipt.address}</span>
                                    </div>
                                    <div className="divCol2_PFo">
                                        <span className="sHade2_PFo">نحوه پرداخت :</span>
                                        <span className="vHade2_FPo">{receipt.tel}</span>
                                    </div>

                                    <div className="divCol2_PFo">
                                        <span className="sHade2_PFo">نحوه پرداخت :</span>
                                        <span className="vHade2_FPo">{receipt.tel}</span>
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
                               
                                
                                <div className="divSum_PFo">
                                    <div className="divLabelS_PFo">
                                        جمع
                                    </div>
                                    <div className="divValueS_PFo">
                                        
                                    </div>
                                </div>

                                <div className="divSum_PFo">
                                    <div className="divLabelS_PFo">
                                        9% ارزش افزوده
                                    </div>
                                    <div className="divValueS_PFo">
                                       
                                    </div>
                                </div>

                                <div className="divSum_PFo">
                                    <div className="divLabelS_PFo fW600">
                                        قیمت کل
                                    </div>
                                    <div className="divValueS_PFo fW600">
                                    </div>
                                </div>
                            </section>
                            <section className="description_PFo textarea-output">
                                {receipt.description}
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