import { useState } from 'react';

const useFetch = ({ url, method, body }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    console.log(url);
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        headers: {
          'Content-Type': 'Application/json',
        },
        method: method,
        ...(body && {
          body: JSON.stringify(body),
        }),
      });
      const dataJson = await response.json();
      setData(dataJson);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { fetchData, data, error, loading };
};

export default useFetch;
