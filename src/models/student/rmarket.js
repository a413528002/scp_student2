import { message } from 'antd';
import { queryBankRwaMarkets, updateBankRwaMarket } from '@/services/student/mrwa';

const MarketModel = {
  namespace: 'studentMarket',
  state: {
    queryBankRwaMarketsData: [],
  },
  effects: {
    // 查询列表
    *queryBankRwaMarkets({ payload }, { call, put }) {
      const response = yield call(queryBankRwaMarkets, payload) || [];
      if (!response.errCode) {
        const { bankRwaMarkets } = response;
        const queryBankRwaMarketsData = {
          ...response,
          bankRwaMarkets: bankRwaMarkets.map((item) => {
            return {
              ...item,
              _key: item.bankRwaMarketId,
            };
          }),
        };
        yield put({
          type: 'save',
          payload: {
            queryBankRwaMarketsData,
          },
        });
      }
    },

    // 保存操作风险
    *updateBankRwaMarket({ payload, callback }, { call, put }) {
      const response = yield call(updateBankRwaMarket, payload);
      if (!response.errCode) {
        const {classHourId} = payload
        message.success('保存成功');
        callback();
        // 刷新表格
        yield put({
          type: 'queryBankRwaMarkets',
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
export default MarketModel;
