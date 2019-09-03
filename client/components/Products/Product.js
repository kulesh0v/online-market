import React from 'react'
import PropTypes from 'prop-types';
import {useState} from 'react';

import {Link} from 'react-router-dom';

import {Card, Icon, Typography} from 'antd';


const {Meta} = Card;
const {Text} = Typography;


const Product = (props) => {
  const [userWish, setUserWish] = useState(0);

  const increaseAmount = () => {
    const basketProduct = props.basket.find(p => p.id === props.product.id);
    const basketAmount = basketProduct ? basketProduct.amount : 0;
    if (userWish + basketAmount < props.product.amount) {
      setUserWish(userWish + 1);
    }
  };

  const reduceAmount = () => {
    if (userWish > 0) {
      setUserWish(userWish - 1);
    }
  };

  return (
    <Card
      title={props.product.name}
      cover={<img src={props.product.url}/>}
      actions={
        props.adminMod && [
          <Link to={`/editProduct/${props.product.id}`} key="setting">
            <Icon type="edit"/>
          </Link>,
          <Icon type="delete" key="edit" onClick={() => props.removeProduct(props.product.id)}/>,
        ]
        || [
          <Icon type="minus" onClick={reduceAmount}/>,
          <Text onClick={() => {
            userWish && props.addToBasket(props.product.id, userWish);
            setUserWish(0);
          }}>
            Add {userWish} in basket
          </Text>,
          <Icon type="plus" onClick={increaseAmount}/>
        ]
      }
    >
      <Meta
        title={`$${props.product.price}`}
        description={`In stock: ${props.product.amount}`}
      />
    </Card>
  )
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
  adminMod: PropTypes.bool.isRequired,
  removeProduct: PropTypes.func.isRequired,
  addToBasket: PropTypes.func.isRequired,
  basket: PropTypes.array.isRequired,
};
export default Product;