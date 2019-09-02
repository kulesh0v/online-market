import React from 'react';
import {useState} from 'react';
import PropTypes from "prop-types";
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router-dom';
import {Button, Switch} from 'antd'
const AdminPanel = (props) => {
  const [isHidden, setIsHidden] = useState(true);
  return (
    <div>

      <div style={{display: 'flex'}}>
        <Button size={'large'} style={{margin: 'auto', marginTop: 12}} onClick={() => setIsHidden(!isHidden)}>
          {
            isHidden &&
            <FormattedMessage id={'showAdminPanel'}/> ||
            <FormattedMessage id={'hideAdminPanel'}/>
          }
        </Button>
      </div>

      {!isHidden &&
      <div style={{display: 'flex'}}>
            <span style={{margin: 'auto', marginTop: 12}}>

              <span style={{marginRight: 12}}>Admin mode</span>
              <Switch checkedChildren={'On'}
                      unCheckedChildren={'Off'}
                      defaultChecked={props.adminMod}
                      onChange={() => props.setAdminMod(!props.adminMod)}
              />
              </span>
      </div>
      }

      {!isHidden &&
      <div style={{display: 'flex'}}>
        <div style={{margin: 'auto', marginTop: 12}}>

          <Link to={'/addProduct'}>
            <Button size={'small'} style={{marginRight: 12}}>
              <FormattedMessage id={'addProduct'}/>
            </Button>
          </Link>


          <Link to={'/addCategory'}>
            <Button size={'small'}>
              <FormattedMessage id={'addCategory'}/>
            </Button>
          </Link>

        </div>
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