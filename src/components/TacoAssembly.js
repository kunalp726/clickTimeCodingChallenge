import React,{Component} from 'react';
import Ingredients from "./Ingredients";
import BuiltTacos from "./BuiltTacos";

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
console.log(this.state.currSelection);
}

addToTaco=(index,header,val)=>{
const newState={...this.state};
newState.currSelection[header][index]=val;
this.setState({
    ...newState
});
console.log(this.state.currSelection);
}

makeMyTaco=()=>{
    const newState={...this.state};
    let randomSelection=JSON.stringify(newState.currSelection);
    
    newState.tacoTracker.push(JSON.parse(randomSelection));
    this.setState({...newState});
    console.log(this.state.tacoTracker);
}

makeRandomTaco=()=>{
    const newState={...this.state};
    let randomSelection={};
    newState.ingredients.forEach((ele)=>{
        randomSelection[ele.header]=[ele.obj[Math.floor(Math.random()*ele.obj.length)].name];
    });
    newState.tacoTracker.push(randomSelection);
    this.setState({...newState});
    console.log(this.state.tacoTracker);
}
removeTaco=(key)=>{
const newState={...this.state};
newState.tacoTracker.splice(key,1)
this.setState({...newState});
}
render(){
    return(
        <div className="container">
         <h1>San Jose's Best</h1>
        <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6">  
        {
            this.state.ingredients.map((element,index)=>{
            return(<Ingredients addToTaco={this.addToTaco} add={this.addIngredient} count={element.count} header={element.header} key={index} ingredients={element.obj}></Ingredients>)})
        }
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6">
        {this.state.tacoTracker.map((ele,index)=>{
            return(<BuiltTacos removeTaco={this.removeTaco} key={index} id={index} ele={ele}></BuiltTacos>)
        })}
        </div>
       
        </div>
        <button onClick={this.makeMyTaco}>Make My Taco!</button>
        <button onClick={this.makeRandomTaco}>Surprise Me!</button>
        </div>
    );
}
}

export default TacoAssembly;