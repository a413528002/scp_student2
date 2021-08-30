import React from 'react';
import { Card } from 'antd';
import StatementTabs from '@/pages/student/finance/statement/StatementTabs';

const statement = () => {
  return (
    <Card title="财务报表" bordered={false} type="inner">
      <StatementTabs />
    </Card>
  );
};

export default statement;
