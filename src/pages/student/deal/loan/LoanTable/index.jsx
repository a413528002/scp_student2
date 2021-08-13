import React, {useEffect, useState} from 'react';
import {connect} from 'umi'
import {Button, Card} from "antd";
import PublicTable from "@/components/Table";
import InterestSettlementModal from "@/pages/student/deal/loan/InterestSettlementModal";


const originData = [];
for (let i = 0; i < 8; i++) {
  originData.push({
    _key: i.toString(),
    period: `${i}`,
    rateTypeName: '假数据',
    amount: Math.random() * 100000000,
    mgMoney: Math.random() * 1000,
  });
}
const LoanTable = (props) => {
  const {dispatch, dataSource, loading} = props;
  const {classHourId} = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {}
  useEffect(() => {
    if (classHourId) {
      // 查询贷款
      dispatch({
        type: 'studentLoan/queryLoans',
        payload: {
          classHourId
        }
      })
    }
  }, [])
  // 利息结算modal显示状态 ----start-----
  const [modalVisible, setModalVisible] = useState(false);
  const [bankFinancialBusinessId, setBankFinancialBusinessId] = useState(undefined);

  // 显示modal
  const handleShowModal = (id) => {
    queryLoanInterests(id)
    setBankFinancialBusinessId(id)
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
        type: 'studentLoan/queryLoanInterests',
        payload: {
          classHourId, bankFinancialBusinessId
        }
      })
    }
  }
  const columns = [
    {
      title: '序号',
      dataIndex: 'notation',
      key: 'notation',
      render: (text, record, index) => `${index + 1}`
    },
    {
      title: '业务类型',
      dataIndex: 'customerTypeName',
      key: 'customerTypeName',
    },
    {
      title: '金额(万元)',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => !amount ? null : `${amount / 10000}`
    },
    {
      title: '利率',
      dataIndex: 'expectRate',
      key: 'expectRate',
    },
    {
      title: '贷款期数',
      dataIndex: 'term',
      key: 'term',
    },
    {
      title: '所属期限',
      dataIndex: 'period',
      key: 'period',
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
    },
    {
      title: '质押/担保金额(万元)',
      dataIndex: 'mgMoney',
      key: 'mgMoney',
      render: (mgMoney) => !mgMoney ? null : `${mgMoney / 10000}`
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
      render: (_,{bankFinancialBusinessId}) => {
        return <Button type="primary" size="small" onClick={()=>handleShowModal(bankFinancialBusinessId)}>计息</Button>
      }
    },
  ];
  return (
    <Card
      title='贷款管理'
      bordered={false}
      type='inner'
    >
      <PublicTable
        // dataSource={dataSource}
        dataSource={originData}
        columns={columns}
        loading={loading}
        bordered
      />
      {
        modalVisible && <InterestSettlementModal
          modalVisible={modalVisible}
          handleCancelModal={handleCancelModal}
          bankFinancialBusinessId={bankFinancialBusinessId}
        />
      }

    </Card>
  );
};

export default connect(({studentLoan, loading}) => ({
  dataSource: studentLoan.queryLoansData,
  loading: loading.effects['studentLoan/queryLoans']
}))(LoanTable);
