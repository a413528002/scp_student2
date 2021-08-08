export default [
  {
    path: '/',
    redirect: '/teacher/classroom',
  },
  // 我的课堂
  {
    path: '/teacher/classroom',
    name: 'teacher-classroom',
    icon: 'BulbOutlined',
    // component: './teacher/classroom',
  },
  // 经营控制
  {
    path: '/teacher/operation',
    name: 'teacher-operation',
    icon: 'RadarChartOutlined',
    // component: './teacher/operation',
  },
  // 参数控制
  {
    path: '/teacher/classvar',
    name: 'teacher-classvar',
    icon: 'BarChartOutlined',
    // component: './teacher/classvar',
  },
  {
    component: './404',
  },
];
