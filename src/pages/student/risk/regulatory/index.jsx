import React from 'react';
import { Card } from 'antd';
import RegulatoryList from '@/pages/student/risk/regulatory/RegulatoryList';

const Regulatory = () => {
  return (
    <Card title="风险监管" bordered={false} type="inner">
      <RegulatoryList />
    </Card>
  );
};

export default Regulatory;
