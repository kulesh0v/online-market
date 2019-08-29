import React from 'react';
import {useState} from 'react'
import {Redirect} from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import queryString from 'query-string';
import PropTypes from "prop-types";

const Paginate = (props) => {
  const [redirect, setRedirect] = useState(false);

  const onPageChange = ({selected}) => {
    props.lastFilterConfig.page = ++selected;
    setRedirect(true);
  };

  return (
    <div className="d-flex mt-3 mb-3">
      {redirect && <Redirect to={`/?${queryString.stringify(props.lastFilterConfig)}`}/>}
      <ReactPaginate
        previousLabel={'previous'}
        forcePage={props.pageNum}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'page-item text-secondary'}
        pageCount={props.pageCount}
        onPageChange={onPageChange}
        containerClassName={'pagination m-auto'}
        pageClassName={'page-item text-dark'}
        nextClassName={'page-item text-dark'}
        previousClassName={'page-item text-dark'}
        pageLinkClassName={'page-link text-dark'}
        nextLinkClassName={'page-link'}
        previousLinkClassName={'page-link'}
      />
    </div>);
};

Paginate.propTypes = {
  filterProducts: PropTypes.func.isRequired,
  pageNum: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  lastFilterConfig: PropTypes.object.isRequired,
};

export default Paginate;