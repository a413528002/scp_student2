import React from 'react';
import { connect } from 'umi';
import { Button, message, Modal, Space } from 'antd';

const NewOrganizationModal = (props) => {
  const { newOrganizationModalVisible, handleNewOrganizationCancelModal, region, dispatch } = props;
  const { loading } = props;

  // 新建机构
  const createOrganization = (createType) => {
    const { classHourId } = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {};
    if (classHourId) {
      dispatch({
        type: 'studentOrganization/createBankOrganization',
        payload: { createType, region, classHourId },
        // 新建成功后的回调
        callback: () => {
          handleNewOrganizationCancelModal();
        },
      });
    } else {
      message.error('未选择课堂');
    }
  };

  return (
    <Modal
      visible={newOrganizationModalVisible}
      onCancel={handleNewOrganizationCancelModal}
      closable={false}
      width={320}
      title={'当前区域：' + region}
      footer={[
        <Button key="cancel" htmlType="button" onClick={handleNewOrganizationCancelModal}>
          取消
        </Button>,
        <Button
          key="lease"
          type="primary"
          htmlType="submit"
          loading={loading}
          onClick={() => createOrganization('L')}
        >
          租赁
        </Button>,
        <Button
          key="construction"
          type="primary"
          htmlType="submit"
          loading={loading}
          onClick={() => createOrganization('B')}
        >
          建设
        </Button>,
      ]}
    >
      <div>规则：</div>
      <div>总行：每家机构必须建立总行，费用600万；</div>
      <div>
        支行：各机构可选择在各区域建立支行，第1期需在总行所在的区域建立支行；建设支行200万，租赁支行50万；
      </div>
      <div>每个支行可以抢1单存款</div>
      <p />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.effects['studentOrganization/createOrganization'],
}))(NewOrganizationModal);
