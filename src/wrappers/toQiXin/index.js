import { Redirect, useModel } from 'umi';
import { getQiXinToken } from '@/services/qixin/qixin';

// 根据角色权限跳转首页
export default (props) => {
  const token = getQiXinToken();
  return (
    <Redirect
      to={`https://b.qixin.com/third-login?tenant=dbcjdx1&token=${token}&returnUrl=/search/advanced`}
    />
  );
  // 获取权限数组
  const authorities = currentUser?.authorities ?? [];
  if (authorities.includes('STUDENT')) {
    return <Redirect to="/student" />;
  } else if (authorities.includes('TEACHER')) {
    return <Redirect to="/teacher" />;
  } else if (authorities.includes('ADMIN')) {
    return <Redirect to="/admin" />;
  } else {
    return <div>{props.children}</div>;
  }
};
