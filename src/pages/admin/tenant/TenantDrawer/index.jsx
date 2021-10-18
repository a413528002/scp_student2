import React from 'react';
import { connect } from 'umi';
import { Button, Drawer, Form, Input, Skeleton, Space, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { fileToBase64 } from '@/utils/commonUtils';

const TenantDrawer = (props) => {
  const { drawerVisible, handleCancelDrawer, currentTenantData } = props;
  const { loading, dispatch } = props;
  const [form] = Form.useForm();

  // 修改当前租户信息
  const updateCurrentTenant = (params) => {
    dispatch({
      type: 'adminTenant/updateCurrentTenant',
      payload: { ...currentTenantData, ...params },
      callback: () => handleCancelDrawer(),
    });
  };

  // 确认提交
  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        const {
          tenantLogoBase64: [file],
        } = values;
        // 转换为base64
        const tenantLogoBase64 = await fileToBase64(file);
        const params = {
          ...values,
          tenantLogoBase64,
        };
        // 修改当前租户信息
        updateCurrentTenant(params);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };
  // 设置将 event 的值转换成字段值
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  // 上传前的钩子
  const beforeUpload = (file) => {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('文件不能大于2MB');
      return false;
    } else {
      message.success('上传成功');
    }
    return isLt2M;
  };
  // 控制文件类型大小
  const uploadProps = {
    beforeUpload,
    maxCount: 1,
    accept: 'image/svg+xml',
  };

  // 栅格
  const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 16 },
  };
  return (
    <Drawer
      visible={drawerVisible}
      title="修改当前租户信息"
      placement="right"
      width={640}
      onClose={handleCancelDrawer}
      footer={
        <Space>
          <Button onClick={handleCancelDrawer}>取消</Button>
          <Button type="primary" onClick={handleOk}>
            确认
          </Button>
        </Space>
      }
      footerStyle={{ textAlign: 'center' }}
    >
      <Skeleton active loading={loading}>
        <Form
          {...formItemLayout}
          form={form}
          name="form_drawer"
          initialValues={{ tenantName: currentTenantData.tenantName }}
        >
          <Form.Item
            name="tenantName"
            label="租户名称"
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入租户名称',
              },
            ]}
          >
            <Input placeholder="请输入租户名称" />
          </Form.Item>
          <Form.Item
            name="tenantLogoBase64"
            label="LOGO"
            rules={[
              {
                required: true,
                message: '请上传LOGO',
              },
            ]}
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra="仅支持.svg文件格式"
          >
            <Upload name="logo" {...uploadProps}>
              <Button icon={<UploadOutlined />}>点击上传文件</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Skeleton>
    </Drawer>
  );
};

export default connect(({ adminTenant, loading }) => ({
  currentTenantData: adminTenant.queryCurrentTenantData,
  loading: loading.effects['adminTenant/updateCurrentTenant'],
}))(TenantDrawer);
