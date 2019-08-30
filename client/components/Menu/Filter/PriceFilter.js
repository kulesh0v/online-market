import React from 'react';
import PropTypes from 'prop-types';
import {InputNumber} from 'antd';


const PriceFilter = (props) => {
  return (
    <div style={{display: 'flex', marginTop: 12}}>
      <div style={{margin: 'auto'}}>
        <InputNumber style={{marginRight: 2}} onChange={props.changeMin}
                     value={props.minPrice || props.minPrice}/>
        <InputNumber style={{marginLeft: 2}} onChange={props.changeMax} value={props.maxPrice || props.maxPrice}/>
      </div>
    </div>
  )
};

PriceFilter.propTypes = {
  changeMax: PropTypes.func.isRequired,
  changeMin: PropTypes.func.isRequired,
  maxPrice: PropTypes.any,
  minPrice: PropTypes.any,
};

export default PriceFilter;