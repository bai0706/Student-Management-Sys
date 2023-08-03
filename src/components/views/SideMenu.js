import React, { Component } from 'react';
import { Menu } from 'antd';
import {Link} from 'react-router-dom'
import img01 from "../../img/img01.jpg";
import MenuConfig from '../config/menuConfig'

class SideMenu extends Component{

    // 动态创建侧边栏，数据是变化的，不能写死
    state={
        menuTree:[],
    };

    // renderWillMount 组件将要挂载前
    // 该生命周期方法在组件挂载后立即调用。一般用在进入页面后，数据初始化
    componentDidMount(){
        const menuTree = this.loadMenu(MenuConfig);
        this.setState({menuTree});
    }
    loadMenu=(data)=>{
        return Array.from(data).map((item)=>{
            if(item.children){
                return (
                    <Menu.SubMenu title={item.title} key={item.key} icon={item.icon}>
                        {this.loadMenu(item.children)}
                    </Menu.SubMenu>
                );
            }
            return (
                <Menu.Item key={item.key}  icon={item.icon}>
                    <Link to={item.key}>{item.title}</Link>
                </Menu.Item>
            );
        });
    };

    render(){
        return(
            <div>
                <li>
                    <img style={{height: 80,  width: 80}} src = {img01} ></img>
                </li>
                <li>
                     <Menu theme='dark' mode='inline'>{this.state.menuTree}</Menu>
                </li>
            </div>
        );    
    }
}
export default SideMenu;

