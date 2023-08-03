import React, { Component } from 'react';
import {BrowserRouter,Route} from "react-router-dom";
import Login from './components/views/login';
import App from './App'
import Home from './components/views/home';
import StudentList from './components/content/Student';
import Classes from './components/content/Classes';


class IRouter extends Component {
    render() {
        return(
            <BrowserRouter>
            <App>
                <Route path="/" render={()=>
                    <Home> 
                        <Route path="/" exact component={Login}></Route> 
                        <Route path="/student/list" component={StudentList}></Route> 
                        <Route path="/class/table" component={Classes}></Route> 
                    </Home>
                }></Route>   

            </App>
            </BrowserRouter>
        );
    }
}
new IRouter();
export default IRouter;