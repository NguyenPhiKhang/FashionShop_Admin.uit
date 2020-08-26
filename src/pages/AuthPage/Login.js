import React, { useContext } from 'react';

import './Auth.css';
import { useLazyQuery } from '@apollo/react-hooks';
import { accountLoginQuery } from '../../network/queries';
import authContext from '../../context/auth-context';
import { Spin, Form, Input, Button, Checkbox, } from 'antd';
import Title from 'antd/lib/typography/Title';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import swal from 'sweetalert';

const layout = {
  wrapperCol: { span: 24 },
};

function LoginPage() {
  const [formControl] = Form.useForm();
  const context = useContext(authContext);

  const [accountLogin, { loading }] = useLazyQuery(accountLoginQuery, {
    onCompleted: async (data) => {
      if (data.login.account.permission.name !== "Admin") {
        await swal("Đăng nhập không thành công", "Bạn không có quyền Admin", "error");
        formControl.setFieldsValue({
          password: ''
        });
        return;
      }
      await swal("Đăng nhập thành công", "Nhấn để tiếp tục", "success");
      context.login(
        data.login.account.person.name,
        data.login.token,
        data.login.account._id,
        data.login.tokenExpiration
      );
    },
    onError: (error) => {
      console.log("error: " + error.message);
      swal("Đăng nhập không thành công", "Email hoặc mật khẩu không đúng", "error");
      formControl.setFieldsValue({
        password: ''
      });
    }
  });

  const onFinish = values => {
    console.log('Success:', values);
    const email = values.email;
    const password = values.password;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }
    accountLogin({
      variables: {
        email: email,
        password: password
      }
    });
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  if (loading) {
    console.log("Loading: " + loading);
  }

  return (
    loading ? <Spin size="large" /> :
      <React.Fragment>
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
            email: 'admin@123.gmail.com',
            password: 'admin@123',
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
                type: 'email',
                message: 'Không đúng định dạng email!'
              },
              {
                required: true,
                message: "Email không được để trống!"
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
                message: "Mật khẩu không được để trống!"
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