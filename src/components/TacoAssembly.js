import React,{Component} from 'react';
import Ingredients from "./Ingredients";

class TacoAssembly extends Component{
state={
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
                header:url
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
        this.setState({
            ingredients:responseArray
        })
    });
    
}
render(){
    return(
        <div>
            <h1>San Jose's Best</h1>
        {
            this.state.ingredients.map(function(element,index){
            return(<Ingredients header={element.header} key={index} ingredients={element.obj}></Ingredients>)})
        }
        </div>
    );
}
}

export default TacoAssembly;