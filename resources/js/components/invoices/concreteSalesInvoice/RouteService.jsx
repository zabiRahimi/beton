import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import SweetAlertHandler from './SweetAlertHandler';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const RouteService = ({ token, setLoading }) => {
  const MySwal = withReactContent(Swal);
  const hasCalledGetConcretes = useRef(false);
  const [dataState, setDataState] = useState({
    hasBuyers: true,
    hasMixers: true,
    hasDrivers: true,
    hasConcretes: true,
    hasCementStores:true,
  });
  const [isChecked, setIsChecked] = useState(false);
  const [concreteBuyers, setConcreteBuyers] = useState({
    datas: '',
    options: []
  });
  const [mixers, setMixers] = useState({
    datas: '',
    options: []
  });

  useEffect(() => {
    if (!hasCalledGetConcretes.current) {
      checkDataAvailability(token);
      hasCalledGetConcretes.current = true;
    }
  }, []);
  
  
  const checkDataAvailability = async (token) => {
    
      await axios.get("/api/v1/concreteSalesInvoice/concreteBuyers").then((response) => {
        let datas = response.data.concreteBuyers;
        setConcreteBuyers(prev => ({ ...prev, datas }));
        if (datas.length == 0) {
        
          setDataState(prev=>({...prev, hasBuyers:false}));
          const options = [{
            value: '',
            html: (
              <div className="personnelAption_addPerS">
                <span className="name_addPers">
                  هنوز هیچ مشتری به عنوان خریدار ثبت نشده است، ابتدا خریدار را ثبت کنید
                </span>
              </div>
            )
          }]

          setConcreteBuyers(prev => ({
            ...prev,
            options
          }));

        } else {
          const options = datas.map(data => ({
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

          setConcreteBuyers(prev => ({
            ...prev,
            options
          }));
        }
      });

      await axios.get('/api/v1/concreteSalesInvoice/mixers').then((response) => {
        let datas = response.data.mixers;
        // setConcreteBuyers(prev=>({...prev, datas}));
        if (datas.length == 0) {
          setDataState(prev=>({...prev, hasMixers:false}));
          // setIsChecked(false)
        } else {
          const options = datas.map(data => ({
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
          datas.map((data, i) => {
            // let arr = data.numberplate.split('-');
            // setMixers(perv => ([...perv, {
            //     value: data.id,
            //     value2: data.customer.id,
            //     html: <div className="mixerAptionSelectFB">
            //         <span className="mixerNamberpalteSelectFB">
            //             <div className="numberplateDiv">
            //                 <span className="numberplateDivS1">{arr[0]}</span>
            //                 <span className="numberplateDivS2">{arr[3] == 'ا' ? 'الف' : arr[3]}</span>
            //                 <span className="numberplateDivS3">{arr[1]}</span>
            //                 <span className="numberplateDivS4">{arr[2]}</span>
            //             </div>
            //         </span>
            //         <span className="mixerOwnerSelectFB">
            //             {data.customer.name}
            //             {' '}
            //             {data.customer.lastName}
            //         </span>

            //     </div>
            // }]));
          })

          // setMixers(prev => ({
          //   ...prev,
          //   options
          // }));
        }
      });

      await axios.get('/api/v1/concreteSalesInvoice/drivers').then((response) => {
        let datas = response.data.drivers;
        // setConcreteBuyers(prev=>({...prev, datas}));
        if (datas.length == 0) {
          setDataState(prev=>({...prev, hasDrivers:false}));
          
        } else {
          const options = datas.map(data => ({
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
          datas.map((data, i) => {
            // let arr = data.numberplate.split('-');
            // setMixers(perv => ([...perv, {
            //     value: data.id,
            //     value2: data.customer.id,
            //     html: <div className="mixerAptionSelectFB">
            //         <span className="mixerNamberpalteSelectFB">
            //             <div className="numberplateDiv">
            //                 <span className="numberplateDivS1">{arr[0]}</span>
            //                 <span className="numberplateDivS2">{arr[3] == 'ا' ? 'الف' : arr[3]}</span>
            //                 <span className="numberplateDivS3">{arr[1]}</span>
            //                 <span className="numberplateDivS4">{arr[2]}</span>
            //             </div>
            //         </span>
            //         <span className="mixerOwnerSelectFB">
            //             {data.customer.name}
            //             {' '}
            //             {data.customer.lastName}
            //         </span>

            //     </div>
            // }]));
          })

          // setMixers(prev => ({
          //   ...prev,
          //   options
          // }));
        }
      });

      await axios.get('/api/v1/concreteSalesInvoice/concretes').then((response) => {
        let datas = response.data.concretes;
        // setConcreteBuyers(prev=>({...prev, datas}));
        if (datas.length == 0) {
          setDataState(prev=>({...prev, hasConcretes:false}));
        } else {
          const options = datas.map(data => ({
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
          datas.map((data, i) => {
            // let arr = data.numberplate.split('-');
            // setMixers(perv => ([...perv, {
            //     value: data.id,
            //     value2: data.customer.id,
            //     html: <div className="mixerAptionSelectFB">
            //         <span className="mixerNamberpalteSelectFB">
            //             <div className="numberplateDiv">
            //                 <span className="numberplateDivS1">{arr[0]}</span>
            //                 <span className="numberplateDivS2">{arr[3] == 'ا' ? 'الف' : arr[3]}</span>
            //                 <span className="numberplateDivS3">{arr[1]}</span>
            //                 <span className="numberplateDivS4">{arr[2]}</span>
            //             </div>
            //         </span>
            //         <span className="mixerOwnerSelectFB">
            //             {data.customer.name}
            //             {' '}
            //             {data.customer.lastName}
            //         </span>

            //     </div>
            // }]));
          })

          // setMixers(prev => ({
          //   ...prev,
          //   options
          // }));
        }
      });

      await axios.get('/api/v1/concreteSalesInvoice/cementStores').then((response) => {
        let datas = response.data.cementStores;
        // setConcreteBuyers(prev=>({...prev, datas}));
        if (datas.length == 0) {
          setDataState(prev=>({...prev, hasCementStores:false}));
        
        } else {
          const options = datas.map(data => ({
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
          datas.map((data, i) => {
            // let arr = data.numberplate.split('-');
            // setMixers(perv => ([...perv, {
            //     value: data.id,
            //     value2: data.customer.id,
            //     html: <div className="mixerAptionSelectFB">
            //         <span className="mixerNamberpalteSelectFB">
            //             <div className="numberplateDiv">
            //                 <span className="numberplateDivS1">{arr[0]}</span>
            //                 <span className="numberplateDivS2">{arr[3] == 'ا' ? 'الف' : arr[3]}</span>
            //                 <span className="numberplateDivS3">{arr[1]}</span>
            //                 <span className="numberplateDivS4">{arr[2]}</span>
            //             </div>
            //         </span>
            //         <span className="mixerOwnerSelectFB">
            //             {data.customer.name}
            //             {' '}
            //             {data.customer.lastName}
            //         </span>

            //     </div>
            // }]));
          })

          // setMixers(prev => ({
          //   ...prev,
          //   options
          // }));
        }
      });
     
      setIsChecked(true);
      setLoading(false);
      return { concreteBuyers }
     
    };
    const alertHandler = SweetAlertHandler({ hasBuyers:dataState.hasBuyers, hasMixers:dataState.hasMixers, hasDrivers:dataState.hasDrivers, hasConcretes:dataState.hasConcretes, hasCementStores:dataState.hasCementStores });

    useEffect(() => {
        if(isChecked){
          alertHandler.showAlert();
        }
    }, [isChecked]);

  return { concreteBuyers, mixers }
};

export default RouteService;
