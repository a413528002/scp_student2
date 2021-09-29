import React from 'react';
import { Tabs } from 'antd';
import AssetRealization from '@/pages/student/deal/asset/AssetRealization';
import AssetLiquidate from '@/pages/student/deal/asset/AssetLiquidate';

const { TabPane } = Tabs;
const AssetTabs = () => {
  function callback(key) {
    console.log(key);
  }

  const initialPanes = [
    { tab: '清收变卖处理', content: <AssetRealization />, key: 'realization' },
    { tab: '清收变卖明细', content: <AssetLiquidate />, key: 'liquidate' },
  ];
  return (
    <Tabs defaultActiveKey="1" onChange={callback}>
      {initialPanes.map(({ tab, key, content }) => (
        <TabPane tab={tab} key={key}>
          {content}
        </TabPane>
      ))}
    </Tabs>
  );
};

export default AssetTabs;
