import React from 'react';
import PropTypes from 'prop-types';
import Filter from './Filter/Filter.js';
import AdminPanel from './AdminPanel.js';
import {Link} from 'react-router-dom';
import {Layout, Row, Col, Button, Icon, Typography} from 'antd'

const {Sider} = Layout;
const {Text} = Typography;

const Sidebar = (props) => {

  return (
    <Sider
      trigger={null}
      width={240}
      collapsedWidth="0"
      theme={'light'}
      collapsible collapsed={props.collapsed}
    >
      <Link to={'/'}>
        <Button className={'clear-button'} style={{fontSize: 18, marginLeft: 18, marginTop: 16}}>
          <Text>Online market</Text>
        </Button>
      </Link>

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

      <Row>
        <Col offset={2} span={20}>
          <Button style={{marginTop: 20, fontSize: 18, width: '100%'}}
                  onClick={() => props.setCollapsed(true)}>
            <Icon type={"left"}/>
          </Button>
        </Col>
      </Row>

    </Sider>
  )
};

Sidebar.propTypes = {
  categories: PropTypes.array.isRequired,
  setAdminMod: PropTypes.func.isRequired,
  adminMod: PropTypes.bool.isRequired,
  removeCategory: PropTypes.func.isRequired,
  collapsed: PropTypes.bool.isRequired,
  setCollapsed: PropTypes.func.isRequired,
};

export default Sidebar;