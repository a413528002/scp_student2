import React from 'react';
import { Tabs } from 'antd';
import AssetDetail from "@/pages/student/deal/asset/AssetDetail";
import AssetDealWith from "@/pages/student/deal/asset/AssetDealWith";

const { TabPane } = Tabs;
const AssetTabs = () => {
  function callback(key) {
    console.log(key);
  }

  const initialPanes = [
    { tab: '清收变卖处理', content: <AssetDealWith />, key: 'dealWith' },
    { tab: '清收变卖明细', content: <AssetDetail />, key: 'detail' },
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
