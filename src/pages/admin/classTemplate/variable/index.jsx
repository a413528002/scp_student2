import React from 'react';
import { Card } from 'antd';
import VariableTable from "@/pages/admin/classTemplate/variable/VariableTable";

const Variable = () => {
  return (
    <Card title="变量" type="inner" bordered={false}>
      <VariableTable />
    </Card>
  );
};

export default Variable;
