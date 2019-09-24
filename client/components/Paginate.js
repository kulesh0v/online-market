import React from 'react';
import {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom';
import queryString from 'query-string';
import {Pagination} from 'antd';
import {useSelector} from 'react-redux'

const Paginate = () => {
  const [redirect, setRedirect] = useState(false);
  const lastFilterConfig = useSelector(state => state.lastFilterConfig);
  const productsAmount = useSelector(state => state.productsAmount);
  const pageNum = useSelector(state => state.pageNum);

  useEffect(() => {
    setRedirect(false);
  });

  const onPageChange = (selected) => {
    lastFilterConfig.page = selected;
    setRedirect(true);
  };

  return (
    <div>
      {redirect && <Redirect to={`/?${queryString.stringify(lastFilterConfig)}`}/>}
      <Pagination
        onChange={onPageChange}
        total={productsAmount}
        defaultCurrent={pageNum + 1}
        pageSize={8}
      />
    </div>);
};

export default Paginate;