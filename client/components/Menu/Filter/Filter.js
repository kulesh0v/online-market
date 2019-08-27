import React from 'react';
import PropTypes from "prop-types";
import {useState, useEffect} from 'react';

import PriceFilter from "./PriceFilter.js";
import CategoriesList from "./CategoriesList.js";
import Sort from "./Sort.js"


const Filter = (props) => {
  const [choosesCategories, setCheckedIds] = useState([]);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sortType, setSortType] = useState(null);

  const uncheckDeleted = (id) => {
    if(choosesCategories.includes(id)){
      choosesCategories.splice(choosesCategories.indexOf(id),1);
    }
  };

  const filter = () => {
    props.filter({
      categoryId: choosesCategories,
      minPrice: minPrice,
      maxPrice: maxPrice,
      sortType: sortType,
    });
  };

  useEffect(() => {
    filter();
  }, [minPrice, maxPrice, sortType]);

  const chooseCategory = (id) => {
    if (choosesCategories.includes(id)) {
      choosesCategories.splice(choosesCategories.indexOf(id), 1);
    } else {
      choosesCategories.push(id);
    }
    setCheckedIds(setCheckedIds);
    filter();
  };

  return (
    <div>
      <Sort setType={setSortType} type={sortType}/>
      <PriceFilter changeMax={setMaxPrice} changeMin={setMinPrice}/>
      <CategoriesList
        categories={props.categories}
        chooseCategory={chooseCategory}
        adminMod={props.adminMod}
        removeCategory={props.removeCategory}
        uncheckDeleted={uncheckDeleted}
      />
    </div>
  );
};

Filter.propTypes = {
  categories: PropTypes.array.isRequired,
  filter: PropTypes.func.isRequired,
  adminMod: PropTypes.bool.isRequired,
  removeCategory: PropTypes.func.isRequired,
};
export default Filter;