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
    hasConcreteTypes: true,
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
  
  let hasBuyers = true,
  hasMixers = true,
  hasDrivers = true,
  hasConcreteTypes = true;
  const checkDataAvailability = async (token) => {
    
      await axios.get("/api/v1/concreteSalesInvoice/concreteBuyers").then((response) => {
        let datas = response.data.concreteBuyers;
        setConcreteBuyers(prev => ({ ...prev, datas }));
        if (datas.length == 0) {
          hasBuyers = false;
          setDataState(prev=>({...prev, hasBuyers:false}));

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
          hasMixers = false;
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
          hasDrivers = false;
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
     
      setIsChecked(true)
      return { concreteBuyers }
     
    };
    const alertHandler = SweetAlertHandler({ hasBuyers:dataState.hasBuyers, hasMixers:dataState.hasMixers, hasMixerOwners:dataState.hasMixerOwners, hasDrivers:dataState.hasDrivers, hasConcreteTypes:dataState.hasConcreteTypes });

    useEffect(() => {
     
        if(isChecked){
          
          alertHandler.showAlert();
        }
      
    }, [isChecked]);


  return { concreteBuyers, mixers }

};

export default RouteService;
