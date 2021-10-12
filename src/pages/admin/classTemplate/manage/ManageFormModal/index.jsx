import React from 'react';
import { connect } from 'umi';
import { Form, Modal, Input } from 'antd';

const ManageFormModal = (props) => {
  const {
    modalVisible,
    handleCancelModal,
    typeModal: { title, type, record },
  } = props;
  const { dispatch, loading } = props;
  const [form] = Form.useForm();

  /**
   * 新建课堂模板
   * @param values form数据
   */
  const createClassTemplate = (values) => {
    dispatch({
      type: 'adminTemplate/createClassTemplate',
      payload: { ...values },
      callback: () => {
        // 关闭弹窗
        handleCancelModal();
        // 清空表单
        form.resetFields();
      },
    });
  };
  /**
   * 修改课堂模板
   * @param values form数据
   */
  const updateClassTemplate = (values) => {
    dispatch({
      type: 'adminTemplate/updateClassTemplate',
      payload: { ...record, ...values },
      callback: () => {
        // 关闭弹窗
        handleCancelModal();
      },
    });
  };

  // 确认提交
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (type === 'CREATE') {
          // 新建课堂模板
          createClassTemplate(values);
        } else if (type === 'UPDATE') {
          // 修改课堂模板
          updateClassTemplate(values);
        }
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  // 栅格
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
  };
  return (
    <Modal
      visible={modalVisible}
      title={`${title}模板`}
      onCancel={handleCancelModal}
      onOk={handleOk}
      confirmLoading={loading}
    >
      <Form
        {...formItemLayout}
        form={form}
        name="class_template_modal"
        initialValues={{ ...record }}
      >
        <Form.Item
          name="name"
          label="名称"
          rules={[
            {
              required: true,
              message: '请输入名称',
            },
          ]}
        >
          <Input placeholder="请输入名称" />
        </Form.Item>
        <Form.Item
          name="memo"
          label="备注"
          rules={[
            {
              required: true,
              message: '请输入备注',
            },
          ]}
        >
          <Input placeholder="请输入备注" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.adminManage,
}))(ManageFormModal);
