import React from 'react';
import styles from '@/pages/student/risk/regulatory/index.less';
import { Button, Form, Radio, InputNumber, Typography, Descriptions, Card } from 'antd';

const { Title } = Typography;
const RegulatoryList = () => {
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 10, offset: 1 },
  };
  return (
    <Form {...formItemLayout} labelAlign="left">
      <div className={styles.list}>
        <Radio.Group
          value={1}
          // onChange={onRadioChange}
          buttonStyle="solid"
        >
          {Array(8)
            .fill()
            .map((e, i) => i + 1)
            .map((e) => (
              <Radio.Button disabled={e > 8} key={e} value={e}>
                第{e}期
              </Radio.Button>
            ))}
        </Radio.Group>
        <Button type="primary" htmlType="submit">
          保存
        </Button>
      </div>
      <Card
        title={
          <Title className={styles.title} level={5}>
            风险加权资产
          </Title>
        }
        type="inner"
        size="small"
      >
        <Descriptions title="一、日常交易" />
        <Form.Item name="input-number" label="信用风险（万元）">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="input-number" label="操作风险（万元）">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="input-number" label="市场风险（万元）">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Descriptions title="二、金融市场" />
        <Form.Item name="input-number" label="债券市场风险（万元）">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="input-number" label="投融资风险（万元）">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="input-number" label="小计-总风险值（万元）">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
      </Card>
      <br/>
      <Card
        title={
          <Title className={styles.title} level={5}>
            监管数据
          </Title>
        }
        type="inner"
        size="small"
      >
        <Form.Item name="input-number" label="监管资本（万元）">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="input-number" label="资本充足率（%）">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="input-number" label="存贷比（%）">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="input-number" label="拨备覆盖率（%）">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
      </Card>
    </Form>
  );
};

export default RegulatoryList;
