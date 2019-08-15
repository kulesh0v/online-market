import React from 'react';
import PriceFilter from "./PriceFilter.js";
import CategoriesList from "./CategoriesList.js";
import PropTypes from "prop-types";

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedIds: [],
      minPrice: null,
      maxPrice: null,
    };
  }

  checkCategory = (id) => {
    const checkedIds = this.state.checkedIds;
    if (checkedIds.includes(id)) {
      checkedIds.splice(checkedIds.indexOf(id), 1);
    } else {
      checkedIds.push(id);
    }
    this.setState(checkedIds);
  };
  changeMinPrice = (minPrice) => {
    this.setState({minPrice: minPrice});
  };
  changeMaxPrice = (maxPrice) => {
    this.setState({maxPrice: maxPrice});
  };

  filter = () => {
    this.props.filter({
      checkedIds: this.state.checkedIds,
      minPrice: this.state.minPrice,
      maxPrice: this.state.maxPrice,
    });
  };

  render() {
    return (
      <div className={"col-2 mt-4 bg-light"}>
        <PriceFilter changeMax={this.changeMaxPrice} changeMin={this.changeMinPrice}/>
        <CategoriesList
          categories={this.props.categories} checkCategory={this.checkCategory}/>
        <button type={"button"} className={"btn btn-outline-secondary mt-3"} onClick={this.filter}>
          Filter
        </button>
      </div>
    );
  }
}

Filter.propTypes = {
  categories: PropTypes.array.isRequired,
};
export default Filter;