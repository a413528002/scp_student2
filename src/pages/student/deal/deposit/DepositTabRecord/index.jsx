import React, { useEffect } from 'react';
import PublicTable from '@/components/Table';
import { connect } from 'umi';
import { toPercent } from '@/utils/commonUtils';
import { Tag } from 'antd';
import Tags from "@/components/Tags";
import Million from "@/components/Million";

const DepositTabRecord = (props) => {
  const {dispatch, dataSource} = props
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
      render: (customerTypeName) => <Tags>{customerTypeName}</Tags>,
    },
    {
      title: '金额(万元)',
      dataIndex: 'amount',
      render: (amount) => <Million>{amount}</Million>,
    },
    {
      title: '利率',
      dataIndex: 'expectRate',
      render: (val) => toPercent(val),
    },
    {
      title: '期限',
      dataIndex: 'term',
    },
    {
      title: '利率类型',
      dataIndex: 'rateTypeName',
      render: (rateTypeName) => <Tags>{rateTypeName}</Tags>,
    },
    {
      title: '渠道类型',
      dataIndex: 'channelName',
    },
    {
      title: '区域',
      dataIndex: 'region',
    },
  ];

  useEffect(() => {
    if (classHourId) {
      dispatch({
        type: 'studentGrabDeposit/queryLogs',
        payload: { classHourId }
      })
    }
  }, [classHourId])

  return (
    <div>
      <PublicTable
        dataSource={dataSource}
        columns={columns}
        bordered
        loading={loading}
        pagination={{
          defaultPageSize: 10,
          total: dataSource.length,
        }}
      />
    </div>
  );
};

export default connect(({studentGrabDeposit, loading}) => ({
  dataSource: studentGrabDeposit.logData,
  loading:loading.effects['studentGrabDeposit/queryLogs'],
}))(DepositTabRecord);
