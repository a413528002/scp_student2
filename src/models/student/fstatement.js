import {
  endBusiness,
  endFinance,
  queryBankPeriodInfo,
  submitStatements,
} from '@/services/student/fs';
import { message } from 'antd';

const StatementModel = {
  namespace: 'studentStatement',
  state: {
    queryBankPeriodInfoData: {},
    consultationTipsInfo: {},
  },
  effects: {
    // 业务结账
    *endBusiness({ payload }, { call, put }) {
      const response = yield call(endBusiness, payload);
      if (!response.errCode) {
        message.success('业务结账成功');
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
    *endFinance({ payload }, { call }) {
      const response = yield call(endFinance, payload);
      if (!response.errCode) {
        message.success('财务结账成功');
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
      // 监听 history 变化，当进入 `/student/finance/statement` 时触发 `save` action
      return history.listen(({ pathname }) => {
        if (pathname !== '/student/finance/statement') {
          dispatch({ type: 'save', payload: { consultationTipsInfo: {} } });
        }
      });
    },
  },
};
export default StatementModel;
