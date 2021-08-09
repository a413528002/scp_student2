import React, { useCallback } from 'react';
import { LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu, Spin } from 'antd';
import { history, useModel } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import { getLogout } from '@/services/login';

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
  await getLogout();
  const { query = {}, pathname } = history.location;
  const { redirect } = query; // Note: There may be security issues, please note

  if (window.location.pathname !== '/user/login' && !redirect) {
    history.replace({
      pathname: '/user/login',
      // 去掉退出登录的不重定向到保存的URL
      /*search: stringify({
        redirect: pathname,
      }),*/
    });
  }
  // 退出登录后清空localStorage
  localStorage.clear()
  // 退出登录后清空sessionStorage
  sessionStorage.clear()
};

const AvatarDropdown = ({ menu }) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const onMenuClick = useCallback(
    (event) => {
      const { key } = event;

      if (key === 'logout') {
        setInitialState((s) => ({ ...s, currentUser: undefined }));
        loginOut();
        return;
      }

      history.push(`/account/${key}`);
    },
    [setInitialState],
  );
  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;


  if (!currentUser || !currentUser.nickname) {
    return loading;
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {/*{menu && (
        <Menu.Item key="center">
          <UserOutlined />
          个人中心
        </Menu.Item>
      )}*/}
      {menu && (
        <Menu.Item key="settings">
          <SettingOutlined />
          修改密码
        </Menu.Item>
      )}
      {menu && <Menu.Divider />}

      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        {/*<Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />*/}
        <span className={`${styles.name} anticon`}>{currentUser.nickname}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
