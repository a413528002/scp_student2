import React from 'react';
import { EditableProTable } from '@ant-design/pro-table';
import { connect } from 'umi';
import styles from '@/pages/student/finance/statement/index.less';

const ContentTableLeft = (props) => {
  const {
    queryBankReportData: { reportDetails, titleItem, titleB },
    setTableDataLeft,
    selectedDisabled,
    loading,
  } = props;
  // 获取所有编辑的key 如果不是当前期不返回可编辑的key
  const editableKeys = reportDetails?.map((item) => item.bankReportDetailId);

  const columns = [
    {
      title: titleItem,
      dataIndex: 'valueItem',
      key: 'valueItem',
      editable: false,
    },
    {
      title: titleB,
      dataIndex: 'valueB',
      key: 'valueB',
      editable: selectedDisabled,
    },
  ];
  return (
    <>
      <EditableProTable
        className={styles.tablePadding}
        columns={columns?.filter((item) => item.title !== '')}
        rowKey="bankReportDetailId"
        // value={reportDetailsLeft}
        value={reportDetails?.filter((item) => item.columnNo === 1)}
        onChange={setTableDataLeft}
        editable={{
          type: 'multiple',
          editableKeys,
          onValuesChange: (record, recordList) => {
            setTableDataLeft(recordList);
          },
        }}
        maxLength={1}
        bordered
        loading={loading}
      />
    </>
  );
};

export default connect(({ studentStatement, loading }) => ({
  queryBankReportData: studentStatement.queryBankReportData,
  loading: loading.effects['studentStatement/queryBankReport'],
}))(ContentTableLeft);
