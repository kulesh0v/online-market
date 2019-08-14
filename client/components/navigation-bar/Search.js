import React from 'react';
import PropTypes from 'prop-types';

class Search extends React.Component {
  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={(e) => this.props.onFilterTextChange(e.target.value)}
        />
      </form>
    );
  }
}

Search.propTypes = {
  filterText: PropTypes.string.isRequired,
  onFilterTextChange: PropTypes.func.isRequired,
};
export default Search;