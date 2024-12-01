import axios from 'axios';
import { useEffect, useRef } from 'react';


const RouteService = ({
   setLoading,
    setTicketNumber,
     setRemittanceOptions,
      setDumpTrucks, 
      setDumpTruckOptions, 
      setDrivers,
      setDriverOptions,
       setSandStores 
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
      const response = await axios.get("/api/v1/sandInvoice/fetchData")
      const { count, sandRemittances, sandStores, dumpTrucks, drivers } = response.data;
      setTicketNumber(count + 1);
      createRemittanceOptions(sandRemittances);
      setDumpTrucks(dumpTrucks);
      createDumpTruckOptions(dumpTrucks);

    } catch (error) {
      console.error("Error fetching data for sandRemittance count in component Add:", error);
    } finally {
      setLoading(false);
    }
  };




  const createRemittanceOptions = (sandRemittances) => {
    const options = sandRemittances.map(data => ({
      value: data.id,
      html: <div className=" divRemittanceSelectFB"
      title={data.buyerName +' ' + data.buyerLastName + ' '+ data.remittanceNumber}
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
    setRemittanceOptions(options);
  }

  const createDumpTruckOptions = (dumpTrucks) => {
  const options = dumpTrucks.map(data => {
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
    setDumpTruckOptions(options);
  }

  return null;
};
export default RouteService;
