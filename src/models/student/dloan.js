import {message} from "antd";

import {queryLoanInterests, queryLoans} from "@/services/student/dloan";

const LoanModel = {
  namespace: 'studentLoan',
  state: {queryLoansData: [],},
  effects: {

    // 查询贷款
    * queryLoans({payload}, {call, put,}) {
      const response = yield call(queryLoans, payload)
      if (!response.errCode) {
        const queryLoansData = response.map((item, index) => {
          return {
            ...item,
            _key: item.bankFinancialBusinessId
          }
        });
        yield put({
          type: 'save',
          payload: {
            queryLoansData
          }
        })
      }
    },

    // 查询贷款利息
    * queryLoanInterests({payload, callback}, {call, put}) {
      const response = yield call(queryLoanInterests, payload)
      if (!response.errCode) {

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
export default LoanModel
