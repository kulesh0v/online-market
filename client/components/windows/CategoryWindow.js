import React from 'react';
import PropTypes from 'prop-types';
import {useState} from 'react';
import {FormattedMessage} from 'react-intl';
import {Form, Input, Button, Col, Row} from 'antd';

const CategoryWindow = (props) => {
  const [name, setName] = useState(props.object ? props.object.name : '');

  const accept = () => {
    if (!props.object) {
      props.addCategory({name: name});
    } else {
      props.editCategory(props.object.id, {name: name});
    }
  };

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
  object: PropTypes.object,
  closeWindow: PropTypes.func.isRequired,
  addCategory: PropTypes.func.isRequired,
  editCategory: PropTypes.func.isRequired,
};

export default CategoryWindow;