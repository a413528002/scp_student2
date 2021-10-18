import React from 'react';
import TenantTable from '@/pages/admin/tenant/TenantTable';
import { Card } from 'antd';

const Tenant = () => {
  return (
    <Card title="租户管理" type="inner" bordered={false}>
      <TenantTable />
    </Card>
  );
};

export default Tenant;
