import { message } from 'antd';
import {
  queryDebtInterests,
  queryDebts,
  sellDebt,
  updateDebtInterest,
} from '@/services/student/debtm';

// 存款管理
const CreditorsMngModel = {
  namespace: 'studentCreditorsMng',
  state: {
    queryDebtsData: [],
    queryDepositInterestsData: [],
    editBankFinancialBusinessInstId: undefined,
    editRow: {},
  },
  effects: {
    // 查询债券
    *queryDebts({ payload }, { call, put }) {
      const response = yield call(queryDebts, payload);
      if (!response.errCode) {
        const queryDebtsData = response.map((item) => {
          return {
            ...item,
            _key: item.bankFinancialBusinessId,
          };
        });
        yield put({
          type: 'save',
          payload: {
            queryDebtsData,
          },
        });
      }
    },

    // 查询债券利息
    *queryDepositInterests({ payload, callback }, { call, put }) {
      const response = yield call(queryDebtInterests, payload);
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
    // 保存债券利息
    *updateDebtInterest({ payload, callback }, { call }) {
      const response = yield call(updateDebtInterest, payload);
      if (!response.errCode) {
        message.success('保存成功');
        callback();
      }
    },
    // 卖出债券
    *sellDebt({ payload }, { call, put }) {
      const response = yield call(sellDebt, payload);
      if (!response.errCode) {
        const { classHourId } = payload;
        message.success('卖出成功');
        yield put({
          type: 'queryDebts',
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
export default CreditorsMngModel;
