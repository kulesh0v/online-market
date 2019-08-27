import React from 'react';
import {useState} from 'react';
import PropTypes from "prop-types";
import {FormattedMessage} from 'react-intl';

const AdminPanel = (props) => {
  const [isHidden, setIsHidden] = useState(true);
  return (
    <div>
      <button className="mt-4 rounded-lg btn container-fluid border-secondary" onClick={() => setIsHidden(!isHidden)}>
        {
          isHidden &&
          <FormattedMessage id={'showAdminPanel'}/> ||
          <FormattedMessage id={'hideAdminPanel'}/>
        }
      </button>
      {!isHidden &&
      <div className="mt-3">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <FormattedMessage id={'adminMod'}/>
            </span>
          </div>
          <button type="button" className={"btn-secondary border-0"} onClick={() => props.setAdminMod(!props.adminMod)}>
            {
              props.adminMod ?
                <FormattedMessage id={'off'}/> :
                <FormattedMessage id='on'/>
            }
          </button>
        </div>
        <button type="button" className={"btn btn-secondary container-fluid"}
                onClick={() => props.openWindow(null, 'product')}>
          <FormattedMessage id={'addProduct'}/>
        </button>
        <button type="button" className={"btn btn-secondary container-fluid mt-2"}
                onClick={() => props.openWindow(null, 'category')}>
          <FormattedMessage id={'addCategory'}/>
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
  categories: PropTypes.array.isRequired,
};

export default AdminPanel;