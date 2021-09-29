import React from 'react';
import { Card } from 'antd';
import MarketTable from '@/pages/student/risk/market/MarketTable';
import MarketRule from '@/pages/student/risk/market/MarketRule';

const Market = () => {
  return (
    <Card title="市场风险" bordered={false} type="inner">
      <MarketTable />
      <MarketRule />
    </Card>
  );
};

export default Market;
