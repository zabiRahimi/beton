import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import HeadPage from '../HeadPage';
import '../../../../../css/receipt.css';
import useNumToWordZabi from '../../../hooks/useNumToWordZabi';

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

    const result = useNumToWordZabi(receipt.price);

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
    const paymentMethods = ['کارت به کارت', 'واریز به حساب', 'وصول چک', 'حواله شن و ماسه', 'حواله سیمان'];

    /**
     * چنانچه رسید اطلاعات تکمیلی داشته باشد متد زیر آن را اضافه می کند
     * در واقع هر وقت که روش پرداخت، یکی از روشهای کارت به کارت، واریز به حساب، وصول چک
     * حواله شن و ماسه و حواله سیمان باشد نیاز به اطلاعات تکمیلی است
     */
    const handleDditionalInformation = () => {
      if (paymentMethods.some(method => receipt.how_to_pay.includes(method))) {
        return <div className="divRow_Rec">
          <div className="divCol1Row3_Rec">
            <span className="label_Rec">
              {handleSetNumberLable(receipt.how_to_pay)}
            </span>
            <span className="value_Rec valueNum_Rec">
              {handleSetNumberValue()}
            </span>
          </div>
          <div className="divCol2Row3_Rec">
            <span className="label_Rec">
              {handleSetOwnerLable(receipt.how_to_pay)}
            </span>
            <span className="value_Rec">
              {handleSetOwnerValue()}
            </span>
          </div>
          <div className="divCol3Row3_Rec">
            <span className="label_Rec">
              {handleSetBankLable(receipt.how_to_pay)}
            </span>
            <span className="value_Rec">
              {handleSetBankValue()}
            </span>
          </div>
        </div>
      }
    }

    const handleSetNumberLable = (howToPay) => {
      let label;
      switch (howToPay) {
        case 'کارت به کارت':
          label = 'شماره کارت مقصد :';
          break;
        case 'واریز به حساب':
          label = 'شماره حساب مقصد :';
          break;
        case 'وصول چک':
          label = 'شماره چک :';
          break;
        case 'حواله سیمان':
          label = 'شماره حواله :';
          break;
        case 'حواله شن و ماسه':
          label = 'شماره حواله :';
          break;
      }
      return label;
    }

    const handleSetNumberValue = () => {
      let value;
      switch (receipt.how_to_pay) {
        case 'کارت به کارت':
          value = handleSetNumberValueForBankCard();
          break;
        case 'واریز به حساب':
          value = handleSetNumberValueForBankAccount();
          break;
        case 'وصول چک':
          value = handleSetNumberValueForBankCheck();
          break;
        case 'حواله سیمان':
          value = handleSetNumberValueForCementRemittance();
          break;
        case 'حواله شن و ماسه':
          value = handleSetNumberValueForSandRemittance();
          break;
      }
      return value;
    }

    const handleSetNumberValueForBankCard = () => {
      let value;
      value = receipt.number;
      return value;
    }

    const handleSetNumberValueForBankAccount = () => {
      let value;
      value = receipt.number;
      return value;
    }

    const handleSetNumberValueForBankCheck = () => {
      let value;
      if (receipt.document_receivable_id) {

      } else {
        value = receipt.number;
      }
      return value;
    }

    const handleSetNumberValueForCementRemittance = () => {
      let value;
      if (receipt.cement_remittance_id) {

      } else {
        value = receipt.number;
      }
      return value;
    }

    const handleSetNumberValueForSandRemittance = () => {
      let value;
      if (receipt.sand_remittance_id) {
        value = `${receipt.sand_remittance.remittanceNumber}`
      } else {
        value = receipt.number;
      }
      return value;
    }

    const handleSetOwnerLable = (howToPay) => {
      let label;
      switch (howToPay) {
        case 'کارت به کارت':
          label = 'صاحب کارت مقصد :';
          break;
        case 'واریز به حساب':
          label = 'صاحب حساب مقصد :';
          break;
        case 'وصول چک':
          label = 'صاحب چک :';
          break;
        case 'حواله سیمان':
          label = 'خریدار حواله :';
          break;
        case 'حواله شن و ماسه':
          label = 'خریدار حواله :';
          break;
      }
      return label;
    }

    const handleSetOwnerValue = () => {
      let value;
      switch (receipt.how_to_pay) {
        case 'کارت به کارت':
          value = handleSetOwnerValueForBankCard();
          break;
        case 'واریز به حساب':
          value = handleSetOwnerValueForBankAccount();
          break;
        case 'وصول چک':
          value = handleSetOwnerValueForBankCheck();
          break;
        case 'حواله سیمان':
          value = handleSetOwnerValueForCementRemittance();
          break;
        case 'حواله شن و ماسه':
          value = handleSetOwnerValueForSandRemittance();
          break;
      }
      return value;
    }

    const handleSetOwnerValueForBankCard = () => {
      let value;
      value = receipt.owner;
      return value;
    }

    const handleSetOwnerValueForBankAccount = () => {
      let value;
      value = receipt.owner;
      return value;
    }

    const handleSetOwnerValueForBankCheck = () => {
      let value;
      if (receipt.document_receivable_id) {

      } else {
        value = receipt.owner;
      }
      return value;
    }

    const handleSetOwnerValueForCementRemittance = () => {
      let value;
      if (receipt.cement_remittance_id) {

      } else {
        value = receipt.owner;
      }
      return value;
    }

    const handleSetOwnerValueForSandRemittance = () => {
      let value;
      if (receipt.sand_remittance_id) {
        value = `${receipt.sand_remittance.buyerName} ${receipt.sand_remittance.buyerLastName}`
      } else {
        value = receipt.owner;
      }
      return value;
    }

    /**
     * متد زیر  یا برچسب بانک را بر می گرداند یا برچست تامین کننده را
     */
    const handleSetBankLable = (howToPay) => {
      let label;
      switch (howToPay) {
        case 'کارت به کارت':
          label = 'بانک :';
          break;
        case 'واریز به حساب':
          label = 'بانک :';

          break;
        case 'وصول چک':
          label = 'بانک :';

          break;
        case 'حواله سیمان':
          label = 'تامین کننده :';

          break;
        case 'حواله شن و ماسه':
          label = 'تامین کننده :';

          break;
      }
      return label;
    }

    const handleSetBankValue = () => {
      let value;
      switch (receipt.how_to_pay) {
        case 'کارت به کارت':
          value = handleSetBankValueForBankCard();
          break;
        case 'واریز به حساب':
          value = handleSetBankValueForBankAccount();
          break;
        case 'وصول چک':
          value = handleSetBankValueForBankCheck();
          break;
        case 'حواله سیمان':
          value = handleSetSupplierValueForCementRemittance();
          break;
        case 'حواله شن و ماسه':
          value = handleSetSupplierValueForSandRemittance();
          break;
      }
      return value;
    }

    const handleSetBankValueForBankCard = () => {
      let value;
      value = receipt.bank;
      return value;
    }

    const handleSetBankValueForBankAccount = () => {
      let value;
      value = receipt.bank;
      return value;
    }

    const handleSetBankValueForBankCheck = () => {
      let value;
      if (receipt.document_receivable_id) {

      } else {
        value = receipt.bank;
      }
      return value;
    }

    const handleSetSupplierValueForCementRemittance = () => {
      let value;
      if (receipt.cement_remittance_id) {

      } else {
        value = receipt.bank;
      }
      return value;
    }

    const handleSetSupplierValueForSandRemittance = () => {
      let value;
      if (receipt.sand_remittance_id) {
        value = `${receipt.sand_remittance.factory}`
      } else {
        value = receipt.bank;
      }
      return value;
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
                      {receipt && receipt.for}
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
                  receipt && handleDditionalInformation(receipt.how_to_pay)
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