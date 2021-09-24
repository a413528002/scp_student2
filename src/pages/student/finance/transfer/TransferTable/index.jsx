import React from 'react';
import PublicTable from '@/components/Table';
import { Button, Card } from 'antd';

const TransferTable = () => {
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
      title: '注入资金(万元)',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  return <PublicTable dataSource={dataSource} columns={columns} bordered />;
};

export default TransferTable;
