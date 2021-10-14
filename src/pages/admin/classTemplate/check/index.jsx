import React from 'react';
import { Card } from 'antd';
import CheckTable from '@/pages/admin/classTemplate/check/CheckTable';

const Check = () => {
  return (
    <Card title="账务检查" type="inner" bordered={false}>
      <CheckTable />
    </Card>
  );
};

export default Check;
