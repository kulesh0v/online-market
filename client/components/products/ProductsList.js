import React from 'react'
import Product from "./Product";
import {Row, Col} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import {removeProduct as actionRemoveProduct} from "../../actions/products";
import {addToBasket as actionAddToBasket} from "../../actions/basket";


const ProductList = () => {
  const products = useSelector(state => state.products);
  const adminMode = useSelector(state => state.adminMode);
  const basket = useSelector(state => state.basket);

  const dispatch = useDispatch();
  const removeProduct = (id) => dispatch(actionRemoveProduct(id));
  const addToBasket = (id, amount) => {
    dispatch(actionAddToBasket(id, amount));
  };

  if(!products.length){
    return <h1 className={"m-auto text-black-50"}>Products not found</h1>;
  }

  return (
    <Row>
      {products
        .map(product => (
          <Col xs={24} sm={12} md={8} lg={8} xl={6} xxl={6} key={product.id}>
            <Product
              product={product}
              adminMode={adminMode}
              removeProduct={removeProduct}
              addToBasket={addToBasket}
              basket={basket}
            />
          </Col>
        ))}
    </Row>
  );
};


export default ProductList;