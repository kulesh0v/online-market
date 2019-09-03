import React from 'react';
import {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom';
import queryString from 'query-string';
import PropTypes from "prop-types";
import {Pagination} from 'antd';

const Paginate = (props) => {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    setRedirect(false);
  });

  const onPageChange = (selected) => {
    props.lastFilterConfig.page = selected;
    setRedirect(true);
  };

  return (
    <div>
      {redirect && <Redirect to={`/?${queryString.stringify(props.lastFilterConfig)}`}/>}
      <Pagination
        onChange={onPageChange}
        total={props.productsAmount}
        defaultCurrent={props.pageNum + 1}
        pageSize={8}
      />
    </div>);
};

Paginate.propTypes = {
  pageNum: PropTypes.number.isRequired,
  productsAmount: PropTypes.number.isRequired,
  lastFilterConfig: PropTypes.any,
};

export default Paginate;