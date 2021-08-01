import React from 'react';
import {Button, Card, Descriptions, Table} from "antd";
import PublicTable from "@/components/Table";

const TeamMembers = () => {
  const dataSource = [];
  const columns = [
    {
      title: '用户',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '名称',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '岗位',
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
    <Card
      title="团队成员"
      bordered={false}
      type='inner'
    >
      <PublicTable
        dataSource={dataSource}
        columns={columns}
        bordered
      />
    </Card>
  );
};

export default TeamMembers;
