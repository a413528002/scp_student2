import React from 'react';
import {Tabs} from 'antd';
import CreditorsTabMarket from "@/pages/financial/creditors/CreditorsTabMarket";
import CreditorsTabRecord from "@/pages/financial/creditors/CreditorsTabRecord";

const {TabPane} = Tabs;

const CreditorsTabs = () => {
  return (
    <Tabs defaultActiveKey="1" >
      <TabPane tab="债权市场" key="1">
       <CreditorsTabMarket/>
      </TabPane>
      <TabPane tab="抢单记录" key="2">
        <CreditorsTabRecord/>
      </TabPane>
    </Tabs>
  );
};

export default CreditorsTabs;
