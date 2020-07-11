import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown } from 'antd';
import Title from 'antd/lib/typography/Title';

import './MainNavigation.css';
import { Route, Switch, NavLink, Redirect } from 'react-router-dom';
import { pageRoutes } from '../config/routers';
import AddProduct from '../pages/ProductPage/addProduct';
import { DownOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

const MainNavigation = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => { setCollapsed(!collapsed); }
  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
          Thông tin
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
          Đăng xuất
        </a>
      </Menu.Item>
    </Menu>
  );
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
      <Layout
        style={{ marginLeft: collapsed ? 80 : 200 }}
      >
        {/* <div style={{width: '100%'}}> */}
        <Header style={{ paddingLeft: 0, position: 'fixed', width: '100%', boxShadow: '0 4px #f0f1f2', zIndex: 2, backgroundColor: '#fff', display: 'flex', flexDirection: 'row-reverse', paddingRight: collapsed ? 100 : 220}}>
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            <Avatar style={{ backgroundColor: 'orange', verticalAlign: 'middle', marginRight: 8 }} size="large" gap={4}>
        AD
      </Avatar>
              Admin <DownOutlined />
            </a>
          </Dropdown>
        </Header>
        {/* </div> */}
        <Content style={{ overflow: 'initial', paddingTop: 60 }}>
          <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
            <Switch>
              {
                pageRoutes.map((data, index) => {
                  return (
                    <Route key={index} path={data.path} component={data.component} exact />
                  );
                })
              }
              <Route key="addPro" path="/products/AddProduct" component={AddProduct} />
              <Redirect to="/products" exact />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}

export default MainNavigation;