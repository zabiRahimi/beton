import axios from 'axios';
import  { useEffect, useRef } from 'react';


const RouteService = ({ sandRemittanceId, setLoading, setSandRemittance }) => {

  const hasCalledFetchData = useRef(false);
  useEffect(() => {
    if (!hasCalledFetchData.current) {
      fetchData();
      hasCalledFetchData.current = true;
    }
  }, []);


  // const fetchData = async () => {
  //   await axios.get(`/api/v1/sandRemittance/${sandRemittanceId}/edit`).then((response) => {
  //     setSandRemittance(response.data);
  //   });

  
  //   setLoading(false);
  // };
  const fetchData = async () => {
  
    try {
      const response = await axios.get(`/api/v1/sandRemittances/${sandRemittanceId}/edit`);
      setSandRemittance(response.data);
    } catch (error) {
      console.error("Error fetching data for sandRemittance edit:", error);
    } finally {
      setLoading(false);
    }
  };
  

};

export default RouteService;
