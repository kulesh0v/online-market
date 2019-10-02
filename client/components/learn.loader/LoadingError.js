import React from 'react';
import {FormattedMessage} from "react-intl";

const LoadingError = () => {
  return (
    <div style={{display: 'flex'}}>
      <div style={{margin: 'auto', textAlign: 'center'}}>
        <h2>
          <FormattedMessage id={'loadingError'}/>
        </h2>
        <img
          width={400}
          alt={'dino'}
          src={'https://upload.wikimedia.org/wikipedia/commons/8/88/Mini-Robot.png'}
        />
      </div>
    </div>
  );
};

export default LoadingError;