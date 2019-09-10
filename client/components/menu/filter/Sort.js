import React from 'react';

import {FormattedMessage} from 'react-intl';
import {Button} from 'antd';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faLongArrowAltUp, faLongArrowAltDown} from '@fortawesome/free-solid-svg-icons'

library.add(faLongArrowAltUp, faLongArrowAltDown);

const Sort = (props) => {
  const onClickDef = () => {
    props.setType(null);
  };
  const onClickPrice = () => {
    if (props.type === 'uprice') {
      props.setType('dprice');
    } else {
      props.setType('uprice');
    }
  };

  const priceButtonArrow = () => {
    if (!props.type || props.type === 'dprice') {
      return (<FontAwesomeIcon icon="long-arrow-alt-down"/>);
    }
    return (<FontAwesomeIcon icon="long-arrow-alt-up"/>);
  };

  return (
    <div style={{display: 'flex'}}>
      <div style={{margin: 'auto'}}>
        <Button data-testid="sort-type-new" onClick={onClickDef} style={{marginRight: 18}}>
          <FormattedMessage id={'new'}/>
        </Button>
        <Button data-testid="sort-type-price" onClick={onClickPrice}>
          <FormattedMessage id={'price'}/>
          <span style={{marginLeft: 6}}>{priceButtonArrow()}</span>
        </Button>
      </div>
    </div>
  );
};
export default Sort;