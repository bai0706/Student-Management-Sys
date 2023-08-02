import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Students from '../views/student/Students'
import Classes from '../views/classes/Classes'
import Home from '../views/home/Home'
 
function IndexRouter() {
   return (
    <BrowserRouter>
       
            <Route path='/' component={Home}/>
     
    </BrowserRouter>
   )
 }

 export default IndexRouter;
 