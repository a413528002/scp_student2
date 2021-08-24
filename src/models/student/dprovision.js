import { message } from 'antd';
import { queryBankLoanProvisions, updateBankLoanProvision } from '@/services/student/dprovision';

// 拨备管理
const ProvisionModel = {
  namespace: 'studentProvision',
  state: {bankLoanProvisionsData: [],},
  effects: {

    // 查询列表
    * queryBankLoanProvisions({payload}, {call, put,}) {
      const response = yield call(queryBankLoanProvisions, payload)
      if (!response.errCode) {
        const bankLoanProvisionsData = response.map((item, index) => {
          return {
            ...item,
            _key: index
          }
        });

        // 建设成功后刷新表格
        yield put({
          type: 'save',
          payload: {
            bankLoanProvisionsData
          }
        })
      }
    },

    // 更新
    * updateBankLoanProvision({payload, callback}, {call, put}) {
      const response = yield call(updateBankLoanProvision, payload)
      if (!response.errCode) {
        message.success('更新成功')
        callback()
        // 刷新表格
        const {classHourId} = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {}
        yield put({
          type: 'queryBankLoanProvisions',
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
export default ProvisionModel
