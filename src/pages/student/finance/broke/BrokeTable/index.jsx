import React from 'react';
import PublicTable from "@/components/Table";
import {Button,Card} from "antd";
import BrokeRule from "@/pages/student/finance/broke/BrokeRule";

const BrokeTable = () => {
  const dataSource = [];
  const columns = [
    {
      title: '银行名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '期数',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '申请注入资金(万元)',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  return (
    <Card
      title='破产管理'
      bordered={false}
      type='inner'
      extra={<Button type='primary'>破产申请</Button>}
    >
      <PublicTable
        dataSource={dataSource}
        columns={columns}
        bordered
      />
      <BrokeRule/>
    </Card>
  );
};

export default BrokeTable;
