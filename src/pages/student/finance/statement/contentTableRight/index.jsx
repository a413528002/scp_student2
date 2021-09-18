import React from 'react';
import { EditableProTable } from '@ant-design/pro-table';
import { connect } from 'umi';

const ContentTableRight = (props) => {
  const {
    queryBankReportData: { reportDetails, titleItem, titleE, titleM },
    setTableDataRight,
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
      title: titleE,
      dataIndex: 'valueE',
      key: 'valueE',
      editable: selectedDisabled,
    },
    {
      title: titleM,
      dataIndex: 'valueM',
      key: 'valueM',
      editable: selectedDisabled,
    },
  ];
  return (
    <>
      <EditableProTable
        columns={columns?.filter((item) => item.title !== '')}
        rowKey="bankReportDetailId"
        // value={reportDetailsRight}
        value={reportDetails?.filter((item) => item.columnNo === 2)}
        onChange={setTableDataRight}
        editable={{
          type: 'multiple',
          editableKeys,
          onValuesChange: (record, recordList) => {
            setTableDataRight(recordList);
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
}))(ContentTableRight);
