import React from 'react';

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
      return (<FontAwesomeIcon icon="long-arrow-alt-up"/>);
    }
    return (<FontAwesomeIcon icon="long-arrow-alt-down"/>);
  };

  return (
    <div className="d-flex justify-content-between">
      <button onClick={onClickDef} className="btn">Default</button>
      <button onClick={onClickPrice} className="btn">
        Price{priceButtonArrow()}
      </button>
    </div>
  );
};
export default Sort;