import React from 'react';
import {Card} from "antd";
import FinancialTable from '@/pages/admin/classTemplate/financial/FinancialTable';

const Financial = () => {
  return (
    <Card title="金融数据" bordered={false} type="inner">
      <FinancialTable />
    </Card>
  );
};

export default Financial;
