import React from 'react';
import PropTypes from 'prop-types';
import {useState, useEffect} from 'react';
import {FormattedMessage} from 'react-intl';
import axios from 'axios';

import {Form, Input, Button, Select, Icon} from 'antd';

const {Option} = Select;

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
        <div style={{display: 'flex'}}>
          <Form style={{margin: 'auto'}}>

            <Form.Item>
              {getImg()}
            </Form.Item>

            <Form.Item>
              <Select
                defaultValue={categoryId || null}
                onChange={setCategoryId}>

                {categories.map((category) => <Option key={category.id} value={category.id}>{category.name}</Option>)}

              </Select>
            </Form.Item>

            <Form.Item>
              <Input value={name} onChange={(e) => setName(e.target.value)} addonBefore={'Name'}/>
            </Form.Item>

            <Form.Item>
              <Input value={price} onChange={(e) => setPrice(e.target.value)} addonBefore={'Price $'}/>
            </Form.Item>

            <Form.Item>
              <Input value={amount} onChange={(e) => setAmount(e.target.value)} addonBefore={'amount'}/>
            </Form.Item>

            <Form.Item>
              <Input value={url}
                     onChange={(e) => setName(e.target.value)}
                     addonBefore={<Icon type={'picture'}/>}/>
            </Form.Item>

            <Form.Item>
              <div style={{display: 'flex'}}>

                <Button type={"danger"} onClick={props.closeWindow} style={{margin: 'auto'}}>
                  <FormattedMessage id={'cancel'}/>
                </Button>

                <Button type={"primary"} onClick={accept} style={{margin: 'auto'}}>
                  <FormattedMessage id={'accept'}/>
                </Button>

              </div>
            </Form.Item>
          </Form>

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