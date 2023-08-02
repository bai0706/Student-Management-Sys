import React from 'react'
import head from '../../img/head.jpg'
import {Layout} from 'antd'
const {Header} = Layout;

function TopHeader() {
  return (
    <Header
        style={{
        display: 'flex',
        alignItems: 'center',
        }}
    >
        <div className="demo-logo">
          <img className='head-img' src={head} alt="head"/>
        </div>
        {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} /> */}
      </Header>
  )
}

export default TopHeader
