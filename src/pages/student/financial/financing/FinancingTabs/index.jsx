import React from 'react';
import {Tabs} from 'antd';
import FinancingTabMarket from "@/pages/financial/financing/FinancingTabMarket";
import FinancingTabRecord from "@/pages/financial/financing/FinancingTabRecord";

const {TabPane} = Tabs;

const FinancingTabs = () => {
  return (
    <Tabs defaultActiveKey="1" >
      <TabPane tab="投融资市场" key="1">
        <FinancingTabMarket/>
      </TabPane>
      <TabPane tab="抢单记录" key="2">
        <FinancingTabRecord/>
      </TabPane>
    </Tabs>
  );
};

export default FinancingTabs;
