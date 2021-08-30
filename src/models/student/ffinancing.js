import { message } from 'antd';
import { gifGrab, gifQueryFinancialMarkets, gifQueryLogs } from '@/services/student/ffinancing';

const FinancingModel = {
  namespace: 'studentFinancing',
  state: {
    gifQueryFinancialMarketsDate: {},
    queryLogsDate: [],
  },
  effects: {
    // 查询金融市场数据
    *gifQueryFinancialMarkets({ payload }, { call, put }) {
      const response = yield call(gifQueryFinancialMarkets, payload);
      if (!response.errCode) {
        const data = response['data'];
        const gifQueryFinancialMarketsDate = {
          ...response,
          data: data?.map((item) => {
            return {
              ...item,
              _key: item.classFinancialMarketId,
            };
          }),
        };
        yield put({
          type: 'save',
          payload: {
            gifQueryFinancialMarketsDate,
          },
        });
      }
    },
    // 查询投融资抢单记录
    *gifQueryLogs({ payload }, { call, put }) {
      const response = yield call(gifQueryLogs, payload);
      if (!response.errCode) {
        const gifQueryLogsDate = response.map((item) => {
          return {
            ...item,
            _key: item.classFinancialMarketId,
          };
        });
        yield put({
          type: 'save',
          payload: {
            gifQueryLogsDate,
          },
        });
      }
    },
    // 投融资抢单
    *gifGrab({ payload }, { call, put }) {
      const response = yield call(gifGrab, payload);
      if (!response.errCode) {
        message.success('抢单成功');
        const { classHourId } = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {};
        // 建设成功后刷新表格
        yield put({
          type: 'gifQueryFinancialMarkets',
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
export default FinancingModel;
