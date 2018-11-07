import React,{Component} from 'react';
import Ingredients from "./Ingredients";

class TacoAssembly extends Component{
state={
    url:[
        "https://tacos-ocecwkpxeq.now.sh/shells",
        "https://tacos-ocecwkpxeq.now.sh/mixins",
        "https://tacos-ocecwkpxeq.now.sh/seasonings",
        "https://tacos-ocecwkpxeq.now.sh/condiments",
        "https://tacos-ocecwkpxeq.now.sh/baseLayers"
    ],
ingredients:[]
}
apiCall(url){
    return new Promise(function(resolve,reject){
    fetch(url).then((response)=>{
        return response.json();
          }).then((obj)=>{
            resolve(obj);
          });
    });
}
componentDidMount(){
    var promisArray=this.state.url.map(element => {
        return this.apiCall(element);
    });
    var responseArray=[];
    Promise.all(promisArray).then((values)=>{
        responseArray=values;
        this.setState({
            ingredients:responseArray
        })
    });
   
}
render(){
    return(
        <div>
        {
            this.state.ingredients.map(function(element,index){
            return(<Ingredients key={index} ingredients={element}></Ingredients>)})
        }
        </div>
    );
}
}

export default TacoAssembly;