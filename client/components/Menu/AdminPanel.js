import React from 'react';
import {useState} from 'react';
import PropTypes from "prop-types";

const AdminPanel = (props) => {
  const [isHidden, setIsHidden] = useState(true);
  return (
    <div>
      <button className="mt-4 rounded-lg btn container-fluid border-secondary" onClick={() => setIsHidden(!isHidden)}>
        Admin panel
      </button>
      {!isHidden &&
      <div className="mt-3">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">Admin mode</span>
          </div>
          <button type="button" className={"btn-secondary border-0"} onClick={() => props.setAdminMod(!props.adminMod)}>
            {props.adminMod ? "On" : "Off"}
          </button>
        </div>
        <button type="button" className={"btn border-secondary"} onClick={() => props.openWindow()}>
          Add product
        </button>
      </div>
      }
    </div>
  )
};

AdminPanel.propTypes = {
  setAdminMod: PropTypes.func.isRequired,
  adminMod: PropTypes.bool.isRequired,
  openWindow: PropTypes.func.isRequired,
};

export default AdminPanel;