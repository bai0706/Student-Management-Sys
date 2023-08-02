import React, { useState, useEffect, useRef } from 'react';
import { Breadcrumb, Button, Layout, Table, theme } from 'antd';
import axios from 'axios';
import SearchForm from '../forms/SearchForm';

const { Content, Footer} = Layout;


function Classes () {
  const [dataSource, setDataSource] = useState([]);
  const [recordData, setRecordData] = useState([]);
  var mySearchForm= useRef(null);

  const columns = [
    {
      title: '年级',
      dataIndex: 'grade',
    },
    {
      title: '班级',
      dataIndex: 'classes',
    },
    {
      title: '班主任',
      dataIndex: 'masterTeacher',
    },
    {
      title: '语文老师',
      dataIndex: 'ChineseTeacher',
    },
    {
      title: '数学老师',
      dataIndex: 'mathTeacher',
    }
  ]
  useEffect(()=>{
    axios.get("http://localhost:3000/classes").then(res=>{
      setDataSource(res.data)
    })
  },[])

  const handleSearch = () =>{
    setRecordData(dataSource)
    mySearchForm.current.validateFields().then(value =>{
      console.log(value)
      setDataSource(dataSource.filter(data => (typeof(value.grade))==="undefined" ? true : data.grade === value.grade)
      .filter(data => (typeof(value.classes)) === 'undefined' ? true : data.classes === value.classes)
      .filter(data => (typeof(value.teacher)) === 'undefined' ? true : data.masterTeacher.match(new RegExp(value.teacher))))
    })
  }

  const handleClear = () =>{
    console.log(mySearchForm.current)
    const nameList = ["grade", "classes", "teacher"]
    mySearchForm.current.resetFields(nameList)
    setDataSource(recordData.length === 0 ? dataSource : recordData)
    setRecordData([])
  }

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
   
        <Layout>
            <Content
            style={{
                margin: '0 16px',
            }}
            >
            <Breadcrumb
                style={{
                margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>班级信息列表</Breadcrumb.Item>
                <Breadcrumb.Item>班级列表</Breadcrumb.Item>
            </Breadcrumb>
            <div
                style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                }}
            >
              <SearchForm ref={mySearchForm}></SearchForm>
              
              <div style={{textAlign:'center', marginBottom:20}}>
                <Button style={{marginRight:20}} type="primary" onClick={() => handleSearch()}>搜索</Button>
                <Button onClick={() => handleClear()}>清除</Button>
              </div>
             
              <Table dataSource={dataSource} columns={columns}></Table>
            </div>
            </Content>
            <Footer
            style={{
                textAlign: 'center',
            }}
            >
            Ant Design ©2023 Created by Ant UED
            </Footer>
        </Layout>
  );
};
export default Classes;