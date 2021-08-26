import {
  gdebtGrab,
  gdebtQueryFinancialMarkets,
  gdebtQueryLogs,
} from '@/services/student/fcreditors';
import { message } from 'antd';

const CreditorsModel = {
  namespace: 'studentCreditors',
  state: {
    gdebtQueryFinancialMarketsDate: {},
    gdebtQueryLogsDate: [],
  },
  effects: {
    // 查询金融市场数据
    *gdebtQueryFinancialMarkets({ payload }, { call, put }) {
      const response = yield call(gdebtQueryFinancialMarkets, payload);
      if (!response.errCode) {
        const data = response['data'];
        const gdebtQueryFinancialMarketsDate = {
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
            gdebtQueryFinancialMarketsDate,
          },
        });
      }
    },
    // 查询债券抢单记录
    *gdebtQueryLogs({ payload }, { call, put }) {
      const response = yield call(gdebtQueryLogs, payload);
      if (!response.errCode) {
        const gdebtQueryLogsDate = response.map((item) => {
          return {
            ...item,
            _key: item.classFinancialMarketId,
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
    *gdebtGrab({ payload }, { call, put }) {
      const response = yield call(gdebtGrab, payload);
      if (!response.errCode) {
        message.success('抢单成功');
        const { classHourId } = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {};
        // 建设成功后刷新表格
        yield put({
          type: 'gdebtQueryFinancialMarkets',
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
    // 设置已被抢单的数据
    setGrabbedData(state, {payload}) {
      const classFinancialMarketId = payload
      // 将该条金融数据状态改为已被抢单
      const financialMarketData = state.financialMarketData.map(item => {
        if (item.classFinancialMarketId === classFinancialMarketId) {
          return {
            ...item,
            status: 'GRABBED'
          }
        }
        return item
      })

      return {
        ...state,
        financialMarketData,
      }
    },

    // 设置抢单信息
    setGrabInfo(state, {payload}) {
      const { grabStatus, serverTime, startTimes, data, currentUserId } = payload;
      // 距离开始时间=当前用户对应的银行开始时间-服务器时间
      const startDuration = serverTime && startTimes && startTimes[currentUserId]
        && Math.max(0, Math.trunc((startTimes[currentUserId] - serverTime) / 1000))
      const financialMarketData = data?.map((item, index) => {
        return {
          ...item,
          _key: index,
        }
      }) ?? [];
      return {
        ...state,
        grabStatus,
        startDuration,
        financialMarketData,
      }
    },
  }
};
export default CreditorsModel;
