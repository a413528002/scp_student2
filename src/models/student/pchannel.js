import { getStudentCreateBankChannel, getStudentQueryBankChannels } from '@/services/student/bc';
import { message } from 'antd';

const ChannelModel = {
  namespace: 'studentChannel',
  state: {
    bankChannelsData: [],
  },
  effects: {
    // 查询银行渠道
    * queryBankChannels({payload}, {call, put,}) {
      const response = yield call(getStudentQueryBankChannels, payload)
      if (!response.errCode) {
        const bankChannelsData = response.map((item, index) => {
          return {
            ...item,
            _key: index
          }
        });
        yield put({
          type: 'save',
          payload: {
            bankChannelsData
          }
        })
      }
    },
    // 创建银行渠道
    * createBankChannel({payload}, {call, put,}) {
      const response = yield call(getStudentCreateBankChannel, payload)
      if (!response.errCode) {
        message.success('建设成功')
        // 获取课堂id
        const {classHourId} = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {}
        // 建设成功后刷新表格
        yield put({
          type: 'queryBankChannels',
          payload: {
            classHourId
          }
        })
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
export default ChannelModel
