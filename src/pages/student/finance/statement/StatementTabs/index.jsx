import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Tabs, Button, Space } from 'antd';
import StatementTips from '@/pages/student/finance/statement/StatementTips';

const { TabPane } = Tabs;
const StatementTabs = (props) => {
  const { dispatch, endBusinessLoading, endFinanceLoading, submitStatementsLoading } = props;
  const { bankPeriodInfoData, tipsInfo } = props;
  // ButtonList disabled禁用状态
  const { businessEndFlag, financeEndFlag, reportFlag } = bankPeriodInfoData;
  const { errMsg, consultationTipsState } = tipsInfo;
  // 获取课堂id
  const { classHourId } = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {};

  useEffect(() => {
    if (classHourId) {
      dispatch({
        type: 'studentStatement/queryBankPeriodInfo',
        payload: { classHourId },
      });
    }
  }, []);
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

  // 提交报表
  const submitStatements = () => {
    if (classHourId) {
      dispatch({
        type: 'studentStatement/submitStatements',
        payload: { classHourId },
      });
    }
  };
  // tabBarExtraContent ButtonList
  const operations = (
    <Space size={[8, 16]} wrap>
      <Button
        type="primary"
        onClick={endBusiness}
        loading={endBusinessLoading}
        disabled={businessEndFlag}
      >
        业务结账
      </Button>
      <Button
        type="primary"
        onClick={endFinance}
        loading={endFinanceLoading}
        disabled={financeEndFlag}
      >
        财务结账
      </Button>
      <Button
        type="primary"
        onClick={submitStatements}
        loading={submitStatementsLoading}
        disabled={reportFlag}
      >
        提交报表
      </Button>
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
    <>
      {consultationTipsState && <StatementTips errMsg={errMsg} />}
      <Tabs onChange={callback} tabBarExtraContent={operations}>
        {tabList.map(({ tab, key }) => (
          <TabPane tab={tab} key={key}>
            contentList[key]
          </TabPane>
        ))}
      </Tabs>
    </>
  );
};

export default connect(({ studentStatement, loading }) => ({
  bankPeriodInfoData: studentStatement.queryBankPeriodInfoData,
  tipsInfo: studentStatement.consultationTipsInfo,
  endBusinessLoading: loading.effects['studentStatement/endBusiness'],
  endFinanceLoading: loading.effects['studentStatement/endFinance'],
  submitStatementsLoading: loading.effects['studentStatement/submitStatements'],
}))(StatementTabs);
