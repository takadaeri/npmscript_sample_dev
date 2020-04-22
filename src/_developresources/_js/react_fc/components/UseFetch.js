import { useState, useEffect } from 'react';
//https://www.valentinog.com/blog/hooks/

export default function UseFetch(url) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return data;
}