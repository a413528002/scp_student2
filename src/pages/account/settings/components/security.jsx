import React, { Component } from 'react';
import { List } from 'antd';
import ChangePasswordModal from '@/pages/account/settings/components/changePasswordModal';

class SecurityView extends Component {
  state = { visible: false };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
    });
  };
  getData = () => [
    {
      title: '账户密码',
      description: (
        <>
          {'当前密码强度'}：{'强'}
        </>
      ),
      actions: [
        <a key="Modify" onClick={this.showModal}>
          修改
        </a>,
      ],
    },
  ];

  render() {
    const data = this.getData();
    const hideModal = this.hideModal;
    const { visible } = this.state;
    return (
      <>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item actions={item.actions}>
              <List.Item.Meta title={item.title} description={item.description} />
            </List.Item>
          )}
        />
        <ChangePasswordModal visible={visible} hideModal={hideModal} />
      </>
    );
  }
}

export default SecurityView;
