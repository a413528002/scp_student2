import React from 'react';
import {Card, Col, Image, Row} from 'antd';


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
            <Image
              width={'100%'}
              height={"50%"}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
          </Card>
        </Col>
        <Col {...gutter}>
          <Card
            size='small'
            type="inner"
            title="存贷款总量"
            bordered={false}
          >
            <Image
              width={'100%'}
              height={"50%"}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
          </Card>
        </Col>
        <Col {...gutter}>
          <Card
            size='small'
            type="inner"
            title="存贷款总量"
            bordered={false}
          >
            <Image
              width={'100%'}
              height={"50%"}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default HomeList;
