import React, { useState } from 'react';
import {
    Form,
    Input,
    // Cascader,
    // Select,
    // Button,
    // AutoComplete,
    Divider,
    InputNumber,
    Switch,
    Space,
    Spin,
    PageHeader,
} from 'antd';
// import { MinusCircleOutlined, PlusOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';
import './addProduct.css';
import TextArea from 'antd/lib/input/TextArea';
import { getProductQuery } from '../../network/queries';
import { useQuery} from '@apollo/react-hooks';
import Modal from 'antd/lib/modal/Modal';
import { useHistory, useParams } from 'react-router-dom';
import "./detailProduct.css";
import { httpImage } from '../../utils/util';

const formItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 12,
        },
    },
};

// function getBase64(file) {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => resolve(reader.result);
//         reader.onerror = error => reject(error);
//     });
// }

const DetailProduct = (props) => {
    const [form] = Form.useForm();
    const { id } = useParams();
    const {loading,refetch} = useQuery(getProductQuery, {
        variables: {
            id: id
        },
        onCompleted: (data) => {
            const dt = data.getProductById;
            console.log(dt);
            form.setFieldsValue({
                name: dt.name,
                freeship: dt.is_freeship,
                description: dt.description,
                price: dt.price,
                percent: dt.promotion_percent,
                weight: dt.weight,
                categories: dt.categories.category_level1.name + "/" + dt.categories.category_level2.name + "/" + dt.categories.category_level3.name
            });

            setImages(dt.images);
            setOptionAmount(dt.option_amount);
        }
    });

    const [optionAmount, setOptionAmount] = useState([]);
    const [images, setImages] = useState([]);
    const [preview, setPreview] = useState({ visible: false, image: '', title: '' });
    const [loadingImage, setLoadingImage] = useState(false);
    const [loadingAdd, setLoadingAdd] = useState(false);
    const history = useHistory();

    const handleCancel = () => setPreview({ visible: false, image: null, title: '' });

    const handlePreview = async file => {
        setPreview({
            image: `${httpImage}${file}`,
            visible: true,
            title: file,
        });
    };

    return (
        <div style={{ backgroundColor: '#fff', padding: 16 }}>
            <Spin size="large" spinning={loadingAdd||loading}>
                <Form
                    {...formItemLayout}
                    form={form}
                    initialValues={{
                        name: '',
                        price: 1000,
                        percent: 0,
                        freeship: false,
                        description: "",
                        weight: 0
                    }}
                    scrollToFirstError
                >
                    <PageHeader
                        ghost={false}
                        onBack={ () => {
                             refetch();
                            history.replace('/products')}}
                        title={
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Title level={4} style={{ color: '#595959', textAlign: 'left', marginLeft: 10 }}>Chi tiết sản phẩm</Title>
                            </div>
                        }
                    />
                    <Divider style={{ margin: '15px 0px' }} />
                    <Form.Item
                        name="name"
                        label="Tên: "
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name!',
                            },
                        ]}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item >
                        <Space size={50}>
                            <Form.Item
                                name="price"
                                label="Giá: "
                                rules={[
                                    { type: 'number', min: 1000, message: "Giá không đúng!" },
                                    {
                                        required: true,
                                        message: 'Please input your price!',
                                    },
                                ]}
                            >
                                <InputNumber min={1000} formatter={value => `${value} đ`} disabled />
                            </Form.Item>
                            <Form.Item
                                name="percent"
                                label="Giảm giá: "
                                rules={[
                                    { type: 'number', min: 0, max: 100, message: "Phần trăm không đúng!" },
                                ]}
                            >
                                <InputNumber min={0} max={100} formatter={value => `${value}%`} disabled />
                            </Form.Item>
                        </Space>
                    </Form.Item>
                    <Form.Item >
                        <Space size={50}>
                            <Form.Item
                                name="weight"
                                label="Cân nặng: "
                                rules={[
                                    { type: 'number', min: 0, message: "Cân nặng không đúng!" },
                                ]}
                            >
                                <InputNumber min={0} disabled />
                            </Form.Item>

                            <Form.Item name="freeship" label="Miễn phí vận chuyển: " valuePropName="checked">
                                <Switch disabled />
                            </Form.Item>
                        </Space>
                    </Form.Item>
                    <Form.Item name="description" label="Mô tả">
                        <TextArea rows={4} autoSize disabled />
                    </Form.Item>
                    <Divider style={{ margin: "15px 0px" }} />
                    <Form.Item
                        label="Danh mục"
                        name="categories"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng chọn danh mục!"
                            }
                        ]}>
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label="Thuộc tính"
                        required
                    >
                        <div>
                            {
                                optionAmount.map((field, index) => (
                                    <Space key={index} style={{ display: 'flex', marginBottom: 8 }} align="start">
                                        <Form.Item
                                        >
                                            <Input value={field.option_color.name} disabled/>
                                        </Form.Item>
                                        <Form.Item
                                        >
                                            <Input value={!field.option_size?"Một kích thước":field.option_size.name} disabled/>
                                        </Form.Item>
                                        <Form.Item
                                        >
                                            <Input value={field.amount} disabled/>
                                        </Form.Item>
                                    </Space>
                                ))}
                        </div>
                    </Form.Item>
                    <Divider style={{ margin: "15px 0px" }} />
                    <div className="ant-row ant-form-item">
                        <div className="ant-col ant-form-item-lable" style={{ marginRight: 120 }}>
                            <label title="Ảnh">Ảnh:</label>
                        </div>
                        <div className="ant-col ant-form-item-control">
                            <div className="ant-form-item-control-input">
                                <div className="ant-form-item-control-input-content">
                                    <Spin spinning={loadingImage}>
                                        <div style={{ display: 'flex' }}>
                                            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
                                                {
                                                    images.map((file, index) => {
                                                        return (
                                                            <div key={index} style={{
                                                                width: 92, height: 80, display: 'flex', justifyContent: 'space-between',
                                                                marginLeft: 8, border: '1px solid #e6e6e6', padding: 5
                                                            }}>
                                                                <img alt="select" style={{ width: 80, height: '100%' }} src={`${httpImage}${file}`} onClick={() => { handlePreview(file) }} />
                                                            </div>
                                                        );
                                                    })
                                                }
                                            </div>
                                            <Modal
                                                visible={preview.visible}
                                                title={preview.title}
                                                footer={null}
                                                onCancel={handleCancel}
                                            >
                                                <img alt="example" style={{ width: '100%' }} src={preview.image} />
                                            </Modal>
                                        </div>
                                    </Spin>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </Spin>
        </div >
    );
};

export default DetailProduct;