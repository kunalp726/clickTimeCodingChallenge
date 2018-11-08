import React,{Component} from 'react';
import Ingredients from "./Ingredients";

class TacoAssembly extends Component{
state={
    currSelection:{},
    baseUrl:"https://tacos-ocecwkpxeq.now.sh/",
    url:[
        "shells",
        "mixins",
        "seasonings",
        "condiments",
        "baseLayers"
    ],
ingredients:[]
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
render(){
    return(
        <div>
            <h1>San Jose's Best</h1>
           
        {
            this.state.ingredients.map((element,index)=>{
            return(<Ingredients addToTaco={this.addToTaco} add={this.addIngredient} count={element.count} header={element.header} key={index} ingredients={element.obj}></Ingredients>)})
        }
        </div>
    );
}
}

export default TacoAssembly;