import React from 'react';
import {Card} from "antd";
import PublicTable from "@/components/Table";
import PrepareRule from "@/pages/student/deal/prepare/PrepareRule";

const PrepareTable = () => {
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
      title: '准备金账户余额(万元)',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '当期准备金调整(万元)',
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
      title='准备金管理'
      bordered={false}
      type='inner'
    >
      <PublicTable
        dataSource={dataSource}
        columns={columns}
        bordered
      />
      <PrepareRule/>
    </Card>
  );
};

export default PrepareTable;
