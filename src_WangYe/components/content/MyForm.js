import React, { forwardRef } from "react"
import { Form, Input, Select, DatePicker} from "antd"
import locale from "antd/es/date-picker/locale/en_US";

const MyForm = forwardRef((props, ref) => {
    return (
        <Form ref={ref}
            name="wrap"
            labelCol={{ flex: '110px' }}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }}
            colon={false}
            style={{ maxWidth: 600 }}     
        >
            <Form.Item label="姓名" name="name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
        
            <Form.Item label="性别" name="gender" rules={[{ required: true }]}>
                <Select options={[{value:'男', label:'男'}, {value:'女', label:'女'}]}/>
            </Form.Item>

            <Form.Item label="出生日期" name="birthday" rules={[{ required: true }]}>
                <DatePicker locale={locale} format={"YYYY-MM-DD"}/>
            </Form.Item>

            <Form.Item label="年级" name="grade" rules={[{ required: true }]}>
                <Select options={[{value:'一年级', label:'一年级'}, 
                            {value:'二年级', label:'二年级'},
                            {value:'三年级', label:'三年级'},
                            {value:'四年级', label:'四年级'},
                            {value:'五年级', label:'五年级'},
                            {value:'六年级', label:'六年级'}]}/>
            </Form.Item>

            <Form.Item label="班级" name="classes" rules={[{ required: true }]}>
                <Select options={[{value:'一班', label:'一班'}, 
                            {value:'二班', label:'二班'},
                            {value:'三班', label:'三班'},
                            {value:'四班', label:'四班'}]}/>
            </Form.Item>

            <Form.Item label="地址" name="address" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item label="家长姓名" name="parentName" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item label="家长手机" name="parentPhoneNum" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
        </Form>
    )
});

export default MyForm;

