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

  {
    path: '/',
    redirect: '/home',
  },
  // 首页
  {
    path: '/home',
    name: 'home',
    icon: 'HomeOutlined',
    component: './home',
  },
  // 我的课堂
  {
    path: '/classroom',
    name: 'classroom',
    icon: 'BulbOutlined',
    component: './classroom',
  },
  // 规划
  {
    path: '/plan',
    name: 'plan',
    icon: 'ProfileOutlined',
    routes: [
      {
        path: '/plan',
        redirect: '/plan/tactic',
      },
      {
        // 战略
        name: 'tactic',
        path: '/plan/tactic',
        component: './plan/tactic',
      },
      {
        // 机构
        name: 'organization',
        path: '/plan/organization',
        component: './plan/organization',
      },
      {
        // 渠道
        name: 'channel',
        path: '/plan/channel',
        component: './plan/channel',
      },
      {
        // 营销
        name: 'marketing',
        path: '/plan/marketing',
        component: './plan/marketing',
      },
    ],

  },
  // 交易
  {
    path: '/deal',
    name: 'deal',
    icon: 'RetweetOutlined',
    routes: [
      {
        path: '/deal',
        redirect: '/deal/deposit',
      },
      {
        // 存款
        name: 'deposit',
        path: '/deal/deposit',
        component: './deal/deposit',
      },
      {
        // 贷款
        name: 'loans',
        path: '/deal/loans',
        component: './deal/loans',
      },
      {
        // 准备金
        name: 'prepare',
        path: '/deal/prepare',
        component: './deal/prepare',
      },
      {
        // 拨备
        name: 'provision',
        path: '/deal/provision',
        component: './deal/provision',
      },
      {
        // 存款管理
        name: 'deposits',
        path: '/deal/deposits',
        component: './deal/deposits',
      },
      {
        // 贷款管理
        name: 'loan',
        path: '/deal/loan',
        component: './deal/loan',
      },

    ],

  },

  {
    component: './404',
  },
];
