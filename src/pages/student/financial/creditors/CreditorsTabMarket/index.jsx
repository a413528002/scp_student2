import React from 'react';
import PublicTable from "@/components/Table";
import styles from '@/pages/student/financial/creditors/index.less'
import CreditorsRule from "@/pages/student/financial/creditors/CreditorsRule";

const CreditorsTabMarket = () => {
  const dataSource = [];
  const columns = [
    {
      title: '序号',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '业务类型',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '区域',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '金额(万元)',
      dataIndex: 'address',
      key: 'address',
    },

    {
      title: '收益率',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '期限',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '抢单',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  return (
    <>
      <PublicTable
        dataSource={dataSource}
        columns={columns}
        bordered
      />
      <CreditorsRule/>
    </>

  );
};

export default CreditorsTabMarket;
