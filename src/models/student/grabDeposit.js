import { grab, queryFinancialMarkets, queryLogs } from '@/services/student/gdpst.js';
import { message } from 'antd';

const GrabDepositModel = {
  namespace: 'studentGrabDeposit',
  state: {
    grabStartTime: undefined, // 抢单开始时间
    financialMarketData: [], // 金融市场数据
    logData: [], // 抢单日志数据
  },
  effects: {
    // 查询金融市场
    * queryFinancialMarkets({payload}, {call, put}) {
      const response = yield call(queryFinancialMarkets, payload)
      if (response.status === undefined) {
        const {grabStartTime} = response
        const financialMarketData = response.data?.map((item, index) => {
          return {
            ...item,
            _key: index
          }
        });

        yield put({
          type: 'save',
          payload: {
            grabStartTime,
            financialMarketData
          }
        })
      }
    },

    // 查询存款抢单记录
    * queryLogs({payload}, {call, put}) {
      const response = yield call(queryLogs, payload)
      if (response.status === undefined) {
        const logData = response.map((item, index) => {
          return {
            ...item,
            _key: index
          }
        });

        yield put({
          type: 'save',
          payload: {
            logData,
          }
        })
      }
    },

    // 存款抢单
    * grab({payload}, {call, put}) {
      const response = yield call(grab, payload)
      if (response.status === undefined) {
        message.success('抢单成功')
      }
    },
  },

  reducers: {
    save(state, {payload}) {
      return {
        ...state,
        ...payload,
      }
    }
  }
}
export default GrabDepositModel
