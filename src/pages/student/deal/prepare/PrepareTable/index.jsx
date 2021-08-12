import React, {useEffect, useState} from 'react';
import {Button, Card, Space} from "antd";
import {connect} from 'umi'
import PublicTable from "@/components/Table";
import PrepareRule from "@/pages/student/deal/prepare/PrepareRule";
import RecallOrPaymentModal from "@/pages/student/deal/prepare/recallOrPaymentModal";

const originData = [];
for (let i = 0; i < 20; i++) {
  originData.push({
    _key: i.toString(),
    period: `${i}`,
    openingBalance: 32,
    typeName: '假数据',
    amount: null,
  });
}

const PrepareTable = (props) => {
  const {dispatch, dataSource, loading} = props;
  const {classHourId} = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {}

  useEffect(() => {
    if (classHourId) {
      // 查询列表
      dispatch({
        type: 'studentPrepare/queryBankDepositReserves',
        payload: {classHourId}
      })
    }
  }, [])

  // modal显示状态 ----start-----
  const [recallOrPaymentModalVisible, setRecallOrPaymentModalVisible] = useState(false);
  const [typeModal, setTypeModal] = useState({})
  // 显示modal
  const handleRecallOrPaymentShowModal = (type) => {
    if (type === 'RECALL') {
      setTypeModal({type, 'title': '调回'})
    } else if (type === 'PAYMENT') {
      setTypeModal({type, 'title': '缴纳'})
    }
    setRecallOrPaymentModalVisible(true);
  };

  // 关闭modal
  const handleRecallOrPaymentCancelModal = () => {
    setRecallOrPaymentModalVisible(false);
  };
  // modal显示状态 ----end-----


  const columns = [
    {
      title: '期数',
      dataIndex: 'period',
      key: 'period',
      render:(period)=>`第${period}期`
    },
    {
      title: '交易类型',
      dataIndex: 'typeName',
      key: 'typeName',
    },
    {
      title: '准备金账户余额(万元)',
      dataIndex: 'openingBalance',
      key: 'openingBalance',
      render: (openingBalance) => !openingBalance ? null : `${openingBalance / 10000}`
    },
    {
      title: '当期准备金调整(万元)',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => !amount ? null : `${amount / 10000}`
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (_, {amount}) => {
        return (
          <>
            {
              !amount ? (
                <Space>
                  <Button type="primary" size="small"
                          onClick={() => handleRecallOrPaymentShowModal('RECALL')}>调回</Button>
                  <Button type="primary" size="small"
                          onClick={() => handleRecallOrPaymentShowModal('PAYMENT')}>缴纳</Button>
                </Space>
              ) : null
            }
          </>
        )
      }
    },
  ];
  return (
    <Card
      title='准备金管理'
      bordered={false}
      type='inner'
    >
      <PublicTable
        // dataSource={dataSource}
        dataSource={originData}
        columns={columns}
        loding={loading}
        bordered
        // pagination={true}
      />
      <PrepareRule/>
      {/*调回缴纳modal*/}
      <RecallOrPaymentModal
        recallOrPaymentModalVisible={recallOrPaymentModalVisible}
        handleRecallOrPaymentCancelModal={handleRecallOrPaymentCancelModal}
        typeModal={typeModal}
      />
    </Card>
  );
};

export default connect(({studentPrepare, loading}) => ({
  dataSource: studentPrepare.bankDepositReservesData,
  loading: loading.effects['studentPrepare/queryBankDepositReserves']
}))(PrepareTable);
