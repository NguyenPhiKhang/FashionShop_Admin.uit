import {
    UserOutlined,
    UploadOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';

import React from 'react';
import TableRedash from '../pages/table/index';
import Chart from '../pages/chart/chart';
import Alert from '../pages/alert/alert';
import LoginPage from '../pages/AuthPage/Login';
import RegisterPage from '../pages/AuthPage/Register';

const pageRoutes=[
        {
            path: "/table",
            link: "/table",
            icon: React.createElement(UserOutlined),
            name: 'Table',
            component: TableRedash
        },
        {
            path: "/chart",
            link: "/chart",
            icon: React.createElement(VideoCameraOutlined),
            name: 'Chart',
            component: Chart
        },
        {
            path: "/alert",
            link: "/alert",
            icon: React.createElement(UploadOutlined),
            name: 'Alert',
            component: Alert
        }
];

const authRoutes=[
    {
        path: "/auth/login",
        link: "/auth/login",
        name: "Đăng Nhập",
        component: LoginPage
    },
    {
        path: "/auth/register",
        link: "/auth/register",
        name: "Đăng Ký",
        component: RegisterPage
    }
]

export {pageRoutes, authRoutes};