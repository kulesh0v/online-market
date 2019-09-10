import React from 'react';
import PropTypes from 'prop-types';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {FormattedMessage} from 'react-intl';
import {Form, Input, Button, Col, Row, Spin} from 'antd';

const CategoryWindow = (props) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (props.categoryURL) {
      axios.get(props.categoryURL)
        .then(res => {
          setName(res.data.name);
        })
        .catch(err => {
          alert('Error, check console');
          console.log(err);
        })
    }
  }, []);

  const accept = () => {
    if (!props.object) {
      props.addCategory({name: name});
    } else {
      props.editCategory(props.object.id, {name: name});
    }
  };

  if (!(!props.categoryURL || name !== '')) {
    return <div style={{display: 'flex'}}>
      <div style={{margin: 'auto'}}>
        <Spin size="large"/>
      </div>
    </div>;
  }

  return (
    <Row>
      <Col span={12} offset={6}>
        <Form style={{marginTop: 36}}>
          <Form.Item>
            <Input
              addonBefore={"Category name: "}
              value={name}
              onChange={(e) => setName(e.target.value)}/>
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
};

CategoryWindow.propTypes = {
  closeWindow: PropTypes.func.isRequired,
  addCategory: PropTypes.func.isRequired,
  editCategory: PropTypes.func.isRequired,
  categoryURL: PropTypes.string,
};

export default CategoryWindow;