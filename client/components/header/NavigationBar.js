import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Menu, Layout, Icon, Col, Row} from 'antd'
import {Typography} from 'antd';
import Basket from "./Basket";
import {toggleSidebar as actionToggleSidebar} from "../../actions/sidebar";
import {setLocale as actionSetLocale} from "../../actions/global";
import {removeFromBasket as actionRemoveFromBasket} from "../../actions/basket";
import {buy as actionBuy} from "../../actions/basket";
import {useDispatch, useSelector} from 'react-redux'

const {Text} = Typography;
const {Header} = Layout;

const NavigationBar = () => {
  const collapsed = useSelector(state => !state.visibilitySidebar);
  const basket = useSelector(state => state.basket);
  const dispatch = useDispatch();
  const toggleSidebar = (() => dispatch(actionToggleSidebar()));

  const buy = (() => {
    dispatch(actionBuy());
  });

  const removeFromBasket = (id) => {
    dispatch(actionRemoveFromBasket(id));
  };

  const setLocale = ((locale) => {
    dispatch(actionSetLocale(locale));
  });

  return (
    <Header style={{background: '#fff', padding: 0}}>

      <Row>

        {
          collapsed &&
          <Col span={3}>
            <Link to={'/'}>
              <Button className={'clear-button'} style={{fontSize: 18, marginLeft: 18}}>
                <Text>Online market</Text>
              </Button>
            </Link>
          </Col>
        }

        <Col span={4} offset={collapsed ? 17 : 20}>
          <Menu mode={'horizontal'} style={{fontSize: 14, marginTop: 6, border: 0}}>

            <Menu.Item key='2'>
              <Button className="clear-button" onClick={() => setLocale('ru')}>RU</Button>
            </Menu.Item>

            <Menu.Item key='3'>
              <Button className="clear-button" onClick={() => setLocale('en')}>EN</Button>
            </Menu.Item>

            <Menu.Item key='4'>
              <Basket basket={basket} removeFromBasket={removeFromBasket} buy={buy}/>
            </Menu.Item>

            <Menu.Item>
              <div onClick={() => toggleSidebar()} onMouseDown={(e) => {
                e.preventDefault()
              }}>
                <Icon
                  className="trigger"
                  type={collapsed ? 'menu-unfold' : 'menu-fold'}
                />
              </div>
            </Menu.Item>

          </Menu>
        </Col>
      </Row>

    </Header>
  );
};

export default NavigationBar;