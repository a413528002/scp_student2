import React from 'react';
import { Card } from 'antd';
import CreditorsMngTable from '@/pages/student/financial/creditorsMng/CreditorsMngTable';

const CreditorsMng = () => {
  return (
    <Card title="债权管理" type="inner" bordered={false}>
      <CreditorsMngTable />
    </Card>
  );
};

export default CreditorsMng;
