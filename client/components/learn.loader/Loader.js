import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {useState, useEffect} from 'react';

const Loader = ({url, children}) => {
  const [data, setData] = useState(undefined);
  useEffect(() => {
    axios.get(url)
      .then(res => setData(res.data));
  }, [url]);
  return children({data});
};

Loader.propTypes = {
  url: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
};
export default Loader