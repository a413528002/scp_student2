import { queryBankPlan, submitBankPlan } from '@/services/student/bp';
import { message } from 'antd';

// 战略规划
const PlanModel = {
  namespace: 'studentPlan',
  state: {
    periodTtl: 0,
    period: 0,
    periodCur: 0,
    planData: [], // 计划数据
  },
  effects: {
    // 查询计划
    * queryBankPlan({payload}, {call, put}) {
      const response = yield call(queryBankPlan, payload)
      if (!response.errCode) {
        const { planData } = response
        const state = {
          ...response,
          planData: Object.keys(planData).map(item => {return {name: item, value: planData[item]}})
        }

        yield put({
          type: 'save',
          payload: state
        })
      }
    },
    // 提交计划
    * submitBankPlan({payload}, {call, put}) {
      const response = yield call(submitBankPlan, { ...payload })
      const {classHourId} = payload
      if (!response.errCode) {
        message.success('保存成功')
        yield put({
          type: 'queryBankPlan',
          payload: {classHourId}
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
export default PlanModel
