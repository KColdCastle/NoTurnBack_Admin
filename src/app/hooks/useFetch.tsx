import React, { useState, useEffect } from 'react'; // 이 부분 확인

const useFetch = (url: string) => {
  const [data, setData] = useState([]); // useState 사용

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Fetch error: ', error));
  }, [url]); // useEffect 사용

  return data;
};

export default useFetch;
