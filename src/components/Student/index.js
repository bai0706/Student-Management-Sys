import React, { Children, useEffect, useRef, useState } from 'react';
import { Button,Breadcrumb, theme, Table,Layout, Space, Modal  } from 'antd';
import axios from 'axios';
import MyForm from '../myForm';
import moment from 'moment';


  const { Content, Footer} = Layout;
  const { confirm } = Modal;
  

// 展示列表并删除数据
export default function StudentList(){

  const [dataSource, setDataSource] = useState([]);
  const [isUpdateVisible, setIsUpdateVisible] = useState(false)
  const [isAddVisible, setIsAddVisible] = useState(false);
  const addForm = useRef(null);
  const updateForm = useRef(null)
  const [current, setCurrent] = useState(null)

   
    // 展示数据
    useEffect(() => {
      axios.get('http://localhost:8000/StudentList').then(
        res => {
          setDataSource(res.data)
        }
      )
    }, [])

      
    const columns = [
      {
        title:"姓名", dataIndex:"name", key:"name",
      },
      
      {title:"详细信息",children:[
        {
          title: '年龄',
          dataIndex: "birthday",key: "birthday",
          sorter: (a, b) => moment(a.birthday) - moment(b.birthday),
          render:(birthday)=>{
            return moment(moment().format("YYYY-MM-DD")).diff(moment(birthday),'years')
          }
        },
        {
          title:"性别", dataIndex:"gender", key:"gender"
        },
        {
          title:"年级", dataIndex:"grade", key:"grade"
        },
        {
          title:"班级", dataIndex:"classes", key:"classes"
        },
        {
          title: '住址', dataIndex: 'address',key:"address"
        },
      ],},
      {
        title:"家长信息",children:[
          {
            title:"家长姓名", dataIndex:"parentName", key:"parentName"
          },
          {
            title:"家长手机号", dataIndex:"parentPhoneNum", key:"parentPhoneNum"
          },
        ]
      },
      {
        title: '操作',
        render: (item) => {
          return <Space size="middle">
            <Button shape="primary" onClick={()=>handleUpdate(item)} >修改</Button>
            <Button shape="primary" onClick={()=>confirmMethod(item)} >删除</Button>
          </Space>
        }
      }
    ];

    const confirmMethod = (item) => {
      confirm({
          title: '你确定要删除?',
          onOk() {
              deleteMethod(item)
          },
          onCancel() {
          },
      });
    }

    const handleCancle = () =>{
      setIsUpdateVisible(false)
      setIsAddVisible(false)
    }

  //删除
    const deleteMethod = (item) => {
        setDataSource(dataSource.filter(data=>data.id!==item.id))
        axios.delete(`http://localhost:8000/StudentList/${item.id}`)
    }

    const addFormOK = () => {
      addForm.current.validateFields().then(value => {
        setIsAddVisible(false)
        console.log(value)
        axios.post("http://localhost:8000/StudentList",{...value,})
        window.location.reload();
      }).catch(err => {
        console.log(err)
      })
      
    }

    // 修改用户
    const updateOk = () =>{
      updateForm.current.validateFields().then(value => {
        setIsUpdateVisible(false)
        const date = value.birthday
        value.birthday = date.format('YYYY-MM-DD')
        console.log(value)
         setDataSource(dataSource.map(item=>{
           return item.data
         }))
         axios.patch(`http://localhost:8000/StudentList/${current.id}`, value)
         window.location.reload();
      })
    }

    const handleUpdate = async(item) => {
      console.log(item.name)

      await setIsUpdateVisible(true)
      const date = item.birthday;
      item.birthday = moment(date)
      updateForm.current.setFieldsValue(item)
      item.birthday = moment(date).format("YYYY-MM-DD")
      setCurrent(item)
    }


    // 导出db文件为txt
    const handleConvertToTxt = () => {
  
      // Convert the JSON data to a string
      const jsonString = JSON.stringify(dataSource, null, 2);
  
      // Create a new Blob with the content
      const blob = new Blob([jsonString], { type: 'text/plain' });
  
      // Create a new anchor element to download the file
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `file.txt`;
      a.click();
  
      // Release the object URL to free up resources
      URL.revokeObjectURL(a.href);
    };

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
            
            <Button className='button-style' style={{marginRight:15,marginLeft:-1300,marginBottom:20}} type="primary" onClick={() =>{setIsAddVisible(true)}}>
              新增
            </Button>
            <Button className='button-style' type="primary" onClick={() =>{handleConvertToTxt(true)}}>导出</Button>
            <Modal title="添加学生信息" open={isAddVisible} onOk={() => addFormOK()} onCancel={() => handleCancle()}>
                <MyForm ref={addForm}/>
            </Modal>
            <Table dataSource={dataSource} columns={columns}  pagination={{ pageSize: 500, }} scroll={{ y: 300, }}></Table>
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
}

