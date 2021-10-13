import React from 'react';
import { connect } from 'umi';
import { Form, Input, Drawer, Select, Space, Button, Skeleton } from 'antd';

const SubjectFormDrawer = (props) => {
  const {
    drawerVisible,
    handleCancelDrawer,
    typeDrawer: { title, type, record },
    queryEnumsData: { AccountingSubjectTypeSub, AccountingSubjectType, Direction },
    classTemplateId,
  } = props;
  const { dispatch, loading, subjectLoading } = props;
  const [form] = Form.useForm();

  /**
   * 新建课堂模板-科目
   * @param values form数据
   */
  const createClassTemplateAccountingSubject = (values) => {
    dispatch({
      type: 'adminSubject/createClassTemplateAccountingSubject',
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
   * 修改课堂模板-科目
   * @param values form数据
   */
  const updateClassTemplateAccountingSubject = (values) => {
    dispatch({
      type: 'adminSubject/updateClassTemplateAccountingSubject',
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
          // 新建课堂模板-科目
          createClassTemplateAccountingSubject(values);
        } else if (type === 'UPDATE') {
          // 修改课堂模板-科目
          updateClassTemplateAccountingSubject(values);
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
          <Button type="primary" onClick={handleOk} loading={subjectLoading}>
            确认
          </Button>
        </Space>
      }
      footerStyle={{ textAlign: 'center' }}
    >
      <Skeleton active loading={loading}>
        <Form {...formItemLayout} form={form} name="form_drawer" initialValues={{ ...record }}>
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
            name="parentSubjectNo"
            label="父科目号"
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入父科目号',
              },
            ]}
          >
            <Input placeholder="请输入父科目号" />
          </Form.Item>
          <Form.Item
            name="subjectName"
            label="科目名称"
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入科目名称',
              },
            ]}
          >
            <Input placeholder="请输入科目名称" />
          </Form.Item>
          <Form.Item
            name="type"
            label="科目类型"
            hasFeedback
            rules={[
              {
                required: true,
                message: '请选择科目类型',
              },
            ]}
          >
            <Select placeholder="请选择科目类型">
              {AccountingSubjectType?.map((d) => (
                <Select.Option key={d.value} value={d.value}>
                  {d.text}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="typeSub"
            label="科目类型细分"
            hasFeedback
            rules={[
              {
                required: true,
                message: '请选择科目类型细分',
              },
            ]}
          >
            <Select placeholder="请选择科目类型细分">
              {AccountingSubjectTypeSub?.map((d) => (
                <Select.Option key={d.value} value={d.value}>
                  {d.text}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="balDir"
            label="余额方向"
            hasFeedback
            rules={[
              {
                required: true,
                message: '请选择余额方向',
              },
            ]}
          >
            <Select placeholder="请选择余额方向">
              {Direction?.map((d) => (
                <Select.Option key={d.value} value={d.value}>
                  {d.text}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="isCash"
            label="是否现金"
            hasFeedback
            rules={[
              {
                required: true,
                message: '请选择是否现金',
              },
            ]}
          >
            <Select placeholder="请选择是否现金">
              <Select.Option value={true}>是</Select.Option>
              <Select.Option value={false}>否</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Skeleton>
    </Drawer>
  );
};

export default connect(({ adminSubject, loading }) => ({
  queryEnumsData: adminSubject.queryEnumsData,
  classTemplateId: adminSubject.classTemplateId,
  loading: loading.effects['adminSubject/queryEnums'],
  subjectLoading: loading.models.adminSubject,
}))(SubjectFormDrawer);
