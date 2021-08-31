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
    component: './404',
    wrappers: ['@/wrappers/toHomePage'],
  },

  // 学生菜单
  {
    path: '/student',
    name: 'student',
    flatMenu: true,
    access: 'studentRouteFilter',
    routes: [
      {
        path: './',
        redirect: './classroom',
      },
      // 我的课堂
      {
        path: './classroom',
        name: 'classroom',
        icon: 'BulbOutlined',
        component: './student/classroom',
      },
      // 宏观经济
      {
        path: './macroeconomic',
        name: 'macroeconomic',
        icon: 'FireOutlined',
        component: './student/macroeconomic',
      },
      // 规划
      {
        path: './plan',
        name: 'plan',
        icon: 'ProfileOutlined',
        routes: [
          {
            path: './plan',
            redirect: '/student/plan/tactic',
          },
          {
            // 战略
            path: './tactic',
            name: 'tactic',
            component: './student/plan/tactic',
          },
          {
            // 机构
            path: './organization',
            name: 'organization',
            component: './student/plan/organization',
          },
          {
            // 渠道
            path: './channel',
            name: 'channel',
            component: './student/plan/channel',
          },
          {
            // 营销
            path: './marketing',
            name: 'marketing',
            component: './student/plan/marketing',
          },
        ],
      },
      // 交易
      {
        path: './deal',
        name: 'deal',
        icon: 'RetweetOutlined',
        routes: [
          {
            path: './',
            redirect: './deposit',
          },
          {
            // 存款
            path: './deposit',
            name: 'deposit',
            component: './student/deal/deposit',
          },
          {
            // 贷款
            path: './loan',
            name: 'loan',
            component: './student/deal/loan',
          },
          {
            // 准备金
            path: './prepare',
            name: 'prepare',
            component: './student/deal/prepare',
          },
          {
            // 拨备
            path: './provision',
            name: 'provision',
            component: './student/deal/provision',
          },
          {
            // 存款管理
            path: './depositMng',
            name: 'depositMng',
            component: './student/deal/depositMng',
          },
          {
            // 贷款管理
            path: './loanMng',
            name: 'loanMng',
            component: './student/deal/loanMng',
          },
        ],
      },
      // 金融
      {
        path: './financial',
        name: 'financial',
        icon: 'TransactionOutlined',
        routes: [
          {
            path: './',
            redirect: './creditors',
          },
          {
            // 债权
            path: './creditors',
            name: 'creditors',
            component: './student/financial/creditors',
          },
          {
            // 投融资
            path: './financing',
            name: 'financing',
            component: './student/financial/financing',
          },
        ],
      },
      // 财务
      {
        path: './finance',
        name: 'finance',
        icon: 'AccountBookOutlined',
        routes: [
          {
            path: './',
            redirect: './operation',
          },
          {
            // 运营
            path: './operation',
            name: 'operation',
            component: './student/finance/operation',
          },
          {
            // 资金
            path: './transfer',
            name: 'transfer',
            component: './student/finance/transfer',
          },
          {
            // 破产
            path: './broke',
            name: 'broke',
            component: './student/finance/broke',
          },
          {
            // 报表
            path: './statement',
            name: 'statement',
            component: './student/finance/statement',
          },
        ],
      },
      // 风险
      {
        path: './risk',
        name: 'risk',
        icon: 'NodeIndexOutlined',
        routes: [
          {
            path: './',
            redirect: './handle',
          },
          {
            // 操作
            path: './handle',
            name: 'handle',
            component: './student/risk/handle',
          },
          {
            // 信用
            path: './credit',
            name: 'credit',
            component: './student/risk/credit',
          },
          {
            // 市场
            path: './market',
            name: 'market',
            component: './student/risk/market',
          },
          {
            // 监管
            path: './regulatory',
            name: 'regulatory',
            component: './student/risk/regulatory',
          },
        ],
      },
      // 咨询
      {
        path: './consultation',
        name: 'consultation',
        icon: 'MessageOutlined',
        component: './student/consultation',
      },
    ],
  },

  // 老师菜单
  {
    path: '/teacher',
    name: 'teacher',
    flatMenu: true,
    access: 'teacherRouteFilter',
    routes: [
      {
        path: './',
        redirect: './classroom',
      },
      {
        path: './classroom',
        name: 'classroom',
        icon: 'BulbOutlined',
        component: './teacher/classroom',
      },
      {
        path: './operation',
        name: 'operation',
        icon: 'RadarChartOutlined',
        component: './teacher/operation',
      },
      {
        path: './classvar',
        name: 'classvar',
        icon: 'BarChartOutlined',
        component: './teacher/classvar',
      },
      // 宏观经济
      {
        path: 'teacher/macro',
        name: 'macro',
        icon: 'FireOutlined',
        component: './teacher/macro',
      },
      // 经营管理
      {
        path: 'teacher/business',
        name: 'business',
        icon: 'RiseOutlined',
        component: './teacher/business',
      },
      // 破产管理
      {
        path: 'teacher/bankruptcy',
        name: 'bankruptcy',
        icon: 'PieChartOutlined',
        component: './teacher/bankruptcy',
      },
      // 排行榜
      {
        path: 'teacher/ranking',
        name: 'ranking',
        icon: 'RocketOutlined',
        component: './teacher/ranking',
      },
    ],
  },
  {
    path: '/admin',
    name: 'admin',
    flatMenu: true,
    access: 'adminRouteFilter',
    routes: [
      {
        path: './',
        redirect: './user',
      },
      {
        path: './user',
        name: 'user',
        icon: 'IdcardOutlined',
        component: './admin/user',
      },
    ],
  },
  // 设置
  {
    path: './account',
    name: 'account',
    hideInMenu: true,
    icon: 'UserOutlined',
    routes: [
      {
        path: './',
        redirect: './settings',
      },
      {
        // 个人设置
        path: './settings',
        name: 'settings',
        component: './account/settings',
      },
    ],
  },
  {
    component: './404',
  },
];
