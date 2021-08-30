import { message } from 'antd';
import { queryDepositInterests, queryDeposits, updateDepositInterest } from '@/services/student/dm';

// 存款管理
const DepositsMngModel = {
  namespace: 'studentDepositMng',
  state: {
    queryDepositsData: [],
    queryDepositInterestsData: [],
    editBankFinancialBusinessInstId: undefined,
    editRow: {},
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
          .map((item) => item.bankFinancialBusinessInstId)
          .toString();
        // 获取可以编辑的当前行editRow
        const [editRow] = response
          ?.filter((item) => item._disable === false)
          .map((item) => {
            // interest 元转换为万元
            return { ...item, interest: item.interest / 10000 };
          });
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
            editRow,
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
export default DepositsMngModel;
