import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Tabs, Button, Space, Empty, Card } from 'antd';
import StatementTips from '@/pages/student/finance/statement/StatementTips';
import StatementContent from '@/pages/student/finance/statement/StatementContent';

const { TabPane } = Tabs;
const StatementTabs = (props) => {
  // 加载的loading
  const {
    dispatch,
    endBusinessLoading,
    endFinanceLoading,
    submitReportLoading,
    saveBankReportLoading,
  } = props;
  const {
    bankPeriodInfoData,
    tipsInfo,
    tabList,
    firstTabPaneDefault,
    queryBankReportData: { periodCur },
  } = props;
  // 获取课堂id
  const { classHourId } = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {};

  // ButtonList disabled禁用状态
  const { businessEndFlag, financeEndFlag, reportFlag } = bankPeriodInfoData;
  const { errMsg, consultationTipsState } = tipsInfo;

  // 提交的数据
  const [tableDataLeft, setTableDataLeft] = useState([]);
  const [tableDataRight, setTableDataRight] = useState([]);
  // 是否可编辑
  const [selectedDisabled, setSelectedDisabled] = useState(true);

  /**
   * 询银行期间信息
   */
  useEffect(() => {
    if (classHourId) {
      // 查询银行期间信息
      dispatch({
        type: 'studentStatement/queryBankPeriodInfo',
        payload: { classHourId },
      });
    }
  }, []);

  /**
   * 查询课堂报表列表
   */
  useEffect(() => {
    if (classHourId) {
      // 查询课堂报表列表
      dispatch({
        type: 'studentStatement/queryClassReports',
        payload: { classHourId },
      });
    }
  }, []);

  /**
   * 查询银行报表 ---START---
   * @param reportCode 当前的tab
   * @param period 变化期数
   */
  const queryBankReport = (reportCode, period) => {
    // 设置是否可编辑
    period && setSelectedDisabled(period === periodCur);

    dispatch({
      type: 'studentStatement/queryBankReport',
      payload: { classHourId, reportCode, period },
    });
  };
  // 页面挂载时查询银行报表
  useEffect(() => {
    if (classHourId && firstTabPaneDefault) {
      queryBankReport(firstTabPaneDefault);
    }
  }, [firstTabPaneDefault]);

  // tabs切换时的回调
  const onChangeTabs = (reportCode) => {
    if (classHourId) {
      queryBankReport(reportCode);
    }
  };

  // 保存报表
  const saveBankReport = () => {
    if (classHourId) {
      // 合并两个数组数据
      const reportDetails = tableDataLeft.concat(tableDataRight);
      dispatch({
        type: 'studentStatement/saveBankReport',
        payload: { classHourId, reportDetails },
      });
    }
  };

  // 查询银行报表  ---END---

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
  const submitReport = () => {
    if (classHourId) {
      dispatch({
        type: 'studentStatement/submitReport',
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
        onClick={submitReport}
        loading={submitReportLoading}
        disabled={reportFlag}
      >
        提交报表
      </Button>
      <Button type="primary">导出报表</Button>
    </Space>
  );

  return (
    <>
      {consultationTipsState && <StatementTips errMsg={errMsg} />}
      {tabList?.length === 0 ? (
        <Empty />
      ) : (
        <>
          <Tabs onChange={onChangeTabs} tabBarExtraContent={operations}>
            {tabList.map(({ reportName, reportCode }) => (
              <TabPane tab={reportName} key={reportCode}>
                <StatementContent
                  queryBankReport={queryBankReport}
                  setTableDataLeft={setTableDataLeft}
                  setTableDataRight={setTableDataRight}
                  selectedDisabled={selectedDisabled}
                />
              </TabPane>
            ))}
          </Tabs>
          {selectedDisabled && (
            <Card bordered={false} style={{ textAlign: 'center' }}>
              <Button type="primary" onClick={saveBankReport} loading={saveBankReportLoading}>
                保存报表
              </Button>
            </Card>
          )}
        </>
      )}
    </>
  );
};

export default connect(({ studentStatement, loading }) => ({
  bankPeriodInfoData: studentStatement.queryBankPeriodInfoData,
  tipsInfo: studentStatement.consultationTipsInfo,
  tabList: studentStatement.queryClassReportsTabsData,
  firstTabPaneDefault: studentStatement.firstTabPaneDefault,
  queryBankReportData: studentStatement.queryBankReportData,
  endBusinessLoading: loading.effects['studentStatement/endBusiness'],
  endFinanceLoading: loading.effects['studentStatement/endFinance'],
  submitReportLoading: loading.effects['studentStatement/submitReport'],
  saveBankReportLoading: loading.effects['studentStatement/saveBankReport'],
}))(StatementTabs);
