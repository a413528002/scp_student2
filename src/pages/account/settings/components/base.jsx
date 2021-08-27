import { Button, Input, Form } from 'antd';
import { connect } from 'umi';
import React, { Component } from 'react';
import styles from './BaseView.less';

class BaseView extends Component {
  // 修改昵称
  handleFinish = (values) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/changeNickname',
      payload: { ...values },
    });
  };

  render() {
    const { currentUserData, loading } = this.props;
    return (
      <div className={styles.baseView}>
        <div className={styles.left}>
          <Form
            layout="vertical"
            onFinish={this.handleFinish}
            initialValues={{ ...currentUserData }}
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
                更新基本信息
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default connect(({ user, loading }) => ({
  currentUserData: user.queryCurrentUserData,
  loading: loading.effects['user/changeNickname'],
}))(BaseView);
