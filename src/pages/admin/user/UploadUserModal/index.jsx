import React, { useState } from 'react';
import { connect } from 'umi';
import { Upload, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Dragger } = Upload;
const UploadUserModal = (props) => {
  const { modalVisible, handleCancelModal } = props;
  const { dispatch, uploadLoading } = props;
  const [fileList, setFileList] = useState([]);
  // 导入用户
  const userImport = (formData) => {
    dispatch({
      type: 'adminUser/userImport',
      payload: formData,
      callback: () => handleCancelModal(),
    });
  };

  const handleUpload = () => {
    const importFile = new FormData();
    fileList.forEach((file) => {
      importFile.append('file', file);
    });

    // You can use any AJAX library you like
    userImport(importFile);
  };
  const uploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
    maxCount: 1,
    accept:
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
    listType: 'picture',
  };

  return (
    <Modal
      title="导入用户"
      visible={modalVisible}
      onOk={handleUpload}
      onCancel={handleCancelModal}
      okButtonProps={{ disabled: fileList.length === 0 }}
      okText="确认导入"
      confirmLoading={uploadLoading}
    >
      <Dragger {...uploadProps}>
        <p className="ant-upload-drag-icon">
          <UploadOutlined />
        </p>
        <p className="ant-upload-text">点击/拖拽上传文件</p>
        <p className="ant-upload-hint">仅支持.xlsx/.xls格式文件</p>
      </Dragger>
    </Modal>
  );
};

export default connect(({ loading }) => ({
  uploadLoading: loading.effects['adminUser/userImport'],
}))(UploadUserModal);
