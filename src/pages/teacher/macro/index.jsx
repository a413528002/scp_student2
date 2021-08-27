import React from 'react';
import PictureTabs from "@/pages/teacher/macro/PictureTabs";
import {Card} from "antd";

const Macro = () => {
  return (
    <Card
      title="宏观经济"
      bordered={false}
      type='inner'
    >
      <PictureTabs/>
    </Card>
  );
};

export default Macro;
