import React, { useState } from 'react';
import Title from 'antd/lib/typography/Title';
import AuthContext from '../../context/auth-context';
import { ApolloProvider } from '@apollo/react-hooks';
import { useAppApolloClient } from '../../config/apolloClient';
import LoginPage from '../../pages/Login';
import RegisterPage from '../../pages/Register';
import { NavLink, Switch, Route, Redirect, useLocation } from 'react-router-dom';
const { Layout, Menu, Avatar } = require("antd");

const { Header, Content } = Layout;

const AuthNavigation = props => {

    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);

    const login = (token, userId, tokenExpiration) => {
        setToken(token);
        setUserId(userId);
    };

    const logout = () => {
        setToken(null);
        setUserId(null);
    };

    return (
        <React.Fragment>
            <AuthContext.Provider
                value={{
                    token: token,
                    userId: userId,
                    login: login,
                    logout: logout
                }}
            >
                <ApolloProvider client={useAppApolloClient(token)}>
                    <Layout className="layout">
                        <Header style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ height: 64, cursor: 'pointer', flexDirection: "row", display: 'flex', alignItems: 'center' }} onClick={() => { console.log("Click homepage") }}>
                                <Avatar src="/fashion_logo.png" shape="square" />
                                <Title style={{ color: "white", paddingLeft: 10, paddingTop: 10 }} level={4}>Fashion Shop</Title>
                            </div>
                            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={useLocation().pathname!="/auth/register"?"1":"2"}>
                                <Menu.Item key="1">
                                    <NavLink to="/auth/login">Đăng nhập</NavLink>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <NavLink to="/auth/register">Đăng ký</NavLink>
                                </Menu.Item>
                            </Menu>
                        </Header>
                        <Content style={{ backgroundImage: "url('/background.jpeg')", backgroundSize: 'cover', display: "flex", flexDirection: 'row', justifyContent: 'center', alignItems: 'start', padding: '15px 0px', height: '94vh' }}>
                            <Switch>
                                {!token && <Route path="/auth/login" component={LoginPage}/>}
                                {!token && <Route path="/auth/register" component={RegisterPage}/>}
                                {!token && <Redirect to="/auth/login" exact/>}
                            </Switch>
                        </Content>
                    </Layout>
                </ApolloProvider>
            </AuthContext.Provider>
        </React.Fragment>
    );
}

export default AuthNavigation;