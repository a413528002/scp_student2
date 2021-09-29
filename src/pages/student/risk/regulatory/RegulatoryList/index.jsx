import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import styles from '@/pages/student/risk/regulatory/index.less';
import { Button, Form, InputNumber, Typography, Descriptions, Card, Input, Empty } from 'antd';
import { yuan } from '@/utils/commonUtils';
import Radios from '@/components/Radios';

const { Title } = Typography;
const RegulatoryList = (props) => {
  const { dispatch, loading, updateLoading } = props;
  const {
    dataSource: { periodCur, periodTtl, period, bankRiskRegulationId },
    dataSource,
  } = props;

  const [form] = Form.useForm();
  const [editForm, setEditForm] = useState(false);

  // 课堂id
  const { classHourId } = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {};

  // 查询薪资/费用
  useEffect(() => {
    if (classHourId) {
      dispatch({
        type: 'studentRegulatory/queryBankRiskRegulation',
        payload: {
          classHourId,
        },
      });
    }
  }, []);
  // 设置表单数据
  useEffect(() => {
    form.setFieldsValue({ ...dataSource });
  }, [dataSource]);
  // 切换期数
  const onRadioChange = (e) => {
    const period = e.target.value;
    setEditForm(period !== periodCur);
    dispatch({
      type: 'studentRegulatory/queryBankRiskRegulation',
      payload: {
        classHourId,
        period,
      },
    });
  };

  /**
   * 更新费用
   * @param values 表单参数
   */
  const updateBankRiskRegulation = (values) => {
    // 金额转换 万元->元
    const params = yuan(values);
    if (classHourId && bankRiskRegulationId && params) {
      dispatch({
        type: 'studentRegulatory/updateBankRiskRegulation',
        payload: {
          classHourId,
          bankRiskRegulationId,
          ...params,
          capitalAdequacyRatio: values.capitalAdequacyRatio,
          loanToDepositRatio: values.loanToDepositRatio,
          provisionCoverage: values.provisionCoverage,
        },
      });
    }
  };

  // 表单栅格
  const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 10 },
  };
  return periodTtl ? (
    <Form {...formItemLayout} form={form} onFinish={updateBankRiskRegulation}>
      <div className={styles.choose}>
        <Radios
          period={period}
          periodCur={periodCur}
          periodTtl={periodTtl}
          onRadioChange={onRadioChange}
        />
        {!editForm ? (
          <Button type="primary" htmlType="submit" loading={updateLoading}>
            保存
          </Button>
        ) : null}
      </div>
      <Card
        title={
          <Title className={styles.title} level={5}>
            风险加权资产
          </Title>
        }
        type="inner"
        size="small"
        loading={loading}
      >
        <Descriptions title="一、日常交易" />
        <Form.Item name="rwaCredit" label="信用风险（万元）">
          <InputNumber min={0} style={{ width: '100%' }} disabled={editForm} />
        </Form.Item>
        <Form.Item name="rwaOperational" label="操作风险（万元）">
          <InputNumber min={0} style={{ width: '100%' }} disabled={editForm} />
        </Form.Item>
        <Form.Item name="rwaMarket" label="市场风险（万元）">
          <InputNumber min={0} style={{ width: '100%' }} disabled={editForm} />
        </Form.Item>
        <Descriptions title="二、金融市场" />
        <Form.Item name="rwaInvestmentAndFinancing" label="投融资风险（万元）">
          <InputNumber min={0} style={{ width: '100%' }} disabled={editForm} />
        </Form.Item>
        <Form.Item name="rwaTotal" label="小计-总风险值（万元）">
          <InputNumber min={0} style={{ width: '100%' }} disabled={editForm} />
        </Form.Item>
      </Card>
      <br />
      <Card
        title={
          <Title className={styles.title} level={5}>
            监管数据
          </Title>
        }
        type="inner"
        size="small"
        loading={loading}
      >
        <Form.Item name="regulatoryCapital" label="监管资本总计（万元）">
          <InputNumber min={0} style={{ width: '100%' }} disabled={editForm} />
        </Form.Item>
        <Form.Item name="capitalAdequacyRatio" label="资本充足率（小数）">
          <Input min={0} style={{ width: '100%' }} disabled={editForm} />
        </Form.Item>
        <Form.Item name="loanToDepositRatio" label="存贷比（小数）">
          <Input min={0} style={{ width: '100%' }} disabled={editForm} />
        </Form.Item>
        <Form.Item name="provisionCoverage" label="拨备覆盖率（小数）">
          <Input min={0} style={{ width: '100%' }} disabled={editForm} />
        </Form.Item>
      </Card>
    </Form>
  ) : (
    <Empty />
  );
};

export default connect(({ studentRegulatory, loading }) => ({
  dataSource: studentRegulatory.queryBankRiskRegulationData,
  loading: loading.effects['studentRegulatory/queryBankRiskRegulation'],
  updateLoading: loading.effects['studentRegulatory/updateBankRiskRegulation'],
}))(RegulatoryList);
