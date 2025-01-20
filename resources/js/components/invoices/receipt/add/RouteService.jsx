import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const RouteService = ({
  setLoading,
  setTicketNumber,
  checkIsSelected,
  setDocumentReceivableDisplay,
  setPayType
}) => {

  const MySwal = withReactContent(Swal);
  const hasCalledFetchData = useRef(false);

  const [customerOptions, setCustomerOptions] = useState('');
  const [dataCustomers, setDataCustomers] = useState('');
  const [documentReceivableOptions, setDocumentReceivableOptions] = useState('');
  const [sandRemittanceOptions, setSandRemittanceOptions] = useState('');
  const [cementRemittanceOptions, setCementRemittanceOptions] = useState('');
  const how_to_payOptions = [
    {
      value: 'پول نقد',
      html: <div className=" divRemittanceSelectFB">
        پول نقد
      </div>
    },
    {
      value: 'کارت به کارت',
      html: <div className=" divRemittanceSelectFB">
        کارت به کارت
      </div>
    },
    {
      value: 'واریز به حساب',
      html: <div className=" divRemittanceSelectFB">
        واریز به حساب
      </div>
    },
    {
      value: 'حواله شن و ماسه',
      html: <div className=" divRemittanceSelectFB">
        حواله شن و ماسه
      </div>
    },
    {
      value: 'حواله سیمان',
      html: <div className=" divRemittanceSelectFB">
        حواله سیمان
      </div>
    },
    {
      value: 'وصول چک',
      html: <div className=" divRemittanceSelectFB">
        وصول چک
      </div>
    },
    {
      value: 'سایر',
      html: <div className=" divRemittanceSelectFB">
        سایر
      </div>
    }
  ]

  useEffect(() => {
    if (!hasCalledFetchData.current) {
      // fetchData();
      hasCalledFetchData.current = true;
    }
    createDocumentReceivableOptions();
    setLoading(false);
  }, []);


  useEffect(() => {
    if (checkIsSelected) {
      MySwal.fire({
        icon: "info",
        showCancelButton: true,
        title: "آیا چک در اسناد دریافتنی ثبت شده است؟",
        confirmButtonText: " ثبت شده ",
        cancelButtonText: 'ثبت نشده',

        customClass: {

        },

      }).then((result) => {
        if (result.isConfirmed) {
          setDocumentReceivableDisplay(true);
        }
        else if (result.dismiss === Swal.DismissReason.cancel) {
          setDocumentReceivableDisplay(false);
          setPayType({
            display:true,
            dateLabel:'تاریخ چک',
            numberLabel:'شماره چک',
            ownerLabel:'صاحب چک'
          })
        }
      });
    }

  }, [checkIsSelected]);



  const fetchData = async () => {

    try {
      const response = await axios.get("/api/v1/sandInvoice/fetchData")
      const { count, customers, documentReceivables, sandRemittances, cementRemittances } = response.data;
      setTicketNumber(count + 1);
      createCustomerOptions(customers);
      setDataCustomers(customers);
      createDocumentReceivableOptions(documentReceivables);
      createSandRemittanceOptions(sandRemittances);
      createCementRemittanceOptions(cementRemittances);
    } catch (error) {
      console.error("Error fetching data for sandRemittance count in component Add:", error);
    } finally {
      setLoading(false);
    }
  };

  const createCustomerOptions = (sandRemittances) => {
    let options;
    if (sandRemittances.length > 0) {
      options = sandRemittances.map(data => ({
        value: data.id,
        html: <div className=" divRemittanceSelectFB"
          title={data.buyerName + ' ' + data.buyerLastName + ' ' + data.remittanceNumber}
        >
          <span className="mixerOwnerSelectFB buyerSelectFB">
            {data.buyerName}
            {' '}
            {data.buyerLastName}
          </span>
          <span className='remittanceNumberFB' title={data.remittanceNumber}>
            {data.remittanceNumber}
          </span>
        </div>
      }));
    } else {
      options = notOption('هیچ حواله شن‌وماسه‌ای وجود ندارد');
    }
    setRemittanceOptions(options);
  }

  const createDocumentReceivableOptions = () => {
    let options;
    // if (drviers.length > 0) {
    if (true) {
      // options = drviers.map(data => ({
      options = [
        {
        value: 'data.id',
        html: (
          <div className="containerChekOption_SZabi">
            <div>
              <span className="name" title='ذبیح الله رحیمی'>
                {'ذبیح الله'} {' '} {'رحیمی'}
              </span>
              
              <span className="price" title='3,000,000,000'>
                {'3,000,000,000'}
              </span>

              <span className='unit'>
                تومان
              </span>
            </div>
            <div className='divRow2'>
              <span className="date" title='1403/01/31'>
                {'1403/01/31'}
              </span>
              <span className="namber" title='1234567898956145'>
                {'1234567898956145'}
              </span>
            </div>
          </div>
        )
      },
      {
        value: 'data.id',
        html: (
          <div className="containerChekOption_SZabi">
            <div>
              <span className="name" title='میلاد زارع'>
                {'میلاد'} {' '} {'زارع'}
              </span>
              <span className="price" title='2,500,000,000'>
                {'2,500,000,000'}
              </span>
             
            </div>
            <div className='divRow2'>
              <span className="date" title='1403/05/31'>
                {'1403/05/31'}
              </span>
              <span className="namber" title='1234567598413819'>
                {'1234567598413819'}
              </span>
            </div>
          </div>
        )
      },
      {
        value: 'data.id',
        html: (
          <div className="containerChekOption_SZabi">
            <div>
              <span className="name" title='رویا  مکانیان'>
                {' رویا'} {' '} {'مکانیان'}
              </span>
              <span className="price" title='200,000,000'>
                {'200,000,000'}
              </span>
              
            </div>
            <div className='divRow2'>
              <span className="date" title='1403/06/31'>
                {'1403/06/31'}
              </span>
              <span className="namber" title='1234567894523066'>
                {'1234567894523066'}
              </span>
            </div>
          </div>
        )
      },
    ];
      // }));
    } else {
      options = notOption('هیچ راننده ثبت شده‌ای وجود ندارد');
    }
    setDocumentReceivableOptions(options);
  }

  const createSandRemittanceOptions = (sandRemittances) => {
    let options;
    if (sandRemittances.length > 0) {
      options = sandRemittances.map(data => ({
        value: data.id,
        html: <div className=" divRemittanceSelectFB"
          title={data.buyerName + ' ' + data.buyerLastName + ' ' + data.remittanceNumber}
        >
          <span className="mixerOwnerSelectFB buyerSelectFB">
            {data.buyerName}
            {' '}
            {data.buyerLastName}
          </span>
          <span className='remittanceNumberFB' title={data.remittanceNumber}>
            {data.remittanceNumber}
          </span>
        </div>
      }));
    } else {
      options = notOption('هیچ حواله شن‌وماسه‌ای وجود ندارد');
    }
    setRemittanceOptions(options);
  }

  const createCementRemittanceOptions = (dumpTrucks) => {
    let options;
    if (dumpTrucks.length > 0) {
      options = dumpTrucks.map(data => {
        let arr = data.numberplate.split('-');
        return {
          value: data.id,
          value2: data.customer.id,
          html: <div className="mixerAptionSelectFB">
            <span className="mixerNamberpalteSelectFB">
              <div className="numberplateDiv">
                <span className="numberplateDivS1">{arr[0]}</span>
                <span className="numberplateDivS2">{arr[3] == 'ا' ? 'الف' : arr[3]}</span>
                <span className="numberplateDivS3">{arr[1]}</span>
                <span className="numberplateDivS4">{arr[2]}</span>
              </div>
            </span>
            <span className="mixerOwnerSelectFB">
              {data.customer.name}
              {' '}
              {data.customer.lastName}
            </span>

          </div>
        }
      });
    } else {
      options = notOption('هیچ کمپرسی ثبت شده‌ای وجود ندارد');
    }
    setDumpTruckOptions(options);
  }





  const notOption = (message) => {
    return [{
      value: '',
      html: (
        <div className="notOptionsFB">
          {message}
        </div>
      )
    }];
  }

  return {
    customerOptions,
    dataCustomers,
    how_to_payOptions,
    documentReceivableOptions,
    sandRemittanceOptions,
    cementRemittanceOptions
  };
};
export default RouteService;
