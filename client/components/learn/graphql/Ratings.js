import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useMutation} from '@apollo/react-hooks';
import {addRatingMutation} from './mutations.js';
import {faUser, faStar, faSmile} from '@fortawesome/free-solid-svg-icons'
import {useState} from 'react';

const Rating = ({id, ratings}) => {
    const [userOpinion, setUserOpinion] = useState();
    const [addRating, {error}] = useMutation(addRatingMutation);
    let score = 0;
    let widths = [0, 0, 0, 0, 0];
    console.log(error);

    const calculateRating = () => {
      ratings.forEach(r => {
        widths[r.rating - 1]++;
        score += r.rating;
      });
      widths = widths.map(width => width ? Math.floor(width / ratings.length * 100) : width);
      score = score ? (score / ratings.length).toFixed(1) : score;
    };

    const renderButtons = () => {
      const buttons = [];
      for (let i = 0; i < 5; i++) {
        const rating = i + 1;

        if (userOpinion) {
          buttons[i] = <FontAwesomeIcon key={i} className={i < userOpinion ? "hover-button" : ""} icon={faStar}/>;

        } else {
          buttons[i] = (
            <button key={i} className="clear-button" onClick={() => {
              addRating({variables: {productId: id, rating}});
              ratings.push({rating});
              setUserOpinion(rating);
            }}>
              <FontAwesomeIcon icon={faStar}/>
            </button>
          );
        }

      }
      return buttons;
    };

    calculateRating();

    return (
      <div>
        <div className="product-ratings">

          <div className="text-info">

            <span className="score">{score}</span>

            <span>
            <span className="amount">{ratings.length}</span>
            <FontAwesomeIcon icon={faUser}/>
          </span>

            <div className="buttons">
              {renderButtons()}
              {
                userOpinion &&
                <div className="message">
                  Thanks for the feedback :)
                </div>
              }
            </div>

          </div>

          <ol reversed>
            {
              widths.map((width, index) =>
                <li key={index} className="rating">
                  <div className="progress" style={{width: `${width}%`,}}/>
                </li>
              ).reverse()
            }
          </ol>
        </div>
      </div>
    )
  }
;

export default Rating;