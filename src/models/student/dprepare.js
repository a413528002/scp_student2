import {message} from "antd";
import {queryBankDepositReserves, updateBankDepositReserve} from "@/services/student/dprepare";

// 存款准备金
const PrepareModel = {
  namespace: 'studentPrepare',
  state: {bankDepositReservesData: [],},
  effects: {

    // 查询列表
    * queryBankDepositReserves({payload}, {call, put,}) {
      const response = yield call(queryBankDepositReserves, payload)
      if (!response.errCode) {
        const bankDepositReservesData = response.map((item, index) => {
          return {
            ...item,
            _key: index
          }
        });
        yield put({
          type: 'save',
          payload: {
            bankDepositReservesData
          }
        })
      }
    },

    // 更新
    * updateBankDepositReserve({payload, callback}, {call, put}) {
      const response = yield call(updateBankDepositReserve, payload)
      if (!response.errCode) {
        message.success('更新成功')
        callback()
        // 刷新表格
        const {classHourId} = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {}
        yield put({
          type: 'queryBankDepositReserves',
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
export default PrepareModel
