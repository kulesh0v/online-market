import React from 'react'
import Product from "./Product";
import PropTypes from 'prop-types';

const ProductList = (props) => {
  return (
    <div className="panel panel-default col-xl-10 col-lg-9 col-md-12 col-sm-12 m-auto pt-4 pl-3">
      <div className="panel-body">
        <div className="row">
          {props.products
            .map(product => (
              <div key={product.id} className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                <Product
                  product={product}
                  adminMod={props.adminMod}
                  removeProduct={props.removeProduct}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
Product.propTypes = {
  products: PropTypes.array.isRequired,
  adminMod: PropTypes.bool.isRequired,
  removeProduct: PropTypes.func.isRequired,
};

export default ProductList;