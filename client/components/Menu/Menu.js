import React from 'react';
import PropTypes from 'prop-types';
import Filter from './Filter/Filter.js';
import AdminPanel from './AdminPanel.js';

const Menu = (props) => {
  return (
    <div className={"col-xl-2 col-lg-3 mt-4 bg-light"}>
      <Filter
        categories={props.categories}
        filter={props.filter}
        adminMod={props.adminMod}
        openWindow={props.openWindow}
        removeCategory={props.removeCategory}
      />
      <AdminPanel
        setAdminMod={props.setAdminMod}
        adminMod={props.adminMod}
        openWindow={props.openWindow}
        categories={props.categories}
      />
    </div>
  )
};

Menu.propTypes = {
  categories: PropTypes.array.isRequired,
  filter: PropTypes.func.isRequired,
  setAdminMod: PropTypes.func.isRequired,
  adminMod: PropTypes.bool.isRequired,
  openWindow: PropTypes.func.isRequired,
  removeCategory: PropTypes.func.isRequired,
};

export default Menu;