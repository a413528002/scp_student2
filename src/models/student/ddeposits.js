import {message} from "antd";
import {queryDepositInterests, queryDeposits, updateDepositInterest} from "@/services/student/ddeposits";

const DepositsModel = {
  namespace: 'studentDeposits',
  state: {
    queryDepositsData: [],
    queryDepositInterestsData: [],
  },
  effects: {

    // 查询存款
    * queryDeposits({payload}, {call, put,}) {
      const response = yield call(queryDeposits, payload)
      if (!response.errCode) {
        const queryDepositsData = response.map((item, index) => {
          return {
            ...item,
            _key: item.bankFinancialBusinessId
          }
        });
        yield put({
          type: 'save',
          payload: {
            queryDepositsData
          }
        })
      }
    },

    // 查询存款利息
    * queryDepositInterests({payload, callback}, {call, put}) {
      const response = yield call(queryDepositInterests, payload)
      if (!response.errCode) {
        const queryDepositInterestsData = response.map((item, index) => {
          return {
            ...item,
            _key: index
          }
        });
        yield put({
          type: 'save',
          payload: {
            queryDepositInterestsData
          }
        })
      }
    },
    // 查询存款利息
    * updateDepositInterest({payload, callback}, {call, put}) {
      const response = yield call(updateDepositInterest, payload)
      if (!response.errCode) {
        message.success('保存成功')
        callback()
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
export default DepositsModel
