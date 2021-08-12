import React from 'react';
import {connect} from 'umi';
import {Button, Form, InputNumber, Modal, Space} from 'antd';

const RecallOrPaymentModal = (props) => {
  const {recallOrPaymentModalVisible, handleRecallOrPaymentCancelModal, dispatch, typeModal} = props
  const {type, title} = typeModal || {}
  const {loading} = props
  const {classHourId} = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {}
  const [form] = Form.useForm();
  // 更新
  const updateBankDepositReserve = ({amount}) => {
    if (classHourId) {
      // 调回取amount负值
      if (type === 'RECALL') {
        dispatch({
          type: 'studentPrepare/updateBankDepositReserve',
          payload: {
            classHourId,
            amount: -amount
          },
          // 新建成功后的回调
          callback: () => {
            handleRecallOrPaymentCancelModal()
          },
        })
      } else if (type === 'PAYMENT') {
        // 缴纳取amount正值
        dispatch({
          type: 'studentPrepare/updateBankDepositReserve',
          payload: {
            classHourId,
            amount
          },
          // 新建成功后的回调
          callback: () => {
            handleRecallOrPaymentCancelModal()
          },
        })
      }
    }


  }
  /**
   * 提交表单
   * @param values 表单字段值
   */
  const onFinish = (values) => {
    updateBankDepositReserve(values)
  }
  // 关闭modal 重置表单
  const handleCancelResetFields = () => {
    // 关闭modal
    handleRecallOrPaymentCancelModal()
    // 重置表单
    form.resetFields()
  }
  return (
    <Modal
      visible={recallOrPaymentModalVisible}
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
          name="amount"
          rules={[
            {
              required: true,
              message: `请输入${title}金额`,
            },
          ]}
        >
          <InputNumber min={0} placeholder={`请输入${title}金额`} style={{width: '100%'}}/>
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
  loading: loading.effects['studentPrepare/updateBankDepositReserve']
}))(RecallOrPaymentModal);
