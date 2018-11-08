import React,{Component} from 'react';
import Ingredients from "./Ingredients";
import BuiltTacos from "./BuiltTacos";
import headerImg from "../clicktime-logo-blue.png";

class TacoAssembly extends Component{
state={
    currSelection:{},
    baseUrl:"https://tacos-ocecwkpxeq.now.sh/",
    url:[
        "shells",
        "baseLayers",
        "mixins",
        "condiments",
        "seasonings",
        
    ],
ingredients:[],
tacoTracker:[]
}
apiCall(baseUrl,url){
    return new Promise(function(resolve,reject){
    fetch(baseUrl+url).then((response)=>{
        return response.json();
          }).then((obj)=>{
            resolve({
                obj:obj,
                header:url,
                count:1
            });
          });
    });
}
componentDidMount(){
    var baseUrl=this.state.baseUrl;
    var promisArray=this.state.url.map(element => {
        return this.apiCall(baseUrl,element);
    });
    var responseArray=[];
    Promise.all(promisArray).then((values)=>{
        responseArray=values;
        let initalSelection={};
        responseArray.forEach((ele)=>{
            initalSelection[ele.header]=[ele.obj[0].name];
        });

        this.setState({
            ingredients:responseArray,
            currSelection:initalSelection
        });
        
    });
    
}
addIngredient=(currHeader)=>{
const newState={...this.state};
newState.ingredients.forEach((ele)=>{
    if(ele.header===currHeader){
        newState.currSelection[currHeader][ele.count]=ele.obj[0].name;
        ele.count++;
    }
});
this.setState({
    ...newState
});
}

addToTaco=(index,header,val)=>{
const newState={...this.state};
newState.currSelection[header][index]=val;
this.setState({
    ...newState
});
}

makeMyTaco=()=>{
    const newState={...this.state};
    let randomSelection=JSON.stringify(newState.currSelection);
    
    newState.tacoTracker.push(JSON.parse(randomSelection));
    this.setState({...newState});
}

makeRandomTaco=()=>{
    const newState={...this.state};
    let randomSelection={};
    newState.ingredients.forEach((ele)=>{
        randomSelection[ele.header]=[ele.obj[Math.floor(Math.random()*ele.obj.length)].name];
    });
    newState.tacoTracker.push(randomSelection);
    this.setState({...newState});
}
removeTaco=(key)=>{
const newState={...this.state};
newState.tacoTracker.splice(key,1)
this.setState({...newState});
}
render(){
    return(
        <div>
            <div className="header clearfix">
            <img src={headerImg}></img>
             <h1>Taco Factory</h1>
             </div>
             <div className="intro"><p>Please Select the Ingredients and click the "Make My Taco" button OR try our taco randomiser by Clicking on "Surprise Me!"</p></div>
        <div className="parent">
        
        <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 child">  
           
        {
            this.state.ingredients.map((element,index)=>{
            return(<Ingredients addToTaco={this.addToTaco} add={this.addIngredient} count={element.count} header={element.header} key={index} ingredients={element.obj}></Ingredients>)})
        }
        </div>
        <div className="col-lg-7 col-md-7 col-sm-7 col-xs-7 child">
        <button className="btn btn-primary main-btn" onClick={this.makeMyTaco}>Make My Taco!</button>
        <button className="btn btn-primary main-btn" onClick={this.makeRandomTaco}>Surprise Me!</button>
        <p className="taco-list-start">Taco List :</p>
        {this.state.tacoTracker.map((ele,index)=>{
            return(<BuiltTacos removeTaco={this.removeTaco} key={index} id={index} ele={ele}></BuiltTacos>)
        })}
        </div>
       
        </div>
       
        </div>
        <div className="footer">Name:Kunal Pavashiya | Email: Kunal.pavashiya@sjsu.edu | Phone: +1(669)261-0560</div>
         </div>
    );
}
}

export default TacoAssembly;