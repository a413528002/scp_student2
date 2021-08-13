import React, {useEffect} from 'react';
import {connect} from 'umi'
import PublicTable from "@/components/Table";

const CreditorsTabRecord = (props) => {
  const {dispatch, loading} = props;
  const {dataSource} = props;
  // 课堂id
  const {classHourId} = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {}
  useEffect(() => {
    if (classHourId) {
      // 查询债券抢单记录
      dispatch({
        type: 'studentCreditors/gdebtQueryLogs',
        payload: {classHourId}
      })
    }
  }, [])
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
      title: '区域',
      dataIndex: 'regionName',
      key: 'regionName',
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
      title: '期限',
      dataIndex: 'term',
      key: 'term',
    },
    {
      title: '收益(万元)',
      dataIndex: 'mgMoney',
      key: 'mgMoney',
      render: (mgMoney) => !mgMoney ? null : `${mgMoney / 10000}`
    },
  ];
  return (
    <div>
      <PublicTable
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        bordered
      />
    </div>
  );
};

export default connect(({studentCreditors, loading}) => ({
  dataSource: studentCreditors.gdebtQueryLogsDate,
  loading: loading.effects['studentCreditors/gdebtQueryLogs']
}))(CreditorsTabRecord);
