import { message } from 'antd';

import { queryLoanInterests, queryLoans, updateLoanInterest } from '@/services/student/lm';

// 贷款管理
const LoanMngModel = {
  namespace: 'studentLoanMng',
  state: {
    queryLoansData: [],
    queryLoanInterestsData: [],
    editBankFinancialBusinessInstId: undefined,
  },
  effects: {
    // 查询贷款
    *queryLoans({ payload }, { call, put }) {
      const response = yield call(queryLoans, payload);
      if (!response.errCode) {
        const queryLoansData = response.map((item) => {
          return {
            ...item,
            _key: item.bankFinancialBusinessId,
          };
        });
        yield put({
          type: 'save',
          payload: {
            queryLoansData,
          },
        });
      }
    },

    // 查询贷款利息
    *queryLoanInterests({ payload, callback }, { call, put }) {
      const response = yield call(queryLoanInterests, payload);
      if (!response.errCode) {
        // 获取可以编辑的bankFinancialBusinessInstId
        const editBankFinancialBusinessInstId = response
          .filter((item) => item._disable === false)
          .map((item) => item.bankFinancialBusinessInstId)
          .toString();
        const queryLoanInterestsData = response.map((item) => {
          return {
            ...item,
            _key: item.bankFinancialBusinessInstId,
          };
        });
        yield put({
          type: 'save',
          payload: {
            queryLoanInterestsData,
            editBankFinancialBusinessInstId,
          },
        });
      }
    },
    // 保存存款利息
    *updateLoanInterest({ payload, callback }, { call, put }) {
      const response = yield call(updateLoanInterest, payload);
      if (!response.errCode) {
        message.success('保存成功');
        callback();
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
export default LoanMngModel;
