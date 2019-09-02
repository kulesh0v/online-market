import React from 'react';
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import {Checkbox, Button} from 'antd';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons'

library.add(faEdit, faTrashAlt);

const CategoriesList = (props) => {
  return (
    <div style={{marginLeft: 12, marginTop: 6}}>
      {props.categories
        .map(category =>

          <div key={category.id}>

            <Checkbox
              defaultChecked={(props.choosesCategories.includes((category.id)))}
              onChange={() => props.chooseCategory((category.id))}>
              {category.name}
            </Checkbox>

            {
              props.adminMod &&
              <span>
                <Link to={`/editCategory/${category.id}`}>
                  <Button className="clear-button" style={{marginRight: 6}}>
                    <FontAwesomeIcon icon={"edit"} color={"grey"} size={'sm'}/>
                  </Button>
                </Link>
                  <Button className="clear-button"
                          onClick={() => {
                            props.removeCategory(category.id);
                            props.uncheckDeleted(category.id);
                          }}>
                    <FontAwesomeIcon icon={"trash-alt"} color={"grey"} size={'sm'}/>
                  </Button>
                </span>
            }
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