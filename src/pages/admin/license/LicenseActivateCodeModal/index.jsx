import React from 'react';
import {connect} from 'umi';
import {Modal, Form, Input} from 'antd';

const {TextArea} = Input;
const LicenseActivateCodeModal = (props) => {
  const {activateModalVisible, handleCancelModal} = props;
  const {loading, dispatch} = props;
  const [form] = Form.useForm();
  // 激活码激活
  const activateByActivationCode = () => {
    form
      .validateFields()
      .then((values) => {
        dispatch({
          type: 'adminLicense/activateByActivationCode',
          payload: {...values},
          // 新建成功后的回调
          callback: () => {
            handleCancelResetFields();
          },
        });
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });

  };


  // 关闭modal 重置表单
  const handleCancelResetFields = () => {
    // 关闭modal
    handleCancelModal();
    // 重置表单
    form.resetFields();
  };
  return (
    <Modal
      title="激活码"
      visible={activateModalVisible}
      onCancel={handleCancelResetFields}
      onOk={activateByActivationCode}
      confirmLoading={loading}
    >
      <Form form={form} name="LicenseActivateCodeModal">
        <Form.Item
          name="activationCode"
          rules={[
            {
              required: true,
              message: '请输入激活码',
            },
          ]}
        >
          <TextArea rows={9} placeholder="请输入激活码"/>
        </Form.Item>

      </Form>
    </Modal>
  );
};

export default connect(({loading}) => ({
  loading: loading.effects['adminLicense/activateByActivationCode'],
}))(LicenseActivateCodeModal);
