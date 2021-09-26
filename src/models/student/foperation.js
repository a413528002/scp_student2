import { message } from 'antd';
import { queryBankExpenses, updateBankExpense } from '@/services/student/be';

const OperationModel = {
  namespace: 'studentOperation',
  state: {
    queryBankExpensesData: {},
  },
  effects: {
    // 查询薪资/费用
    *queryBankExpenses({ payload }, { call, put }) {
      const response = yield call(queryBankExpenses, payload);
      if (!response.errCode) {
        const { bankExpenses } = response;
        const queryBankExpensesData = {
          ...response,
          bankExpenses: bankExpenses?.map((item) => {
            return {
              ...item,
              _key: item.bankExpenseId,
            };
          }),
        };
        yield put({
          type: 'save',
          payload: {
            queryBankExpensesData,
          },
        });
      }
    },

    // 更新费用
    *updateBankExpense({ payload, callback }, { call, put }) {
      const response = yield call(updateBankExpense, payload);
      const { period } = payload;
      if (!response.errCode) {
        message.success('保存成功');
        callback();
        // 获取课堂id
        const { classHourId } = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {};
        // 刷新表格
        yield put({
          type: 'queryBankExpenses',
          payload: {
            classHourId,
            period,
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
export default OperationModel;
