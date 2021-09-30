import React from 'react';
import { connect } from 'umi';
import { Button, Form, InputNumber, Modal, Space } from 'antd';
import { yuan } from '@/utils/commonUtils';

const ProvisionOrPrepareModal = (props) => {
  const { modalVisible, handleCancelModal, dispatch, typeModal } = props;
  const { type, title, bankFinancialBusinessId } = typeModal || {};
  const { loading } = props;
  const { classHourId } = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {};
  const [form] = Form.useForm();
  // 更新
  const update = ({ amount }) => {
    if (classHourId) {
      // 调回取amount负值
      if (type === 'RECALL') {
        dispatch({
          type: 'studentPrepare/updateBankDepositReserve',
          payload: {
            classHourId,
            amount: -amount,
          },
          // 新建成功后的回调
          callback: () => {
            handleCancelResetFields();
          },
        });
      } else if (type === 'PAYMENT') {
        // 缴纳取amount正值
        dispatch({
          type: 'studentPrepare/updateBankDepositReserve',
          payload: {
            classHourId,
            amount,
          },
          // 新建成功后的回调
          callback: () => {
            handleCancelResetFields();
          },
        });
      } else if (type === 'BACK') {
        // 拨回取amount负值
        dispatch({
          type: 'studentProvision/updateBankLoanProvision',
          payload: {
            classHourId,
            amount: -amount,
          },
          callback: () => {
            handleCancelResetFields();
          },
        });
      } else if (type === 'PROVISION') {
        // 计提取amount正值
        dispatch({
          type: 'studentProvision/updateBankLoanProvision',
          payload: {
            classHourId,
            amount,
          },
          callback: () => {
            handleCancelResetFields();
          },
        });
      } else if (type === 'L' || type === 'S') {
        // 清收 变卖
        updateBankBadAssets(amount, type);
      }
    }
  };
  // 保存不良资产数据
  const updateBankBadAssets = (returnAmount, disposalType) => {
    dispatch({
      type: 'studentAsset/updateBankBadAssets',
      payload: {
        classHourId,
        bankFinancialBusinessId,
        disposalType,
        returnAmount,
      },
      callback: () => {
        handleCancelResetFields();
      },
    });
  };
  /**
   * 提交表单
   * @param values 表单字段值
   */
  const onFinish = (values) => {
    // 金额转换
    const params = yuan(values);
    update(params);
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
      visible={modalVisible}
      onCancel={handleCancelResetFields}
      closable={false}
      footer={null}
      width={320}
    >
      <Form form={form} layout="vertical" name="NewClassroomModal" onFinish={onFinish}>
        <Form.Item
          name="amount"
          rules={[
            {
              required: true,
              message: `请输入${title}金额（万元）`,
            },
          ]}
        >
          <InputNumber
            min={0}
            placeholder={`请输入${title}金额（万元）`}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item style={{ textAlign: 'center', marginBottom: 0 }}>
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

export default connect(({ loading }) => ({
  loading:
    loading.models.studentProvision || loading.models.studentPrepare || loading.models.studentAsset,
}))(ProvisionOrPrepareModal);
