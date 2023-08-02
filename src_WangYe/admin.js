import React,{Component} from 'react';
import {Col,Row} from "antd";
import Head from "./components/header";
import Footer from "./components/footer";
import NavLeft from "./components/navleft";
import Face from './components/avatar';
import "./style/common.css";
//import Home from "./home";
class Admin extends Component{
    render(){
        return(
            <Row className="container">
                <Col span={3} className="nav-left">
                    <Face></Face>
                    <NavLeft></NavLeft>
                </Col>
                <Col span={21} className="main">
                    <Head></Head>
                    <Row >
                        {this.props.children}
                    </Row>
                    <Footer></Footer>
                </Col>
            </Row>
        );
    }
}
export default Admin ;