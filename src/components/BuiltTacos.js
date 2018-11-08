import React from 'react';

const BuiltTacos=(props)=>{
   let shells=props.ele["shells"].reduce((acc,ele)=>acc+","+ele);
   let baseLayers=props.ele["baseLayers"].reduce((acc,ele)=>acc+","+ele);
   let mixins=props.ele["mixins"].reduce((acc,ele)=>acc+","+ele);
   let condiments=props.ele["condiments"].reduce((acc,ele)=>acc+","+ele);
   let seasonings=props.ele["seasonings"].reduce((acc,ele)=>acc+","+ele);

    let statement="Crispy Tacos with Shell of "+ shells.bold() + " with an incredible base layer of "+baseLayers.bold()+" with delicious "+ mixins.bold()+" and mouth-watering "+condiments.bold()+ " ,finally top it off with "+seasonings.bold();
    return(<div className="taco-list row">
        {<div className="col-lg-9 col-md-9 col-sm-9 col-xs-9">
        <p dangerouslySetInnerHTML={{__html: statement}}/>
        </div>
        }<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 button-parent">
         <button className="btn btn-primary" onClick={()=>props.removeTaco(props.id)}>Remove</button>
         </div>
    </div>)

}

export default BuiltTacos;