import {
  getStudentCreateBankChannel, getStudentInputMarketingCost,
  getStudentQueryBankChannels, getStudentQueryBankMarketings,
  getStudentQueryBankPlan
} from "@/services/student/plan";

const PlanModel = {
  namespace: 'studentPlan',
  state: {
    bankChannelsData: [],
    bankMarketingsData: []
  },
  effects: {
    // 查询银行战略规划
    * queryBankPlan({payload}, {call, put, select}) {
      const response = yield call(getStudentQueryBankPlan, payload)
      if (response.status === undefined) {

      }
    },
    // 查询银行渠道
    * queryBankChannels({payload}, {call, put,}) {
      const response = yield call(getStudentQueryBankChannels, payload)
      if (response.status === undefined) {
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
      if (response.status === undefined) {
        message.success('建设成功')
      }
    },
    // 根据银行ID查询当前期间银行营销信息
    * queryBankMarketings({payload}, {call, put,}) {
      const response = yield call(getStudentQueryBankMarketings, payload)
      if (response.status === undefined) {
        const bankMarketingsData = response.map((item, index) => {
          return {
            ...item,
            _key: index
          }
        });
        yield put({
          type: 'save',
          payload: {
            bankMarketingsData
          }
        })
      }
    },
    // 投入营销费用
    * inputMarketingCost({payload}, {call, put,}) {
      const response = yield call(getStudentInputMarketingCost, payload)
      if (response.status === undefined) {
        message.success('提交成功')
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
export default PlanModel
