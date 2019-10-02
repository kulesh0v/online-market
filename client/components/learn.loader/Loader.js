import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {useState, useEffect} from 'react';

const Loader = ({url, children}) => {
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios.get(url)
      .then(res => {
        setData(res.data);
        setError(undefined);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
        setData(undefined);
      });
  }, [url]);
  return children({data, error, isLoading});
};

Loader.propTypes = {
  url: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
};
export default Loader;