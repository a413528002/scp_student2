import React from 'react';
import {Card} from "antd";
import OperationTable from "@/pages/student/finance/operation/OperationTable";
import OperationRule from "@/pages/student/finance/operation/OperationRule";

const Operation = () => {
  return (
    <Card
      title='运营管理'
      type='inner'
      bordered={false}
    >
      <OperationTable/>
      <OperationRule/>
    </Card>
  );
};

export default Operation;
