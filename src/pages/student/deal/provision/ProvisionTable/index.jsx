import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Button, Card, Space } from 'antd';
import PublicTable from '@/components/Table';
import ProvisionRule from '@/pages/student/deal/provision/ProvisionRule';
import ProvisionOrPrepareModal from '@/pages/student/deal/components/provisionOrPrepareModal';
import Million from "@/components/Million";
import Tags from "@/components/Tags";

const ProvisionTable = (props) => {
  const { dispatch, dataSource, loading } = props;
  // 获取课堂id
  const { classHourId } = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {};
  useEffect(() => {
    if (classHourId) {
      dispatch({
        type: 'studentProvision/queryBankLoanProvisions',
        payload: { classHourId },
      });
    }
  }, []);

  // modal显示状态 ----start-----
  const [modalVisible, setModalVisible] = useState(false);
  const [typeModal, setTypeModal] = useState({});
  // 显示modal
  const handleShowModal = (type) => {
    if (type === 'BACK') {
      setTypeModal({ type, title: '拨回' });
    } else if (type === 'PROVISION') {
      setTypeModal({ type, title: '计提' });
    }
    setModalVisible(true);
  };

  // 关闭modal
  const handleCancelModal = () => {
    setModalVisible(false);
  };
  // modal显示状态 ----end-----
  const columns = [
    {
      title: '期数',
      dataIndex: 'period',
      key: 'period',
      render: (period) => `第${period}期`,
    },
    {
      title: '交易类型',
      dataIndex: 'typeName',
      key: 'typeName',
      render:(typeName)=><Tags>{typeName}</Tags>
    },
    {
      title: '计提前余额(万元)',
      dataIndex: 'openingBalance',
      key: 'openingBalance',
      render: (openingBalance) => <Million>{openingBalance}</Million>,
    },
    {
      title: '计提金额(万元)',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => <Million>{amount}</Million>,
    },
    {
      title: '计提后余额(万元)',
      dataIndex: 'closingBalance',
      key: 'closingBalance',
      render: (closingBalance) => <Million>{closingBalance}</Million>,
    },

    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (_, { amount }) => {
        return (
          <Space>
            <Button type="primary" size="small" onClick={() => handleShowModal('BACK')}>
              拨回
            </Button>
            <Button type="primary" size="small" onClick={() => handleShowModal('PROVISION')}>
              计提
            </Button>
          </Space>
        );
      },
    },
  ];
  return (
    <Card title="拨备管理" bordered={false} type="inner">
      <PublicTable dataSource={dataSource} columns={columns} loading={loading} bordered />
      <ProvisionOrPrepareModal
        modalVisible={modalVisible}
        handleCancelModal={handleCancelModal}
        typeModal={typeModal}
      />
      <ProvisionRule />
    </Card>
  );
};

export default connect(({ studentProvision, loading }) => ({
  dataSource: studentProvision.bankLoanProvisionsData,
  loading: loading.effects['studentProvision/queryBankLoanProvisions'],
}))(ProvisionTable);
