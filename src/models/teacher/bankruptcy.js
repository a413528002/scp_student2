import { agreedToInject, queryBankInjectMonies } from '@/services/teacher/bb';
import { message } from 'antd';

const BankruptcyModel = {
  namespace: 'teacherBankruptcy',
  state: {
    queryBankInjectMoniesData: [],
  },
  effects: {
    // 查询注资列表
    *queryBankInjectMonies({ payload }, { call, put }) {
      const response = yield call(queryBankInjectMonies, payload);
      if (!response.errCode) {
        const queryBankInjectMoniesData = response?.map((item) => {
          return {
            ...item,
            _key: item.bankInjectMoneyId,
          };
        });
        yield put({
          type: 'save',
          payload: {
            queryBankInjectMoniesData,
          },
        });
      }
    },
    // 同意注资
    *agreedToInject({ payload }, { call, put }) {
      const response = yield call(agreedToInject, payload);
      if (!response.errCode) {
        const { classHourId } = payload;
        message.success('已同意');
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

export default BankruptcyModel;
