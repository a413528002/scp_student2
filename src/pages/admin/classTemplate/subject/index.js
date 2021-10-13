import React from 'react';
import { Card } from 'antd';
import SubjectTable from '@/pages/admin/classTemplate/subject/SubjectTable';

const Subject = () => {
  return (
    <Card title="科目" type="inner" bordered={false}>
      <SubjectTable />
    </Card>
  );
};

export default Subject;
