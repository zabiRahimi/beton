import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import HeadPage from '../HeadPage';
import '../../../../../css/proforma.css';
import Standard from '../../../../../assets/images/standard.png'

const Display
    = () => {
        const { proformaInvoiceId } = useParams();
        const [loading, setLoading] = useState(false);
        const hasCalledgetProforamInvoices = useRef(false);
        const printRef = useRef(null);
        const [proformaInvoices, setProformaInvoices] = useState('');
        const [products, setProducts] = useState('');

        useEffect(() => {
            if (!hasCalledgetProforamInvoices.current) {
                fetchData();
                hasCalledgetProforamInvoices.current = true;
            }
        }, []);

        useEffect(() => {
            if (proformaInvoices) {
                // handleSetData();
            }
        }, [proformaInvoices]);

        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/v1/proformaInvoice/show/${proformaInvoiceId}`, {
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                setProformaInvoices(response.data.proformaInvoice); // استفاده از response.data برای دسترسی به داده‌ها
                setProducts(response.data.proformaInvoice.proforma_invoice_products);
            } catch (error) {
                console.error("Error fetching data for proformaInvoice:", error);
            } finally {
                setLoading(false);
            }
        };

        // console.log(proformaInvoices);

        const handleSetDate = () => {
            const date = proformaInvoices.date;
            return date.replace(/-/g, ' / ');
        }

        const handleSetProducts = () => {
          return  products.map((product, i)=>{
                return  <div key={i} className="containerBody_PFo">
                <div className="divBody_PFo divCount_PFo">
                   {i+1}
                </div>
                <div className="divBody_PFo divProduct_PFo">
                    {product.product}
                </div>
                <div className="divBody_PFo divType_PFo">
                {product.type}
                </div>
                <div className="divBody_PFo divAmount_PFo">
                {product.amount}
                </div>
                <div className="divBody_PFo divUnit_PFo">
                {product.unit}
                </div>
                <div className="divBody_PFo divUnitPrice_PFo">
                {parseFloat(product.unitPrice).toLocaleString()}
                </div>
                <div className="divBody_PFo divTotalPrice_PFo">
                {parseFloat(product.totalPrice).toLocaleString()}
                </div>
            </div>
            })
        }

        /**
         * مجموع قیمت های کل محصولات
         * @returns totalPrices
         */
        const handleTotalPrices = () => {
            return products.reduce((accumulator, product) => {
                return accumulator + parseFloat(product.totalPrice);
            }, 0);
        }

        /**
         * محاسبه ارزش افزوده در صورت وجود
         * @returns tax
         */
        const handleTax = () => {
            let value;
            if (proformaInvoices.isTax) {
                const totalPrices = handleTotalPrices();
                value = totalPrices * 0.09;

            } else {
                value = 0;

            }
            return value;
        }


        /**
         * مجموع نهایی با احتساب ارزش افزوده 
         */
        const total = () => {
            const totalPrices = handleTotalPrices();
            const tax = handleTax();
            return totalPrices + tax;
        }



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
                <div className='containerShowGe containerShowCustomer' >
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
                                        <span className='value ltrFB'>{proformaInvoices && handleSetDate()}</span>
                                    </div>
                                    <div>
                                        <span className='label'>شماره</span>
                                        <span className='value'>{proformaInvoices.id}</span>
                                    </div>
                                </div>
                            </section>
                            <section className="hade2_PFo">
                                <div className="divRow_PFo">
                                    <div className="divCol1_PFo">
                                        <span className="sHade2_PFo">نام خریدار :</span>
                                        <span className="vHade2_FPo">{proformaInvoices.buyer}</span>
                                    </div>
                                    <div className="divCol2_PFo">
                                        <span className="sHade2_PFo">کد ملی :</span>
                                        <span className="vHade2_FPo">{proformaInvoices.nationalCode}</span>
                                    </div>
                                </div>
                                <div className="divRow_PFo">
                                    <div className="divCol1_PFo">
                                        <span className="sHade2_PFo">محل‌ تخلیه :</span>
                                        <span className="vHade2_FPo">{proformaInvoices.address}</span>
                                    </div>
                                    <div className="divCol2_PFo">
                                        <span className="sHade2_PFo">تلفن :</span>
                                        <span className="vHade2_FPo">{proformaInvoices.tel}</span>
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
                                {products && handleSetProducts()}
                              
                                <div className="divSum_PFo">
                                    <div className="divLabelS_PFo">
                                        جمع
                                    </div>
                                    <div className="divValueS_PFo">
                                        {proformaInvoices && handleTotalPrices().toLocaleString()}
                                    </div>
                                </div>

                                <div className="divSum_PFo">
                                    <div className="divLabelS_PFo">
                                        9% ارزش افزوده
                                    </div>
                                    <div className="divValueS_PFo">
                                        {proformaInvoices && handleTax().toLocaleString()}
                                    </div>
                                </div>

                                <div className="divSum_PFo">
                                    <div className="divLabelS_PFo fW600">
                                        قیمت کل
                                    </div>
                                    <div className="divValueS_PFo fW600">
                                        {proformaInvoices && total().toLocaleString()}
                                    </div>
                                </div>
                            </section>
                            <section className="description_PFo textarea-output">
                                {proformaInvoices.description}
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