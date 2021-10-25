import React from 'react';
import { Card, Col, Row } from 'antd';
import DepositAndLoanInterestRate from '@/pages/student/macroeconomic/DepositAndLoanInterestRate';
import DepositAndLoanAmount from '@/pages/student/macroeconomic/DepositAndLoanAmount';
import DepositAndLoanCount from '@/pages/student/macroeconomic/DepositAndLoanCount';


const MacroeconomicList = () => {
  const gutter = { xs: 24, sm: 12, md: 12, lg: 12 }
  return (
    <>
      <Row gutter={[16,24]}>
        <Col {...gutter}>
          <Card
            size='small'
            type="inner"
            title="存贷款利率"
            bordered={false}
          >
            <DepositAndLoanInterestRate/>
          </Card>
        </Col>
        <Col {...gutter}>
          <Card
            size='small'
            type="inner"
            title="存贷款总量"
            bordered={false}
          >
            <DepositAndLoanAmount/>
          </Card>
        </Col>
        <Col {...gutter}>
          <Card
            size='small'
            type="inner"
            title="存贷款单量"
            bordered={false}
          >
            <DepositAndLoanCount/>
          </Card>
        </Col>
       {/* <Col {...gutter}>
          <Card
            size='small'
            type="inner"
            title="信用风险"
            bordered={false}
          >
            <div>TODO</div>
          </Card>
        </Col>
        <Col {...gutter}>
          <Card
            size='small'
            type="inner"
            title="投融资市场"
            bordered={false}
          >
            <div>TODO</div>
          </Card>
        </Col>
        <Col {...gutter}>
          <Card
            size='small'
            type="inner"
            title="债券市场"
            bordered={false}
          >
            <div>TODO</div>
          </Card>
        </Col> */}
      </Row>
    </>
  );
};

export default MacroeconomicList;
