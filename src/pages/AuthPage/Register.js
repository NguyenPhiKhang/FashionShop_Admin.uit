import React, { useState } from 'react';

import './Auth.css';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { getIdPermissionQuery } from '../../network/queries';
import { accountRegisterMutation } from '../../network/mutations';
import { Spin, Form, Input, Button, Radio, } from 'antd';
import Title from 'antd/lib/typography/Title';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

const layout = {
    wrapperCol: { span: 24 },
};

function RegisterPage() {

    const history = useHistory();
    const [formControl] = Form.useForm();
    const [input, setInput] = useState({email: '', password: '', loading: false});

    const [getIdPermission] = useLazyQuery(getIdPermissionQuery, {
        onCompleted: (data)=>{
            console.log(input.email+" "+input.password);
            accountRegister({
                variables: {
                    email: input.email,
                    password: input.password,
                    permission_id: data.getIdPermission
                }
            });
        },
    });

    const [accountRegister] = useMutation(accountRegisterMutation, {
        onCompleted: (data) => {
            console.log("dataRegister: " + data.createAccount._id);
            setInput({loading: false});
            history.push("/auth/login");
        }, onError: (error) => {
            console.log("error mutation: " + error.message);
        }
    });

    const onFinish = (values) => {
        const permissionName = values.permission;

        if (values.email.trim().length === 0 || values.password.trim().length === 0 || permissionName.trim().length === 0) {
            return;
        }

        setInput({email: values.email, password: values.password, loading: true})

        getIdPermission({
            variables: {
                name: permissionName
            }
        });
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        (input.loading)?<Spin size="large"/>:
        <React.Fragment>
            <Form
                {...layout}
                name="basic"
                initialValues={{
                    permission: "Admin",
                    email: '',
                    password: '',
                    password_again: ''
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={{ backgroundColor: 'rgba(0,0,0, 0.4)', padding: 10, width: 300, borderRadius: 15, boxShadow: '2px 5px 10px white' }}
                form={formControl}
            >
                <Form.Item style={{ marginBottom: 0 }}>
                    <Title level={2} style={{ color: '#4190f7', textAlign: 'center' }}>Đăng Ký</Title>
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
                    <Input style={{ borderRadius: 20 }} prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Nhập email" />
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
                    <Input.Password style={{ borderRadius: 20 }} prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Nhập mật khẩu" />
                </Form.Item>

                <Form.Item
                    name="password_again"
                    rules={[
                        {
                            required: true,
                            message: 'Không được để trống!',
                        },
                    ]}
                    style={{ marginBottom: 10 }}
                >
                    <Input.Password style={{ borderRadius: 20 }} prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Nhập lại mật khẩu" />
                </Form.Item>

                <Form.Item name="permission">
                    <Radio.Group>
                        <Radio value="Admin" style={{ color: '#fff' }}>Admin</Radio>
                        <Radio value="User" style={{ color: '#fff' }}>User</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item {...layout} style={{ marginBottom: 10 }}>
                    <Button type="primary" htmlType="submit" block style={{ borderRadius: 20 }}>
                        Đăng ký
                    </Button>
                </Form.Item>
            </Form>
        </React.Fragment>
    );
}

export default RegisterPage;