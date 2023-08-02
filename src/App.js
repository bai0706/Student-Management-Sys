import React from "react";
import {Button} from "antd";
// import 'antd/dist/reset.css';
import "./App.css";


function App(props){
  return(
    <div className="App">
        {props.children}
    </div>
  );
}

export default App;
