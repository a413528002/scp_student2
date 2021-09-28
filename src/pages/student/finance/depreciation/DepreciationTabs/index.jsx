import React from 'react';
import { Tabs } from 'antd';
import DepreciationManage from '@/pages/student/finance/depreciation/DepreciationManage';
import DepreciationDetail from '@/pages/student/finance/depreciation/DepreciationDetail';

const { TabPane } = Tabs;
const DepreciationTabs = () => {
  function callback(key) {
    console.log(key);
  }

  const initialPanes = [
    { tab: '资产折旧管理', content: <DepreciationManage />, key: 'manage' },
    { tab: '资产折旧明细', content: <DepreciationDetail />, key: 'detail' },
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

export default DepreciationTabs;
