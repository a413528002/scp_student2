import { queryBankPlan, submitBankPlan } from '@/services/student/bp';
import { message } from 'antd';

const PlanModel = {
  namespace: 'studentPlan',
  state: {
    periodTtl: undefined,
    period: undefined,
    periodCur: undefined,
    planData: [], // 计划数据
  },
  effects: {
    // 查询计划
    * queryBankPlan({payload}, {call, put}) {
      const response = yield call(queryBankPlan, payload)
      if (!response.errCode) {
        const organizationData = response.map((item, index) => {
          return {
            ...item,
            _key: index
          }
        });

        yield put({
          type: 'save',
          payload: {
            organizationData
          }
        })
      }

    },
    // 创建机构
    * submitBankPlan({payload, callback}, {call, put}) {
      const response = yield call(submitBankPlan, payload)
      const {classHourId} = payload
      if (!response.errCode) {
        message.success('新建成功')
        callback()
        yield put({
          type: 'queryBankOrganizations',
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
