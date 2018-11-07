import React, { Component } from 'react';
import './App.css';
import  TacoAssembly from './components/TacoAssembly';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TacoAssembly></TacoAssembly>
      </div>
    );
  }
}

export default App;
