import React, { useState } from 'react';
import { Layout, Menu, Avatar } from 'antd';
import Title from 'antd/lib/typography/Title';

import './MainNavigation.css';
import { Route, Switch, NavLink, Redirect } from 'react-router-dom';
import pageRoutes from '../config/routers';

const { Header, Content, Footer, Sider } = Layout;

const MainNavigation = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => { setCollapsed(!collapsed); }
  // const returnedArray = Array.from(pageRoutes);
  // console.log(returnedArray);
  return (
    <Layout>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
        breakpoint="lg"
        collapsedWidth="80"
        onBreakpoint={broken => {
          console.log(broken);
        }}
        collapsible
        collapsed={collapsed}
        onCollapse={toggle}
      >
        <div style={{ height: 64, cursor: 'pointer', flexDirection: "row", display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#09223D' }} onClick={() => { console.log("Click homepage") }}>
          <Avatar src="/assets/fashion_logo.png" shape="square" />
          {!collapsed ? <Title style={{ color: "white", paddingLeft: 10 }} level={4}>Fashion Shop</Title> : null}
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
          {
            pageRoutes.map((data, index) => {
              return (
                <Menu.Item key={index} icon={data.icon}>
                  <NavLink to={data.link}>
                    {data.name}
                  </NavLink>
                </Menu.Item>
              );
            })}
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: collapsed ? 80 : 200 }}>
        <Header className="site-layout-background" style={{ paddingLeft: 0, position: 'fixed', width: '100vw', boxShadow: '0 4px #f0f1f2' }} />
        <Content style={{ margin: '16px 16px 0', overflow: 'initial', paddingTop: 80 }}>
          <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
            <Switch>
              {
                pageRoutes.map((data, index) => {
                  return (
                    <Route key={index} path={data.path} component={data.component} exact />
                  );
                })
              }
              <Redirect to="/table" exact />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}

export default MainNavigation;