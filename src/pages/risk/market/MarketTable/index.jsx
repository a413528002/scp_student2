import React from 'react';
import PublicTable from "@/components/Table";
import HandleRule from "@/pages/risk/handle/HandleRule";
import {Card} from "antd";
import MarketRule from "@/pages/risk/market/MarketRule";

const MarketTable = () => {
  const dataSource = [];
  const columns = [
    {
      title: '期数',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '所属期数',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '贷款总额(万元)',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '存款总额(万元)',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '利率敏感性缺口',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '市场风险系数',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '风险小计',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  return (
    <Card
      title='市场风险'
      bordered={false}
      type='inner'
    >
      <PublicTable
        dataSource={dataSource}
        columns={columns}
        bordered
      />
      <MarketRule/>
    </Card>
  );
};

export default MarketTable;
