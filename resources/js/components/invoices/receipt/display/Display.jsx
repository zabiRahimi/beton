import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import HeadPage from '../HeadPage';
import '../../../../../css/receipt.css';
import NumToWordZabi from '../../../hooks/NumToWordZabi';

const Display
  = () => {
    // const numToWord =NumToWordZabi('999999999999999');
    const checkReceipt = useRef(true)
    const { receiptId } = useParams();
    const [loading, setLoading] = useState(false);
    const hasCalledgetReceipt = useRef(false);
    const printRef = useRef(null);
    const [receipt, setReceipt] = useState('');
    const [priceWord, setPriceWord] = useState('')

    useEffect(() => {
      if (!hasCalledgetReceipt.current) {
        fetchData();
        hasCalledgetReceipt.current = true;
      }
    }, []);

    // useEffect(() => {
    //   numToWord && console.log(NumToWordZabi('999999999999999'));
    // }, [numToWord])


    // useEffect(() => {
    //  if (receipt) {
    //   // handleSetData();
    //   handleSetPriceWord();
    //  }
    // }, [receipt]);
    // const handleSetPriceWord = ()=>{
    //   const result= NumToWordZabi(receipt.price);
    //   setPriceWord(result);
    // }
    // const result=(receipt&& checkReceipt.current)&& (NumToWordZabi(receipt.price), checkReceipt.current=false);
    const result = NumToWordZabi(receipt.price);
    // setPriceWord(result);

    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/v1/receipt/show/${receiptId}`, {
          headers: {
            'Accept': 'application/json'
          }
        });
        setReceipt(response.data.receipt); // استفاده از response.data برای دسترسی به داده‌ها
        console.log(response.data.receipt);

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
            <div className="containerReceipt_Rec">
              <section className="hade_Rec">
                <div className="divLogo_Rec">
                  <i className="icofont-concrete-mixer iLogo_Rec"></i>
                </div>
                <div className="divTitle_Rec">
                  <span className='title_Rec'>رسید دریافت وجه</span>
                  <span className="nameBeton_Rec">بتن بنای ارسنجان</span>
                </div>
                <div className="divId_Rec">
                  <div>
                    <span className='label'>شماره</span>
                    <span className='value'>{receipt.id}</span>
                  </div>
                </div>
              </section>
              <section className="container_Rec">
                <div className="divRow_Rec">
                  <div className="divCol1Row1_Rec">
                    <span className="labelRow1_Rec">مبلغ :</span>
                    <div className="divValuePrice_Rec">
                      <span className="numberPrice_Rec">
                        {receipt.price && parseFloat(receipt.price).toLocaleString()}
                      </span>
                      <span className="letterPrice_Rec">
                        {receipt.price && result}
                      </span>
                    </div>
                  </div>
                  <div className="divCol2Row1_Rec">
                    <span className="labelRow1_Rec">در تاریخ :</span>
                    <span className="valueRow1_Rec">
                      {receipt.date && receipt.date.replace(/-/g, '/')}
                    </span>
                  </div>
                  <div className="divCol3Row1_Rec">
                    <span className="labelRow1_Rec">بابت :</span>
                    <span className="valueRow1_Rec">
                      {receipt.for}
                    </span>
                  </div>
                </div>
                <div className="divRow_Rec">
                  <div className="divCol1Row2_Rec">
                    <span className="label_Rec">پرداخت کننده :</span>
                    <span className="valueRow2_Rec">
                      {receipt && receipt.customer.name}
                      {' '}
                      {receipt && receipt.customer.lastName}
                    </span>
                  </div>
                  <div className="divCol2Row2_Rec">
                    <span className="label_Rec">نحوه پرداخت :</span>
                    <span className="valueRow2_Rec">
                      {receipt && receipt.how_to_pay}

                    </span>
                  </div>
                </div>
                {
                  receipt && (receipt.how_to_pay == 'کارت به کارت' || receipt.how_to_pay == 'واریز به حساب' || receipt.how_to_pay == 'وصول چک') && <div className="divRow_Rec">
                    <div className="divCol1Row3_Rec">
                      <span className="label_Rec">
                        {receipt.how_to_pay == 'وصول چک'&& 'شماره چک :' }
                        {receipt.how_to_pay == 'کارت به کارت' && 'شماره کارت مقصد :'}
                        {receipt.how_to_pay == 'واریز به حساب' && 'شماره حساب مقصد :'}
                      </span>
                      <span className="value_Rec valueNum_Rec">
                        {receipt.number}

                      </span>
                    </div>
                    <div className="divCol2Row3_Rec">
                      <span className="label_Rec">
                      {receipt.how_to_pay == 'وصول چک'&& 'صاحب چک :' }
                        {receipt.how_to_pay == 'کارت به کارت' && 'صاحب کارت مقصد :'}
                        {receipt.how_to_pay == 'واریز به حساب' && 'صاحب حساب مقصد :'}
                      </span>
                      <span className="value_Rec">
                        {receipt.owner}

                      </span>
                    </div>
                    <div className="divCol3Row3_Rec">
                      <span className="label_Rec"> بانک  :</span>
                      <span className="value_Rec">
                        {receipt.bank}

                      </span>
                    </div>
                  </div>
                }


              </section>

              <section className="description_Rec textarea-output">
                {receipt.description}
              </section>
              <section className="footer_Rec">
                <div className="divRow1Footer_Rec">
                  <span className="sign">
                    مهر و امضای دریافت کننده
                  </span>
                  <span className="sign">
                    امضای پرداخت کننده
                  </span>
                </div>
                <div className="divRow2Footer_Rec">
                  <div>
                    <span className="labelF"> آدرس : </span>
                    <span className="valueF">
                      ارسنجان، کیلومتر 3 جاده سعادتشهر، روبروی آهن آلات ولیعصر(ع)
                    </span>
                  </div>

                  <div className="divTel_Rec">
                    <span className="labelF"> تلفن : </span>
                    <span className="valueF"> 09175850042 </span>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

      </div>
    )
  }
export default Display;