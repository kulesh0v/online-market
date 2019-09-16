import React from 'react'
import PropTypes from 'prop-types'
import {Menu, Card, Dropdown, Button, Icon} from 'antd'

const Basket = (props) => {
  let totalPrice = 0;
  props.basket.forEach(p => totalPrice += Number(p.price));

  const menu =
    <Menu>
      {props.basket && props.basket.map(product =>
        <Menu.Item key={product.id}>
          <Card title={<span data-testid={`name-amount-${product.id}`}>{`${product.name} x ${product.amount}`}</span>} size={"small"}>
            <img style={{display: 'inline-block', marginRight: 12}} width={70} src={product.url}/>
            <span data-testid={`price-${product.price}`} style={{marginRight: 12, color: 'firebrick'}}>${product.price}</span>
            <Button data-testid={`delete-from-basket-button-${product.id}`} className={"clear-button"} onClick={() => props.removeFromBasket(product.id)}>
              <Icon type={'delete'}/>
            </Button>
          </Card>
        </Menu.Item>
      )}

      {
        totalPrice &&
        <Menu.Item key={'totalPrice'}>
          Total price:
          <span data-testid="total-price" style={{color: 'firebrick', marginLeft: 6}}>
           ${totalPrice.toFixed(2)}
        </span>
        </Menu.Item>
      }

      {
        totalPrice &&
        <Menu.Item key={'buyButton'}>
          <Button type={'primary'} onClick={props.buy}>
            Buy
          </Button>
        </Menu.Item>
      }

      {
        !totalPrice &&
        <Menu.Item key={'empty'}>
          <div style={{display: 'flex'}}>
            <span data-testid="empty-basket" style={{margin: 'auto'}}>Empty</span>
          </div>
        </Menu.Item>

      }

    </Menu>;

  return (
    <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
      <Button className={'clear-button'} data-testid="open-basket">
        <Icon style={{fontSize: 18}} type="shopping-cart"/>
      </Button>
    </Dropdown>
  )
};

Basket.propTypes = {
  basket: PropTypes.array.isRequired,
  removeFromBasket: PropTypes.func.isRequired,
  buy: PropTypes.func.isRequired,
};

export default Basket;