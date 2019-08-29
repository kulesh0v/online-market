import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const NavigationBar = (props) => {
  return (
    <nav className="navbar navbar-light bg-light d-flex-content-between">
      <Link to={'/'}>
        <span className="navbar-brand">Online Market</span>
      </Link>
      <span>
       <button type="button" className="btn" onClick={() => props.setLocale('ru')}>RU</button>|
       <button type="button" className="btn" onClick={() => props.setLocale('en')}>ENG</button>
      </span>
    </nav>
  );
};

NavigationBar.propTypes = {
  setLocale: PropTypes.func.isRequired,
};

export default NavigationBar;