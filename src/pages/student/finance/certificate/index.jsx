import React from 'react';
import { Card } from 'antd';
import CertificateTable from '@/pages/student/finance/certificate/CertificateTable';

const Certificate = () => {
  return (
    <Card title="会计凭证" bordered={false} type="inner">
      <CertificateTable />
    </Card>
  );
};

export default Certificate;
