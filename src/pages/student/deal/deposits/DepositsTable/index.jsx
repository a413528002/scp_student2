import React from 'react';
import {Button, Card} from "antd";
import PublicTable from "@/components/Table";

const DepositsTable = () => {
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
      title: '存款期数',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '所属期数',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '利率类型',
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
      title: '利息',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  return (
    <Card
      title='存款管理'
      bordered={false}
      type='inner'
      extra={<Button type='primary'>保存</Button>}
    >
      <PublicTable
        dataSource={dataSource}
        columns={columns}
        bordered
      />
    </Card>
  );
};

export default DepositsTable;
