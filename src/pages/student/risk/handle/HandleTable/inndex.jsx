import React from 'react';
import {Button, Card} from "antd";
import PublicTable from "@/components/Table";
import HandleRule from "@/pages/student/risk/handle/HandleRule";

const HandleTable = () => {
  const dataSource = [];
  const columns = [
    {
      title: '期数',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '所属期数',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '业务类型',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '利率属性',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '客户类型',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '金额(万元)',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '风险小计',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  return (
    <Card
      title='操作风险'
      bordered={false}
      type='inner'
    >
      <PublicTable
        dataSource={dataSource}
        columns={columns}
        bordered
      />
      <HandleRule/>
    </Card>
  );
};

export default HandleTable;
