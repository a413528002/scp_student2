import {endBusiness} from "@/services/student/fs";
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
