import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Button, Menu, Layout} from 'antd'
import {Typography} from 'antd';
import Basket from "./Basket";

const {Text} = Typography;
const {Header} = Layout;

const NavigationBar = (props) => {
  return (
    <Header style={{background: '#fff', padding: 0}}>
      <div className={'logo'}/>
      <Menu mode={'horizontal'}>

        <Menu.Item key={"1"}>
          <Link to={'/'}>
            <Button className={'clear-button'}>
              <Text>Online market</Text>
            </Button>
          </Link>
        </Menu.Item>

        <Menu.Item key='2'>
          <Button className="clear-button" onClick={() => props.setLocale('ru')}>RU</Button>
        </Menu.Item>

        <Menu.Item key='3'>
          <Button className="clear-button" onClick={() => props.setLocale('en')}>EN</Button>
        </Menu.Item>

        <Menu.Item key='4'>
          <Basket basket={props.basket} removeFromBasket={props.removeFromBasket}/>
        </Menu.Item>

      </Menu>
    </Header>
  );
};

NavigationBar.propTypes = {
  setLocale: PropTypes.func.isRequired,
  basket: PropTypes.array.isRequired,
  removeFromBasket: PropTypes.func.isRequired,
};

export default NavigationBar;