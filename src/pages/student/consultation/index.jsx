import React from 'react';
import { Card } from 'antd';
import ConsultationTable from '@/pages/student/consultation/ConsultationTable';

const Consultation = () => {
  return (
    <Card title="第三方咨询" bordered={false} type="inner">
      <ConsultationTable />
    </Card>
  );
};

export default Consultation;
