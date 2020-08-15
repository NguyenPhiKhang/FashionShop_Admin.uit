import React, { useState, useEffect } from 'react';
import {
    Form,
    Input,
    Cascader,
    Select,
    Button,
    // AutoComplete,
    Divider,
    InputNumber,
    Switch,
    Space,
    Spin,
    PageHeader,
} from 'antd';
import { MinusCircleOutlined, PlusOutlined, CloseOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';
import './addProduct.css';
import TextArea from 'antd/lib/input/TextArea';
import { getAllCategoriesQuery, getAllAttributeQuery, getProductQuery } from '../../network/queries';
import { createProductMutation, updateProductMutation } from '../../network/mutations';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Modal from 'antd/lib/modal/Modal';
import { useHistory, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { httpUploadImage, httpImage } from '../../utils/util';

const { Option } = Select;

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

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const EditProduct = (props) => {
    const [form] = Form.useForm();
    const { id } = useParams();

    const { loading, refetch, networkStatus } = useQuery(getProductQuery, {
        variables: {
            id: id
        },
        onCompleted: async (data) => {
            const dt = data.getProductById;
            console.log(dt);
            const attrs = await Promise.all(dt.option_amount.map(oa => {
                if (oa.option_size !== null)
                    return { amount: oa.amount, color: oa.option_color._id, size: [oa.option_size.type_option, oa.option_size._id] };
                else return { amount: oa.amount, color: oa.option_color._id, size: null };
            }));

            setLengthAttr(dt.option_amount.length);

            const imgs = await Promise.all(dt.images.map(img => {
                return { preview: `${httpImage}${img}`, filename: { name: img }, visible: false };
            }));

            form.setFieldsValue({
                name: dt.name,
                freeship: dt.is_freeship,
                description: dt.description,
                price: dt.price,
                percent: dt.promotion_percent,
                weight: dt.weight,
                category: [dt.categories.category_level1.category_code, dt.categories.category_level2.category_code, dt.categories.category_level3.category_code],
                attribute: attrs
            });

            setFileList(imgs);
        },
        notifyOnNetworkStatusChange: true
    });

    useEffect(() => {
        refetch();
    }, []);

    useQuery(getAllCategoriesQuery, {
        onCompleted: (data) => {
            setOptionCats(data.getAllCategory);
        }
    });

    useQuery(getAllAttributeQuery, {
        onCompleted: async (data) => {
            await Promise.all(data.getAllAttribute.map(async value => {
                if (value.label === "Màu sắc") {
                    setOptionColors(value.children);
                } else {
                    let arrSizeText = [];
                    let arrSizeNumber = [];
                    await Promise.all(value.children.map(value => {
                        if (value.type === "size_text")
                            arrSizeText.push(value);
                        else arrSizeNumber.push(value);
                    }));

                    const optionSizes = [
                        {
                            label: "Kích thước số",
                            value: "size_number",
                            children: arrSizeNumber
                        },
                        {
                            label: "Kích thước chữ",
                            value: "size_text",
                            children: arrSizeText
                        }
                    ];
                    setOptionSizes(optionSizes);
                }
            }));
        }
    });
    const [updateProduct] = useMutation(updateProductMutation, {
        onCompleted: data => {
            setLoadingAdd(false);
            // swal(`Thêm ${data.createProduct.name} thành công!`, `ID: ${data.createProduct._id}`, "success");
        },
        onError: error => {
            setLoadingAdd(false);
            swal(`Có lỗi xảy ra!`, `message: ${error.messaged}`, "error");
        }
    });

    const [optionCats, setOptionCats] = useState([]);
    const [lengthAttribute, setLengthAttr] = useState(0);
    const [optionColors, setOptionColors] = useState([]);
    const [optionSizes, setOptionSizes] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [preview, setPreview] = useState({ visible: false, image: '', title: '' });
    const [loadingImage, setLoadingImage] = useState(false);
    const [loadingAdd, setLoadingAdd] = useState(false);
    const [imgsDelete, setImgsDelete] = useState([]);
    const history = useHistory();

    const displayRender = (label) => {
        return label[label.length - 1];
    }
    const fileChanged = async (event) => {
        setLoadingImage(true);
        let files = fileList;
        for (let i = 0; i < event.target.files.length; i++) {
            files.push(event.target.files[i]);
        }
        const filess = await Promise.all(files.map(async f => {
            if (typeof (f.preview) === "undefined") {
                const preview = await getBase64(f);
                return { filename: await f, preview: await preview };
            } else {
                return await f;
            }
        }));
        console.log(filess.length);
        setFileList(filess);
        setLoadingImage(false);
    }

    const uploadFile = async () => {
        let data = new FormData();
        let imgs = [];
        for (const img of fileList) {
            if (typeof (img.filename.size) !== "undefined")
                data.append('multi-files', img.filename);
            else await imgs.push(img.filename.name);
        }

        // const res = await fetch(`${httpUploadImage}`, {
        //     method: 'POST',
        //     body: data
        // });
        // const dataImg = await res.json();
        // if (dataImg.success) {
        //     console.log(dataImg.filenames);
        //     return dataImg.filenames;
        // }
        // else return [];

        return imgs;
    }

    const onFinish = async values => {
        console.log(values);
        setLoadingAdd(true);
        // let category = values.category[0]+"/"+values.category[1]+"/"+values.category[2];
        let category = "";
        await Promise.all(values.category.map(cat => {
            category += (values.category[values.category.length - 1] === cat) ? cat : cat + "/";
        }));
        console.log(category);
        let optionamounts = [];
        await Promise.all(values.attribute.map(att => {
            const a = {
                color_id: typeof (att.color) === "undefined" ? null : att.color,
                size_id: (typeof (att.size) === "undefined" || att.size === null || att.size.length === 0) ? null : att.size[1],
                amount: att.amount
            }
            optionamounts.push(a);
        }));
        console.log(optionamounts);
        const listImages = await uploadFile();
        console.log(listImages);
        updateProduct({
            variables: {
                id: id,
                name: values.name,
                category_id: category,
                price: values.price,
                promotion_percent: values.percent,
                description: values.description,
                weight: values.weight,
                is_freeship: values.freeship,
                images: listImages,
                option_amount: optionamounts
            }
        });
        setLoadingAdd(false);
    };

    const handleCancel = () => setPreview({ visible: false, image: null, title: '' });

    const handlePreview = async file => {
        if (!file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreview({
            image: file.preview,
            visible: true,
            title: file.filename.name,
        });
    };

    const handleDeleteImage = (index) => {
        let files = [...fileList];
        let dels = [...imgsDelete];
        const a = files.splice(index, 1);
        if (typeof (a[0].filename.size) === "undefined") {
            dels.push(a[0].filename.name);
            setImgsDelete(dels);
        }
        setFileList(files);
    }

    return (
        <div style={{ backgroundColor: '#fff', padding: 16 }}>
            <Spin size="large" spinning={loadingAdd || loading || networkStatus === 4}>
                <Form
                    {...formItemLayout}
                    form={form}
                    onFinish={onFinish}
                    initialValues={{
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
                        onBack={() => history.replace('/products')}
                        title={
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Title level={4} style={{ color: '#595959', textAlign: 'left', marginLeft: 10 }}>Sửa sản phẩm</Title>
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
                                message: 'Không được để trống!',
                            },
                        ]}
                    >
                        <Input />
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
                                <InputNumber min={1000} formatter={value => `${value} đ`} />
                            </Form.Item>
                            <Form.Item
                                name="percent"
                                label="Giảm giá: "
                                rules={[
                                    { type: 'number', min: 0, max: 100, message: "Phần trăm không đúng!" },
                                ]}
                            >
                                <InputNumber min={0} max={100} formatter={value => `${value}%`} />
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
                                <InputNumber min={0} />
                            </Form.Item>

                            <Form.Item name="freeship" label="Miễn phí vận chuyển: " valuePropName="checked">
                                <Switch />
                            </Form.Item>
                        </Space>
                    </Form.Item>
                    <Form.Item name="description" label="Mô tả">
                        <TextArea rows={4} autoSize />
                    </Form.Item>
                    <Divider style={{ margin: "15px 0px" }} />
                    <Form.Item
                        label="Danh mục"
                        name="category"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng chọn danh mục!"
                            }
                        ]}>
                        <Cascader options={optionCats} placeholder="Vui lòng chọn" style={{ textAlign: 'left' }} />
                    </Form.Item>
                    <Form.Item
                        label="Thuộc tính"
                        required
                    >
                        <Form.List name="attribute">
                            {(fields, { add, remove }) => {
                                if (fields.length === 0)
                                    add();
                                return (
                                    <div>
                                        {
                                            fields.map((field, index) => (
                                                <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                                                    <Form.Item
                                                        {...field}
                                                        name={[field.name, 'color']}
                                                        fieldKey={[field.fieldKey, 'color']}
                                                        rules={[{ required: true, message: 'Vui lòng nhập màu' }]}
                                                    >
                                                        <Select style={{ width: 120 }} allowClear placeholder="Màu sắc" disabled={(index >= lengthAttribute)?false: true}>
                                                            {
                                                                optionColors.map(value => {
                                                                    return <Option key={value.value} value={value.value}>{value.label}</Option>
                                                                })
                                                            }
                                                        </Select>
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...field}
                                                        name={[field.name, 'size']}
                                                        fieldKey={[field.fieldKey, 'size']}
                                                    >
                                                        <Cascader options={optionSizes} placeholder="Kích thước" style={{ textAlign: 'left' }} displayRender={displayRender} disabled={(index >= lengthAttribute)?false: true}/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...field}
                                                        name={[field.name, 'amount']}
                                                        fieldKey={[field.fieldKey, 'amount']}
                                                        rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
                                                    >
                                                        <InputNumber min={0} placeholder="Số lượng" />
                                                    </Form.Item>
                                                    {index >= lengthAttribute ? (
                                                        <MinusCircleOutlined
                                                            className="dynamic-delete-button"
                                                            style={{ margin: '0 8px' }}
                                                            onClick={() => {
                                                                remove(field.name);
                                                            }}
                                                        />
                                                    ) : null}
                                                </Space>
                                            ))}

                                        <Form.Item>
                                            <Button
                                                type="dashed"
                                                onClick={() => {
                                                    add();
                                                }}
                                                block
                                            >
                                                <PlusOutlined /> Thêm Option
                                        </Button>
                                        </Form.Item>
                                    </div>
                                );
                            }}
                        </Form.List>
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
                                            <Input
                                                type="file"
                                                name="multi-files"
                                                multiple
                                                id="input-files"
                                                className="form-control-file border"
                                                onChange={fileChanged}
                                                hidden

                                            />
                                            <Button type="dashed" style={{ height: 80, width: 80 }} onClick={() => { document.getElementById('input-files').click() }}>
                                                <div>
                                                    <PlusOutlined />
                                                    <div className="ant-upload-text">Upload</div>
                                                </div>
                                            </Button>
                                            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
                                                {
                                                    fileList.map((file, index) => {
                                                        return (
                                                            <div key={index} style={{
                                                                width: 150, height: 80, display: 'flex', justifyContent: 'space-between',
                                                                marginLeft: 8, border: '1px solid #e6e6e6', padding: 5
                                                            }}>
                                                                <img alt="select" style={{ width: 80, height: '100%' }} src={file.preview} onClick={() => { handlePreview(file) }} />
                                                                <Button className="button-delete-image" onClick={() => { handleDeleteImage(index) }}
                                                                    style={{ width: 20, height: '100%', border: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                    <DeleteOutlined style={{ color: '#ff8080' }} />
                                                                </Button>
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
                    <Divider style={{ margin: '15px 0px' }} />
                    <div className="ant-row ant-form-item">
                        <div className="ant-col ant-form-item-lable" style={{ marginRight: 150 }}>
                        </div>
                        <div className="ant-col ant-form-item-control">
                            <div className="ant-form-item-control-input">
                                <div className="ant-form-item-control-input-content">
                                    <Button type="primary" htmlType="submit">
                                        <SaveOutlined />
                                    Lưu
                                </Button>
                                    <Button htmlType="button" style={{ margin: '0 8px', }} className="button-close" onClick={() => history.replace('/products')}>
                                        <CloseOutlined />
                                    Huỷ
                                </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </Spin>
        </div >
    );
};

export default EditProduct;