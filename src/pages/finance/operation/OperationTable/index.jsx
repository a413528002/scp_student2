import React from 'react';
import PublicTable from "@/components/Table";
import {Select, Button} from "antd";
import styles from '@/pages/finance/operation/index.less'

const OperationTable = () => {
  const dataSource = [];
  const columns = [
    {
      title: '期数',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '类别',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '总行/支行',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '区域',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '费用(万元)',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  return (
    <>
      <div className={styles.choose}>
        <Select defaultValue="one" style={{ width: 120 }}>
          <Select.Option value="one">第一期</Select.Option>
          <Select.Option value="two">第二期</Select.Option>
        </Select>
        <Button type="primary">保存</Button>
      </div>
      <PublicTable
        dataSource={dataSource}
        columns={columns}
        bordered
      />
    </>
  );
};

export default OperationTable;
