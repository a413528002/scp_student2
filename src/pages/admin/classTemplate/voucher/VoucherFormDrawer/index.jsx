import React from 'react';
import { connect } from 'umi';
import { Form, Input, Drawer, Select, Space, Button, Skeleton } from 'antd';

const VoucherFormDrawer = (props) => {
  const {
    drawerVisible,
    handleCancelDrawer,
    typeDrawer: { title, type, record },
    queryEnumsData: { Direction, TransCode },
    classTemplateId,
  } = props;
  const { dispatch, loading, voucherLoading } = props;
  const [form] = Form.useForm();

  /**
   * 新建课堂模板-凭证引擎配置
   * @param values form数据
   */
  const createClassTemplateVoucher = (values) => {
    dispatch({
      type: 'adminVoucher/createClassTemplateVoucher',
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
   * 修改课堂模板-凭证引擎配置
   * @param values form数据
   */
  const updateClassTemplateVoucher = (values) => {
    dispatch({
      type: 'adminVoucher/updateClassTemplateVoucher',
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
        if (type === 'CREATE') {
          // 新建课堂模板-凭证引擎配置
          createClassTemplateVoucher(values);
        } else if (type === 'UPDATE') {
          // 修改课堂模板-凭证引擎配置
          updateClassTemplateVoucher(values);
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
          <Button type="primary" onClick={handleOk} loading={voucherLoading}>
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
            name="transCode"
            label="序号"
            hasFeedback
            rules={[
              {
                required: true,
                message: '请选择序号',
              },
            ]}
          >
            <Select placeholder="请选择序号">
              {TransCode?.map((d) => (
                <Select.Option key={d.value} value={d.value}>
                  {d.text}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="subjectNo"
            label="科目号"
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入科目号',
              },
            ]}
          >
            <Input placeholder="请输入科目号" />
          </Form.Item>
          <Form.Item
            name="recDir"
            label="记账方向"
            hasFeedback
            rules={[
              {
                required: true,
                message: '请选择记账方向',
              },
            ]}
          >
            <Select placeholder="请选择记账方向">
              {Direction?.map((d) => (
                <Select.Option key={d.value} value={d.value}>
                  {d.text}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="elRecAmount"
            label="记账金额EL表达式"
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入记账金额EL表达式',
              },
            ]}
          >
            <Input placeholder="请输入记账金额EL表达式" />
          </Form.Item>
        </Form>
      </Skeleton>
    </Drawer>
  );
};

export default connect(({ adminVoucher, loading }) => ({
  queryEnumsData: adminVoucher.queryEnumsData,
  classTemplateId: adminVoucher.classTemplateId,
  loading: loading.effects['adminVoucher/queryEnums'],
  voucherLoading: loading.models.adminVoucher,
}))(VoucherFormDrawer);
