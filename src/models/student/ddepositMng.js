import { message } from 'antd';
import { queryDepositInterests, queryDeposits, updateDepositInterest } from '@/services/student/dm';

const DepositsModel = {
  namespace: 'studentDepositMng',
  state: {
    queryDepositsData: [],
    queryDepositInterestsData: [],
    editBankFinancialBusinessInstId: undefined,
  },
  effects: {
    // 查询存款
    *queryDeposits({ payload }, { call, put }) {
      const response = yield call(queryDeposits, payload);
      if (!response.errCode) {
        const queryDepositsData = response.map((item, index) => {
          return {
            ...item,
            _key: item.bankFinancialBusinessId,
          };
        });
        yield put({
          type: 'save',
          payload: {
            queryDepositsData,
          },
        });
      }
    },

    // 查询存款利息
    *queryDepositInterests({ payload, callback }, { call, put }) {
      const response = yield call(queryDepositInterests, payload);
      if (!response.errCode) {
        // 获取可以编辑的bankFinancialBusinessInstId
        const editBankFinancialBusinessInstId = response
          .filter((item) => item._disable === false)
          .map((item) => item.bankFinancialBusinessInstId).toString();
        console.log(editBankFinancialBusinessInstId);
        const queryDepositInterestsData = response.map((item) => {
          return {
            ...item,
            _key: item.bankFinancialBusinessInstId,
          };
        });
        yield put({
          type: 'save',
          payload: {
            queryDepositInterestsData,
            editBankFinancialBusinessInstId,
          },
        });
      }
    },
    // 查询存款利息
    *updateDepositInterest({ payload, callback }, { call, put }) {
      const response = yield call(updateDepositInterest, payload);
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
export default DepositsModel;
