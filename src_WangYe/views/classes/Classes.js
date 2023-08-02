import React, { useState, useEffect, useRef } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  SearchOutlined
} from '@ant-design/icons';
import { Breadcrumb, Button, Layout, Input, Select,Table, theme, Modal, } from 'antd';
import axios from 'axios';
import moment from 'moment/moment';
import '../../App.css'

const { Content, Footer} = Layout;
const { confirm } = Modal;
const { Search } = Input;

function Classes () {
  const [dataSource, setDataSource] = useState([]);
  const [isUpdateVisible, setIsUpdateVisible] = useState(false);
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [current, setCurrent] = useState(null);
  const addForm = useRef(null);
  const updateForm = useRef(null);

  const columns = [
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
      title: '班主任',
      dataIndex: 'masterTeacher',
      render: (masterTeacher) =>{
        return <b>{masterTeacher}</b>
      }
    },
    {
      title: '语文老师',
      dataIndex: 'ChineseTeacher',
      render: (ChineseTeacher) =>{
        return <b>{ChineseTeacher}</b>
      }
    },
    {
      title: '数学老师',
      dataIndex: 'mathTeacher',
      render: (mathTeacher) =>{
        return <b>{mathTeacher}</b>
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
    axios.get("http://localhost:3000/classes").then(res=>{
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
    axios.delete(`http://localhost:3000/classes/${item.id}`)
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
       axios.patch(`http://localhost:3000/classes/${current.id}`, value)
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
              <label>
                <Select style={{width: 200,}} options={[{value:'一年级', label:'一年级'}, 
                              {value:'二年级', label:'二年级'},
                              {value:'三年级', label:'三年级'},
                              {value:'四年级', label:'四年级'},
                              {value:'五年级', label:'五年级'},
                              {value:'六年级', label:'六年级'}]}>
                </Select> 
                <Button icon={<SearchOutlined/>}></Button>
              </label>
              <label>
                <Select style={{width: 200,}} options={[{value:'一班', label:'一班'}, 
                            {value:'二班', label:'二班'},
                            {value:'三班', label:'三班'},
                            {value:'四班', label:'四班'}]}>
                </Select> 
                <Button icon={<SearchOutlined/>}></Button>
              </label>
              <label>
                <Input style={{width: 200,}} ></Input> 
                <Button icon={<SearchOutlined/>}></Button>
              </label>
           
             
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