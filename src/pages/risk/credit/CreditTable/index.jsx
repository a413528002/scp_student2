import React from 'react';
import PublicTable from "@/components/Table";
import {Card} from "antd";
import CreditRule from "@/pages/risk/credit/CreditRule";

const CreditTable = () => {
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
      title: '业务类型',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '利率属性',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '贷款分类',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '信用评级',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '金额(万元)',
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
      title='信用风险'
      bordered={false}
      type='inner'
    >
      <PublicTable
        dataSource={dataSource}
        columns={columns}
        bordered
      />
      <CreditRule/>
    </Card>
  );
};

export default CreditTable;
