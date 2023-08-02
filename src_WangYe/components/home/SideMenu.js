import React, { useState }from 'react'
import {Layout, Menu} from 'antd'
import { UserOutlined, TeamOutlined} from '@ant-design/icons'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
const { Sider } = Layout;
const {SubMenu} = Menu;

const menuList = [
  {
    key:"/student",
    title:"学生信息管理",
    children:[{
      key:"/student/list",
      title:"学生列表",
    } ]
  },
  {
    key:"/classes",
    title:"班级信息管理",
    children:[{
      key:"/classes/list",
      title:"班级列表",
    } ]
  }]

function SideMenu(props) {
  const renderMenu = (menuList) =>{
    return menuList.map(item=>{
      if (item.children){
        return <SubMenu key={item.key} title={item.title}>
          {renderMenu(item.children)}
        </SubMenu>
      }
      return <Menu.Item key={item.key} onClick={()=>{
        props.history.push(item.key)
      }}>{item.title}</Menu.Item>
    })
  }
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          {renderMenu(menuList)}
        </Menu>
    </Sider>
  )
}

export default withRouter(SideMenu)
