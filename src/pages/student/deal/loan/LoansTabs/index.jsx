import React from 'react';
import {Tabs} from 'antd';
import LoansTabRob from "@/pages/student/deal/loan/LoansTabRob";
import LoansTabRecord from "@/pages/student/deal/loan/LoansTabRecord";

const {TabPane} = Tabs;

const LoansTabs = () => {
  return (
    <Tabs defaultActiveKey="1" >
      <TabPane tab="贷款抢单" key="1">
        <LoansTabRob/>
      </TabPane>
      <TabPane tab="抢单记录" key="2">
        <LoansTabRecord/>
      </TabPane>
    </Tabs>
  );
};

export default LoansTabs;
