import React from 'react';
import { Card} from "antd";
import ChannelTable from "@/pages/student/plan/channel/ChannelTable";
import ChannelRemark from "@/pages/student/plan/channel/ChannelRemark";

const Channel = () => {
  return (
    <Card
      title="渠道建设"
      bordered={false}
      type='inner'
    >
      <ChannelTable/>
      <ChannelRemark/>
    </Card>
  );
};

export default Channel;
