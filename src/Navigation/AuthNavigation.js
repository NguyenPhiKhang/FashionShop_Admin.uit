import React, { useEffect, useState } from 'react';
import Title from 'antd/lib/typography/Title';
import LoginPage from '../pages/AuthPage/Login';
import RegisterPage from '../pages/AuthPage/Register';
import { NavLink, Switch, Route, useLocation, Redirect } from 'react-router-dom';
const { Layout, Menu, Avatar } = require("antd");

const { Header, Content } = Layout;

const AuthNavigation = () => {

    const location = useLocation();
    const [pathname, setPathname] = useState(null);

    useEffect(()=>{
        setPathname(location.pathname);
    },[location.pathname])

    return (
        <Layout className="layout">
            <Header style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ height: 64, cursor: 'pointer', flexDirection: "row", display: 'flex', alignItems: 'center' }} onClick={() => { console.log("Click homepage") }}>
                    <Avatar src="/assets/fashion_logo.png" shape="square" />
                    <Title style={{ color: "white", paddingLeft: 10, paddingTop: 10 }} level={4}>Fashion Shop</Title>
                </div>
                <Menu theme="dark" mode="horizontal" selectedKeys={pathname == "/auth/login" ? "1" : pathname == "/auth/register" ? "2" : ""}>
                    <Menu.Item key="1">
                        <NavLink to="/auth/login">Đăng nhập</NavLink>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <NavLink to="/auth/register">Đăng ký</NavLink>
                    </Menu.Item>
                </Menu>
            </Header>
            <Content style={{ backgroundImage: "url('/assets/background.jpeg')", backgroundSize: 'cover', display: "flex", flexDirection: 'row', justifyContent: 'center', alignItems: 'start', padding: '15px 0px', height: '94vh' }}>
                <Switch>
                    <Route path="/auth/login" component={LoginPage} exact/>
                    <Route path="/auth/register" component={RegisterPage} exact/>
                    <Redirect to="/auth/login" exact />
                </Switch>
            </Content>
        </Layout>
    );
}

export default AuthNavigation;