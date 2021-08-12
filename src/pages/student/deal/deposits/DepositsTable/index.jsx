import React, {useEffect} from 'react';
import {connect} from 'umi'
import {Button, Card} from "antd";
import PublicTable from "@/components/Table";

const originData = [];
for (let i = 0; i < 20; i++) {
  originData.push({
    _key: i.toString(),
    period: `${i}`,
    rateTypeName: '假数据',
    amount: Math.random() * 100000000,
  });
}
const DepositsTable = (props) => {
  const {dispatch, dataSource, loading} = props;
  const {classHourId} = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {}
  useEffect(() => {
    if (classHourId) {
      dispatch({
        type: 'studentDeposits/queryDeposits',
        payload: {classHourId}
      })
    }
  }, [])
  // const dataSource = [];
  const columns = [
    {
      title: '序号',
      dataIndex: 'notation',
      key: 'notation',
      render: (text, record, index) => `${index + 1}`
    },
    {
      title: '业务类型',
      dataIndex: 'age',
      key: 'age',
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
      title: '存款期数',
      dataIndex: 'term',
      key: 'term',
    },
    {
      title: '所属期数',
      dataIndex: 'period',
      key: 'period',
    },
    {
      title: '利率类型',
      dataIndex: 'rateTypeName',
      key: 'rateTypeName',
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
      render: () => {
        return <Button type="primary" size="small">计息</Button>
      }
    },
  ];
  return (
    <Card
      title='存款管理'
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
    </Card>
  );
};

export default connect(({studentDeposits, loading}) => ({
  dataSource: studentDeposits.queryDepositsData,
  loading: loading.effects['studentDeposits/queryDeposits']
}))(DepositsTable);
