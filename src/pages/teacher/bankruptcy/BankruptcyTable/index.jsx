import React from 'react';
import {Button, Card, message, Popconfirm} from "antd";
import PublicTable from "@/components/Table";

const BankruptcyTable = () => {
  const dataSource = []
  // 关闭pop
  const handleCancelPop = () => {
    message.error('已取消');
  }
  const columns = [
    {
      title: '银行名称',
      dataIndex: 'bankName',
      key: 'bankName',
    },
    {
      title: '期数',
      dataIndex: 'moduleName',
      key: 'moduleName',
    },
    {
      title: '注入资金(万元)',
      dataIndex: 'testingTime',
      key: 'testingTime',
    },
    {
      title: '操作',
      dataIndex: 'value1',
      key: 'value1',
      render: () => (
        <Popconfirm
          title="确认同意"
          // onConfirm={onConfirm}
          onCancel={handleCancelPop}
        >
          <Button>同意</Button>
        </Popconfirm>
      )
    },
  ];
  return (
    <Card
      title="破产管理"
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

export default BankruptcyTable;
