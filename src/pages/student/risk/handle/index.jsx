import React from 'react';
import { Card } from 'antd';
import HandleTable from '@/pages/student/risk/handle/HandleTable';
import HandleRule from '@/pages/student/risk/handle/HandleRule';

const Handle = () => {
  return (
    <Card title="操作风险" bordered={false} type="inner">
      <HandleTable />
      <HandleRule />
    </Card>
  );
};

export default Handle;
