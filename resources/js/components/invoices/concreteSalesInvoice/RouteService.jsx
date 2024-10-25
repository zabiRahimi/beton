import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import SweetAlertHandler from './SweetAlertHandler';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const RouteService = ({ token, setLoading }) => {
  const MySwal = withReactContent(Swal);
  const hasCalledFetchData = useRef(false);
  const [dataState, setDataState] = useState({
    hasBuyers: true,
    hasMixers: true,
    hasDrivers: true,
    hasConcretes: true,
    hasCementStores: true,
  });
  const [callHandler, setCallHandler] = useState(false);
  const [concreteBuyers, setConcreteBuyers] = useState({
    datas: '',
    options: []
  });
  const [concretes, setConcretes] = useState({
    options: []
  });
  const [cementStores, setCementStores] = useState({
    options: []
  });
  const [mixers, setMixers] = useState({
    datas: '',
    options: []
  });
  const [drivers, setDrivers] = useState({
    datas: '',
    options: []
  });

  useEffect(() => {
    if (!hasCalledFetchData.current) {
      fetchData(token);
      hasCalledFetchData.current = true;
    }
  }, []);


  const fetchData = async (token) => {

    await axios.get("/api/v1/concreteSalesInvoice/concreteBuyers").then((response) => {
      const datas = response.data.concreteBuyers;
      let options;
      setConcreteBuyers(prev => ({ ...prev, datas }));
      if (datas.length == 0) {
        setDataState(prev => ({ ...prev, hasBuyers: false }));
        options = notOption('هیچ مشتری به عنوان خریدار ثبت نشده است، ابتدا خریدار را ثبت کنید');
      } else {
        options = datas.map(data => ({
          value: data.id,
          html: (
            <div className="personnelAption_addPerS">
              <span className="name_addPers">
                {data.name} {' '} {data.lastName}
              </span>
              <span className="fther_addPers">
                {data.father || ''}
              </span>
            </div>
          )
        }));
      }
      setConcreteBuyers(prev => ({
        ...prev,
        options
      }));
    });

    await axios.get('/api/v1/concreteSalesInvoice/concretes').then((response) => {
      const datas = response.data.concretes;
      let options;
      setConcretes(prev => ({ ...prev, datas }));
      if (datas.length == 0) {
        setDataState(prev => ({ ...prev, hasConcretes: false }));
        options = notOption(' هنوز هیچ نوع بتنی ثبت نشده است، ابتدا نوع بتن را ثبت کنید ');
      } else {
        options = datas.map(data => ({
          value: data.id,
          concreteName: data.concreteName,
          html: <div className="concreteAptionSelectFB">
            <span className="concreteLabelSelectFB">بتن
            </span>
            <span className="concreteSelectFB">
              {data.concreteName}
            </span>
          </div>
        }));
      }
      setConcretes(prev => ({
        ...prev,
        options
      }));
    });

    await axios.get('/api/v1/concreteSalesInvoice/cementStores').then((response) => {
      const datas = response.data.cementStores;
      let options;
      setCementStores(prev => ({ ...prev, datas }));
      if (datas.length == 0) {
        setDataState(prev => ({ ...prev, hasCementStores: false }));
        options = notOption('هنوز هیچ سیلوی سیمانی ثبت نشده است، ابتدا سیلوی سیمان را ثبت کنید');
      } else {
        options = datas.map(data => ({
          value: data.id,
          cementStoreName: data.silo,
          html: <div className="mixerAptionSelectFB">
            <span className="mixerOwnerSelectFB">
              {data.silo}
            </span>
          </div>
        }));
      }
      setCementStores(prev => ({
        ...prev,
        options
      }));
    });

    await axios.get('/api/v1/concreteSalesInvoice/mixers').then((response) => {
      const datas = response.data.mixers;
      let options;
      setMixers(prev => ({ ...prev, datas }));
      if (datas.length == 0) {
        setDataState(prev => ({ ...prev, hasMixers: false }));
        options = notOption('هنوز هیچ میکسری ثبت نشده است، ابتدا میکسر را ثبت کنید');
      } else {
        options = datas.map(data => {
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
      }
      setMixers(prev => ({
        ...prev,
        options
      }));
    });

    await axios.get('/api/v1/concreteSalesInvoice/drivers').then((response) => {
      let datas = response.data.drivers;
      let options;
      setDrivers(prev => ({ ...prev, datas }));
      if (datas.length == 0) {
        setDataState(prev => ({ ...prev, hasDrivers: false }));
        options = notOption('هنوز هیچ راننده‌ای ثبت نشده است، ابتدا راننده را ثبت کنید');
      } else {
        options = datas.map(data => ({
          value: data.id,
          html: (
            <div className="personnelAption_addPerS">
              <span className="name_addPers">
                {data.name} {' '} {data.lastName}
              </span>
              <span className="fther_addPers">
                {data.father || ''}
              </span>
            </div>
          )
        }));
      }
      setDrivers(prev => ({
        ...prev,
        options
      }));
    });

    setCallHandler(true);
    setLoading(false);
    return { concreteBuyers }
  };

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

  const alertHandler = SweetAlertHandler(
    {
      hasBuyers: dataState.hasBuyers,
      hasConcretes: dataState.hasConcretes,
      hasCementStores: dataState.hasCementStores,
      hasMixers: dataState.hasMixers,
      hasDrivers: dataState.hasDrivers,
    }
  );

  useEffect(() => {
    if (callHandler) {
      alertHandler.showAlert();
    }
  }, [callHandler]);

  return { concreteBuyers, concretes, cementStores, mixers, drivers }
};

export default RouteService;
