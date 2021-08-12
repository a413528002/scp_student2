import {message} from "antd";
import {queryBankDepositReserves, updateBankDepositReserve} from "@/services/student/dprepare";

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
        // const {classHourId} = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {}
        // 建设成功后刷新表格
        yield put({
          type: 'save',
          payload: {
            bankDepositReservesData
          }
        })
      }
    },

    // 更新
    * updateBankDepositReserve({payload,callback}, {call}) {
      const response = yield call(updateBankDepositReserve, payload)
      if (!response.errCode) {
        message.success('更新成功')
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
export default PrepareModel
