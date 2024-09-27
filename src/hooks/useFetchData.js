import {useState, useEffect} from 'react';

export default function useFetchData(fetchFunction) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async() => {
      const result = await fetchFunction();
      setData(result);
      setLoading(false);
    };

    fetchData();
  }, [fetchFunction]);

  return { data, loading };
}