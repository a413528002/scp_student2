import React from 'react';
import {connect} from "umi";
import {Modal, Form, Input, Button, Space} from 'antd';

const NewClassroomModal = (props) => {
  const {newClassroomModalVisible, handleNewClassroomCancelModal, dispatch} = props
  const [form] = Form.useForm();
  // 新建课堂
  const createClassHour = (params) => {
    dispatch({
      type: 'teacherClassroom/createClassHour',
      payload: {...params},
      // 新建成功后的回调
      callback: () => {
        handleCancelResetFields()
      },
    })
  }
  /**
   * 提交表单 调用新建课堂
   * @param values 表单字段值
   */
  const onFinish = (values) => {
    createClassHour(values)
  }
  // 关闭modal 重置表单
  const handleCancelResetFields = () => {
    // 关闭modal
    handleNewClassroomCancelModal()
    // 重置表单
    form.resetFields()
  }
  return (
    <Modal
      visible={newClassroomModalVisible}
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
          name="classHourName"
          rules={[
            {
              required: true,
              message: '请输入课堂名称',
            },
          ]}
        >
          <Input placeholder='请输入课堂名称'/>
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

export default connect()(NewClassroomModal);
