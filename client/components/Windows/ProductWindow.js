import React from 'react';
import PropTypes from 'prop-types';
import {useState, useEffect} from 'react';
import {FormattedMessage} from 'react-intl';
import axios from 'axios';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faImage} from '@fortawesome/free-solid-svg-icons'

library.add(faImage);

const ProductWindow = (props) => {
  const [categories, setCategories] = useState(undefined);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [url, setUrl] = useState('');
  const [categoryId, setCategoryId] = useState(undefined);

  useEffect(() => {
    if (!categories) {
      axios.get('/categories')
        .then(res => {
          setCategories(res.data);
          setCategoryId(res.data[0].id);
        })
        .catch(err => {
          alert('Error, check console');
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    if (props.productId) {
      axios.get(`/products/${props.productId}`)
        .then(res => {
          setCategoryId(res.data.categoryId);
          setPrice(res.data.price);
          setAmount(res.data.amount);
          setUrl(res.data.url);
          setName(res.data.name);
        })
        .catch(err => {
          alert('Error, check console');
          console.log(err);
        });
    }
  }, []);

  if (categories) {
    const getImg = () => {
      return props.product || url ? (<img src={url} width={"200px"} className={"mb-2"}/>) : null;
    };

    const selectCategory = (e) => {
      categories.forEach(category => {
        if (category.name === e.target.value) {
          setCategoryId(category.id);
        }
      })
    };

    const accept = () => {
      const product = {
        name: name,
        price: price,
        amount: amount,
        url: url,
        categoryId: categoryId,
      };
      if (props.productId) {
        props.editProduct(props.productId, product);
      } else {
        props.addProduct(product);
      }
    };

    if (!props.productId || name !== '') {
      return (
        <div className="panel panel-default col-xl-4 col-lg-6 col-md-8 col-sm-10 m-auto pt-4 pl-3">
          <div className="panel-body">
            <div className={"m-auto"}>

              {getImg()}

              <select
                className="custom-select mb-3"
                defaultValue={categoryId && categories.find(c => +c.id === categoryId).name}
                onChange={(e) => selectCategory(e)}>
                {categories.map((category) => <option key={category.id}>{category.name}</option>)}
              </select>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                <span className="input-group-text">
                  <FormattedMessage id={'productName'}/>
                </span>
                </div>
                <input type="text"
                       className="form-control"
                       value={name}
                       onChange={(e) => setName(e.target.value)}
                       aria-describedby="basic-addon1"/>
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                <span className="input-group-text">
                  <FormattedMessage id={'price'}/>$</span>
                </div>
                <input type="number"
                       className="form-control"
                       value={price}
                       onChange={(e) => setPrice(e.target.value)}
                       aria-describedby="basic-addon1"/>
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                <span className="input-group-text">
                  <FormattedMessage id={'inStock'}/>
                </span>
                </div>
                <input type="number"
                       className="form-control"
                       value={amount}
                       onChange={(e) => setAmount(e.target.value)}
                       aria-describedby="basic-addon1"/>
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={'image'}/>
                </span>
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
                  <FormattedMessage id={'cancel'}/>
                </button>
                <button type="button"
                        className="btn-success border-0 rounded-lg p-2"
                        onClick={() => accept()}>
                  <FormattedMessage id={'accept'}/>
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  return <div className="spinner-border text-secondary m-auto" role="status">
    <span className="sr-only">Loading...</span>
  </div>
};

ProductWindow.propTypes = {
  productId: PropTypes.string,
  closeWindow: PropTypes.func.isRequired,
  addProduct: PropTypes.func.isRequired,
  editProduct: PropTypes.func.isRequired,
};
export default ProductWindow;