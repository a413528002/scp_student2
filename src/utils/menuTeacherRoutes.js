export default [
  {
    path: '/',
    redirect: '/teacher/classroom',
  },
  // 首页
  {
    path: '/teacher/classroom',
    name: 'teacher-classroom',
    icon: 'BulbOutlined',
    // component: './teacher/classroom',
  },
  // 我的课堂
  {
    path: '/teacher/operation',
    name: 'teacher-operation',
    icon: 'BulbOutlined',
    // component: './teacher/operation',
  },
  {
    path: '/teacher/classvar',
    name: 'teacher-classvar',
    icon: 'BulbOutlined',
    // component: './teacher/classvar',
  },
  {
    component: './404',
  },
];
