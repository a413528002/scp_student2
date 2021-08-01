import React from 'react';
import {Card} from "antd";
import PublicTable from "@/components/Table";
import ProvisionRule from "@/pages/deal/provision/ProvisionRule";

const ProvisionTable = () => {
  const dataSource = [];
  const columns = [
    {
      title: '期数',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '交易类型',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '计提前余额(万元)',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '计提金额(万元)',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '计提后余额(万元)',
      dataIndex: 'address',
      key: 'address',
    },

    {
      title: '操作',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  return (
    <Card
      title='拨备管理'
      bordered={false}
      type='inner'
    >
      <PublicTable
        dataSource={dataSource}
        columns={columns}
        bordered
      />
      <ProvisionRule/>
    </Card>
  );
};

export default ProvisionTable;
