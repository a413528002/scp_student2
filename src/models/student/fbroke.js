import { message } from 'antd';
import { applyForInject, queryBankruptcies } from '@/services/student/bb';

const BrokeModel = {
  namespace: 'studentBroke',
  state: {
    queryBankruptciesData: [],
  },
  effects: {
    // 查询列表
    *queryBankruptcies({ payload }, { call, put }) {
      const response = yield call(queryBankruptcies, payload);
      if (!response.errCode) {
        const queryBankruptciesData = response.map((item) => {
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
    *applyForInject({ payload, callback }, { call, put }) {
      const response = yield call(applyForInject, payload);
      const { period } = payload;
      if (!response.errCode) {
        message.success('保存成功');
        callback();
        // 获取课堂id
        const { classHourId } = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {};
        // 刷新表格
        yield put({
          type: 'queryBankruptcies',
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
