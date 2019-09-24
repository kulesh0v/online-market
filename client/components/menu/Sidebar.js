import React from 'react';
import Filter from './filter/Filter.js';
import AdminPanel from './AdminPanel.js';
import {Link} from 'react-router-dom';
import {Layout, Row, Col, Button, Icon, Typography} from 'antd'
import {useDispatch, useSelector} from 'react-redux'
import {toggleAdminMod as actionToggleAdminMode, toggleSidebar as actionToggleSideBar} from "../../actions/sidebar";
import {removeCategory} from "../../actions/categories";

const {Sider} = Layout;
const {Text} = Typography;

const Sidebar = () => {

  const collapsed = useSelector(state => !state.visibilitySidebar);
  const categories = useSelector(state => state.categories);
  const adminMode = useSelector(state => state.adminMode);

  const dispatch = useDispatch();
  const toggleSidebar = () => {
    dispatch(actionToggleSideBar());
  };
  const toggleAdminMode = () => {
    dispatch(actionToggleAdminMode());
  };
  const removeCategoryById = (id) => {
    dispatch(removeCategory(id))
  };

  return (
    <Sider
      trigger={null}
      width={240}
      collapsedWidth="0"
      theme={'light'}
      collapsible collapsed={collapsed}
    >
      <Link to={'/'}>
        <Button className={'clear-button'} style={{fontSize: 18, marginLeft: 18, marginTop: 16}}>
          <Text>Online market</Text>
        </Button>
      </Link>

      <Filter
        categories={categories}
        adminMode={adminMode}
        removeCategory={removeCategoryById}
      />
      <AdminPanel
        toggleAdminMode={toggleAdminMode}
        adminMode={adminMode}
      />

      <Row>
        <Col offset={2} span={20}>
          <Button style={{marginTop: 20, fontSize: 18, width: '100%'}}
                  onClick={() => toggleSidebar()}>
            <Icon type={"left"}/>
          </Button>
        </Col>
      </Row>

    </Sider>
  )
};

export default Sidebar;
