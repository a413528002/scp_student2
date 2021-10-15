import { gdebtQueryLogs, grab } from '@/services/student/fcreditors';
import { message } from 'antd';

const CreditorsModel = {
  namespace: 'studentCreditors',
  state: {
    creditorsMarketData: [], // 金融市场数据
    gdebtQueryLogsDate: [],
  },
  effects: {
    // 查询债券抢单记录
    *gdebtQueryLogs({ payload }, { call, put }) {
      const response = yield call(gdebtQueryLogs, payload);
      if (!response.errCode) {
        const gdebtQueryLogsDate = response.map((item, index) => {
          return {
            ...item,
            _key: index,
          };
        });
        yield put({
          type: 'save',
          payload: {
            gdebtQueryLogsDate,
          },
        });
      }
    },
    // 债券抢单
    *grab({ payload }, { call }) {
      const response = yield call(grab, payload);
      if (!response.errCode) {
        message.success('抢单成功');
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
    // 设置已被抢单的数据
    setGrabbedData(state, { payload }) {
      const classFinancialMarketId = payload;
      // 将该条金融数据状态改为已被抢单
      const creditorsMarketData = state.creditorsMarketData.map((item) => {
        if (item.classFinancialMarketId === classFinancialMarketId) {
          return {
            ...item,
            status: 'GRABBED',
          };
        }
        return item;
      });

      return {
        ...state,
        creditorsMarketData,
      };
    },

    // 设置抢单信息
    setGrabInfo(state, { payload }) {
      const { data } = payload;
      const creditorsMarketData =
        data?.map((item, index) => {
          return {
            ...item,
            _key: index,
          };
        }) ?? [];
      return {
        ...state,
        creditorsMarketData,
      };
    },
  },
};
export default CreditorsModel;
