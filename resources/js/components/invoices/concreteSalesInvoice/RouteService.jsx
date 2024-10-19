import axios from 'axios';
import React, { useState, useEffect } from 'react';
import SweetAlertHandler from './SweetAlertHandler';

const RouteService = ({ token }) => {
  const [dataState, setDataState] = useState({
    hasBuyers: true,
    hasMixers: true,
    hasMixerOwners: true,
    hasDrivers: true,
    hasConcreteTypes: true,
  });
  const [concreteBuers, setConcreteBuers] = useState({
    datas:'',
    options:[]
  });

  const checkDataAvailability = async () => {
    try {
       await axios.get("/api/v1/concreteSalesInvoice/concreteBuyers").then((response) => {
        let datas = response.data.concreteBuyers;
        setConcreteBuers(prev=>({...prev, datas}));
        if (datas.length == 0) {
            MySwal.fire({
                icon: "warning",
                title: "هشدار",
                text: `هنوز هیچ مشتری‌ای به عنوان پرسنل ثبت نشده است. لازم است ابتدا خریداران بتن را به عنوان مشتری ثبت کنید.`,
                confirmButtonText: "  ثبت مشتری   ",
                showCancelButton: true,
                cancelButtonText: "کنسل",
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                preConfirm: () => {

                    navigate("/addCustomer");
                }
            });
        } else {
            // datas.map((data, i) => {
            //     setConcreteBuers(perv => ({...perv,options:perv2=>([...perv2, {
            //         value: data.id,
            //         html: <div className="personnelAption_addPerS">
            //             <span className="name_addPers">{data.name}
            //                 {' '}
            //                 {data.lastName}</span>

            //             <span className="fther_addPers">
            //                 {data.father || ''}
            //             </span>

            //         </div>
            //     }])}));
            // })
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
              
              setConcreteBuers(prev => ({
                ...prev,
                options
              }));
        }
    });

      const mixersResponse = await axios.get('/api/v1/getMixers', { headers: { Authorization: `Bearer ${token}` } });
      const hasMixers = mixersResponse.data.length > 0;

      const mixerOwnersResponse = await axios.get('/api/v1/getMixerOwners', { headers: { Authorization: `Bearer ${token}` } });
      const hasMixerOwners = mixerOwnersResponse.data.length > 0;

      const driversResponse = await axios.get('/api/v1/getDrivers', { headers: { Authorization: `Bearer ${token}` } });
      const hasDrivers = driversResponse.data.length > 0;

      const concreteTypesResponse = await axios.get('/api/v1/getConcreteTypes', { headers: { Authorization: `Bearer ${token}` } });
      const hasConcreteTypes = concreteTypesResponse.data.length > 0;

      setDataState({ hasBuyers, hasMixers, hasMixerOwners, hasDrivers, hasConcreteTypes });

      const alertHandler = SweetAlertHandler({ hasBuyers, hasMixers, hasMixerOwners, hasDrivers, hasConcreteTypes });
      alertHandler.showAlert();

    } catch (error) {
      console.error('Error checking data availability', error);
    }
  };

  useEffect(() => {
    checkDataAvailability();
  }, [token]);

  return {concreteBuers};
};

export default RouteService;
