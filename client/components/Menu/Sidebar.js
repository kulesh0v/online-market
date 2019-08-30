import React from 'react';
import PropTypes from 'prop-types';
import {useState} from 'react';
import Filter from './Filter/Filter.js';
import AdminPanel from './AdminPanel.js';
import {Layout} from 'antd'

const {Sider} = Layout;
const Sidebar = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Sider collapsible collapsed={collapsed} width={240} collapsedWidth="0" onCollapse={onCollapse} theme={'light'}>
      <Filter
        categories={props.categories}
        filter={props.filter}
        adminMod={props.adminMod}
        removeCategory={props.removeCategory}
        history={props.history}
      />
      <AdminPanel
        setAdminMod={props.setAdminMod}
        adminMod={props.adminMod}
        categories={props.categories}
      />
    </Sider>
  )
};

Sidebar.propTypes = {
  categories: PropTypes.array.isRequired,
  setAdminMod: PropTypes.func.isRequired,
  adminMod: PropTypes.bool.isRequired,
  removeCategory: PropTypes.func.isRequired,
};

export default Sidebar;