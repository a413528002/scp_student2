import React, { useEffect } from 'react';
import { connect } from 'umi';
import PublicTable from '@/components/Table';
import Tags from '@/components/Tags';
import Million from '@/components/Million';
import { toPercent } from '@/utils/commonUtils';

const AssetDetail = (props) => {
  const { dispatch, loading } = props;
  const { dataSource } = props;
  // 获取课堂id
  const { classHourId } = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {};

  // 查询不良资产
  useEffect(() => {
    if (classHourId) {
      dispatch({
        type: 'studentAsset/queryBankBadAssets',
        payload: { classHourId },
      });
    }
  }, []);
  const columns = [
    {
      title: '序号',
      dataIndex: 'serialNumber',
    },
    {
      title: '业务类型',
      dataIndex: 'loanTypeName',
      render: (loanTypeName) => <Tags>{loanTypeName}</Tags>,
    },
    {
      title: '贷款金额(万元)',
      dataIndex: 'amount',
      render: (amount) => <Million>{amount}</Million>,
    },
    {
      title: '信用评级',
      dataIndex: 'creditRating',
    },
    {
      title: '回收率',
      dataIndex: 'returnPeriod',
      render: (val) => toPercent(val),
    },
    {
      title: '处置期间',
      dataIndex: 'period',
      render: (period) => `第${period}期`,
    },
    {
      title: '所属期数',
      dataIndex: 'businessPeriod',
      render: (businessPeriod) => `第${businessPeriod}期`,
    },
    {
      title: '处置状态',
      dataIndex: 'disposalTypeName',
      render: (disposalTypeName, { isNew }) => {
        switch (isNew) {
          case true:
            return <Tags>未处置</Tags>;
          default:
            return <Tags>{disposalTypeName}</Tags>;
        }
      },
    },
    {
      title: '回收金额(万元)',
      dataIndex: 'returnAmount',
      render: (returnAmount) => <Million>{returnAmount}</Million>,
    },
  ];
  return <PublicTable dataSource={dataSource} columns={columns} bordered loading={loading} />;
};

export default connect(({ studentAsset, loading }) => ({
  dataSource: studentAsset.queryBankBadAssetsData,
  loading: loading.effects['studentAsset/queryBankBadAssets'],
}))(AssetDetail);
