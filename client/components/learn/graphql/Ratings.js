import React from 'react';

const Rating = ({ratings}) => {

  return (
    <div className="product-ratings">
      <div className="text-info">
        <div>{ratings.score}</div>
        <div>{ratings.amount}</div>
      </div>
      <ol reversed>
        <li className="rating">
          <div className="progress" style={{width: '32%',}}/>
        </li>
        <li className="rating">
          <div className="progress" style={{width: '43%',}}/>
        </li>
        <li className="rating">
          <div className="progress" style={{width: '15%'}}/>
        </li>
        <li className="rating">
          <div className="progress" style={{width: '8%'}}/>
        </li>
        <li className="rating">
          <div className="progress" style={{width: '2%'}}/>
        </li>
      </ol>
    </div>
  )
};

export default Rating;