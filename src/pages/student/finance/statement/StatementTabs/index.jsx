import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Button, Empty, Radio, Space, Tabs } from 'antd';
import StatementTips from '@/pages/student/finance/statement/StatementTips';
import StatementContent from '@/pages/student/finance/statement/StatementContent';

const { TabPane } = Tabs;
const StatementTabs = (props) => {
  // 加载的loading
  const {
    dispatch,
    endBusinessLoading,
    endFinanceLoading,
    submitStatementsLoading,
    queryBankReportLoading,
    saveBankReportLoading,
  } = props;
  const {
    bankPeriodInfoData,
    tipsInfo,
    tabList,
    firstTabPaneDefault,
    queryBankReportData: { periodCur, periodTtl, period ,reportCode, reportDetails, titleItem, titleB, titleE, titleM },
  } = props;
  // 获取课堂id
  const { classHourId } = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {};

  // ButtonList disabled禁用状态
  const { businessEndFlag, financeEndFlag, reportFlag } = bankPeriodInfoData;
  const { errMsg, consultationTipsState } = tipsInfo;

  /**
   * 保存报表
   * @param data
   */
  const saveBankReport = (_reportDetails) => {
    if (classHourId) {
      dispatch({
        type: 'studentStatement/saveBankReport',
        payload: { classHourId, reportDetails: _reportDetails },
      });
    }
  }

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
  }, [classHourId]);

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
  }, [classHourId]);

  /**
   * 查询银行报表 ---START---
   * @param reportCode 当前的tab
   * @param period 变化期数
   */
  const queryBankReport = (_reportCode, _period) => {
    dispatch({
      type: 'studentStatement/queryBankReport',
      payload: { classHourId, reportCode: _reportCode, period: _period },
    });
  };
  // 页面挂载时查询银行报表
  useEffect(() => {
    if (classHourId && firstTabPaneDefault) {
      queryBankReport(firstTabPaneDefault);
    }
  }, [classHourId,firstTabPaneDefault]);

  // tabs切换时的回调
  const onChangeTabs = (_reportCode) => {
    if (classHourId) {
      queryBankReport(_reportCode);
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

  return (
    <>
      {consultationTipsState && <StatementTips errMsg={errMsg} />}
      {tabList?.length === 0 ? (
        <Empty />
      ) : (
        <>
          <Tabs onChange={onChangeTabs} tabBarExtraContent={operations}>
            {tabList.map(({ reportName, reportCode: _reportCode }) => (
              <TabPane tab={reportName} key={_reportCode} />
            ))}
          </Tabs>
          <Radio.Group value={period} onChange={(e) => queryBankReport(reportCode, e.target.value)} buttonStyle="solid">
            {new Array(periodTtl).fill().map((_, index) => {
              return (
                <Radio.Button value={index + 1} key={index} disabled={index + 1 > periodCur}>
                  {`第${index + 1}期`}
                </Radio.Button>
              );
            })}
          </Radio.Group>
          <StatementContent
            reportDetails={reportDetails}
            titleItem={titleItem}
            titleB={titleB}
            titleM={titleM}
            titleE={titleE}
            editable={periodCur === period}
            onSubmit={saveBankReport}
            loading={queryBankReportLoading || saveBankReportLoading}
          />
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
  queryBankReportLoading: loading.effects['studentStatement/queryBankReport'],
  saveBankReportLoading: loading.effects['studentStatement/saveBankReport'],
  endBusinessLoading: loading.effects['studentStatement/endBusiness'],
  endFinanceLoading: loading.effects['studentStatement/endFinance'],
  submitStatementsLoading: loading.effects['studentStatement/submitStatements'],
}))(StatementTabs);
