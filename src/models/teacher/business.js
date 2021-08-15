import {message} from "antd";
import {queryBankOrganizations, queryBankPeriodInfos, queryBankWrongs} from "@/services/teacher/om";


const BusinessModel = {
  namespace: 'teacherBusiness',
  state: {
    queryBankWrongsDate: {},
    queryBankPeriodInfosDate: {},
    queryBankOrganizationsDate: {}
  },
  effects: {
    // 查询各个银行错误记录
    * queryBankWrongs({payload}, {call, put}) {
      const response = yield call(queryBankWrongs, payload)
      if (!response.errCode) {
        const content = response['content']
        const queryBankWrongsDate = {
          ...response,
          'content': content?.map((item, index) => {
            return {
              ...item,
              _key: index
            }
          })
        }
        yield put({
          type: 'save',
          payload: {
            queryBankWrongsDate
          }
        })
      }
    },
    // 查询各个银行期间信息
    * queryBankPeriodInfos({payload}, {call, put}) {
      const response = yield call(queryBankPeriodInfos, payload)
      if (!response.errCode) {
        const content = response['content']
        const queryBankPeriodInfosDate = {
          ...response,
          'content': content?.map((item, index) => {
            return {
              ...item,
              _key: index
            }
          })
        }
        yield put({
          type: 'save',
          payload: {
            queryBankPeriodInfosDate
          }
        })
      }
    },
    // 查询各个银行机构信息
    * queryBankOrganizations({payload}, {call, put}) {
      const response = yield call(queryBankOrganizations, payload)
      if (!response.errCode) {
        const content = response['content']
        const queryBankOrganizationsDate = {
          ...response,
          'content': content?.map((item, index) => {
            return {
              ...item,
              _key: index
            }
          })
        }
        yield put({
          type: 'save',
          payload: {
            queryBankOrganizationsDate
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
  },

}

export default BusinessModel
