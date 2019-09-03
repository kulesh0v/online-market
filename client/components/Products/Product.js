import React from 'react'
import PropTypes from 'prop-types';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {Card, Icon, Typography} from 'antd';


const {Meta} = Card;
const {Text} = Typography;


const Product = (props) => {
  const [productCounter, setUserWish] = useState(0);

  const increaseAmount = () => {
    const basketProduct = props.basket.find(p => p.id === props.product.id);
    const basketAmount = basketProduct ? basketProduct.amount : 0;
    if (productCounter + basketAmount < props.product.amount) {
      setUserWish(productCounter + 1);
    }
  };

  const reduceAmount = () => {
    if (productCounter > 0) {
      setUserWish(productCounter - 1);
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

          <div onClick={reduceAmount} onMouseDown={(e) => e.preventDefault()}>
            <Icon type="minus"/>
          </div>,

          <Text onClick={() => {
            productCounter && props.addToBasket(props.product.id, productCounter);
            setUserWish(0);
          }}>
            <FormattedMessage id={'add'}/>{` ${productCounter} `} <FormattedMessage id={'toBasket'}/>
          </Text>,

          <div onClick={increaseAmount} onMouseDown={(e) => e.preventDefault()}>
            <Icon type="plus"/>
          </div>
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