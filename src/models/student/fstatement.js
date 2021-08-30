import {endBusiness, endFinance} from "@/services/student/fs";
import { message } from 'antd';

const StatementModel = {
  namespace: 'studentStatement',
  state: {
    gifQueryFinancialMarketsDate: {},
    queryLogsDate: [],
  },
  effects: {
    // 业务结账
    *endBusiness({ payload }, { call, put }) {
      const response = yield call(endBusiness, payload);
      if (!response.errCode) {
        message.success('业务结账成功')
      }
    },
    // 财务结账
    *endFinance({ payload }, { call, put }) {
      const response = yield call(endFinance, payload);
      if (!response.errCode) {
        message.success('财务结账成功')
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
};
export default StatementModel;
