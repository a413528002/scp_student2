import React, { useEffect, useState } from 'react';
import {Button, Card, Space, Tag} from 'antd';
import { connect } from 'umi';
import PublicTable from '@/components/Table';
import PrepareRule from '@/pages/student/deal/prepare/PrepareRule';
import ProvisionOrPrepareModal from '@/pages/student/deal/components/provisionOrPrepareModal';

const PrepareTable = (props) => {
  const { dispatch, dataSource, loading } = props;
  const { classHourId } = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {};

  useEffect(() => {
    if (classHourId) {
      // 查询列表
      dispatch({
        type: 'studentPrepare/queryBankDepositReserves',
        payload: { classHourId },
      });
    }
  }, []);

  // modal显示状态 ----start-----
  const [modalVisible, setModalVisible] = useState(false);
  const [typeModal, setTypeModal] = useState({});
  // 显示modal
  const handleShowModal = (type) => {
    if (type === 'RECALL') {
      setTypeModal({ type, title: '调回' });
    } else if (type === 'PAYMENT') {
      setTypeModal({ type, title: '缴纳' });
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
      render: (typeName) => <Tag color="#009933">{typeName}</Tag>,
    },
    {
      title: '准备金账户余额(万元)',
      dataIndex: 'openingBalance',
      key: 'openingBalance',
      render: (openingBalance) => `${openingBalance / 10000}`,
    },
    {
      title: '当期准备金调整(万元)',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `${amount / 10000}`,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: () => {
        return (
          <Space>
            <Button type="primary" size="small" onClick={() => handleShowModal('RECALL')}>
              调回
            </Button>
            <Button type="primary" size="small" onClick={() => handleShowModal('PAYMENT')}>
              缴纳
            </Button>
          </Space>
        );
      },
    },
  ];
  return (
    <Card title="准备金管理" bordered={false} type="inner">
      <PublicTable
        dataSource={dataSource}
        columns={columns}
        loding={loading}
        bordered
        // pagination={true}
      />
      <PrepareRule />
      {/*调回缴纳modal*/}
      <ProvisionOrPrepareModal
        modalVisible={modalVisible}
        handleCancelModal={handleCancelModal}
        typeModal={typeModal}
      />
    </Card>
  );
};

export default connect(({ studentPrepare, loading }) => ({
  dataSource: studentPrepare.bankDepositReservesData,
  loading: loading.effects['studentPrepare/queryBankDepositReserves'],
}))(PrepareTable);
