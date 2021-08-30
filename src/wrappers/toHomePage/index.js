import {Redirect, useModel} from 'umi'

// 根据角色权限跳转首页
export default (props) => {
  const {initialState} = useModel('@@initialState');
  const currentUser = initialState?.currentUser
  // 未登录 跳到登录页
  if (!currentUser) {
    return <Redirect to="/user/login"/>
  }
  // 获取权限数组
  const authorities = currentUser?.authorities ?? []
  if (authorities.includes('STUDENT')) {
    return <Redirect to="/student" />;
  } else if (authorities.includes('TEACHER')) {
    return <Redirect to="/teacher" />;
  }else if (authorities.includes('ADMIN')) {
    return <Redirect to="/admin" />;
  } else {
    return <div>{ props.children }</div>;
  }
}
