import { connect } from 'umi';
import React from 'react';
import PublicTable from '@/components/Table';

const ConsultationHintTable = (props) => {
  const { loading } = props;
  const { dataSource } = props;

  const columns = [
    {
      title: '模块名称',
      dataIndex: 'moduleName',
    },
    {
      title: '错误提示',
      dataIndex: 'comments',
    },
    {
      title: '提示咨询费用',
      dataIndex: 'hintCost',
      key: 'hintCost',
    },
    {
      title: '完整咨询费用',
      dataIndex: 'fullCost',
      key: 'fullCost',
    },
    {
      title: '错账扣分',
      dataIndex: 'errorPoint',
      key: 'errorPoint',
    },
    {
      title: '错误值',
      dataIndex: 'value1',
      key: 'value1',
    },
    // {
    //   title: '正确值',
    //   dataIndex: 'value2',
    //   key: 'value2',
    // },
  ];

  return (
    <PublicTable
      dataSource={dataSource}
      columns={columns}
      loading={loading}
      bordered
      pagination={{
        defaultPageSize: 10,
        // 数据总数
        total: dataSource.length,
      }}
    />
  );
};

export default connect(({ studentConsultation, loading }) => ({
  dataSource: studentConsultation.queryBankWrongsData,
  loading: loading.effects['studentConsultation/queryBankWrongs'],
}))(ConsultationHintTable);
