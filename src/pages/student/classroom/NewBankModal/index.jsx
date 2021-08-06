import React from 'react';
import { connect } from 'umi';
import { Button, Form, Input, Modal, Space } from 'antd';

const NewBankModal = (props) => {
  const {newBankModalVisible, handleNewBankCancelModal, dispatch} = props
  const {loading} = props
  const [form] = Form.useForm();
  // 新建课堂
  const createBank = (params) => {
    dispatch({
      type: 'studentClassroom/createBank',
      payload: {...params},
      // 新建成功后的回调
      callback: () => {
        handleCancelResetFields()
      },
    })
  }
  /**
   * 提交表单 调用新建课堂
   * @param values 表单字段值
   */
  const onFinish = (values) => {
    createBank(values)
  }
  // 关闭modal 重置表单
  const handleCancelResetFields = () => {
    // 关闭modal
    handleNewBankCancelModal()
    // 重置表单
    form.resetFields()
  }
  return (
    <Modal
      visible={newBankModalVisible}
      onCancel={handleCancelResetFields}
      closable={false}
      footer={null}
      width={320}
    >
      <Form
        form={form}
        layout="vertical"
        name="NewClassroomModal"
        onFinish={onFinish}
      >
        <Form.Item
          name="bankName"
          rules={[
            {
              required: true,
              message: '请输入银行名称',
            },
          ]}
        >
          <Input placeholder='请输入银行名称'/>
        </Form.Item>
        <Form.Item style={{textAlign: "center", marginBottom: 0}}>
          <Space>
            <Button htmlType="button" onClick={handleCancelResetFields}>
              取消
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              确认
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect(({loading}) => ({
  loading:loading.effects['studentClassroom/createBank']
}))(NewBankModal);
