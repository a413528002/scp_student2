import React, { useEffect } from 'react';
import PublicTable from '@/components/Table';
import { toPercent } from '@/utils/commonUtils';
import { connect } from 'umi';
import { Tag } from 'antd';
import Tags from "@/components/Tags";
import Million from "@/components/Million";

const LoanTabRecord = (props) => {
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
      dataIndex: 'loanTypeName',
      render: (loanTypeName) => <Tags>{loanTypeName}</Tags>,
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
      title: '贷款分类',
      dataIndex: 'creditRating',
    },
    {
      title: '利率类型',
      dataIndex: 'rateTypeName',
      render: (rateTypeName) => <Tags>{rateTypeName}</Tags>,
    },
    {
      title: '质押/担保金额(万元)',
      dataIndex: 'mgMoney',
      render: (amount) => <Million>{amount}</Million>,
    },
    {
      title: '渠道类型',
      dataIndex: 'channelName',
    },
    {
      title: '区域',
      dataIndex: 'regionName',
    },
  ];

  useEffect(() => {
    if (classHourId) {
      dispatch({
        type: 'studentGrabLoan/queryLogs',
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

export default connect(({studentGrabLoan, loading}) => ({
  dataSource: studentGrabLoan.logData,
  loading:loading.effects['studentGrabLoan/queryLogs'],
}))(LoanTabRecord);
