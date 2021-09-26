import React from 'react';
import { Card } from 'antd';
import AssetTabs from '@/pages/student/deal/asset/AssetTabs';
import AssetRule from '@/pages/student/deal/asset/AssetRule';

const Asset = () => {
  return (
    <Card title="不良资产管理" bordered={false} type="inner">
      <AssetTabs />
      <AssetRule />
    </Card>
  );
};

export default Asset;
