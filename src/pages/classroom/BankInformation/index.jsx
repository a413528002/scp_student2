import React from 'react';
import {Button, Card, Input, Space, Descriptions} from 'antd';

const {Search} = Input;
const BankInformation = () => {
  const onSearch = value => console.log(value);
  return (
    <Card
      title="银行信息"
      bordered={false}
      extra={
        <>
          <Space>
            <Search
              placeholder="请输入银行编号"
              onSearch={onSearch}
              style={{width: 300}}
              enterButton="查询银行"
            />

            <Button type="primary">加入银行</Button>
            <Button type="primary">新建银行</Button>
            <Button>退出银行</Button>
          </Space>
        </>
      }
      type='inner'
    >
      <Descriptions column={2}>
        <Descriptions.Item label="银行编号">Zhou Maomao</Descriptions.Item>
        <Descriptions.Item label="银行行长">1810000000</Descriptions.Item>
        <Descriptions.Item label="银行名称">Hangzhou, Zhejiang</Descriptions.Item>
      </Descriptions>
    </Card>
  );
}

export default BankInformation
