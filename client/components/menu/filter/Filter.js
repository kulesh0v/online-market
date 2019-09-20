import React from 'react';
import PropTypes from "prop-types";
import {useState, useEffect} from 'react';
import queryString from 'query-string';
import {Redirect} from 'react-router-dom';

import PriceFilter from "./PriceFilter.js";
import CategoriesList from "./CategoriesList.js";
import Sort from "./Sort.js"


const Filter = (props) => {
  const query = queryString.parse(location.search);

  if (query.categoryId) {
    if (!Array.isArray(query.categoryId)) {
      query.categoryId = [query.categoryId];
    }
  }

  const [selectedCategories, setCheckedIds] = useState(query.categoryId ? query.categoryId.map(Number) : []);
  const [minPrice, setMinPrice] = useState(query.minPrice || '');
  const [maxPrice, setMaxPrice] = useState(query.maxPrice || '');
  const [sortType, setSortType] = useState(query.sortType || '');
  const [redirect, setRedirect] = useState(false);

  const uncheckDeleted = (id) => {
    if (selectedCategories.includes(id)) {
      selectedCategories.splice(selectedCategories.indexOf(id), 1);
    }
  };

  useEffect(() => {
    setRedirect(false);
  });

  const changeMaxPrice = (value) => {
    setMaxPrice(value);
    setRedirect(true);
  };

  const changeMinPrice = (value) => {
    setMinPrice(value);
    setRedirect(true);
  };

  const changeSortType = (value) => {
    setSortType(value);
    setRedirect(true);
  };

  const selectCategory = (id) => {
    if (selectedCategories.includes(id)) {
      selectedCategories.splice(selectedCategories.indexOf(id), 1);
    } else {
      selectedCategories.push(id);
    }
    setCheckedIds(setCheckedIds);
    setRedirect(true);
  };

  const getFilterConfig = () => {
    const result = {categoryId: selectedCategories};
    if (minPrice !== '') {
      result.minPrice = minPrice;
    }

    if (maxPrice !== '') {
      result.maxPrice = maxPrice;
    }

    if (sortType !== '') {
      result.sortType = sortType;
    }
    return result;
  };


  return (
    <div style={{marginTop: 24}}>
      {redirect && <Redirect to={`/?${queryString.stringify(getFilterConfig())}`}/>}
      <Sort setType={changeSortType} type={sortType}/>
      <PriceFilter
        changeMax={changeMaxPrice}
        changeMin={changeMinPrice}
        minPrice={minPrice}
        maxPrice={maxPrice}
      />
      <CategoriesList
        categories={props.categories}
        selectCategory={selectCategory}
        adminMode={props.adminMode}
        removeCategory={props.removeCategory}
        uncheckDeleted={uncheckDeleted}
        selectedCategories={selectedCategories}/>
    </div>
  );
};

Filter.propTypes = {
  categories: PropTypes.array.isRequired,
  adminMode: PropTypes.bool.isRequired,
  removeCategory: PropTypes.func.isRequired,
};
export default Filter;