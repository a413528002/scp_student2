import React from 'react';
import { Card } from 'antd';
import LoanTabs from '@/pages/student/deal/loan/LoanTabs';
import { getWsUrl } from '@/utils/ws';
import { StompSessionProvider } from 'react-stomp-hooks';

const Loan = () => {
  return (
    <StompSessionProvider
      url={getWsUrl()}
    >
      <Card
        title="贷款抢单"
        bordered={false}
        type='inner'
      >
        <LoanTabs/>
      </Card>
    </StompSessionProvider>
  );
};

export default Loan;
