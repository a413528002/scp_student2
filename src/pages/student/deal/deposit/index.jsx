import React from 'react';
import DepositTabs from '@/pages/student/deal/deposit/DepositTabs';
import { Card } from 'antd';
import { StompSessionProvider } from 'react-stomp-hooks';
import { getWsUrl } from '@/utils/ws';

const Deposit = () => {
  return (
    <StompSessionProvider
      url={getWsUrl()}
    >
      <Card
        title="存款抢单"
        bordered={false}
        type='inner'
      >
        <DepositTabs/>
      </Card>
    </StompSessionProvider>
  );
};

export default Deposit;
