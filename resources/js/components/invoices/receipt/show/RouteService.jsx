import axios from 'axios';
import { useEffect, useRef } from 'react';

const RouteService = ({
  setLoading,
  setDumpTrucks,
  setDumpTruckOptions,
  setDrivers,
  setDriverOptions,
  setSandStoreOptions
}) => {

  const hasCalledFetchData = useRef(false);
  useEffect(() => {
    if (!hasCalledFetchData.current) {
      fetchData();
      hasCalledFetchData.current = true;
    }
  }, []);


  const fetchData = async () => {

    try {
      const response = await axios.get("/api/v1/sandInvoice/fetchDataForSearch")
      const { dumpTrucks, drivers, sandStores } = response.data;
      setDumpTrucks(dumpTrucks);
      createDumpTruckOptions(dumpTrucks);
      setDrivers(drivers);
      createDrvierOptions(drivers);
      createSandStoreOptions(sandStores);
    } catch (error) {
      console.error("Error fetching data for sandRemittance count in component Add:", error);
    } finally {
      setLoading(false);
    }
  };

  const createDumpTruckOptions = (dumpTrucks) => {
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

  const createDrvierOptions = (drviers) => {
    let options;
    if (drviers.length > 0) {
       options = drviers.map(data => ({
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
    } else {
      options = notOption('هیچ راننده ثبت شده‌ای وجود ندارد');
    }
    setDriverOptions(options);
  }

  const createSandStoreOptions = (sandStores) => {
    let options;
    if (sandStores.length > 0) {
       options = sandStores.map(data => ({
        value: data.id,
        html: <div className=" divSiloSeletcFB">
          <span className=" siloSeletctFB">
            {data.silo}
          </span>
        </div>
      }));
    } else {
      options = notOption('هیچ سیلوی شن‌وماسه‌ای وجود ندارد');
    }
    setSandStoreOptions(options);
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

  return null;
};
export default RouteService;
