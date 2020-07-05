import React from 'react';
import { Form, Input, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

const TestPage = () => {
  const onFinish = values => {
    console.log('Received values of form:', values);
  };

  return (
    <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={onFinish}>
      <Form.List name="names">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                  label={index === 0 ? 'Passengers' : ''}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Please input passenger's name or delete this field.",
                      },
                    ]}
                    noStyle
                  >
                    <Input placeholder="passenger name" style={{ width: '60%' }} />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      style={{ margin: '0 8px' }}
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  style={{ width: '60%' }}
                >
                  <PlusOutlined /> Add field
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TestPage;

// import React from 'react';
// import { Upload, Modal, Button, Form } from 'antd';
// import { PlusOutlined } from '@ant-design/icons';
// import './addProduct.css';
// import TextArea from 'antd/lib/input/TextArea';
// import { useApolloClient } from '@apollo/react-hooks';
// import { Redirect } from 'react-router-dom';

// function getBase64(file) {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => resolve(reader.result);
//         reader.onerror = error => reject(error);
//     });
// }

// class PicturesWall extends React.Component {
//     state = {
//         previewVisible: false,
//         previewImage: '',
//         previewTitle: '',
//         fileList: [
//             {
//                 uid: '-1',
//                 name: 'image.png',
//                 status: 'done',
//                 url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//             },
//             {
//                 uid: '-2',
//                 name: 'image.png',
//                 status: 'done',
//                 url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//             },
//             {
//                 uid: '-3',
//                 name: 'image.png',
//                 status: 'done',
//                 url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//             },
//             {
//                 uid: '-4',
//                 name: 'image.png',
//                 status: 'done',
//                 url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//             },
//         ],
//     };

//     handleCancel = () => this.setState({ previewVisible: false });

//     handlePreview = async file => {
//         if (!file.url && !file.preview) {
//             console.log("ok");
//             file.preview = await getBase64(file.originFileObj);
//         }
//         console.log(file.preview);
//         this.setState({
//             previewImage: file.url || file.preview,
//             previewVisible: true,
//             previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
//         });
//     };

//     handleChange = ({ fileList }) => {
//         return this.setState({ fileList })
//     };

//     render() {
//         const { previewVisible, previewImage, fileList, previewTitle } = this.state;
//         const uploadButton = (
//             <div>
//                 <PlusOutlined />
//                 <div className="ant-upload-text">Upload</div>
//             </div>
//         );
//         const onFinish = values => {
//             // console.log(values.text);
//             const a = values.text;
//             console.log(a);
//         };

//         const onFinishFailed = errorInfo => {
//             console.log('Failed:', errorInfo);
//         };
//         return (
//             <Form name="basic"
//                 initialValues={{
//                     text: ""
//                 }}
//                 onFinish={onFinish}
//                 onFinishFailed={onFinishFailed}>
//                 <Form.Item
//                     name="text">
//                     <TextArea rows={4} />
//                 </Form.Item>
//                 <Form.Item>
//                     <Button type="primary" htmlType="submit">
//                         Submit
//                         </Button>
//                 </Form.Item>
//                 <Form.Item>
//                     <Upload
//                         // action={()=>"done"}
//                         listType="picture-card"
//                         fileList={fileList}
//                         onPreview={this.handlePreview}
//                         onChange={this.handleChange}
//                     >
//                         {fileList.length >= 8 ? null : uploadButton}
//                     </Upload>
//                     <Modal
//                         visible={previewVisible}
//                         title={previewTitle}
//                         footer={null}
//                         onCancel={this.handleCancel}
//                     >
//                         <img alt="example" style={{ width: '100%' }} src={previewImage}/>
//                     </Modal>
//                 </Form.Item>
//             </Form>
//         );
//     }
// }

// export default PicturesWall;


// import React, { Component } from 'react';
// // import logo from '../logo.svg';
// import './App.css';

// class PicturesWall extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       files: [],
//       file: ''
//     }

//     this.loadFiles = this.loadFiles.bind(this);
//   }

//   componentDidMount() {
//     this.loadFiles();
//   }

//   loadFiles() {
//     // fetch('/api/files')
//     //   .then(res => res.json())
//     //   .then(files => {
//     //     if (files.message) {
//     //       console.log('No Files');
//     //       this.setState({ files: [] })
//     //     } else {
//     //       this.setState({ files })
//     //     }
//     //   });
//   }

//   fileChanged(event) {
//     const f = event.target.files[0];
//     this.setState({
//       file: f
//     });
//   }

//   deleteFile(event) {
//     event.preventDefault();
//     const id = event.target.id;

//     fetch('/api/files/'+id, {
//       method: 'DELETE'
//     }).then(res => res.json())
//       .then(response => {
//         console.log(response);
//         if (response.success) this.loadFiles()
//         else alert('Delete Failed');
//       })
//   }

//   uploadFile(event) {
//     event.preventDefault();
//     let data = new FormData();
//     data.append('file', this.state.file);

//     fetch('/api/files', {
//       method: 'POST',
//       body: data
//     }).then(res => res.json())
//       .then(data => {
//         if (data.success) {
//           this.loadFiles();
//         } else {
//           alert('Upload failed');
//         }
//       });
//   }

//   render() {
//     const { files } = this.state;
//     return (
//       <div className="App">
//         <header className="App-header">
//           {/* <img src={logo} className="App-logo" alt="logo" /> */}
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <div className="App-content">
//           <input type="file" onChange={this.fileChanged.bind(this)}/>
//           <button onClick={this.uploadFile.bind(this)}>Upload</button>
//           <table className="App-table">
//             <thead>
//               <tr>
//                   <th>File</th>
//                   <th>Uploaded</th>
//                   <th>Size</th>
//                   <th></th>
//               </tr>
//             </thead>
//             <tbody>
//               {files.map((file, index) => {
//                 var d = new Date(file.uploadDate);
//                 return (
//                   <tr key={index}>
//                     <td><a href={`http://localhost:3001/api/files/${file.filename}`}>{file.filename}</a></td>
//                     <td>{`${d.toLocaleDateString()} ${d.toLocaleTimeString()}`}</td>
//                     <td>{(Math.round(file.length/100) / 10)+'KB'}</td>
//                     <td><button onClick={this.deleteFile.bind(this)} id={file._id}>Remove</button></td>
//                   </tr>
//                 )
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     );
//   }
// }

// export default PicturesWall;
