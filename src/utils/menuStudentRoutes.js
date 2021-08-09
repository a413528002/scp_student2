export default [
  {
    path: '/',
    redirect: '/student/home',
  },
  // 首页
  {
    path: '/student/home',
    name: 'student-home',
    icon: 'HomeOutlined',
  },
  // 我的课堂
  {
    path: '/student/classroom',
    name: 'student-classroom',
    icon: 'BulbOutlined',
  },
  // 规划
  {
    path: '/student/plan',
    name: 'student-plan',
    icon: 'ProfileOutlined',
    routes: [
      {
        path: '/student/plan',
        redirect: '/student/plan/tactic',
      },
      {
        // 战略
        name: 'tactic',
        path: '/student/plan/tactic',
      },
      {
        // 机构
        name: 'organization',
        path: '/student/plan/organization',
      },
      {
        // 渠道
        name: 'channel',
        path: '/student/plan/channel',
      },
      {
        // 营销
        name: 'marketing',
        path: '/student/plan/marketing',
      },
    ],

  },
  // 交易
  {
    path: '/student/deal',
    name: 'student-deal',
    icon: 'RetweetOutlined',
    routes: [
      {
        path: '/student/deal',
        redirect: '/student/deal/deposit',
      },
      {
        // 存款
        name: 'deposit',
        path: '/student/deal/deposit',
      },
      {
        // 贷款
        name: 'loans',
        path: '/student/deal/loans',
      },
      {
        // 准备金
        name: 'prepare',
        path: '/student/deal/prepare',
      },
      {
        // 拨备
        name: 'provision',
        path: '/student/deal/provision',
      },
      {
        // 存款管理
        name: 'deposits',
        path: '/student/deal/deposits',
      },
      {
        // 贷款管理
        name: 'loan',
        path: '/student/deal/loan',
      },
    ],
  },
  // 金融
  {
    path: '/student/financial',
    name: 'student-financial',
    icon: 'TransactionOutlined',
    routes: [
      {
        path: '/financial',
        redirect: '/student/financial/creditors',
      },
      {
        // 债权
        name: 'creditors',
        path: '/student/financial/creditors',
      },
      {
        // 投融资
        name: 'financing',
        path: '/student/financial/financing',
      },
    ],
  },
  // 财务
  {
    path: '/student/finance',
    name: 'student-finance',
    icon: 'AccountBookOutlined',
    routes: [
      {
        path: '/finance',
        redirect: '/student/finance/operation',
      },
      {
        // 运营
        name: 'operation',
        path: '/student/finance/operation',
      },
      {
        // 资金
        name: 'transfer',
        path: '/student/finance/transfer',
      },
      {
        // 破产
        name: 'broke',
        path: '/student/finance/broke',
      },
      {
        // 报表
        name: 'statement',
        path: '/student/finance/statement',
      },
    ],
  },
  // 风险
  {
    path: '/student/risk',
    name: 'student-risk',
    icon: 'NodeIndexOutlined',
    routes: [
      {
        path: '/student/risk',
        redirect: '/student/risk/handle',
      },
      {
        // 操作
        name: 'handle',
        path: '/student/risk/handle',
      },
      {
        // 信用
        name: 'credit',
        path: '/student/risk/credit',
      },
      {
        // 市场
        name: 'market',
        path: '/student/risk/market',
      },
      {
        // 监管
        name: 'regulatory',
        path: '/student/risk/regulatory',
      },
    ]
  },
  {
    component: './404',
  },
];

