import React from 'react';
import DepositAndLoanInterestRate from '@/pages/student/chart/DepositAndLoanInterestRate';
import { Tabs } from 'antd';

const { TabPane } = Tabs;


function callback(key) {
  console.log(key);
}


const Chart = () => {
  return (
    <>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="存贷款利率" key="1">
          <DepositAndLoanInterestRate/>
        </TabPane>
        <TabPane tab="存贷款总量" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="存贷款单量" key="3">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="信用风险" key="4">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="投融资市场" key="5">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="债券市场" key="6">
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
    </>
  );
};

export default Chart;
