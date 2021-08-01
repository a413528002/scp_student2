import React from 'react';
import PublicTable from "@/components/Table";

const OrganizationTable = () => {
  const dataSource = [];
  const columns = [
    {
      title: '区域',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '类别',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '建设周期',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '建设方式',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '折旧方式',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '折旧期限',
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
    </>
  );
};

export default OrganizationTable;
