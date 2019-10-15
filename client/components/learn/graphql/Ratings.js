import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser, faStar} from '@fortawesome/free-solid-svg-icons'
import {useState} from 'react';

export const calculateWidths = (ratings) => {
  const widths = [0, 0, 0, 0, 0];
  ratings.forEach(r => widths[r.rating - 1]++);
  return widths.map(width => width ? (width / ratings.length * 100) : width)
};

export const calculateScore = (ratings) => {
  let score = 0;
  ratings.forEach(r => score += r.rating);
  return score ? (score / ratings.length).toFixed(1) : score.toFixed(0);
};

const Rating = ({id, ratings, addRating, ratingResult}) => {
    const [userOpinion, setUserOpinion] = useState();

    const renderButtons = () => {
      const buttons = [];
      for (let i = 0; i < 5; i++) {
        const rating = i + 1;

        if (userOpinion) {
          buttons[i] = <FontAwesomeIcon key={i} className={i < userOpinion ? "hover-button" : ""} icon={faStar}/>;
        } else {
          buttons[i] = (
            <button
              key={i}
              className="clear-button"
              onClick={() => {
                addRating({variables: {productId: id, rating}});
                setUserOpinion(rating);
              }}
            >
              <FontAwesomeIcon icon={faStar}/>
            </button>
          );
        }

      }
      return buttons;
    };

    const renderResult = () => {
      if (ratingResult.loading) {
        return (<h4 className="message">Loading...</h4>);
      }
      if (ratingResult.error) {
        if (userOpinion) {
          setUserOpinion();
        }
        return ratingResult.error.graphQLErrors.map((error, index) => (
          <h5 key={index} className="message">{error.message}</h5>
        ));
      }
      if (userOpinion) {
        return <h5 className="message">Thanks for the feedback</h5>
      }
    };

    return (
      <div>
        <div className="product-ratings">

          <div className="text-info">

            <span className="score">{calculateScore(ratings)}</span>

            <span>
            <span className="amount">{ratings.length}</span>
            <FontAwesomeIcon icon={faUser}/>
          </span>

            <div className="buttons">
              {renderButtons()}
              {renderResult()}
            </div>

          </div>

          <ol reversed>
            {
              calculateWidths(ratings).map((width, index) =>
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