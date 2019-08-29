import React from 'react';
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons'

library.add(faEdit, faTrashAlt);

const CategoriesList = (props) => {
  return (
    <div className={"mt-2"}>
      {props.categories
        .map(category =>
          <div key={category.id} className="form-check">
            <input className="form-check-input" type="checkbox" value="option1"
                   defaultChecked={(props.choosesCategories.includes((category.id)))}
                   onClick={() => props.chooseCategory((category.id))}/>
            <label className="form-check-label" htmlFor="inlineCheckbox1">
              {category.name}
              {
                props.adminMod &&
                <span className="ml-2">
                <Link to={`/editCategory/${category.id}`}>
                  <button type="button" className="clear-button mr-2">
                    <FontAwesomeIcon icon={"edit"} color={"grey"} size={'sm'}/>
                  </button>
                </Link>
                  <button type="button" className="clear-button mr-2"
                          onClick={() => {
                            props.removeCategory(category.id);
                            props.uncheckDeleted(category.id);
                          }}>
                    <FontAwesomeIcon icon={"trash-alt"} color={"grey"} size={'sm'}/>
                  </button>
                </span>}
            </label>
          </div>
        )}
    </div>
  )
};

CategoriesList.propTypes = {
  categories: PropTypes.array.isRequired,
  chooseCategory: PropTypes.func.isRequired,
  removeCategory: PropTypes.func.isRequired,
  adminMod: PropTypes.bool.isRequired,
  uncheckDeleted: PropTypes.func.isRequired,
  choosesCategories: PropTypes.arrayOf(PropTypes.number).isRequired,
};
export default CategoriesList;