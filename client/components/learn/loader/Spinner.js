import {Spin} from 'antd'
import React from 'react';
import PropTypes from 'prop-types';

const Spinner = ({isLoading}) => {
  if (isLoading) {
    return (
      <div style={{display: 'flex'}}>
        <div style={{margin: 'auto'}}>
          <Spin size="large"/>
        </div>
      </div>
    );
  }
  return null;
};

Spinner.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default Spinner;