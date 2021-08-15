import React, {useState} from 'react';
import {Upload, Button, message, Modal} from 'antd';
import {UploadOutlined} from '@ant-design/icons';


const {Dragger} = Upload;
const UploadPictureModal = (props) => {
  const {modalVisible, handleCancelModal} = props
  const [fileList, setFileList] = useState([])
  // const [] = useState()

  const handleUploadPicture = () => {
    // const { fileList } = this.state;
    const formData = new FormData();
    console.log(fileList)
    fileList.forEach(file => {
      formData.append('file', file);
    });


    // You can use any AJAX library you like

  }
  const handleChange = info => {
    let fileList = [...info.fileList];
    //控制上传图片数量
    fileList = fileList.slice(-1);
    setFileList(fileList);
  };
  const uploadProps = {
    onRemove: file => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList)
    },
    beforeUpload: file => {
      setFileList([...fileList, file])
      return false;
    },
    fileList,
    onChange: handleChange,
    accept: 'image/*',
    listType: "picture"
  };

  return (
    <Modal
      title="上传图片"
      visible={modalVisible}
      onOk={handleUploadPicture}
      onCancel={handleCancelModal}
      okButtonProps={{disabled: fileList.length === 0}}
      okText='确认上传'
    >
      <Dragger
        {...uploadProps}
        fileList={fileList}
      >
        <p className="ant-upload-drag-icon">
          <UploadOutlined/>
        </p>
        <p className="ant-upload-text">点击/拖拽上传图片</p>
        <p className="ant-upload-hint">
          仅支持.jpg/.png/.jpeg格式图片
        </p>
      </Dragger>
    </Modal>
  );
};

export default UploadPictureModal
