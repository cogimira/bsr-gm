import React from 'react';
import './App.css';
import {BsrGm} from './package/engine/bsr-gm'

class App extends React.Component {
  constructor() {
    super();

    this.name = "sdsd";
  }

  componentDidMount() {
    let targetCanvas = document.getElementById("app");
    new BsrGm(targetCanvas);
  }

  render() {
    return (
      <div className="App">
        <canvas id="app"> </canvas>
      </div>
    );
  }
}

export default App;
