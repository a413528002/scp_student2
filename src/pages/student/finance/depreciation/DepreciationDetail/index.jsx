import React, { useEffect } from 'react';
import { connect } from 'umi';
import PublicTable from '@/components/Table';
import Million from '@/components/Million';
import Tags from '@/components/Tags';


const DepreciationDetail = (props) => {
  const { dispatch, loading } = props;
  const { dataSource } = props;
  // 获取课堂id
  const { classHourId } = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {};
  // 查询折旧管理数据
  useEffect(() => {
    if (classHourId) {
      dispatch({
        type: 'studentDepreciation/queryBankDepreciations',
        payload: { classHourId },
      });
    }
  }, []);
  const columns = [
    {
      title: '所属期数',
      dataIndex: 'period',
      key: 'period',
      render: (period) => `第${period}期`,
    },
    {
      title: '资产类别',
      dataIndex: 'assetsTypeName',
      key: 'assetsTypeName',
      render: (assetsTypeName) => <Tags>{assetsTypeName}</Tags>,
    },
    {
      title: '完成建设/购入期间',
      dataIndex: 'assetsPeriod',
      key: 'assetsPeriod',
      render: (assetsPeriod) => `第${assetsPeriod}期`,
    },
    {
      title: '购置金额(万元)',
      dataIndex: 'assetsAmount',
      key: 'assetsAmount',
      render: (assetsAmount) => <Million>{assetsAmount}</Million>,
    },
    {
      title: '折旧方法',
      dataIndex: 'depreciationMethodName',
      key: 'depreciationMethodName',
      render: (depreciationMethodName) => <Tags>{depreciationMethodName}</Tags>,
    },
    {
      title: '折旧期限',
      dataIndex: 'depreciationPeriods',
      key: 'depreciationPeriods',
      render: (depreciationPeriods) => `${depreciationPeriods}期`,
    },
    {
      title: '已折旧期数',
      dataIndex: 'depreciatedPeriods',
      key: 'depreciatedPeriods',
      render: (depreciatedPeriods) => `${depreciatedPeriods}期`,
    },
    {
      title: '本期计提金额(万元)',
      dataIndex: 'amount',
      key: 'amount',
      editable: true,
      render: (amount) => <Million>{amount}</Million>,
    },
  ];
  return (
    <PublicTable
      dataSource={dataSource}
      columns={columns}
      loading={loading}
      bordered
    />
  );
};

export default connect(({ studentDepreciation, loading }) => ({
  dataSource: studentDepreciation.queryBankDepreciationData,
  loading: loading.effects['studentDepreciation/queryBankDepreciations'],
}))(DepreciationDetail);
