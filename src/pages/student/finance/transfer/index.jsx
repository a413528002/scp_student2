import React from 'react';
import TransferTable from '@/pages/student/finance/transfer/TransferTable';
import TransferRule from '@/pages/student/finance/transfer/TransferRule';
import { Card, Button } from 'antd';

const Transfer = () => {
  return (
    <Card
      title="资金转账"
      bordered={false}
      type="inner"
      extra={<Button type="primary">保存</Button>}
    >
      <TransferTable />
      <TransferRule />
    </Card>
  );
};

export default Transfer;
