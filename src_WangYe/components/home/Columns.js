import React from 'react'
import {Table} from 'antd'
import {
    DeleteOutlined,
    EditOutlined
  } from '@ant-design/icons';


function MiddleTable() {
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
    const handleUpdate = async(item) => {
        await setIsUpdateVisible(true)
        // console.log("dsajf" + item)
        const date = item.birthday;
        item.birthday = moment(date)
        updateForm.current.setFieldsValue(item)
        item.birthday = moment(date).format("YYYY-MM-DD")
        setCurrent(item)
    }
    
    return (
        <Table columns={columns}></Table>
    )   
}

export default MiddleTable