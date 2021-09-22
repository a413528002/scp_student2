import { message } from 'antd';
import { applyForInject, queryBankInjectMonies } from '@/services/student/bb';

const BrokeModel = {
  namespace: 'studentBroke',
  state: {
    queryBankruptciesData: [],
  },
  effects: {
    // 查询列表
    *queryBankInjectMonies({ payload }, { call, put }) {
      const response = yield call(queryBankInjectMonies, payload) || [];
      if (!response.errCode) {
        const queryBankruptciesData = Array.isArray(response).map((item) => {
          return {
            ...item,
            _key: item.bankExpenseId,
          };
        });
        yield put({
          type: 'save',
          payload: {
            queryBankruptciesData,
          },
        });
      }
    },

    // 注资申请
    *applyForInject({ payload }, { call, put }) {
      const response = yield call(applyForInject, payload);
      if (!response.errCode) {
        const { classHourId } = payload;
        message.success('申请成功');
        // 刷新表格
        yield put({
          type: 'queryBankInjectMonies',
          payload: {
            classHourId,
          },
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
export default BrokeModel;
