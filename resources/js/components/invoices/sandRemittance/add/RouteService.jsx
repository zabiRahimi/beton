import axios from 'axios';
import  { useEffect, useRef } from 'react';


const RouteService = ({ setLoading, setTicketNumber }) => {

  const hasCalledFetchData = useRef(false);
  useEffect(() => {
    if (!hasCalledFetchData.current) {
      fetchData();
      hasCalledFetchData.current = true;
    }
  }, []);


  const fetchData = async () => {

     axios.get("/api/v1/sandRemittance/count").then((response) => {
      const count = response.data.count;
      setTicketNumber(count+1);
    });

  
    setLoading(false);
  };


};

export default RouteService;
