import React from 'react';
import PropTypes from 'prop-types';
import Filter from './filter/Filter.js';
import AdminPanel from './AdminPanel.js';
import {Link} from 'react-router-dom';
import {Layout, Row, Col, Button, Icon, Typography} from 'antd'

const {Sider} = Layout;
const {Text} = Typography;

const Sidebar = ({setCollapsed, setAdminMode, collapsed, categories, filter, adminMode, removeCategory}) => {
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
        filter={filter}
        adminMode={adminMode}
        removeCategory={removeCategory}
        history={history}
      />
      <AdminPanel
        setAdminMode={setAdminMode}
        adminMode={adminMode}
      />

      <Row>
        <Col offset={2} span={20}>
          <Button style={{marginTop: 20, fontSize: 18, width: '100%'}}
                  onClick={() => setCollapsed()}>
            <Icon type={"left"}/>
          </Button>
        </Col>
      </Row>

    </Sider>
  )
};

Sidebar.propTypes = {
  categories: PropTypes.array.isRequired,
  adminMode: PropTypes.bool.isRequired,
  collapsed: PropTypes.bool.isRequired,
  removeCategory: PropTypes.func.isRequired,
  setAdminMode: PropTypes.func.isRequired,
  setCollapsed: PropTypes.func.isRequired,
};
export default Sidebar;
