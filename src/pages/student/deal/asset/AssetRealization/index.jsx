import React from 'react';
import Tags from '@/components/Tags';
import Million from '@/components/Million';
import { toPercent } from '@/utils/commonUtils';
import PublicTable from '@/components/Table';

const AssetRealization = () => {
  const columns = [
    {
      title: '所属期数',
      dataIndex: 'loanTypeName',
      render: (loanTypeName) => <Tags>{loanTypeName}</Tags>,
    },
    {
      title: '处置期间',
      dataIndex: 'amount',
      render: (amount) => <Million>{amount}</Million>,
    },
    {
      title: '贷款金额(万元)',
      dataIndex: 'expectRate',
      render: (val) => toPercent(val),
    },
    {
      title: '业务类型',
      dataIndex: 'term',
    },
    {
      title: '抵押/担保金额(万元)',
      dataIndex: 'creditRating',
    },
    {
      title: '信用评级',
      dataIndex: 'rateTypeName',
      render: (rateTypeName) => <Tags>{rateTypeName}</Tags>,
    },
    {
      title: '处置状态',
      dataIndex: 'mgMoney',
      render: (amount) => <Million>{amount}</Million>,
    },
    {
      title: '回收金额(万元)',
      dataIndex: 'mgMoney',
      render: (amount) => <Million>{amount}</Million>,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      fixed: 'right',
      render: (amount) => <Million>{amount}</Million>,
    },
  ];
  return (
    <PublicTable
      // dataSource={dataSource}
      columns={columns}
      bordered
      // loading={loading}
    />
  );
};

export default AssetRealization;
