import React from 'react';
import { Upload, Modal, Button, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './addProduct.css';
import TextArea from 'antd/lib/input/TextArea';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class PicturesWall extends React.Component {
    state = {
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [
            {
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
            {
                uid: '-2',
                name: 'image.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
            {
                uid: '-3',
                name: 'image.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
            {
                uid: '-4',
                name: 'image.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
        ],
    };

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        console.log(file.url);

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    handleChange = ({ fileList }) => this.setState({ fileList });

    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const onFinish = values => {
            // console.log(values.text);
            const a = values.text;
            console.log(a);
        };

        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };
        return (
            <Form name="basic"
                initialValues={{
                    text: ""
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>
                <Form.Item
                    name="text">
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                        </Button>
                </Form.Item>
                <Form.Item>
                    <Upload
                        action="https://fashionshopuit-server.azurewebsites.net/upload"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                    >
                        {fileList.length >= 8 ? null : uploadButton}
                    </Upload>
                    <Modal
                        visible={previewVisible}
                        title={previewTitle}
                        footer={null}
                        onCancel={this.handleCancel}
                    >
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                </Form.Item>
            </Form>
        );
    }
}

export default PicturesWall;