import React from 'react';
import { connect } from 'umi';
import { Form, Input, Drawer, Select, Space, Button, Skeleton, InputNumber } from 'antd';

const CheckFormDrawer = (props) => {
  const {
    drawerVisible,
    handleCancelDrawer,
    typeDrawer: { title, type, record },
    queryEnumsData: { CheckType },
    classTemplateId,
  } = props;
  const { dispatch, loading, checkLoading } = props;
  const [form] = Form.useForm();

  /**
   * 新建课堂模板-账务检查
   * @param values form数据
   */
  const createClassTemplateManualBookCheck = (values) => {
    dispatch({
      type: 'adminCheck/createClassTemplateManualBookCheck',
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
   * 修改课堂模板-账务检查
   * @param values form数据
   */
  const updateClassTemplateManualBookCheck = (values) => {
    dispatch({
      type: 'adminCheck/updateClassTemplateManualBookCheck',
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
          // 新建课堂模板-账务检查
          createClassTemplateManualBookCheck(values);
        } else if (type === 'UPDATE') {
          // 修改课堂模板-账务检查
          updateClassTemplateManualBookCheck(values);
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
          <Button type="primary" onClick={handleOk} loading={checkLoading}>
            确认
          </Button>
        </Space>
      }
      footerStyle={{ textAlign: 'center' }}
    >
      <Skeleton active loading={loading}>
        <Form {...formItemLayout} form={form} name="form_drawer" initialValues={{ ...record }}>
          <Form.Item
            name="type"
            label="类型"
            hasFeedback
            rules={[
              {
                required: true,
                message: '请选择类型',
              },
            ]}
          >
            <Select placeholder="请选择类型">
              {CheckType?.map((d) => (
                <Select.Option key={d.value} value={d.value}>
                  {d.text}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="entityClass"
            label="待检查实体Class"
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入待检查实体Class',
              },
            ]}
          >
            <Input placeholder="请输入待检查实体Class" />
          </Form.Item>
          <Form.Item
            name="fieldName"
            label="待检查属性名"
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入待检查属性名',
              },
            ]}
          >
            <Input placeholder="请输入待检查属性名" />
          </Form.Item>
          <Form.Item
            name="fieldNameId"
            label="待检查实体ID属性"
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入待检查实体ID属性',
              },
            ]}
          >
            <Input placeholder="请输入待检查实体ID属性" />
          </Form.Item>
          <Form.Item
            name="fieldNameTransCode"
            label="待检查实体交易码属性"
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入待检查实体交易码属性',
              },
            ]}
          >
            <Input placeholder="请输入待检查实体交易码属性" />
          </Form.Item>
          <Form.Item
            name="fieldNameTransNo"
            label="待检查实体交易号属性"
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入待检查实体交易号属性',
              },
            ]}
          >
            <Input placeholder="请输入待检查实体交易号属性" />
          </Form.Item>
          <Form.Item
            name="moduleName"
            label="模块名称"
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入模块名称',
              },
            ]}
          >
            <Input placeholder="请输入模块名称" />
          </Form.Item>
          <Form.Item
            name="hintCost"
            label="提示咨询费用"
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入提示咨询费用',
              },
            ]}
          >
            <InputNumber min={0} style={{ width: '100%' }} placeholder="请输入提示咨询费用" />
          </Form.Item>
          <Form.Item
            name="fullCost"
            label="完整咨询费用"
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入完整咨询费用',
              },
            ]}
          >
            <InputNumber min={0} style={{ width: '100%' }} placeholder="请输入完整咨询费用" />
          </Form.Item>
          <Form.Item
            name="errorPoint"
            label="错账扣分"
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入错账扣分',
              },
            ]}
          >
            <InputNumber min={0} style={{ width: '100%' }} placeholder="请输入错账扣分" />
          </Form.Item>
          <Form.Item
            name="comments"
            label="错误说明"
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入错误说明',
              },
            ]}
          >
            <Input placeholder="请输入错误说明" />
          </Form.Item>
        </Form>
      </Skeleton>
    </Drawer>
  );
};

export default connect(({ adminCheck, loading }) => ({
  queryEnumsData: adminCheck.queryEnumsData,
  classTemplateId: adminCheck.classTemplateId,
  loading: loading.effects['adminCheck/queryEnums'],
  checkLoading: loading.models.adminCheck,
}))(CheckFormDrawer);
