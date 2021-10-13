import React from 'react';
import { connect } from 'umi';
import { Form, Input, Drawer, Select, Space, Button, Skeleton } from 'antd';

const VariableFormDrawer = (props) => {
  const {
    drawerVisible,
    handleCancelDrawer,
    typeDrawer: { title, type, record },
    queryEnumsData: { ClassVariables },
    classTemplateId,
  } = props;
  const { dispatch, loading, voucherLoading } = props;
  const [form] = Form.useForm();

  /**
   * 新建课堂模板-变量
   * @param values form数据
   */
  const createClassTemplateVariable = (values) => {
    dispatch({
      type: 'adminVariable/createClassTemplateVariable',
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
   * 修改课堂模板-变量
   * @param values form数据
   */
  const updateClassTemplateVariable = (values) => {
    dispatch({
      type: 'adminVariable/updateClassTemplateVariable',
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
          // 新建课堂模板-变量
          createClassTemplateVariable(values);
        } else if (type === 'UPDATE') {
          // 修改课堂模板-变量
          updateClassTemplateVariable(values);
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
            name="varKey"
            label="变量KEY"
            hasFeedback
            rules={[
              {
                required: true,
                message: '请选择变量KEY',
              },
            ]}
          >
            <Select placeholder="请选择变量KEY">
              {ClassVariables?.map((d) => (
                <Select.Option key={d.value} value={d.value}>
                  {d.text}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="varValue"
            label="变量VALUE"
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入变量VALUE',
              },
            ]}
          >
            <Input placeholder="请输入变量VALUE" />
          </Form.Item>
        </Form>
      </Skeleton>
    </Drawer>
  );
};

export default connect(({ adminVariable, loading }) => ({
  queryEnumsData: adminVariable.queryEnumsData,
  classTemplateId: adminVariable.classTemplateId,
  loading: loading.effects['adminVariable/queryEnums'],
  voucherLoading: loading.models.adminVariable,
}))(VariableFormDrawer);
