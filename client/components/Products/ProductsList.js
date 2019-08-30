import React from 'react'
import Product from "./Product";
import PropTypes from 'prop-types';
import {Row, Col} from 'antd';

const ProductList = (props) => {
  return (
    <Row>
      {props.products
        .map(product => (
          <Col xs={24} sm={12} md={8} lg={8} xl={6} xxl={6}  key={product.id}>
            <Product
              product={product}
              adminMod={props.adminMod}
              removeProduct={props.removeProduct}
            />
          </Col>
        ))}
    </Row>
  );
};
Product.propTypes = {
  products: PropTypes.array.isRequired,
  adminMod: PropTypes.bool.isRequired,
  removeProduct: PropTypes.func.isRequired,
};

export default ProductList;