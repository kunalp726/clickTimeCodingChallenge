import React from 'react';
const Ingredients = (props)=>{

    return(
        <ul className="Ingredient-parent">
        {props.ingredients.map(function(val,ind){
           return(<li key={ind}>{val.name}</li>)
        })}
    </ul>
    )

}
export default Ingredients;