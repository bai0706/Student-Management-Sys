import {
    UserOutlined,
    SolutionOutlined,
    ReadOutlined,
    BankOutlined,
    FileTextOutlined,
  } from '@ant-design/icons';

const menuList = [
    {
        title:"首页",
        key: "/",
        icon:<BankOutlined />,
        
    },
    {
        title:"学生信息管理",
        key: "/admin/student",
        icon: <UserOutlined />,
        children :[
            {
                title:"学生列表",
                key: "/admin/student/list",   
            },
        ],
    },
    {
        title:"教师信息管理",
        key: "3",
        icon:<SolutionOutlined />,
    },
    {
        title:"班级信息管理",
        key: "/admin/class",
        icon:<ReadOutlined />,    
        children:[
            {
                title:"班级列表",
                key: "/admin/class/table",
            },
        ],
    },
    {
        title:"成绩统计",
        key: "5",
        icon:<FileTextOutlined />,
    },
];

export default menuList;
