import axios from 'axios';
import { useEffect, useRef } from 'react';


const RouteService = ({ setLoading, setTicketNumber, setRemittances, setDumpTrucks, setDrivers, setSandStores }) => {

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
    setRemittances(options);
  }

  return null;
};
export default RouteService;
