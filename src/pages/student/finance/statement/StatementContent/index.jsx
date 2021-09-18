import React from 'react';
import { connect } from 'umi';
import { Space, Radio } from 'antd';
import ContentTableLeft from '@/pages/student/finance/statement/contentTableLeft';
import ContentTableRight from '@/pages/student/finance/statement/contentTableRight';

const StatementContent = (props) => {
  const {
    queryBankReportData: { period, periodCur, periodTtl, reportCode },
    queryBankReport,
    setTableDataLeft,
    setTableDataRight,
    selectedDisabled,
  } = props;
  // 期数改变
  const onChange = (e) => {
    queryBankReport(reportCode, e.target.value);
  };
  return (
    <>
      <Radio.Group value={period} onChange={onChange} buttonStyle="solid">
        {new Array(periodTtl).fill().map((_, index) => {
          return (
            <Radio.Button value={index + 1} key={index} disabled={index + 1 > periodCur}>
              {`第${index + 1}期`}
            </Radio.Button>
          );
        })}
      </Radio.Group>
      <Space align="start">
        <ContentTableLeft setTableDataLeft={setTableDataLeft} selectedDisabled={selectedDisabled} />
        <ContentTableRight
          setTableDataRight={setTableDataRight}
          selectedDisabled={selectedDisabled}
        />
      </Space>
    </>
  );
};

export default connect(({ studentStatement, loading }) => ({
  queryBankReportData: studentStatement.queryBankReportData,
  loading: loading.effects['studentStatement/queryBankReport'],
}))(StatementContent);
