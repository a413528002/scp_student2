/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState) {
  const { currentUser } = initialState || {};
  // 获取权限集合
  const authorities = currentUser?.authorities ?? []
  return {
    adminRouteFilter: () => authorities.includes('ADMIN'), // 管理员Filter
    teacherRouteFilter: () => authorities.includes('TEACHER'), // 老师Filter
    studentRouteFilter: () => authorities.includes('STUDENT'), // 学生Filter
  };
}
