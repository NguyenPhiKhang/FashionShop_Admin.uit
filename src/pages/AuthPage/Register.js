import React, { useState } from 'react';

import './Auth.css';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { getPermissionQuery } from '../../network/queries';
import { userRegisterMutation } from '../../network/mutations';
// import authContext from '../../context/auth-context';
import { Spin, Form, Input, Button, Radio, } from 'antd';
import Title from 'antd/lib/typography/Title';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

const layout = {
    wrapperCol: { span: 24 },
};

function RegisterPage() {

    const [formControl] = Form.useForm();
    // const context = useContext(authContext);
    const [permission, setPermission] = useState('');
    const history = useHistory();

    const [userRegister] = useMutation(userRegisterMutation, {
        onCompleted: (data) => {
            console.log("dataRegister: " + data.createUser._id);
        }, onError: (error) => {
            console.log("error mutation: " + error.message);
        }
    });

    const { loading: loadingPermission, data: dataPermission } = useQuery(getPermissionQuery);

    // useEffect(() => {
    //     formControl.setFieldsValue({
    //         permission: permission
    //     });
    // }, [permission]);

    const onFinish = async (values) => {
        const email = values.email;
        const password = values.password;
        const permissionId = values.permission;

        if (email.trim().length === 0 || password.trim().length === 0 || permissionId.trim().length === 0) {
            return;
        }

        await userRegister({
            variables: {
                email: email,
                password: password,
                permission_id: permissionId
            }
        });
        history.push("/auth/login");
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        // loading ? <Spin size="large" /> :
        <React.Fragment>
            <Form
                {...layout}
                name="basic"
                initialValues={{
                    permission: permission,
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
                    {
                        (!loadingPermission && dataPermission) ?
                            <Radio.Group>
                                {
                                    permission.toString() !== dataPermission.getPermission[0]._id.toString() ? setPermission(dataPermission.getPermission[0]._id) :
                                        dataPermission.getPermission.map(rs => {
                                            return <Radio key={rs._id} value={rs._id} style={{ color: '#fff' }}>{rs.name}</Radio>
                                        })
                                }
                            </Radio.Group> : <Spin size="large" />
                    }
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