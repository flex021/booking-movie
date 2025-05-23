import { Fragment, useEffect, useState } from "react";
import { Route } from "react-router"
import { USER_LOGIN } from "../../util/settings/config";
import { Redirect, NavLink } from "react-router-dom/cjs/react-router-dom.min";
import Swal from 'sweetalert2';
import {
    DesktopOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    HomeOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useSelector } from "react-redux";
import { history } from "../../App";




export const AdminTemplate = (props) => { //path, exact, component


    const { Header, Sider, Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);
    function getItem(label, key, icon, children) {
        return {
            key,
            icon,
            children,
            label,
        };
    }
    const items = [
        getItem(
            <NavLink to={`/admin/users`}>Users</NavLink>, '2'
            , <UserOutlined />),
        getItem(<NavLink to={`/admin/films`}>Films</NavLink>, '1', <DesktopOutlined />),
    ];
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    })

    const { Component, ...restRoute } = props;

    if (!localStorage.getItem(USER_LOGIN)) {
        Swal.fire({
            title: "Đăng nhập để vào trang này!",
            icon: "warning"
        });
        return <Redirect to='/' />
    }

    if (userLogin.maLoaiNguoiDung !== 'QuanTri') {
        Swal.fire({
            title: "Chỉ admin mới được vào trang này!",
            icon: "warning"
        });
        return <Redirect to='/' />
    }

    return <Route {...restRoute} render={(propsRoute) => { // props.location, props.history, props.match
        return <Fragment>
            <Layout
                style={{
                    minHeight: '100vh',
                }}
            >
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div className="demo-logo-vertical" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
                </Sider>
                <Layout>
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                        }}
                    >
                        <div className="px-4" style={{ fontSize: '17px' }}>
                            <button className="inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md" onClick={() => {
                                history.push('/')
                            }}><HomeOutlined className='mr-2' /> Home</button>

                            <a href="/profile" className="text-right font-medium float-right hover:text-indigo-500 px-4">{userLogin.hoTen}
                                <span className="rounded-full bg-red-200 py-2 px-5 ml-2 text-2xl">{userLogin.hoTen.substr(0, 1)}</span>
                            </a>
                        </div>
                    </Header>
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
                        </Breadcrumb>
                        <div
                            style={{
                                padding: 24,
                                minHeight: 600,
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            <Component {...propsRoute} />
                        </div>
                    </Content>

                </Layout>
            </Layout>
        </Fragment>

    }} />
}