import React from 'react';
import MacroeconomicList from '@/pages/student/macroeconomic/MacroeconomicList';
import { Card } from 'antd';

const Macroeconomic = () => {
  return (
    <Card title="宏观经济" bordered={false} type="inner">
      <MacroeconomicList />
    </Card>
  );
};

export default Macroeconomic;
