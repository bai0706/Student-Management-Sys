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
        key: "/student",
        icon: <UserOutlined />,
        children :[
            {
                title:"学生列表",
                key: "/student/list",   
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
                key: "/class/table",
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
