import React from 'react';
import {Button, Card, Input, Space, Descriptions} from 'antd';

const {Search} = Input;
const ClassroomInformation = () => {
  const onSearch = value => console.log(value);
  return (
    <Card
      title="课堂信息"
      bordered={false}
      extra={
        <>
          <Space>
            <Search
              placeholder="请输入课堂编号"
              onSearch={onSearch}
              style={{width: 300}}
              enterButton="查询课堂"
            />

            <Button type="primary">加入课堂</Button>
            <Button type="primary">切换课堂</Button>
            <Button>退出课堂</Button>
          </Space>
        </>
      }
      type='inner'
    >
      <Descriptions column={2}>
        <Descriptions.Item label="课堂编号">Zhou Maomao</Descriptions.Item>
        <Descriptions.Item label="教师名称">1810000000</Descriptions.Item>
        <Descriptions.Item label="课堂名称">Hangzhou, Zhejiang</Descriptions.Item>
        <Descriptions.Item label="学生名称">empty</Descriptions.Item>
        <Descriptions.Item label="课堂状态">empty</Descriptions.Item>
        <Descriptions.Item label="学生状态">empty</Descriptions.Item>
      </Descriptions>
    </Card>
  );
}

export default ClassroomInformation
