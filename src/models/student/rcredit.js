import { message } from 'antd';
import {queryBankRwaCredits, updateBankRwaCredit} from "@/services/student/crwa";

const CreditModel = {
  namespace: 'studentCredit',
  state: {
    queryBankRwaCreditsData: [],
  },
  effects: {
    // 查询列表
    *queryBankRwaCredits({ payload }, { call, put }) {
      const response = yield call(queryBankRwaCredits, payload)||[];
      if (!response.errCode) {
        const queryBankRwaCreditsData = response.map((item) => {
          return {
            ...item,
            _key: item.bankRwaCreditId,
          };
        });
        yield put({
          type: 'save',
          payload: {
            queryBankRwaCreditsData,
          },
        });
      }
    },

    // 保存操作风险
    *updateBankRwaCredit({ payload, callback }, { call, put }) {
      const response = yield call(updateBankRwaCredit, payload);
      if (!response.errCode) {
        message.success('保存成功');
        callback();
        // 获取课堂id
        const { classHourId } = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {};
        // 刷新表格
        yield put({
          type: 'queryBankRwaCredits',
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
export default CreditModel;
