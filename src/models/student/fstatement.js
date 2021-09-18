import {
  endBusiness,
  endFinance,
  queryBankPeriodInfo,
  queryBankReport,
  queryClassReports,
  saveBankReport,
  submitStatements,
} from '@/services/student/fs';
import { message } from 'antd';

const StatementModel = {
  namespace: 'studentStatement',
  state: {
    queryBankPeriodInfoData: {}, // 银行期间信息
    consultationTipsInfo: {}, // 业务结账
    queryClassReportsTabsData: [], // 报表列表- tabs数据
    firstTabPaneDefault: undefined, // 初始选中项
    queryBankReportData: {}, // 银行报表
  },
  effects: {
    // 业务结账
    *endBusiness({ payload }, { call, put }) {
      const response = yield call(endBusiness, payload);
      if (!response.errCode) {
        message.success('业务结账成功');
        // 获取课堂id
        const { classHourId } = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {};
        // 刷新查询银行期间信息
        yield put({
          type: 'queryBankPeriodInfo',
          payload: { classHourId },
        });
      } else if (response.errCode === -1) {
        yield put({
          type: 'save',
          payload: {
            consultationTipsInfo: {
              ...response,
              consultationTipsState: true,
            },
          },
        });
      }
    },
    // 财务结账
    *endFinance({ payload }, { call, put }) {
      const response = yield call(endFinance, payload);
      if (!response.errCode) {
        message.success('财务结账成功');
        // 获取课堂id
        const { classHourId } = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {};
        // 刷新查询银行期间信息
        yield put({
          type: 'queryBankPeriodInfo',
          payload: { classHourId },
        });
      }
    },
    // 财务结账
    *submitStatements({ payload }, { call }) {
      const response = yield call(submitStatements, payload);
      if (!response.errCode) {
        message.success('提交报表成功');
      }
    },
    // 查询银行期间信息
    *queryBankPeriodInfo({ payload }, { call, put }) {
      const response = yield call(queryBankPeriodInfo, payload);
      if (!response.errCode) {
        yield put({
          type: 'save',
          payload: { queryBankPeriodInfoData: response },
        });
      }
    },
    // 查询课堂报表列表- tabs数据
    *queryClassReports({ payload }, { call, put }) {
      const response = yield call(queryClassReports, payload);
      if (!response.errCode) {
        const [firstTabPaneName] = response;
        // 默认选中的第一个tab
        const { reportCode: firstTabPaneDefault } = firstTabPaneName || {};
        yield put({
          type: 'save',
          payload: { queryClassReportsTabsData: response, firstTabPaneDefault },
        });
      }
    },
    // 查询银行报表
    *queryBankReport({ payload }, { call, put }) {
      const response = yield call(queryBankReport, payload);
      if (!response.errCode) {
        // const { reportDetails } = response;
        const queryBankReportData = {
          ...response,
        };
        yield put({
          type: 'save',
          payload: { queryBankReportData },
        });
      }
    },
    // 保存报表
    *saveBankReport({ payload,callback }, { call }) {
      const response = yield call(saveBankReport, payload);
      if (!response.errCode) {
        message.success('保存成功');
        // callback()
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      // 监听 history 变化，当离开 `/student/finance/statement` 时触发 `save` action
      return history.listen(({ pathname }) => {
        if (pathname !== '/student/finance/statement') {
          dispatch({ type: 'save', payload: { consultationTipsInfo: {} } });
        }
      });
    },
  },
};
export default StatementModel;
