import React from 'react';
import PropTypes from 'prop-types';
import {useState} from 'react';
import {FormattedMessage} from 'react-intl';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faImage} from '@fortawesome/free-solid-svg-icons'

library.add(faImage);

const ProductWindow = (props) => {
    const [name, setName] = useState(props.object ? props.object.name : '');
    const [price, setPrice] = useState(props.object ? props.object.price : '');
    const [amount, setAmount] = useState(props.object ? props.object.amount : '');
    const [url, setUrl] = useState(props.object ? props.object.url : '');
    const [categoryId, setCategoryId] = useState(props.object ?
      props.object.categoryId : props.categories[0].id);

    const getImg = () => {
      return props.object || url ? (<img src={url} width={"200px"} className={"mb-2"}/>) : null;
    };

    const selectCategory = (e) => {
      props.categories.forEach(category => {
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
      if (props.object) {
        props.editProduct(props.object.id, product);
      } else {
        props.addProduct(product);
      }
    };

    return (
      <div className="panel panel-default col-xl-4 col-lg-6 col-md-8 col-sm-10 m-auto pt-4 pl-3">
        <div className="panel-body">
          <div className={"m-auto"}>

            {getImg()}

            <select
              className="custom-select mb-3"
              defaultValue={props.categories.find(c => c.id === categoryId)}
              onChange={(e) => selectCategory(e)}>
              {props.categories.map((category) => <option key={category.id}>{category.name}</option>)}
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
;
ProductWindow.propTypes = {
  object: PropTypes.object,
  closeWindow: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  addProduct: PropTypes.func.isRequired,
  editProduct: PropTypes.func.isRequired,
};
export default ProductWindow;