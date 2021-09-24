import React from 'react';
import PublicTable from '@/components/Table';
import Million from '@/components/Million';
import {Button, message, Popconfirm} from 'antd';

const AccountantTable = () => {
  const dataSource = [];
  const loading = false;
  // 取消编辑pop
  const handleCancelPop = () => {
    message.error('已取消');
  };
  const columns = [
    {
      title: '期间',
      dataIndex: 'period',
      key: 'period',
      render: (period) => `第${period}期`,
    },
    {
      title: '业务类型',
      dataIndex: 'typeName',
      key: 'typeName',
    },
    {
      title: '业务说明',
      dataIndex: 'gapAmount',
      key: 'gapAmount',
    },
    {
      title: '交易本金(万元)',
      dataIndex: 'period',
      key: 'period',
    },
    {
      title: '交易利息(万元)',
      dataIndex: 'injectAmount',
      key: 'injectAmount',
      render: (injectAmount) => <Million>{injectAmount}</Million>,
    },
    {
      title: '状态',
      dataIndex: 'statusName',
      key: 'statusName',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (_, { status }) =>
        status === 'INIT' ? (
          <Popconfirm
            title="确认申请"
            onConfirm={() => console.log(1)}
            onCancel={handleCancelPop}
          >
            <Button type="primary" size="small">
              记账
            </Button>
          </Popconfirm>
        ) : null,
    },
  ];
  return <PublicTable dataSource={dataSource} columns={columns} loading={loading} bordered />;
};

export default AccountantTable;
