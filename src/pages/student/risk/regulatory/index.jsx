import React from 'react';
import { Card } from 'antd';
import RegulatoryList from '@/pages/student/risk/regulatory/RegulatoryList';
import RegulatoryRule from "@/pages/student/risk/regulatory/RegulatoryRule";

const Regulatory = () => {
  return (
    <Card title="风险监管" bordered={false} type="inner">
      <RegulatoryList />
      <RegulatoryRule />
    </Card>
  );
};

export default Regulatory;
