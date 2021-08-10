import React, { useEffect } from 'react';
import PublicTable from "@/components/Table";
import styles from '@/pages/student/deal/deposit/index.less'
import { connect } from 'umi';
import { Button, Popconfirm, Space } from 'antd';

const DepositTabRob = (props) => {
  const {dispatch, dataSource, grabStartTime} = props
  const {loading} = props

  const {classHourId} = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {}

  const columns = [
    {
      title: '序号',
      dataIndex: 'orderNo',
    },
    {
      title: '业务类型',
      dataIndex: 'customerTypeName',
    },
    {
      title: '金额(万元)',
      dataIndex: 'amount',
    },
    {
      title: '利率',
      dataIndex: 'expectRate',
    },
    {
      title: '期限',
      dataIndex: 'term',
    },
    {
      title: '利率类型',
      dataIndex: 'rateTypeName',
    },
    {
      title: '渠道类型',
      dataIndex: 'channelName',
    },
    {
      title: '区域',
      dataIndex: 'region',
    },
    {
      title: '抢单',
      render: (_, {financialMarketId}) => {
        return (
          <Button>抢单</Button>
        )
      }
    },
  ];

  useEffect(() => {
    if (classHourId) {
      dispatch({
        type: 'studentGrabDeposit/queryFinancialMarkets',
        payload: { classHourId }
      })
    }
  }, [classHourId])

  return (
    <>
      <PublicTable
        dataSource={dataSource}
        columns={columns}
        bordered
        loading={loading}
        pagination={false}
      />
      <p className={styles.timer}>抢单倒计时：<span>30秒</span></p>
    </>

  );
};

export default connect(({studentGrabDeposit, loading}) => ({
  dataSource: studentGrabDeposit.financialMarketData,
  grabStartTime: studentGrabDeposit.grabStartTime,
  loading:loading.effects['/studentGrabDeposit/queryFinancialMarkets']
}))(DepositTabRob);
