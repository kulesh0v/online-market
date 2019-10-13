import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons'

const Rating = ({ratings}) => {

  return (
    <div>
      <div className="product-ratings">
        <div className="text-info">
          <span className="score">{ratings.score}</span>
          <span>
            <span className="amount">{ratings.amount}</span>
            <FontAwesomeIcon icon={faStar}/>
          </span>
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
    </div>
  )
};

export default Rating;