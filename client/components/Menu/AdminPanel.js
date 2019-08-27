import React from 'react';
import {useState} from 'react';
import PropTypes from "prop-types";
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router-dom';

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
                <FormattedMessage id={'on'}/> :
                <FormattedMessage id='off'/>
            }
          </button>
        </div>
        <Link to={'/addProduct'}>
          <button type="button" className={"btn btn-secondary container-fluid"}>
            <FormattedMessage id={'addProduct'}/>
          </button>
        </Link>
        <Link to={'/addCategory'}>
          <button type="button" className={"btn btn-secondary container-fluid mt-2"}>
            <FormattedMessage id={'addCategory'}/>
          </button>
        </Link>
      </div>
      }
    </div>
  )
};

AdminPanel.propTypes = {
  setAdminMod: PropTypes.func.isRequired,
  adminMod: PropTypes.bool.isRequired,
  categories: PropTypes.array.isRequired,
};

export default AdminPanel;