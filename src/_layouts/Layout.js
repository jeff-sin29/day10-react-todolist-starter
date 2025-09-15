import React, { useState } from 'react';
import { AppstoreOutlined, HomeOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu, Layout } from 'antd';
import { NavLink, Outlet} from 'react-router-dom';

const { Header, Content, Footer } = Layout;

export function DefaultLayout() {
    const items = [
    {
        label: <NavLink to = '/'>Home</NavLink>,
        key: '/',
        icon: <HomeOutlined />,
    },
    {
        label: <NavLink to = '/todos'>Todo list</NavLink>,
        key: '/todos',
        icon: <AppstoreOutlined />,
    },
    {
        label: <NavLink to='/about'>About</NavLink>,
        key: '/about',
        icon: <SettingOutlined />,
    },
    ];
    
    const [current, setCurrent] = useState('/Home');
    const onClick = e => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return <>
        <Header>
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" theme= "dark" items={items} />
        </Header>
        <Content>
            <Outlet></Outlet>
        </Content>
    </>
    ;
}


// const items = [
//   {
//     label: 'Home',
//     key: '/',
//     icon: <MailOutlined />,
//   },
//   {
//     label: 'Todo List',
//     key: '/todos',
//     icon: <AppstoreOutlined />,
//   },
//   {
//     label: 'About',
//     key: '/about',
//     icon: <SettingOutlined />,
//   },
// ];

// const Layout = ({ children }) => {
//   const [current, setCurrent] = useState('/');
//   const navigate = useNavigate();

//   const onClick = (e) => {
//     setCurrent(e.key);
//     navigate(e.key);
//   };

//   return (
//     <>
//       <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
//       <div style={{ padding: '20px' }}>{children}</div>
//     </>
//   );
// };

// export default Layout;