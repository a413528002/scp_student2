import React from 'react';
import { Card } from 'antd';
import FinancingTabs from '@/pages/student/financial/financing/FinancingTabs';

const Financing = () => {
  return (
    <Card title="投融资市场" bordered={false} type="inner">
      <FinancingTabs />
    </Card>
  );
};

export default Financing;
