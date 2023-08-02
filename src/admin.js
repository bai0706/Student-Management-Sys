import React, { Component } from 'react';
import {Row, Col} from 'antd';
import NavLeft from "./components/navleft";

import "./style/common.css"
import Classes from './components/classes';

class Admin extends Component{
    render(){
        return(
            <div>
                <Row className='container'>
                    <Col span={3} className='nav-left'>
                        <NavLeft></NavLeft>
                    </Col>
                    <Col span={21} className='main'>
                        <Row className='content'>
                            {this.props.children}
                        </Row>
                    </Col> 
                </Row>
            </div>
        );
    }
}
export default Admin;
