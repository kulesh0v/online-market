import React from 'react';
import PropTypes from 'prop-types';
import {useState} from 'react';

const CategoryWindow = (props) => {
  const [name, setName] = useState(props.object ? props.object.name : '');

  const accept = () => {
    if (!props.object) {
      props.addCategory({name: name});
    } else {
      props.editCategory(props.object.id, {name: name});
    }
  };

  return (<div className="panel panel-default col-xl-4 col-lg-6 col-md-8 col-sm-10 m-auto pt-4 pl-3">
      <div className="panel-body">
        <div className={"m-auto"}>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Category name</span>
            </div>
            <input type="text"
                   className="form-control"
                   value={name}
                   onChange={(e) => setName(e.target.value)}
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

CategoryWindow.propTypes = {
  object: PropTypes.object,
  closeWindow: PropTypes.func.isRequired,
  addCategory: PropTypes.func.isRequired,
  editCategory: PropTypes.func.isRequired,
};

export default CategoryWindow;