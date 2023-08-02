import React, { Component } from 'react';
import {Row, Col} from 'antd';
import SideMenu from "./components/views/SideMenu"

import "./style/common.css"

class Admin extends Component{
    render(){
        return(
            <div>
                <Row className='container'>
                    <Col span={3} className='nav-left'>
                        <SideMenu />
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
