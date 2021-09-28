import React from 'react';
import { Card } from 'antd';
import DepreciationTabs from "@/pages/student/finance/depreciation/DepreciationTabs";

const Depreciation = () => {
  return (
    <Card title="折旧管理" bordered={false} type="inner">
      <DepreciationTabs />
    </Card>
  );
};

export default Depreciation;
