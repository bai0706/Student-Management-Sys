import React, { useState, useEffect, useRef } from 'react';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled
} from '@ant-design/icons';
import { Breadcrumb, Button, Layout, Table, theme, Modal, } from 'antd';
import axios from 'axios';
import moment from 'moment/moment';
import '../../App.css'
import MyForm from '../../components/content/MyForm';

const { Content, Footer} = Layout;
const { confirm } = Modal;

function Students () {
  const [dataSource, setDataSource] = useState([]);
  const [isUpdateVisible, setIsUpdateVisible] = useState(false);
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [current, setCurrent] = useState(null);
  const addForm = useRef(null);
  const updateForm = useRef(null);

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      render: (name) =>{
        return <b>{name}</b>
      }
    },
    {
      title: '年龄',
      dataIndex: 'birthday',
      render: (birthday) =>{
        return <b>{birthday}</b>
      }
    },
    {
      title: '性别',
      dataIndex: 'gender',
      render: (gender) =>{
        return <b>{gender}</b>
      }
    },
    {
      title: '年级',
      dataIndex: 'grade',
      render: (grade) =>{
        return <b>{grade}</b>
      }
    },
    {
      title: '班级',
      dataIndex: 'classes',
      render: (classes) =>{
        return <b>{classes}</b>
      }
    },
    {
      title: '住址',
      dataIndex: 'address',
      render: (gender) =>{
        return <b>{gender}</b>
      }
    },
    {
      title: '家长姓名',
      dataIndex: 'parentName',
      render: (parentName) =>{
        return <b>{parentName}</b>
      }
    },
    {
      title: '家长手机号',
      dataIndex: 'parentPhoneNum',
      render: (parentPhoneNum) =>{
        return <b>{parentPhoneNum}</b>
      }
    },
    {
      title: '操作',
      render: (item) =>{
        return <div>
          <Button danger shape='circle' icon={<DeleteOutlined/>} 
          onClick={()=>showDeleteConfirm(item)}/>
          <Button type='primary' shape='circle' icon={<EditOutlined/>}
          onClick={()=>handleUpdate(item)} />
        </div>
      }  
    }
  ]
  useEffect(()=>{
    axios.get("http://localhost:3000/student").then(res=>{
      setDataSource(res.data)
    })
  },[])

  const showDeleteConfirm = (item) => {
    confirm({
      title: '你确定要删除这条数据吗?',
      icon: <ExclamationCircleFilled />,
      content: '',
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk() {
        deleteItem(item);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const deleteItem = (item) => {
    setDataSource(dataSource.filter(data=>data.id!==item.id))
    axios.delete(`http://localhost:3000/student/${item.id}`)
  }

  const updateOk = () =>{
    updateForm.current.validateFields().then(value => {
      setIsUpdateVisible(false)
      console.log(value)
      const date = value.birthday
      value.birthday = date.format('YYYY-MM-DD')
      console.log(value)
       setDataSource(dataSource.map(item=>{
         return item.data
       }))
       axios.patch(`http://localhost:3000/student/${current.id}`, value)
    })
    
  }

  const handleCancle = () =>{
    setIsUpdateVisible(false)
    setIsAddVisible(false)
  }

  const handlePost = () => {
    addForm.current.validateFields().then(value => {
      setIsAddVisible(false)
      console.log(value)
      axios.post("http://localhost:3000/student",{...value,})
    }).catch(err => {
      console.log(err)
    })
    
  }

  const handleUpdate = async(item) => {
    await setIsUpdateVisible(true)
    // console.log("dsajf" + item)
    const date = item.birthday;
    item.birthday = moment(date)
    updateForm.current.setFieldsValue(item)
    item.birthday = moment(date).format("YYYY-MM-DD")
    setCurrent(item)
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
                <Breadcrumb.Item>学生信息列表</Breadcrumb.Item>
                <Breadcrumb.Item>学生列表</Breadcrumb.Item>
            </Breadcrumb>
            <div
                style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                }}
            >
              <Button onClick={() =>{setIsAddVisible(true)}}>
                新增
              </Button>
              <Button>导出</Button>
              <Modal title="添加学生信息" open={isAddVisible} onOk={() => handlePost()} onCancel={() => handleCancle()}>
                  <MyForm ref={addForm}/>
              </Modal>
              <Table dataSource={dataSource} columns={columns}></Table>
              <Modal title="修改学生信息" open={isUpdateVisible} onOk={() => updateOk()} onCancel={() => handleCancle()}>
                  <MyForm ref={updateForm}/>
              </Modal>
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
export default Students;