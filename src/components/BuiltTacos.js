import React from 'react';

const BuiltTacos=(props)=>{
   let shells=props.ele["shells"].reduce((acc,ele)=>acc+","+ele);
   let baseLayers=props.ele["baseLayers"].reduce((acc,ele)=>acc+","+ele);
   let mixins=props.ele["mixins"].reduce((acc,ele)=>acc+","+ele);
   let condiments=props.ele["condiments"].reduce((acc,ele)=>acc+","+ele);
   let seasonings=props.ele["seasonings"].reduce((acc,ele)=>acc+","+ele);

    let statement="Crispy Tacos with Shell of "+ shells.bold() + " with an incredible base layer of "+baseLayers.bold()+" with delicious "+ mixins.bold()+" and mouth-watering "+condiments.bold()+ " ,finally top it off with "+seasonings.bold();
    return(<div>
        {
        <p dangerouslySetInnerHTML={{__html: statement}}/>
        }
         <button onClick={()=>props.removeTaco(props.id)}>Remove Taco!</button>
    </div>)

}

export default BuiltTacos;