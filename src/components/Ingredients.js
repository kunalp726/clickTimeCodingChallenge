import React from 'react';
const Ingredients = (props)=>{

    return(<div className="Ingredient-super-parent">
        <h4>{props.header}</h4>
        <select className="Ingredient-parent">
        {props.ingredients.map(function(val,ind){
           return(<option key={ind}>{val.name}</option>)
        })}
    </select>
    </div>
    )

}
export default Ingredients;