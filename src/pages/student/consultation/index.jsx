import React from 'react';
import { Card } from 'antd';
import ConsultationTable from '@/pages/student/consultation/ConsultationTable';
import ConsultationHintTable from '@/pages/student/consultation/ConsultationHintTable';

const Consultation = () => {
  return (
    <Card title="第三方咨询" bordered={false} type="inner">
      <ConsultationTable />
      <ConsultationHintTable />
    </Card>
  );
};

export default Consultation;
