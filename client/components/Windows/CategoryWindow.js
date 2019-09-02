import React from 'react';
import PropTypes from 'prop-types';
import {useState} from 'react';
import {FormattedMessage} from 'react-intl';
import {Form, Input, Button} from 'antd';

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
    <div style={{display: 'flex'}}>
      <Form style={{margin: 'auto', marginTop: 24}}>
        <Form.Item>
          <Input
            addonBefore={"Category name: "}
            value={name}
            onChange={(e) => setName(e.target.value)}/>
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
};

CategoryWindow.propTypes = {
  object: PropTypes.object,
  closeWindow: PropTypes.func.isRequired,
  addCategory: PropTypes.func.isRequired,
  editCategory: PropTypes.func.isRequired,
};

export default CategoryWindow;