import {useState, useEffect, useCallback} from 'react';

export default function useFetchData(fetchFunction, dependencies = []) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const memoizedFetch = useCallback(fetchFunction, dependencies);

  useEffect(() => {
    const fetchData = async() => {
      const result = await memoizedFetch();
      setData(result);
      setLoading(false);
    };

    fetchData();
  }, [memoizedFetch]);

  return { data, loading };
}