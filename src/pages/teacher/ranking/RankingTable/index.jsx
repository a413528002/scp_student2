import React from 'react';
import {Button, Card, Popconfirm} from "antd";
import PublicTable from "@/components/Table";

const RankingTable = () => {
  const dataSource = []
  const columns = [
    {
      title: '银行名称',
      dataIndex: 'bankName',
      key: 'bankName',
    },
    {
      title: '分值',
      dataIndex: 'moduleName',
      key: 'moduleName',
    },
    {
      title: '排名',
      dataIndex: 'testingTime',
      key: 'testingTime',
    },
  ];
  return (
    <Card
      title="排行榜"
      bordered={false}
      type='inner'
    >
      <PublicTable
        dataSource={dataSource}
        columns={columns}
        // loading={loading}
        bordered
      />
    </Card>
  );
};

export default RankingTable;
