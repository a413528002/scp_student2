import React from 'react';
import { connect } from 'umi';
import { Tabs, Button, Space } from 'antd';

const { TabPane } = Tabs;
const StatementTabs = (props) => {
  const { dispatch, endBusinessLoading, endFinanceLoading } = props;
  // 获取课堂id
  const { classHourId } = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {};

  // 业务结账
  const endBusiness = () => {
    if (classHourId) {
      dispatch({
        type: 'studentStatement/endBusiness',
        payload: { classHourId },
      });
    }
  };

  // 财务结账
  const endFinance = () => {
    if (classHourId) {
      dispatch({
        type: 'studentStatement/endFinance',
        payload: { classHourId },
      });
    }
  };
  // tabBarExtraContent ButtonList
  const operations = (
    <Space>
      <Button type="primary" onClick={endBusiness} loading={endBusinessLoading}>
        业务结账
      </Button>
      <Button type="primary" onClick={endFinance} loading={endFinanceLoading}>
        财务结账
      </Button>
      <Button type="primary">提交报表</Button>
      <Button type="primary">导出报表</Button>
    </Space>
  );

  function callback(key) {
    console.log(key);
  }

  const tabList = [
    {
      key: 'financialPosition',
      tab: '资产负债表',
    },
    {
      key: 'cashFlows',
      tab: '现金流量表',
    },
    {
      key: 'incomeStatement',
      tab: '利润表',
    },
  ];
  return (
    <Tabs onChange={callback} tabBarExtraContent={operations}>
      {tabList.map(({ tab, key }) => (
        <TabPane tab={tab} key={key}>
          contentList[key]
        </TabPane>
      ))}
    </Tabs>
  );
};

export default connect(({ loading }) => ({
  endBusinessLoading: loading.effects['studentStatement/endBusiness'],
  endFinanceLoading: loading.effects['studentStatement/endFinance'],
}))(StatementTabs);
