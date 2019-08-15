import React from 'react';

const PriceFilter = (props) => {
  return (
    <form className="d-flex justify-content-between pt-2">
      <input placeholder={"Min price"} className={"col-5"}
             onChange={(e)=>props.changeMin(e.target.value)}/>
      <input placeholder={"Max price"} className={"col-5"}
             onChange={(e)=>props.changeMax(e.target.value)}/>
    </form>
  )
};
export default PriceFilter;