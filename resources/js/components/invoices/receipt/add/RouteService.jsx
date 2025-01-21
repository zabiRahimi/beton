import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const RouteService = ({
  setLoading,
  setTicketNumber,
  checkIsSelected,
  setCheckIsSelected,
  sandIsSelected,
  setSandIsSelected,
  cementIsSelected,
  setCementIsSelected,
  setDocumentReceivableDisplay,
  setSandRemittanceDisplay,
  setCementRemittanceDisplay,
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
      fetchData();
      hasCalledFetchData.current = true;
    }
    setLoading(false);
  }, []);


  useEffect(() => {
    if (checkIsSelected) {
      setSandRemittanceDisplay(false);
      setCementRemittanceOptions(false);
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
            display: true,
            dateLabel: 'تاریخ چک',
            numberLabel: 'شماره چک',
            ownerLabel: 'صاحب چک'
          });
        }
      }).finally(() => {
        setCheckIsSelected(false);
      });
    }

  }, [checkIsSelected,]);

  useEffect(() => {
    if (sandIsSelected) {
      setDocumentReceivableDisplay(false);
      setCementRemittanceOptions(false);
      MySwal.fire({
        icon: "info",
        showCancelButton: true,
        title: "آیا حواله ثبت شده است؟",
        confirmButtonText: " ثبت شده ",
        cancelButtonText: 'ثبت نشده',
        customClass: {
        },
      }).then((result) => {
        if (result.isConfirmed) {
          setSandRemittanceDisplay(true);
        }
        else if (result.dismiss === Swal.DismissReason.cancel) {
          setSandRemittanceDisplay(false);
          setPayType({
            display: true,
            dateLabel: 'تاریخ ',
            numberLabel: 'شماره حواله',
            ownerLabel: 'خریدار حواله'
          })
        }
      }).finally(() => {
        setSandIsSelected(false);
      });
    }
  }, [sandIsSelected]);

  useEffect(() => {
    if (cementIsSelected) {
      setDocumentReceivableDisplay(false);
      setSandRemittanceOptions(false);
      MySwal.fire({
        icon: "info",
        showCancelButton: true,
        title: "آیا حواله ثبت شده است؟",
        confirmButtonText: " ثبت شده ",
        cancelButtonText: 'ثبت نشده',
        customClass: {
        },
      }).then((result) => {
        if (result.isConfirmed) {
          setCementRemittanceDisplay(true);
        }
        else if (result.dismiss === Swal.DismissReason.cancel) {
          setCementRemittanceDisplay(false);
          setPayType({
            display: true,
            dateLabel: 'تاریخ ',
            numberLabel: 'شماره حواله',
            ownerLabel: 'خریدار حواله'
          })
        }
      }).finally(() => {
        setCementIsSelected(false);
      });
    }
  }, [cementIsSelected]);

  const fetchData = async () => {

    try {
      const response = await axios.get("/api/v1/receipt/fetchData")
      const { count, customers, documentReceivables, sandRemittances, cementRemittances } = response.data;
      setTicketNumber(count + 1);
      createCustomerOptions(customers);
      setDataCustomers(customers);
      createDocumentReceivableOptions(documentReceivables);
      console.log(sandRemittances);
      createSandRemittanceOptions(sandRemittances);
      createCementRemittanceOptions(cementRemittances);
    } catch (error) {
      console.error("Error fetching data for sandRemittance count in component Add:", error);
    } finally {
      setLoading(false);
    }
  };

  const createCustomerOptions = (customers) => {
    let options;
    if (customers.length > 0) {
      options = customers.map(data => ({
        value: data.id,
        html: <div className=" divRemittanceSelectFB"
          title={data.buyerName + ' ' + data.buyerLastName + ' ' + data.remittanceNumber}
        >
          <span className="mixerOwnerSelectFB buyerSelectFB">
            {data.name}
            {' '}
            {data.lastName}
          </span>
          <span className='remittanceNumberFB' title={data.father}>
            {data.father}
          </span>
        </div>
      }));
    } else {
      options = notOption('مشتری وجود ندارد');
    }
    setCustomerOptions(options);
  }

  const createDocumentReceivableOptions = (documentReceivables) => {
    let options;
    if (documentReceivables && documentReceivables.length > 0) {
      options = documentReceivables.map(data => ({
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
      }));
    } else {
      options = notOption('هیچ چک ثبت شده ای وجود ندارد');
    }
    setDocumentReceivableOptions(options);
  }

  const createSandRemittanceOptions = (sandRemittances) => {
    let options;
    if (sandRemittances.length > 0) {
      options = sandRemittances.map(data => ({
        value: 'data.id',
        html: (
          <div className="containerChekOption_SZabi">
            <div>
              <span className="name" title={`${data.buyerName}  ${data.buyerLastName}`}>
                {data.buyerName} {' '} {data.buyerLastName}
              </span>

              <span className="price" title={parseFloat(data.price).toLocaleString()}>
                {parseFloat(data.price).toLocaleString()}
              </span>

              <span className='unit'>
                تومان
              </span>
            </div>
            <div className='divRow2'>
              <span className="date" title={data.date}>
                {data.date}
              </span>
              <span className="namber" title={data.remittanceNumber}>
                {data.remittanceNumber}
              </span>
            </div>
          </div>
        )
      }));

    } else {
      options = notOption('هیچ حواله ثبت شده‌ای وجود ندارد');
    }
    setSandRemittanceOptions(options);
  }

  const createCementRemittanceOptions = (cementRemittances) => {
    let options;
    if (cementRemittances && cementRemittances.length > 0) {
      options = cementRemittances.map(data => {


      });
    } else {
      options = notOption('حواله سیمان ثبت شده وجود ندارد');
    }
    setCementRemittanceOptions(options);
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
