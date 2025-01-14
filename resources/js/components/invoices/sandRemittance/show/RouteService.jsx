import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
const RouteService = ({ setLoading }) => {

  const hasCalledFetchData = useRef(false);
  const [callHandler, setCallHandler] = useState(false);
  const [concretes, setConcretes] = useState([]);

  useEffect(() => {
    if (!hasCalledFetchData.current) {
      fetchData();
      hasCalledFetchData.current = true;
    }
  }, []);

  const fetchData = async () => {
    await axios.get('/api/v1/concreteSalesInvoice/concretes').then((response) => {
      const datas = response.data.concretes;
      let options;
      if (datas.length == 0) {
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
      setConcretes(options);
    });
    setCallHandler(true);
    setLoading(false);
  };

  return null;
};

export default RouteService;
