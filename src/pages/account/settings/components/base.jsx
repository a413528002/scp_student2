import { Button, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import styles from './BaseView.less';
import { useModel } from 'umi';
import { changeNickname } from '@/services/user';

const BaseView = () => {
  const { initialState, refresh } = useModel('@@initialState');
  const { currentUser } = initialState;
  const [loading, setLoading] = useState(false);

  // 修改昵称
  const handleFinish = (values) => {
    setLoading(true)
    changeNickname(values)
      .then(message.success('保存成功'))
      .then(refresh)// 刷新initialState
      .finally(() => setLoading(false))
  };

  return (
    <div className={styles.baseView}>
      <div className={styles.left}>
        <Form
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{ ...currentUser }}
          hideRequiredMark
        >
          <Form.Item
            name="nickname"
            label="昵称"
            rules={[
              {
                required: true,
                message: '请输入昵称',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary" loading={loading}>
              保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );

}

export default BaseView;
