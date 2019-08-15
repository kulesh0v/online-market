import React from 'react';

const CategoriesList = (props) => {
  return (
    <div className={"mt-2"}>
      {props.categories.map(category =>
        <div key={category.id} className={"form-check"}>
          <input className="form-check-input" type="checkbox" value="option1"
                 onClick={() => props.checkCategory(category.id)}/>
          <label className="form-check-label" htmlFor="inlineCheckbox1">{category.name}</label>
        </div>
      )}
    </div>
  )
};
export default CategoriesList;