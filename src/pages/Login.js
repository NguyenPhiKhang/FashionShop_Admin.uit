import React, { useState, useContext, useEffect } from 'react';

import './Auth.css';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { userLoginQuery } from '../network/queries';
import { userRegisterMutation } from '../network/mutations';
import authContext from '../context/auth-context';
import { Spin, Form, Input, Button, Checkbox, } from 'antd';
import Title from 'antd/lib/typography/Title';
import { LockOutlined, MailOutlined } from '@ant-design/icons';

const layout = {
  wrapperCol: { span: 24 },
};

function LoginPage() {

  const [isLogin, setIsLogin] = useState(true);
  const [formControl] = Form.useForm();
  const context = useContext(authContext);

  const [userLogin, { loading, data, error }] = useLazyQuery(userLoginQuery);
  const [userRegister] = useMutation(userRegisterMutation, {
    onCompleted: (data) => {
      console.log("dataRegister: " + data.createUser._id);
      setIsLogin(true);
    }, onError: (error) => {
      console.log("error mutation: " + error.message);
    }
  });

  useEffect(() => {
    formControl.setFieldsValue({
      username: '',
      password: ''
    });
  }, []);

  const onFinish = values => {
    console.log('Success:', values);
    const email = values.email;
    const password = values.password;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }
    userLogin({
      variables: {
        email: email,
        password: password
      }
    });
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  // function switchModeHandler() {
  //   setIsLogin(!isLogin);
  // };

  if (data) {
    context.login(
      data.login.token,
      data.login.userId,
      data.login.tokenExpiration
    );
    console.log(data);
  }

  if (error) {
    console.log("error: " + error.message);
  }

  if (loading) {
    console.log("Loading: " + loading);
  }

  return (
    loading ? <Spin size="large"/> :
      <React.Fragment>
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={{ backgroundColor: 'rgba(0,0,0, 0.4)', padding: 10, width: 300, borderRadius: 15, boxShadow: '2px 5px 10px white' }}
          form={formControl}
        >
          <Form.Item style={{ marginBottom: 0 }}>
            <Title level={2} style={{ color: '#4190f7', textAlign: 'center' }}>Đăng Nhập</Title>
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Không được để trống!',
              },
            ]}
            style={{ marginBottom: 10 }}
          >
            <Input style={{ borderRadius: 20 }} prefix={<MailOutlined className="site-form-item-icon" />} placeholder="email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Không được để trống!',
              },
            ]}
            style={{ marginBottom: 10 }}
          >
            <Input.Password style={{ borderRadius: 20 }} prefix={<LockOutlined className="site-form-item-icon" />} placeholder="password" />
          </Form.Item>

          <Form.Item {...layout} name="remember" valuePropName="checked" style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
            <Checkbox style={{ color: 'white' }}>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...layout} style={{ marginBottom: 10 }}>
            <Button type="primary" htmlType="submit" block style={{ borderRadius: 20 }}>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </React.Fragment>
  );
}

export default LoginPage;