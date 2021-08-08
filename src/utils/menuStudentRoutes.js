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
    name: 'plan',
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
        // component: './student/plan/tactic',
      },
      {
        // 机构
        name: 'organization',
        path: '/student/plan/organization',
        // component: './student/plan/organization',
      },
      {
        // 渠道
        name: 'channel',
        path: '/student/plan/channel',
        // component: './student/plan/channel',
      },
      {
        // 营销
        name: 'marketing',
        path: '/student/plan/marketing',
        // component: './student/plan/marketing',
      },
    ],

  },
  // 交易
  {
    path: '/student/deal',
    name: 'deal',
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
        // component: './student/deal/deposit',
      },
      {
        // 贷款
        name: 'loans',
        path: '/student/deal/loans',
        // component: './student/deal/loans',
      },
      {
        // 准备金
        name: 'prepare',
        path: '/student/deal/prepare',
        // component: './student/deal/prepare',
      },
      {
        // 拨备
        name: 'provision',
        path: '/student/deal/provision',
        // component: './student/deal/provision',
      },
      {
        // 存款管理
        name: 'deposits',
        path: '/student/deal/deposits',
        // component: './student/deal/deposits',
      },
      {
        // 贷款管理
        name: 'loan',
        path: '/student/deal/loan',
        // component: './student/deal/loan',
      },
    ],
  },
  // 金融
 /* {
    path: '/financial',
    name: 'financial',
    icon: 'TransactionOutlined',
    routes: [
      {
        path: '/financial',
        redirect: '/financial/creditors',
      },
      {
        // 债权
        name: 'creditors',
        path: '/financial/creditors',
        component: './financial/creditors',
      },
      {
        // 投融资
        name: 'financing',
        path: '/financial/financing',
        component: './financial/financing',
      },
    ],
  },*/
  // 财务
  /*{
    path: '/finance',
    name: 'finance',
    icon: 'AccountBookOutlined',
    routes: [
      {
        path: '/finance',
        redirect: '/finance/operation',
      },
      {
        // 运营
        name: 'operation',
        path: '/finance/operation',
        component: './finance/operation',
      },
      {
        // 资金
        name: 'transfer',
        path: '/finance/transfer',
        component: './finance/transfer',
      },
      {
        // 破产
        name: 'broke',
        path: '/finance/broke',
        component: './finance/broke',
      },
      {
        // 报表
        name: 'statement',
        path: '/finance/statement',
        component: './finance/statement',
      },
    ],
  },*/
  // 风险
  /*{
    path: '/risk',
    name: 'risk',
    icon: 'AccountBookOutlined',
    routes: [
      {
        path: '/risk',
        redirect: '/risk/handle',
      },
      {
        // 操作
        name: 'handle',
        path: '/risk/handle',
        component: './risk/handle',
      },
      {
        // 信用
        name: 'credit',
        path: '/risk/credit',
        component: './risk/credit',
      },
      {
        // 市场
        name: 'market',
        path: '/risk/market',
        component: './risk/market',
      },
      {
        // 监管
        name: 'regulatory',
        path: '/risk/regulatory',
        component: './risk/regulatory',
      },
    ]
  },*/
  {
    component: './404',
  },
];

