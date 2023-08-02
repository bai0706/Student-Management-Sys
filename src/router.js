import React, { Component } from 'react';
import {BrowserRouter,Route} from "react-router-dom";
import Home from './components/home';

import App from './App'
import Admin from './admin';
import StudentList from './components/Student';
import Classes from './components/classes';


class IRouter extends Component {
    render() {
        return(
            <BrowserRouter>
            <App>
                <Route path="/" render={()=>
                    <Admin> 
                        <Route path="/" exact component={Home}></Route> 
                        <Route path="/admin/student/list" component={StudentList}></Route> 
                        <Route path="/admin/class/table" component={Classes}></Route> 
                    </Admin>
                }></Route>   

            </App>
            </BrowserRouter>
        );
    }
}
new IRouter();
export default IRouter;