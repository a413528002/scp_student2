import React from 'react';
import { Card } from 'antd';
import CreditorsTabs from '@/pages/student/financial/creditors/CreditorsTabs';
import { getWsUrl } from '@/utils/ws';
import { StompSessionProvider } from 'react-stomp-hooks';

const Creditors = () => {
  return (
    <StompSessionProvider
      url={getWsUrl()}
    >
      <Card
        title="债权市场"
        bordered={false}
        type='inner'
      >
        <CreditorsTabs />
      </Card>
    </StompSessionProvider>
  );
};

export default Creditors;
