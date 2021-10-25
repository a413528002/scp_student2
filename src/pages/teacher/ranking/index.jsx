import React from 'react';
import RankingTable from '@/pages/teacher/ranking/RankingTable';
import { Card } from 'antd';

const Ranking = () => {
  return (
    <Card title="排行榜" bordered={false} type="inner">
      <RankingTable />
    </Card>
  );
};

export default Ranking;
