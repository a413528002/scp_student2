import React from 'react';
import { connect } from 'umi';
import { Modal, Form, Input } from 'antd';

const ChangePasswordModal = (props) => {
  const { visible, hideModal } = props;
  const { dispatch, loading } = props;
  const [form] = Form.useForm();
  // 修改密码
  const changePassword = () => {
    form
      .validateFields()
      .then((values) => {
        dispatch({
          type: 'user/changePassword',
          payload: { ...values },
          callback: () => handleCancelModal(),
        });
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };
  // 关闭modal/重置form
  const handleCancelModal = () => {
    hideModal();
    form.resetFields();
  };
  return (
    <Modal
      title="修改密码"
      visible={visible}
      onOk={changePassword}
      onCancel={handleCancelModal}
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical" name="change_password_modal">
        <Form.Item
          name="oldPassword"
          label="旧密码"
          rules={[
            {
              required: true,
              message: '请输入旧密码',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="新密码"
          rules={[
            {
              required: true,
              message: '请输入新密码',
            },
            { min: 6, message: '密码长度不能少于6位' },
          ]}
        >
          <Input.Password type="textarea" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.effects['user/changePassword'],
}))(ChangePasswordModal);
