import React from 'react';
import VoucherTable from '@/pages/admin/classTemplate/voucher/VoucherTable';
import { Card } from 'antd';

const Voucher = () => {
  return (
    <Card title="凭证引擎" bordered={false} type="inner">
      <VoucherTable />
    </Card>
  );
};

export default Voucher;
