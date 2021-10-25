import React from 'react';
import MacroeconomicList from '@/pages/common/macroeconomic/MacroeconomicList';
import { Card } from 'antd';

const Macroeconomic = () => {
  return (
    <Card title="宏观经济" bordered={false} type="inner">
      <MacroeconomicList />
    </Card>
  );
};

export default Macroeconomic;
