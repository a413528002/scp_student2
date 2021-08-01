import React from 'react';
import {Tabs} from 'antd';
import DepositTabRob from "@/pages/deal/deposit/DepositTabRob";
import DepositTabRecord from "@/pages/deal/deposit/DepositTabRecord";

const {TabPane} = Tabs;

const DepositTabs = () => {
  return (
    <Tabs defaultActiveKey="1" >
      <TabPane tab="存款抢单" key="1">
        <DepositTabRob/>
      </TabPane>
      <TabPane tab="抢单记录" key="2">
        <DepositTabRecord/>
      </TabPane>
    </Tabs>
  );
};

export default DepositTabs;
