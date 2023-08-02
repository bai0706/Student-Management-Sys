import React from 'react'
import { Route } from 'react-router-dom'
import SideMenu from '../../components/home/SideMenu' 
import { Layout } from 'antd'
import TopHeader from '../../components/home/TopHeader'
import Students from '../student/Students'
import Classes from '../classes/Classes'

function Home() {
  return (
    <Layout style={{
        minHeight: '100vh',
      }}>
        <TopHeader></TopHeader>
        <Layout>
            <SideMenu></SideMenu> 
             
              <Route path='/student' component={Students}/>
              <Route path='/classes' component={Classes}/>                
        </Layout>
        
    </Layout>
  )
}

export default Home
