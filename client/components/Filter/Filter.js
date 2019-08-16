import React from 'react';
import PropTypes from "prop-types";
import {useState, useEffect} from 'react';

import PriceFilter from "./PriceFilter.js";
import CategoriesList from "./CategoriesList.js";
import Sort from "./Sort.js"


const Filter = (props) => {
  const [checkedIds, setCheckedIds] = useState([]);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sortType, setSortType] = useState(null);

  const filter = () => {
    props.filter({
      checkedIds: checkedIds,
      minPrice: minPrice,
      maxPrice: maxPrice,
      sortType: sortType,
    });
  };

  useEffect(() => {
    filter();
  }, [minPrice, maxPrice, sortType]);

  const chooseCategory = (id) => {
    if (checkedIds.includes(id)) {
      checkedIds.splice(checkedIds.indexOf(id), 1);
    } else {
      checkedIds.push(id);
    }
    setCheckedIds(setCheckedIds);
    setTimeout(filter(),0);
  };

  return (
    <div className={"col-2 mt-4 bg-light"}>
      <Sort setType={setSortType} type={sortType}/>
      <PriceFilter changeMax={setMaxPrice} changeMin={setMinPrice}/>
      <CategoriesList
        categories={props.categories} chooseCategory={chooseCategory}/>
    </div>
  );
};

Filter.propTypes = {
  categories: PropTypes.array.isRequired,
};
export default Filter;