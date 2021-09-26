import React from 'react';
import PublicTable from "@/components/Table";
import Tags from "@/components/Tags";
import Million from "@/components/Million";
import {toPercent} from "@/utils/commonUtils";

const AssetLiquidate = () => {
  const columns = [
    {
      title: '序号',
      dataIndex: 'orderNo',
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
      dataIndex: 'expectRate',
      render: (val) => toPercent(val),
    },
    {
      title: '回收率',
      dataIndex: 'expectRate',
      render: (val) => toPercent(val),
    },
    {
      title: '处置期间',
      dataIndex: 'term',
    },
    {
      title: '所属期限',
      dataIndex: 'creditRating',
    },
    {
      title: '处置状态',
      dataIndex: 'rateTypeName',
      render: (rateTypeName) => <Tags>{rateTypeName}</Tags>,
    },
    {
      title: '回收金额(万元)',
      dataIndex: 'mgMoney',
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

export default AssetLiquidate;
