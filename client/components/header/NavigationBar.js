import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Button, Menu, Layout, Icon, Col, Row} from 'antd'
import {Typography} from 'antd';
import Basket from "./Basket";

const {Text} = Typography;
const {Header} = Layout;

const NavigationBar = (props) => {
  return (
    <Header style={{background: '#fff', padding: 0}}>
      <Row>

        {
          props.collapsed &&
          <Col span={3}>
            <Link to={'/'}>
              <Button className={'clear-button'} style={{fontSize: 18, marginLeft: 18}}>
                <Text>Online market</Text>
              </Button>
            </Link>
          </Col>
        }

        <Col span={4} offset={props.collapsed ? 17 : 20}>
          <Menu mode={'horizontal'} style={{fontSize: 14, marginTop: 6, border: 0}}>

            <Menu.Item key='2'>
              <Button className="clear-button" onClick={() => props.setLocale('ru')}>RU</Button>
            </Menu.Item>

            <Menu.Item key='3'>
              <Button className="clear-button" onClick={() => props.setLocale('en')}>EN</Button>
            </Menu.Item>

            <Menu.Item key='4'>
              <Basket basket={props.basket} removeFromBasket={props.removeFromBasket} buy={props.buy}/>
            </Menu.Item>

            <Menu.Item>
              <div onClick={() => props.setCollapsed(!props.collapsed)} onMouseDown={(e) => {
                e.preventDefault()
              }}>
                <Icon
                  className="trigger"
                  type={props.collapsed ? 'menu-unfold' : 'menu-fold'}
                />
              </div>
            </Menu.Item>

          </Menu>
        </Col>
      </Row>

    </Header>
  );
};

NavigationBar.propTypes = {
  setLocale: PropTypes.func.isRequired,
  basket: PropTypes.array.isRequired,
  removeFromBasket: PropTypes.func.isRequired,
  buy: PropTypes.func.isRequired,
  setCollapsed: PropTypes.func.isRequired,
  collapsed: PropTypes.bool.isRequired,
};

export default NavigationBar;