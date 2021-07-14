export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
    ],
  },
  // 首页
  {
    path: '/home',
    name: 'home',
    icon: 'HomeOutlined',
    component: './home',
  },
  {
    path: '/classroom',
    name: 'classroom',
    icon: 'BulbOutlined',
    component: './classroom',
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    component: './404',
  },
];
