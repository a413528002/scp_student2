import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Form, Input, Drawer, Select, Space, Button, Skeleton, InputNumber } from 'antd';
import { yuan } from '@/utils/commonUtils';

const FinancialFormDrawer = (props) => {
  const {
    drawerVisible,
    handleCancelDrawer,
    typeDrawer: { title, type, record },
    queryEnumsData: {
      BusinessType,
      RateType,
      CustomerType,
      LoanType,
      CreditRating,
      DebtType,
      Channel,
      Region,
    },
    classTemplateId,
  } = props;
  const { dispatch, loading, financialLoading } = props;
  const [form] = Form.useForm();

  /**
   * 新建课堂模板-金融数据
   * @param values form数据
   */
  const createClassTemplateFinancialMarket = (values) => {
    dispatch({
      type: 'adminFinancial/createClassTemplateFinancialMarket',
      payload: { classTemplateId, ...values },
      callback: () => {
        // 重置form
        form.resetFields();
        // 关闭Drawer
        handleCancelDrawer();
      },
    });
  };

  /**
   * 修改课堂模板-金融数据
   * @param values form数据
   */
  const updateClassTemplateFinancialMarket = (values) => {
    dispatch({
      type: 'adminFinancial/updateClassTemplateFinancialMarket',
      payload: { classTemplateId, ...record, ...values },
      callback: () => {
        // 重置form
        form.resetFields();
        // 关闭Drawer
        handleCancelDrawer();
      },
    });
  };

  // 确认提交
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        // 金额转换
        const params = yuan(values);
        if (type === 'CREATE') {
          // 新建课堂模板数据
          createClassTemplateFinancialMarket(params);
        } else if (type === 'UPDATE') {
          // 只有金额才做万元转换
          const _params = {
            ...params,
            orderNo: values.orderNo,
            period: values.period,
            term: values.term,
            expectRate: values.expectRate,
          };
          // 修改课堂模板
          updateClassTemplateFinancialMarket(_params);
        }
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  // 栅格
  const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 16 },
  };
  return (
    <Drawer
      visible={drawerVisible}
      title={`${title}课堂模板数据`}
      placement="right"
      width={640}
      onClose={handleCancelDrawer}
      footer={
        <Space>
          <Button onClick={handleCancelDrawer}>取消</Button>
          <Button type="primary" onClick={handleOk} loading={financialLoading}>
            确认
          </Button>
        </Space>
      }
      footerStyle={{ textAlign: 'center' }}
    >
      <Skeleton active loading={loading}>
        <Form
          {...formItemLayout}
          form={form}
          name="financial_form_drawer"
          initialValues={{ ...record }}
        >
          <Form.Item
            name="orderNo"
            label="序号"
            rules={[
              {
                required: true,
                message: '请输入序号',
              },
            ]}
          >
            <Input placeholder="请输入序号" />
          </Form.Item>
          <Form.Item
            name="period"
            label="所属期数"
            rules={[
              {
                required: true,
                message: '请输入所属期数',
              },
            ]}
          >
            <Input placeholder="请输入所属期数" />
          </Form.Item>
          <Form.Item
            name="bizType"
            label="业务类型"
            hasFeedback
            rules={[
              {
                required: true,
                message: '请选择业务类型',
              },
            ]}
          >
            <Select placeholder="请选择业务类型">
              {BusinessType?.map((d) => (
                <Select.Option key={d.value} value={d.value}>
                  {d.text}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="amount"
            label="金额(万元)"
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入金额（万元）',
              },
            ]}
          >
            <InputNumber min={0} style={{ width: '100%' }} placeholder="请输入金额（万元）" />
          </Form.Item>
          <Form.Item
            name="term"
            label="期限"
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入期限',
              },
            ]}
          >
            <Input placeholder="请输入期限" />
          </Form.Item>
          <Form.Item
            name="rateType"
            label="利率类型"
            hasFeedback
            rules={[
              {
                required: true,
                message: '请选择利率类型',
              },
            ]}
          >
            <Select placeholder="请选择利率类型">
              {RateType?.map((d) => (
                <Select.Option key={d.value} value={d.value}>
                  {d.text}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="expectRate"
            label="期望利率(小数)"
            tooltip="对于投融资就是预期收益率"
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入期望利率',
              },
            ]}
          >
            <Input placeholder="请输入期望利率" />
          </Form.Item>
          <Form.Item
            name="customerType"
            label="存贷客户类型"
            hasFeedback
            rules={[
              {
                required: true,
                message: '请选择存贷客户类型',
              },
            ]}
          >
            <Select placeholder="请选择存贷客户类型">
              {CustomerType?.map((d) => (
                <Select.Option key={d.value} value={d.value}>
                  {d.text}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="loanType"
            label="贷款分类"
            hasFeedback
            rules={[
              {
                required: true,
                message: '请选择贷款分类',
              },
            ]}
          >
            <Select placeholder="请选择贷款分类">
              {LoanType?.map((d) => (
                <Select.Option key={d.value} value={d.value}>
                  {d.text}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="mgMoney"
            label="质押或担保金额(万元)"
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入质押或担保金额（万元）',
              },
            ]}
          >
            <InputNumber
              min={0}
              style={{ width: '100%' }}
              placeholder="请输入质押或担保金额（万元）"
            />
          </Form.Item>
          <Form.Item
            name="creditRating"
            label="贷款信用评级"
            hasFeedback
            rules={[
              {
                required: true,
                message: '请选择贷款信用评级',
              },
            ]}
          >
            <Select placeholder="请选择贷款信用评级">
              {CreditRating?.map((d) => (
                <Select.Option key={d.value} value={d.value}>
                  {d.text}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="debtType"
            label="债券分类"
            hasFeedback
            rules={[
              {
                required: true,
                message: '请选择债券分类',
              },
            ]}
          >
            <Select placeholder="请选择债券分类">
              {DebtType?.map((d) => (
                <Select.Option key={d.value} value={d.value}>
                  {d.text}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="channel"
            label="渠道代码"
            tooltip="具备此渠道的银行才可以获取此笔业务"
            hasFeedback
            rules={[
              {
                required: true,
                message: '请选择渠道代码',
              },
            ]}
          >
            <Select placeholder="请选择渠道代码">
              {Channel?.map((d) => (
                <Select.Option key={d.value} value={d.value}>
                  {d.text}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="region"
            label="区域"
            tooltip="在此区域有支行的银行才可以抢这笔业务"
            hasFeedback
            rules={[
              {
                required: true,
                message: '请选择区域',
              },
            ]}
          >
            <Select placeholder="请选择区域">
              {Region?.map((d) => (
                <Select.Option key={d.value} value={d.value}>
                  {d.text}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Skeleton>
    </Drawer>
  );
};

export default connect(({ adminFinancial, loading }) => ({
  queryEnumsData: adminFinancial.queryEnumsData,
  classTemplateId: adminFinancial.classTemplateId,
  loading: loading.effects['adminFinancial/queryEnums'],
  financialLoading: loading.models.adminFinancial,
}))(FinancialFormDrawer);
