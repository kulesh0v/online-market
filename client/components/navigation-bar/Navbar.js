import React from 'react';
import PropTypes from 'prop-types';
import Basket from './Basket';
import Search from './Search'
import PriceFilter from './PriceFilter'

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-light bg-light fixed-top">
      <span className="navbar-brand">Online Market</span>
      <PriceFilter
        minPrice={props.minPrice}
        maxPrice={props.maxPrice}
        onMinPriceChange={props.onMinPriceChange}
        onMaxPriceChange={props.onMaxPriceChange}
      />
      <Search
        filterText={props.filterText}
        onFilterTextChange={props.onFilterTextChange}
      />
      <Basket
        basket={props.basket}
        removeFromBasket={props.removeFromBasket}
      />
    </nav>
  );
};

Navbar.propTypes = {
  filterText: PropTypes.string.isRequired,
  onFilterTextChange: PropTypes.func.isRequired,
  removeFromBasket: PropTypes.func.isRequired,
};
export default Navbar;