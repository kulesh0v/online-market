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
  const [productId, setProductId] = useState('');

  useEffect(() => {
    if (!categories) {
      axios.get(props.categoriesURL)
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
    if (props.productURL) {
      axios.get(props.productURL)
        .then(res => {
          setCategoryId(res.data.categoryId);
          setPrice(res.data.price);
          setAmount(res.data.amount);
          setUrl(res.data.url);
          setName(res.data.name);
          setProductId(res.data.id);
        })
        .catch(err => {
          alert('Error, check console');
          console.log(err);
        });
    }
  }, []);

  const getImg = () => {
    return props.product || url ? (<img src={url} width={"200px"} alt="product photo" className={"mb-2"}/>) : null;
  };

  const accept = () => {
    const product = {
      name: name,
      price: price,
      amount: amount,
      url: url,
      categoryId: categoryId,
      id: productId,
    };
    if (props.productURL) {
      props.editProduct(product);
    } else {
      props.addProduct(product);
    }
  };

  if (!categories || (props.productURL && name === '')) {
    return <div style={{display: 'flex'}}>
      <div style={{margin: 'auto'}}>
        <Spin size="large"/>
      </div>
    </div>;
  }

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
                   onChange={(e) => setUrl(e.target.value)}
                   addonBefore={<Icon type={'picture'}/>}/>
          </Form.Item>

          <Form.Item>
            <div data-testid="buttons">

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
};

ProductWindow.propTypes = {
  productURL: PropTypes.string,
  closeWindow: PropTypes.func.isRequired,
  addProduct: PropTypes.func.isRequired,
  editProduct: PropTypes.func.isRequired,
  categoriesURL: PropTypes.string.isRequired,
};
export default ProductWindow;