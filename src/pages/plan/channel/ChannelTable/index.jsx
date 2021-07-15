import React from 'react';

import PublicTable from "@/components/Table";

const ChannelTable = () => {
  const dataSource = [];
  const columns = [
    {
      title: '渠道名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '建设周期',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '每期建设费用(万元)',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '建设状态',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '操作',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  return (
      <PublicTable
        dataSource={dataSource}
        columns={columns}
        bordered
      />
  );
};

export default ChannelTable;
