import React, {useState} from 'react';
import {Button, Card, Image, Empty} from 'antd';
import SubmitContent from "@/pages/teacher/business/SubmitContent";
import InstitutionsContent from "@/pages/teacher/business/InstitutionsContent";
import ErrorContent from "@/pages/teacher/business/ErrorContent";

const BusinessTabs = () => {
  const [activeTabKey, setActiveTabKey] = useState('submit')

  // tabs切换
  const onTabChange = (key) => {
    setActiveTabKey(key);
  };
  const tabList = [
    {
      key: 'submit',
      tab: '提交记录',
    },
    {
      key: 'institutions',
      tab: '机构建设',
    },
    {
      key: 'error',
      tab: '错误记录',
    }
  ];

  const contentList = {
    submit: <SubmitContent/>,
    institutions: <InstitutionsContent/>,
    error: <ErrorContent/>,
  };
  return (
    <>
      <Card
        style={{width: '100%'}}
        tabList={tabList}
        activeTabKey={activeTabKey}
        onTabChange={key => {
          onTabChange(key);
        }}
      >
        {contentList[activeTabKey]}
      </Card>
    </>
  );
};

export default BusinessTabs;
