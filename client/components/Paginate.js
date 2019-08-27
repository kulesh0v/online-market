import React from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from "prop-types";

const Paginate = (props) => {
  return (
    <div className="d-flex mt-3 mb-3">
      <ReactPaginate
        previousLabel={'previous'}
        forcePage={props.pageNum}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'page-item text-secondary'}
        pageCount={props.pageCount}
        onPageChange={(page) => props.filterProducts(props.lastFilterConfig, page.selected)}
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