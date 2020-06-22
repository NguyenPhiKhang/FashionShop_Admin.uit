import {
    CodepenCircleOutlined,
    SettingOutlined,
    LineChartOutlined,
    AppstoreOutlined,
    TeamOutlined
} from '@ant-design/icons';

import React from 'react';
import Products from '../pages/ProductPage/index';
import Reports from '../pages/ReportPage';
import Settings from '../pages/SettingPage';
import LoginPage from '../pages/AuthPage/Login';
import RegisterPage from '../pages/AuthPage/Register';

const pageRoutes=[
        {
            path: "/products",
            link: "/products",
            icon: React.createElement(CodepenCircleOutlined),
            name: 'Quản lý kho',
            component: Products
        },
        {
            path: "/categories",
            link: "/categories",
            icon: React.createElement(AppstoreOutlined),
            name: 'Quản lý danh mục',
            component: Settings
        },
        {
            path: "/customers",
            link: "/customers",
            icon: React.createElement(TeamOutlined),
            name: 'Quản lý khách hàng',
            component: Settings
        },
        {
            path: "/reports",
            link: "/reports",
            icon: React.createElement(LineChartOutlined),
            name: 'Thống kê',
            component: Reports
        },
        {
            path: "/settings",
            link: "/settings",
            icon: React.createElement(SettingOutlined),
            name: 'Cài đặt',
            component: Settings
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