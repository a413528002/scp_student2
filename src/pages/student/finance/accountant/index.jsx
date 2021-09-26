import React from 'react';
import { Card } from 'antd';
import AccountantTable from '@/pages/student/finance/accountant/AccountantTable';

const Accountant = () => {
  return (
    <Card title="会计凭证" bordered={false} type="inner">
      <AccountantTable />
    </Card>
  );
};

export default Accountant;
