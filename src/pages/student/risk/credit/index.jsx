import React from 'react';
import { Card } from 'antd';
import CreditTable from '@/pages/student/risk/credit/CreditTable';
import CreditRule from '@/pages/student/risk/credit/CreditRule';

const Credit = () => {
  return (
    <Card title="信用风险" bordered={false} type="inner">
      <CreditTable />
      <CreditRule />
    </Card>
  );
};

export default Credit;
