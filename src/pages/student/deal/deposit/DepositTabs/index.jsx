import React, { useState } from 'react';
import { Tabs } from 'antd';
import DepositTabRob from '@/pages/student/deal/deposit/DepositTabRob';
import DepositTabRecord from '@/pages/student/deal/deposit/DepositTabRecord';

const {TabPane} = Tabs;

const DepositTabs = () => {

  const [curTabKey,setCurTabKey] = useState('1')

  // 切换tab的回调
  const changeTabs = (activeKey)=>{
    setCurTabKey(activeKey)
  }

  return (
    <Tabs defaultActiveKey={curTabKey} onChange={changeTabs}>
      <TabPane tab="存款抢单" key="1">
        <DepositTabRob/>
      </TabPane>
      <TabPane tab="抢单记录" key="2">
        { curTabKey === '2' ?  <DepositTabRecord/> : <div></div> }
      </TabPane>
    </Tabs>
  );
};

export default DepositTabs;
