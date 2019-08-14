import React from 'react';
import PropTypes from 'prop-types';

class PriceFilter extends React.Component {
  handleMinPriceChange = (e) =>
    this.props.onMinPriceChange(e.target.value);

  handleMaxPriceChange = (e) =>
    this.props.onMaxPriceChange(e.target.value);

  render() {
    return (
      <form className="d-flex justify-content-around">
        <div className="input-group col-4">
          <div className="input-group-prepend">
            <div className="input-group-text" id="btnGroupAddon">Min price</div>
          </div>
          <input
            type="text"
            className="form-control"
            aria-describedby="btnGroupAddon"
            value={this.props.minPrice}
            onChange={this.handleMinPriceChange}
          />
        </div>
        <div className="input-group col-4">
          <div className="input-group-prepend">
            <div className="input-group-text" id="btnGroupAddon">Max price</div>
          </div>
          <input
            type="text"
            className="form-control"
            aria-describedby="btnGroupAddon"
            value={this.props.maxPrice}
            onChange={this.handleMaxPriceChange}
          />
        </div>
      </form>
    );
  }
}

PriceFilter.propTypes = {
  minPrice: PropTypes.number.isRequired,
  maxPrice: PropTypes.number.isRequired,
  onMinPriceChange: PropTypes.func.isRequired,
  onMaxPriceChange: PropTypes.func.isRequired,
};
export default PriceFilter;