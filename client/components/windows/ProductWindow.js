import React from 'react';
import PropTypes from 'prop-types';
import {useState, useEffect} from 'react';
import {FormattedMessage} from 'react-intl';
import axios from 'axios';

import {Form, Input, Button, Select, Icon, Spin, Col, Row} from 'antd';

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
        <Row>
          <Col span={12} offset={6}>
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
                <Input value={amount} onChange={(e) => setAmount(e.target.value)} addonBefore={'Amount'}/>
              </Form.Item>

              <Form.Item>
                <Input value={url}
                       onChange={(e) => setName(e.target.value)}
                       addonBefore={<Icon type={'picture'}/>}/>
              </Form.Item>

              <Form.Item>
                <div>

                  <Button type={"danger"} onClick={props.closeWindow} style={{marginRight: 24}}>
                    <FormattedMessage id={'cancel'}/>
                  </Button>

                  <Button type={"primary"} onClick={accept}>
                    <FormattedMessage id={'accept'}/>
                  </Button>

                </div>
              </Form.Item>
            </Form>

          </Col>
        </Row>
      )
    }
  }

  return <div style={{display: 'flex'}}>
    <div style={{margin: 'auto'}}>
      <Spin size="large"/>
    </div>
  </div>;
};

ProductWindow.propTypes = {
  productId: PropTypes.string,
  closeWindow: PropTypes.func.isRequired,
  addProduct: PropTypes.func.isRequired,
  editProduct: PropTypes.func.isRequired,
};
export default ProductWindow;