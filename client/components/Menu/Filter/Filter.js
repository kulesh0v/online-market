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
  const [choosesCategories, setCheckedIds] = useState(query.categoryId ? query.categoryId.map(Number) : []);
  const [minPrice, setMinPrice] = useState(query.minPrice || '');
  const [maxPrice, setMaxPrice] = useState(query.maxPrice || '');
  const [sortType, setSortType] = useState(query.sortType || '');
  const [redirect, setRedirect] = useState(false);

  const uncheckDeleted = (id) => {
    if (choosesCategories.includes(id)) {
      choosesCategories.splice(choosesCategories.indexOf(id), 1);
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

  const chooseCategory = (id) => {
    if (choosesCategories.includes(id)) {
      choosesCategories.splice(choosesCategories.indexOf(id), 1);
    } else {
      choosesCategories.push(id);
    }
    setCheckedIds(setCheckedIds);
    setRedirect(true);
  };

  const getFilterConfig = () => {
    const result = {categoryId: choosesCategories};
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
    <div>
      {redirect && <Redirect to={`/?${queryString.stringify(getFilterConfig())}`}/>}
      <Sort setType={changeSortType} type={sortType}/>
      <PriceFilter changeMax={changeMaxPrice} changeMin={changeMinPrice} minPrice={minPrice} maxPrice={maxPrice}/>
      <CategoriesList
        categories={props.categories}
        chooseCategory={chooseCategory}
        adminMod={props.adminMod}
        removeCategory={props.removeCategory}
        uncheckDeleted={uncheckDeleted}
        choosesCategories={choosesCategories}/>
    </div>
  );
};

Filter.propTypes = {
  categories: PropTypes.array.isRequired,
  adminMod: PropTypes.bool.isRequired,
  removeCategory: PropTypes.func.isRequired,
};
export default Filter;