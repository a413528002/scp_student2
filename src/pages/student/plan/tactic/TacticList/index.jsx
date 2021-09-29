import React, { useEffect } from 'react';
import { Button, Card, Checkbox, Descriptions, Empty, Form, Input, message, Radio } from 'antd';
import { connect } from 'umi';
import styles from '@/pages/student/plan/tactic/index.less';
import Radios from '@/components/Radios';

const TacticList = (props) => {
  const { dispatch, periodTtl, period, periodCur, planData } = props;
  const { loading } = props;
  const { classHourId } = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {};

  const disabled = period < periodCur;

  const regionOptions = [
    { label: 'A区域', value: 'A' },
    { label: 'B区域', value: 'B' },
    { label: 'C区域', value: 'C' },
  ];

  const channelOptions = [
    { label: '传统柜台', value: 'COUNTER' },
    { label: '可视柜台', value: 'VTM' },
    { label: '互联网', value: 'INTERNET' },
    { label: '第三方', value: 'THIRD_PARTY' },
  ];

  useEffect(() => {
    if (classHourId) {
      dispatch({
        type: 'studentPlan/queryBankPlan',
        payload: {
          classHourId,
        },
      });
    }
  }, [classHourId]);

  const onRadioChange = (e) => {
    dispatch({
      type: 'studentPlan/queryBankPlan',
      payload: {
        classHourId,
        period: e.target.value,
      },
    });
  };

  const onFinish = (formData) => {
    if (period < periodCur) {
      message.error('不能修改历史计划');
    }
    dispatch({
      type: 'studentPlan/submitBankPlan',
      payload: {
        classHourId,
        period,
        planData: formData,
      },
    });
  };

  return (
    <Card title="战略规划" bordered={false} type="inner">
      {periodTtl ? (
        <Form
          fields={planData}
          layout="horizontal"
          name="BankPlan"
          // labelAlign={'left'}
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 10 }}
          onFinish={onFinish}
        >
          <div className={styles.choose}>
            <Radios
              period={period}
              periodCur={periodCur}
              periodTtl={periodTtl}
              onRadioChange={onRadioChange}
            />
            {!disabled && (
              <Button type="primary" htmlType="submit" disabled={disabled} loading={loading}>
                保存
              </Button>
            )}
          </div>

          <Descriptions title="一、机构建设" />
          <Form.Item name={'BUILD_BRANCH_REGION'} label="支行开设位置">
            <Checkbox.Group options={regionOptions} disabled={disabled} />
          </Form.Item>
          <Form.Item name={'BUILD_BRANCH_CREATETYPE'} label="办公环境（建设/租赁）">
            <Radio.Group disabled={disabled}>
              <Radio value={'B'}>建设</Radio>
              <Radio value={'L'}>租赁</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name={'BUILD_CHANNEL'} label="渠道建设">
            <Checkbox.Group options={channelOptions} disabled={disabled} />
          </Form.Item>

          <Descriptions title="二、营销管理" />
          <Form.Item name={'MKTCOST_TOTAL'} label="精准营销（万元）">
            <Input disabled={disabled} />
          </Form.Item>

          <Descriptions title="三、存款业务" />
          <Form.Item name={'DEPOSIT_RATE'} label="存款利率（%）">
            <Input disabled={disabled} />
          </Form.Item>
          <Form.Item name={'DEPOSIT_AMOUNT'} label="吸收存款总额（万元）">
            <Input disabled={disabled} />
          </Form.Item>
          <Form.Item name={'DEPOSIT_RESERVE'} label="存款准备金（万元）">
            <Input disabled={disabled} />
          </Form.Item>

          <Descriptions title="四、贷款业务" />
          <Form.Item name={'LOAN_RATE'} label="贷款利率（%）">
            <Input disabled={disabled} />
          </Form.Item>
          <Form.Item name={'LOAN_AMOUNT'} label="发放贷款总额（万元）">
            <Input disabled={disabled} />
          </Form.Item>
          <Form.Item name={'LOAN_PROVISION'} label="贷款总拨备（万元）">
            <Input disabled={disabled} />
          </Form.Item>
          <Form.Item name={'LOAN_LOSSRATE'} label="贷款损失比（%）">
            <Input disabled={disabled} />
          </Form.Item>

          <Descriptions title="五、金融市场" />
          <Form.Item name={'FINMKT_DEBT'} label="债券市场（万元）">
            <Input disabled={disabled} />
          </Form.Item>
          <Form.Item name={'FINMKT_IF'} label="投融资市场（万元）">
            <Input disabled={disabled} />
          </Form.Item>

          <Descriptions title="六、银行风控管理" />
          <Form.Item name={'RISK_CREDIT'} label="信用风险（万元）">
            <Input disabled={disabled} />
          </Form.Item>
          <Form.Item name={'RISK_MARKET'} label="市场风险（万元）">
            <Input disabled={disabled} />
          </Form.Item>
          <Form.Item name={'RISK_OPERATING'} label="操作风险（万元）">
            <Input disabled={disabled} />
          </Form.Item>
          {/*<Form.Item name={''} label="投资风险（万元）">*/}
          {/*  <Input/>*/}
          {/*</Form.Item>*/}
          <Form.Item name={'RISK_CAPITAL_ADEQUACY'} label="资本充足率（%）">
            <Input disabled={disabled} />
          </Form.Item>

          <Descriptions title="七、现金流" />
          <Form.Item name={'MONEY_I'} label="流入现金流（万元）">
            <Input disabled={disabled} />
          </Form.Item>
          <Form.Item name={'MONEY_O'} label="流出现金流（万元）">
            <Input disabled={disabled} />
          </Form.Item>
          <Form.Item name={'RISK_CLOSINGBALANCE'} label="期末现金总额（万元）">
            <Input disabled={disabled} />
          </Form.Item>
        </Form>
      ) : (
        <Empty />
      )}
    </Card>
  );
};

export default connect(({ studentPlan, loading }) => ({
  periodTtl: studentPlan.periodTtl,
  period: studentPlan.period,
  periodCur: studentPlan.periodCur,
  planData: studentPlan.planData,
  loading:
    loading.effects['studentPlan/submitBankPlan'] || loading.effects['studentPlan/queryBankPlan'],
}))(TacticList);
