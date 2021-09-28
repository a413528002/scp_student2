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
      title: '所属期数',
      dataIndex: 'period',
      key: 'period',
      render: (period) => `第${period}期`,
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
