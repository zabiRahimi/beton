import axios from 'axios';
import { useEffect, useRef } from 'react';


const RouteService = ({ setLoading, setTicketNumber }) => {

  const hasCalledFetchData = useRef(false);
  useEffect(() => {
    if (!hasCalledFetchData.current) {
      fetchData();
      hasCalledFetchData.current = true;
    }
  }, []);


  const fetchData = async () => {

    try {
      const response =  await axios.get("/api/v1/sandRemittance/count")
        const count = response.data.count;
        setTicketNumber(count + 1);
    } catch (error) {
      console.error("Error fetching data for sandRemittance count in component Add:", error);
    } finally {
      setLoading(false);
    }
  };


};

export default RouteService;
