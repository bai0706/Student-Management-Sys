import { Form, Input, Select } from 'antd';
import React, {forwardRef} from 'react'

const SearchForm = forwardRef((props, ref) =>{
  return (
    <div>
        <Form ref={ref} style={{textAlign:'center'}}>
            <Form.Item style={{display:'inline-flex', marginRight:40}} label="年级" name="grade">
                <Select style={{width: 200,}} options={[{value:'一年级', label:'一年级'}, 
                                  {value:'二年级', label:'二年级'},
                                  {value:'三年级', label:'三年级'},
                                  {value:'四年级', label:'四年级'},
                                  {value:'五年级', label:'五年级'},
                                  {value:'六年级', label:'六年级'}]}>
                </Select> 
                  
            </Form.Item>
            <Form.Item style={{display:'inline-flex', marginRight:40}} label="班级" name="classes">
                <Select style={{width: 200,}} options={[{value:'一班', label:'一班'}, 
                                {value:'二班', label:'二班'},
                                {value:'三班', label:'三班'},
                                {value:'四班', label:'四班'}]}>
                </Select>             
            </Form.Item>
            <Form.Item style={{display:'inline-flex'}} label="教师" name="teacher">
                <Input style={{width: 200,}} ></Input> 
            </Form.Item>
        </Form>
    </div>
  )
});

export default SearchForm