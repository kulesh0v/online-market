import React from 'react';

const PriceFilter = (props) => {
  return (
    <form className="d-flex justify-content-between pt-2">
      <input type={"number"} placeholder={"Min $"} className={"col-5"} value={props.minPrice}
             onChange={(e) => props.changeMin(e.target.value)}/>
      <input type={"number"} placeholder={"Max $"} className={"col-5"} value={props.maxPrice}
             onChange={(e) => props.changeMax(e.target.value)}/>
    </form>
  )
};
export default PriceFilter;