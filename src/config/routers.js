import {
    UserOutlined,
    UploadOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';

import React from 'react';
import TableRedash from '../pages/table/index';
import Chart from '../pages/chart/chart';
import Alert from '../pages/alert/alert';

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

export default pageRoutes;