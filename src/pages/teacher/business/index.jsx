import React from 'react';
import BusinessTabs from "@/pages/teacher/business/BusinessTabs";
import {Card} from "antd";

const Business = () => {
  return (
    <Card
      title="经营管理"
      bordered={false}
      type='inner'
    >
      <BusinessTabs/>
    </Card>
  );
};

export default Business;
