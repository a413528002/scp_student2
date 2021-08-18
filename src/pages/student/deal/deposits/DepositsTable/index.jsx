import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Button, Card, Tag } from 'antd';
import PublicTable from '@/components/Table';
import InterestSettlementModal from '@/pages/student/deal/deposits/InterestSettlementModal';

const DepositsTable = (props) => {
  const { dispatch, dataSource, loading } = props;
  const { classHourId } = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {};

  useEffect(() => {
    if (classHourId) {
      dispatch({
        type: 'studentDeposits/queryDeposits',
        payload: { classHourId },
      });
    }
  }, []);

  // 利息结算modal显示状态 ----start-----
  const [modalVisible, setModalVisible] = useState(false);
  const [bankFinancialBusinessInstId, setBankFinancialBusinessInstId] = useState(undefined);

  // 显示modal
  const handleShowModal = (id) => {
    queryDepositInterests(id);
    setBankFinancialBusinessInstId(id);
    setModalVisible(true);
  };

  // 关闭modal
  const handleCancelModal = () => {
    setModalVisible(false);
  };
  // 利息结算modal显示状态 ----end-----

  // 查询存款利息
  const queryDepositInterests = (bankFinancialBusinessId) => {
    if (classHourId && bankFinancialBusinessId) {
      dispatch({
        type: 'studentDeposits/queryDepositInterests',
        payload: {
          classHourId,
          bankFinancialBusinessId,
        },
      });
    }
  };
  const columns = [
    {
      title: '序号',
      dataIndex: 'notation',
      key: 'notation',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '业务类型',
      dataIndex: 'customerTypeName',
      key: 'customerTypeName',
      render: (customerTypeName) => <Tag color="#009933">{customerTypeName}</Tag>,
    },
    {
      title: '金额(万元)',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `${amount / 10000}`,
    },
    {
      title: '利率',
      dataIndex: 'expectRate',
      key: 'expectRate',
      render: (expectRate) => `${expectRate * 100}%`,
    },
    {
      title: '存款期数',
      dataIndex: 'term',
      key: 'term',
    },
    {
      title: '所属期数',
      dataIndex: 'period',
      key: 'period',
      render: (period) => `第${period}期`,
    },
    {
      title: '利率类型',
      dataIndex: 'rateTypeName',
      key: 'rateTypeName',
      render: (rateTypeName) => <Tag color="#009933">{rateTypeName}</Tag>,
    },
    {
      title: '渠道类型',
      dataIndex: 'channelName',
      key: 'channelName',
    },
    {
      title: '区域',
      dataIndex: 'regionName',
      key: 'regionName',
    },
    {
      title: '利息',
      dataIndex: 'interest',
      key: 'interest',
      render: (_, { bankFinancialBusinessId }) => {
        return (
          <Button
            type="primary"
            size="small"
            onClick={() => handleShowModal(bankFinancialBusinessId)}
          >
            计息
          </Button>
        );
      },
    },
  ];
  return (
    <Card title="存款管理" bordered={false} type="inner">
      <PublicTable dataSource={dataSource} columns={columns} loading={loading} bordered />
      {modalVisible && (
        <InterestSettlementModal
          modalVisible={modalVisible}
          handleCancelModal={handleCancelModal}
          bankFinancialBusinessInstId={bankFinancialBusinessInstId}
        />
      )}
    </Card>
  );
};

export default connect(({ studentDeposits, loading }) => ({
  dataSource: studentDeposits.queryDepositsData,
  loading: loading.effects['studentDeposits/queryDeposits'],
}))(DepositsTable);
