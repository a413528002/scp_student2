import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Button, Card, Tag } from 'antd';
import PublicTable from '@/components/Table';
import InterestSettlementModal from '@/pages/student/deal/loanMng/InterestSettlementModal';
import Million from '@/components/Million';
import Tags from '@/components/Tags';
import { toPercent } from '@/utils/commonUtils';

const LoanMngTable = (props) => {
  const { dispatch, dataSource, loading } = props;
  const { classHourId } = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {};
  useEffect(() => {
    if (classHourId) {
      // 查询贷款
      dispatch({
        type: 'studentLoanMng/queryLoans',
        payload: {
          classHourId,
        },
      });
    }
  }, []);
  // 利息结算modal显示状态 ----start-----
  const [modalVisible, setModalVisible] = useState(false);

  // 显示modal
  const handleShowModal = (id) => {
    queryLoanInterests(id);
    setModalVisible(true);
  };

  // 关闭modal
  const handleCancelModal = () => {
    setModalVisible(false);
  };
  // 利息结算modal显示状态 ----end-----

  // 查询存款利息
  const queryLoanInterests = (bankFinancialBusinessId) => {
    if (classHourId && bankFinancialBusinessId) {
      dispatch({
        type: 'studentLoanMng/queryLoanInterests',
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
      render: (customerTypeName) => <Tags>{customerTypeName}</Tags>,
    },
    {
      title: '金额(万元)',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => <Million>{amount}</Million>,
    },
    {
      title: '利率',
      dataIndex: 'expectRate',
      key: 'expectRate',
      render: (expectRate) => toPercent(expectRate),
    },
    {
      title: '贷款期数',
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
      title: '信用评级',
      dataIndex: 'creditRating',
      key: 'creditRating',
    },
    {
      title: '利率类型',
      dataIndex: 'rateTypeName',
      key: 'rateTypeName',
      render: (rateTypeName) => <Tags>{rateTypeName}</Tags>,
    },
    {
      title: '质押/担保金额(万元)',
      dataIndex: 'mgMoney',
      key: 'mgMoney',
      render: (mgMoney) => <Million>{mgMoney}</Million>,
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
    <Card title="贷款管理" bordered={false} type="inner">
      <PublicTable
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        scroll={{ x: 1000 }}
        bordered
      />
      {modalVisible && (
        <InterestSettlementModal
          modalVisible={modalVisible}
          handleCancelModal={handleCancelModal}
        />
      )}
    </Card>
  );
};

export default connect(({ studentLoanMng, loading }) => ({
  dataSource: studentLoanMng.queryLoansData,
  loading: loading.effects['studentLoanMng/queryLoans'],
}))(LoanMngTable);
