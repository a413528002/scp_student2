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
    redirect: '/404',
  },
  // 首页
  {
    path: '/student/home',
    component: './student/home',
  },
  // 我的课堂
  {
    path: '/student/classroom',
    component: './student/classroom',
  },
  // 规划
  {
    path: '/student/plan',
    routes: [
      {
        path: '/student/plan',
        redirect: '/student/plan/tactic',
      },
      {
        // 战略
        path: '/student/plan/tactic',
        component: './student/plan/tactic',
      },
      {
        // 机构
        path: '/student/plan/organization',
        component: './student/plan/organization',
      },
      {
        // 渠道
        path: '/student/plan/channel',
        component: './student/plan/channel',
      },
      {
        // 营销
        path: '/student/plan/marketing',
        component: './student/plan/marketing',
      },
    ],

  },
  // 交易
  {
    path: '/student/deal',
    routes: [
      {
        path: '/student/deal',
        redirect: '/student/deal/deposit',
      },
      {
        // 存款
        path: '/student/deal/deposit',
        component: './student/deal/deposit',
      },
      {
        // 贷款
        path: '/student/deal/loans',
        component: './student/deal/loans',
      },
      {
        // 准备金
        path: '/student/deal/prepare',
        component: './student/deal/prepare',
      },
      {
        // 拨备
        path: '/student/deal/provision',
        component: './student/deal/provision',
      },
      {
        // 存款管理
        path: '/student/deal/deposits',
        component: './student/deal/deposits',
      },
      {
        // 贷款管理
        path: '/student/deal/loan',
        component: './student/deal/loan',
      },
    ],
  },
  // 金融
  {
    path: '/student/financial',
    routes: [
      {
        path: '/student/financial',
        redirect: '/student/financial/creditors',
      },
      {
        // 债权
        path: '/student/financial/creditors',
        component: './student/financial/creditors',
      },
      {
        // 投融资
        path: '/student/financial/financing',
        component: './student/financial/financing',
      },
    ],
  },
  // 财务
  {
    path: '/student/finance',
    routes: [
      {
        path: '/student/finance',
        redirect: '/student/finance/operation',
      },
      {
        // 运营
        path: '/student/finance/operation',
        component: './student/finance/operation',
      },
      {
        // 资金
        path: '/student/finance/transfer',
        component: './student/finance/transfer',
      },
      {
        // 破产
        path: '/student/finance/broke',
        component: './student/finance/broke',
      },
      {
        // 报表
        path: '/student/finance/statement',
        component: './student/finance/statement',
      },
    ],
  },
  // 风险
  {
    path: '/student/risk',
    routes: [
      {
        path: '/student/risk',
        redirect: '/student/risk/handle',
      },
      {
        // 操作
        path: '/student/risk/handle',
        component: './student/risk/handle',
      },
      {
        // 信用
        path: '/student/risk/credit',
        component: './student/risk/credit',
      },
      {
        // 市场
        path: '/student/risk/market',
        component: './student/risk/market',
      },
      {
        // 监管
        path: '/student/risk/regulatory',
        component: './student/risk/regulatory',
      },
    ]
  },

  // teacherMenu
  {
    path: 'teacher/classroom',
    component: './teacher/classroom',
  },
  {
    path: 'teacher/operation',
    component: './teacher/operation',
  },
  {
    path: 'teacher/classvar',
    component: './teacher/classvar',
  },

  {
    component: './404',
  },
];

