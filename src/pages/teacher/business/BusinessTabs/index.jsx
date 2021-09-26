import React from 'react';
import { Tabs } from 'antd';
import SubmitContent from '@/pages/teacher/business/SubmitContent';
import InstitutionsContent from '@/pages/teacher/business/InstitutionsContent';
import ErrorContent from '@/pages/teacher/business/ErrorContent';
import MarketingContent from '@/pages/teacher/business/MarketingContent';
import DepositContent from '@/pages/teacher/business/depositContent';
import LoanContent from '@/pages/teacher/business/loanContent';

const { TabPane } = Tabs;
const BusinessTabs = () => {
  function callback(key) {
    console.log(key);
  }

  // tabList
  const tabList = [
    {
      key: 'submit',
      tab: '提交记录',
      content: <SubmitContent />,
    },
    {
      key: 'marketing',
      tab: '营销费用',
      content: <MarketingContent />,
    },
    {
      key: 'institutions',
      tab: '机构建设',
      content: <InstitutionsContent />,
    },
    {
      key: 'deposit',
      tab: '存款记录',
      content: <DepositContent />,
    },
    {
      key: 'loan',
      tab: '贷款记录',
      content: <LoanContent />,
    },
    {
      key: 'error',
      tab: '错误记录',
      content: <ErrorContent />,
    },
  ];

  return (
    <Tabs onChange={callback}>
      {tabList.map(({ tab, key, content }) => (
        <TabPane tab={tab} key={key}>
          {content}
        </TabPane>
      ))}
    </Tabs>
  );
};

export default BusinessTabs;
