import React from 'react';
import PublicTable from "@/components/Table";
import styles from '@/pages/student/deal/loans/index.less'

const LoansTabRob = () => {
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
      title: '金额(万元)',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '利率',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '期限',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '贷款分类',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '利率类型',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '质押/担保金额(万元)',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '渠道类型',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '区域',
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
      <p className={styles.timer}>下一轮抢单倒计时：<span>30秒</span></p>
    </>

  );
};

export default LoansTabRob;
