import { grab, queryLogs } from '@/services/student/gdpst.js';
import { message } from 'antd';
import { delay } from '@/utils/commonUtils';


const GrabDepositModel = {
  namespace: 'studentGrabDeposit',
  state: {
    startDuration: undefined, // 抢单开始倒计时
    financialMarketData: [], // 金融市场数据
    logData: [], // 抢单日志数据
  },
  effects: {

    // 倒计时
    * countdown({payload}, {call, put, select}) {
      while (true) {
        const startDuration = yield select(state => state.studentGrabDeposit.startDuration);
        if (startDuration <= 0) {
          break;
        }
        yield call(delay, 1000);
        yield put({
          type: 'save',
          payload:{
            startDuration: startDuration - 1
          }
        })
      }
    },

    // 查询存款抢单记录
    * queryLogs({payload}, {call, put}) {
      const response = yield call(queryLogs, payload)
      if (!response.errCode) {
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
    * grab({payload, callback}, {call, put}) {
      const response = yield call(grab, payload)
      if (!response.errCode) {
        message.success('抢单成功')
      }
      callback(response)
    },
  },

  reducers: {
    save(state, {payload}) {
      return {
        ...state,
        ...payload,
      }
    },

    // 设置已被抢单的数据
    setGrabbedData(state, {payload}) {
      const classFinancialMarketId = payload
      return {
        ...state,
        financialMarketData: state.financialMarketData.map(item => {
          if (item.classFinancialMarketId === classFinancialMarketId) {
            return {
              ...item,
              status: 'GRABBED'
            }
          }
          return item
        })
      }
    },

    // 设置抢单信息
    setGrabInfo(state, {payload}) {
      const { startTimes, data, currentUserId } = payload;
      // 相差的秒数
      let startDuration;
      if (startTimes) {
        const startTimestamp = startTimes[currentUserId];
        const second = Math.trunc((startTimestamp - Date.now()) / 1000);
        startDuration = second < 0 ? 0 : second
      } else {
        startDuration = 0
      }

      const financialMarketData = data?.map((item, index) => {
        return {
          ...item,
          _key: index,
        }
      }) ?? [];
      return {
        ...state,
        startDuration,
        financialMarketData,
      }
    },
  }
}
export default GrabDepositModel
