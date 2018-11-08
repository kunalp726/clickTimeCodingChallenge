import React from 'react';
import _ from 'lodash';
const Ingredients = (props)=>{
    const addToTaco=(e,index)=>{
        props.addToTaco(index,props.header,e.target.value);
    }
    let button;
    if(props.header==="mixins" || props.header==="condiments"){
        button= <button className="btn btn-primary inline-button" onClick={()=>{props.add(props.header)}}>Add more {props.header}</button>;
    }   
    return(<div className="Ingredient-super-parent">
        
        <h4>{props.header}</h4>
        {
            _.times(props.count,(i)=>{
              return(<select onChange={(e)=>addToTaco(e,i)} key={i} className="Ingredient-parent">
                {props.ingredients.map(function(val,ind){
                   return(<option key={ind}>{val.name}</option>)
                })}
            </select>)
            })
        }
        {button}
    </div>
    )

}
export default Ingredients;