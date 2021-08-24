import React, { useState } from 'react';
import { Tabs } from 'antd';
import LoanTabRob from '@/pages/student/deal/loan/LoanTabRob';
import LoanTabRecord from '@/pages/student/deal/loan/LoanTabRecord';

const {TabPane} = Tabs;

const LoanTabs = () => {
  const [curTabKey,setCurTabKey] = useState('1')
  // 切换tab的回调
  const changeTabs = (activeKey)=>{
    setCurTabKey(activeKey)
  }
  return (
    <Tabs defaultActiveKey={curTabKey} onChange={changeTabs}>
      <TabPane tab="贷款抢单" key="1">
        <LoanTabRob/>
      </TabPane>
      <TabPane tab="抢单记录" key="2">
        { curTabKey === '2' ?  <LoanTabRecord/> : <div></div> }
      </TabPane>
    </Tabs>
  );
};

export default LoanTabs;
