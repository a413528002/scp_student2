import React from 'react';
import RankTable from '@/pages/common/rank/RankTable';
import { Card } from 'antd';

const Ranking = () => {
  return (
    <Card title="排行榜" bordered={false} type="inner">
      <RankTable />
    </Card>
  );
};

export default Ranking;
