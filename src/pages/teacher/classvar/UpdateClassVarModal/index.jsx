import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Button, Form, Input, Modal, Space } from 'antd';

const UpdateClassVarModal = (props) => {
  const {classVarData, handleUpdateClassVarCancelModal, dispatch} = props
  const [form] = Form.useForm();
  // 更新课堂变量参数
  const updateClassVar = (params) => {
    dispatch({
      type: 'teacherClassVar/updateClassVariable',
      payload: {...params},
    })
    handleCancelResetFields()
  }

  useEffect(() => {
    form.setFieldsValue({ ...classVarData });
  }, [classVarData])

  /**
   * 提交表单 调用新建课堂
   * @param values 表单字段值
   */
  const onFinish = (values) => {
    console.log(values)
    updateClassVar(values)
  }
  // 关闭modal 重置表单
  const handleCancelResetFields = () => {
    // 关闭modal
    handleUpdateClassVarCancelModal()
    // 重置表单
    form.resetFields()
  }

  return (
    <Modal
      forceRender
      visible={classVarData.varKey}
      onCancel={handleCancelResetFields}
      closable={false}
      footer={null}
      width={320}
    >
      <Form
        form={form}
        layout="vertical"
        name="NewClassroomModal"
        onFinish={onFinish}
      >
        <Form.Item
          hidden={true}
          name="varKey"
        >
        </Form.Item>
        <Form.Item
          name="varValue"
        >
          <Input placeholder='请输入变量值'/>
        </Form.Item>
        <Form.Item style={{textAlign: "center", marginBottom: 0}}>
          <Space>
            <Button htmlType="button" onClick={handleCancelResetFields}>
              取消
            </Button>
            <Button type="primary" htmlType="submit">
              确认
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect()(UpdateClassVarModal);
