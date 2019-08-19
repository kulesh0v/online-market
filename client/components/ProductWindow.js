import React from 'react';
import PropTypes from 'prop-types';
import {useState} from 'react';
import axios from 'axios';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faImage} from '@fortawesome/free-solid-svg-icons'

library.add(faImage);

const ProductWindow = (props) => {
  const [name, setName] = useState(props.product ? props.product.name : '');
  const [price, setPrice] = useState(props.product ? props.product.price : '');
  const [amount, setAmount] = useState(props.product ? props.product.amount : '');
  const [url, setUrl] = useState(props.product ? props.product.url : '');
  const [categoryId, setCategoryId] = useState(props.product ? props.product.categoryId : props.categories[0].id);

  const getImg = () => {
    return props.product || url ? (<img src={url} width={"200px"} className={"mb-2"}/>) : null;
  };

  const getCategories = () => {
    return props.categories.map((category) => {
      if (categoryId === category.id) {
        return <option selected>{category.name}</option>;
      } else {
        return <option>{category.name}</option>;
      }
    });
  };

  const selectCategory = (e) => {
    props.categories.forEach(category => {
      if (category.name === e.target.value) {
        setCategoryId(category.id);
      }
    })
  };

  const accept = () => {
    const product = JSON.stringify({
      name: name,
      price: price,
      amount: amount,
      url: url,
      categoryId: categoryId,
    });
    if (props.product) {
      axios.put(`/products/${props.product.id}`, product, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(props.closeWindow());
    } else {
      axios.post('/products', product, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(props.closeWindow());
    }
    props.closeWindow();
  };

  return (
    <div className="panel panel-default col-xl-4 col-lg-6 col-md-8 col-sm-10 m-auto pt-4 pl-3">
      <div className="panel-body">
        <div className={"m-auto"}>
          {getImg()}

          <select className="custom-select mb-3" onChange={(e) => selectCategory(e)}>
            {getCategories()}
          </select>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">Product name</span>
            </div>
            <input type="text"
                   className="form-control"
                   value={name}
                   onChange={(e) => setName(e.target.value)}
                   aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Price $</span>
            </div>
            <input type="number"
                   className="form-control"
                   value={price}
                   onChange={(e) => setPrice(e.target.value)}
                   aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">In stock</span>
            </div>
            <input type="number"
                   className="form-control"
                   value={amount}
                   onChange={(e) => setAmount(e.target.value)}
                   aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text"><FontAwesomeIcon icon={'image'}/></span>
            </div>
            <input type="text"
                   className="form-control"
                   value={url}
                   onChange={(e) => setUrl(e.target.value)}
                   aria-describedby="basic-addon1"/>
          </div>

          <div className="text-right">
            <button type="button"
                    className="btn-danger border-0 rounded-lg mr-3 p-2"
                    onClick={() => props.closeWindow()}>
              Cancel
            </button>
            <button type="button"
                    className="btn-success border-0 rounded-lg p-2"
                    onClick={() => accept()}>
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};
ProductWindow.propTypes = {
  product: PropTypes.object,
  closeWindow: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
};
export default ProductWindow;