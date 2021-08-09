import React from 'react';
import { Card, Col, Row } from 'antd';
import DepositAndLoanInterestRate from '@/pages/student/home/DepositAndLoanInterestRate';
import DepositAndLoanAmount from '@/pages/student/home/DepositAndLoanAmount';
import DepositAndLoanCount from '@/pages/student/home/DepositAndLoanCount';


const HomeList = () => {
  const gutter = { xs: 24, sm: 12, md: 12, lg: 12 }
  return (
    <Card>
      <Row gutter={[16,24]}>
        <Col {...gutter}>
          <Card
            size='small'
            type="inner"
            title="存贷款总量"
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
            title="存贷款总量"
            bordered={false}
          >
            <DepositAndLoanCount/>
          </Card>
        </Col>
        <Col {...gutter}>
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
        </Col>
      </Row>
    </Card>
  );
};

export default HomeList;
