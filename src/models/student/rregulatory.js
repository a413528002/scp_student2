import { queryBankRiskRegulation, updateBankRiskRegulation } from '@/services/student/rr';
import { message } from 'antd';

// 战略规划
const RegulatoryModel = {
  namespace: 'studentRegulatory',
  state: {
    queryBankRiskRegulationData: {},
  },
  effects: {
    // 查询薪资/费用
    *queryBankRiskRegulation({ payload }, { call, put }) {
      const response = yield call(queryBankRiskRegulation, payload);
      if (!response.errCode) {
        yield put({
          type: 'save',
          payload: { queryBankRiskRegulationData: response },
        });
      }
    },
    // 更新费用
    *updateBankRiskRegulation({ payload }, { call, put }) {
      const response = yield call(updateBankRiskRegulation, { ...payload });
      if (!response.errCode) {
        // 获取课堂id
        const { classHourId } = payload;
        message.success('保存成功');
        yield put({
          type: 'queryBankRiskRegulation',
          payload: { classHourId },
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
};
export default RegulatoryModel;
