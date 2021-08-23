import React from 'react';
import { Card } from 'antd';
import LoansTabs from '@/pages/student/deal/loan/LoanTabs';
import { getWsUrl } from '@/utils/ws';
import { StompSessionProvider } from 'react-stomp-hooks';

const Loans = () => {
  return (
    <StompSessionProvider
      url={getWsUrl()}
    >
      <Card
        title="贷款抢单"
        bordered={false}
        type='inner'
      >
        <LoansTabs/>
      </Card>
    </StompSessionProvider>
  );
};

export default Loans;
